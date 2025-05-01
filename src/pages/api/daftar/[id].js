import connect from "@/pages/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if (req.method === 'PUT') {
        const { prodi, angkatan } = req.body;
        if (!prodi || !angkatan) {
            return res.status(400).json({ message: "prodi dan angkatan harus disertakan." });
        }
        try {
            const [maxResultID] = await connect.query('SELECT MAX(CAST(SUBSTRING(user_id, 4) AS UNSIGNED)) AS max_id FROM users');
            const lastId = maxResultID[0]?.max_id || 0;
            const newIdNumber = lastId + 1;
            const paddedId = String(newIdNumber).padStart(6, "0");
            const newId = `K${paddedId}`;
            
            const [result] = await connect.query('update users set user_id = ?, id_prodi = ?, id_angkatan = ? where id = ?', [newId, prodi, angkatan, id]);

            const [users] = await connect.query('SELECT users.*, prodi.nama_prodi, angkatan.tahun_angkatan AS tahun_angkatan FROM users LEFT JOIN prodi ON users.id_prodi = prodi.id_prodi LEFT JOIN angkatan ON users.id_angkatan = angkatan.id_angkatan WHERE users.user_id = ?', [newId]);
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