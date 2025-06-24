import connect from "@/lib/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if (req.method === 'PUT') {
        const { prodi, angkatan } = req.body;
        if (!prodi || !angkatan) {
            return res.status(400).json({ message: "prodi dan angkatan harus disertakan." });
        }
        try {
            const [angkatanResult] = await connect.query(
                'SELECT tahun_angkatan FROM angkatan WHERE id_angkatan = ?',
                [angkatan]
            );
            if (angkatanResult.length === 0) {
                return res.status(404).json({ message: "Angkatan tidak ditemukan." });
            }
            const kodeAngkatan = String(angkatanResult[0].tahun_angkatan).slice(-2);
            const kodeProdi = String(prodi).padStart(2, '0');
            const [countResult] = await connect.query(`
                SELECT COUNT(*) AS total 
                FROM users 
                WHERE id_prodi = ? AND id_angkatan = ?
            `, [prodi, angkatan]);
            const count = countResult[0]?.total || 0;
            const counter = String(count + 1).padStart(2, '0');
            const newUserId = `K${kodeAngkatan}${kodeProdi}${counter}`;
            
            const [result] = await connect.query('update users set user_id = ?, id_prodi = ?, id_angkatan = ? where id = ?', [newUserId, prodi, angkatan, id]);

            const [users] = await connect.query('SELECT users.*, prodi.nama_prodi, angkatan.tahun_angkatan AS tahun_angkatan FROM users LEFT JOIN prodi ON users.id_prodi = prodi.id_prodi LEFT JOIN angkatan ON users.id_angkatan = angkatan.id_angkatan WHERE users.user_id = ?', [newUserId]);
            const user = users[0];
            const data = JSON.stringify(user)

            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result, user: data });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan", data: newIdNumber })
        }
    }
}

export default authenticateToken(handler)