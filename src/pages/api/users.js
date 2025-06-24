import authenticateToken from "./auth";
import connect from '../../lib/connect'
import bcrypt from 'bcryptjs'

async function handler(req, res){
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT users.*, prodi.nama_prodi, angkatan.tahun_angkatan AS tahun_angkatan FROM users LEFT JOIN prodi ON users.id_prodi = prodi.id_prodi LEFT JOIN angkatan ON users.id_angkatan = angkatan.id_angkatan')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST'){
        const { user_id=null, name, email, password, role='users', id_prodi=null, id_angkatan=null } = req.body;
        try {
            const [existingUser] = await connect.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Email sudah digunakan!' });
            }

            const [maxResultID] = await connect.query('SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM users');
            const lastId = maxResultID[0]?.max_id || 0;
            const newIdNumber = lastId + 1;
            const paddedId = String(newIdNumber).padStart(6, "0");
            const newId = `FKS${paddedId}`;

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await connect.query('INSERT INTO users (id, user_id, name, email, password, role, id_prodi, id_angkatan, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [newId, user_id, name, email, hashedPassword, role, id_prodi, id_angkatan, now, now]);    
            res.status(201).json({ message: 'Pengguna berhasil didaftarkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Pengguna gagal didaftarkan" })
        }
    }
}

export default authenticateToken(handler)