import authenticateToken from "./auth";
import connect from '../connect'

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('select * from prodi')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST'){
        const { jenjang, nama_prodi, banyak_jalur } = req.body;
        try {
            const [rows] = await connect.query('SELECT MAX(id_prodi) AS id_prodi FROM prodi');
            const lastId = rows[0].id_prodi || 1;
            const newIdNumber = lastId + 1;
            
            const [result] = await connect.query('INSERT INTO prodi (id_prodi, jenjang, nama_prodi, banyak_jalur) VALUES (?, ?, ?, ?)', [newIdNumber, jenjang, nama_prodi, banyak_jalur]);    
            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan", data: newIdNumber })
        }
    }
}

export default authenticateToken(handler)