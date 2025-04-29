import authenticateToken from "./auth";
import connect from '../connect'

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('select * from angkatan')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST') {
        const { tahun_angkatan, status_pendaftaran } = req.body;
        try {
            const [rows] = await connect.query('SELECT MAX(id_angkatan) AS id_angkatan FROM angkatan');
            const lastId = rows[0].id_angkatan || 1;
            const newIdNumber = lastId + 1;
            
            const [result] = await connect.query('INSERT INTO angkatan (id_angkatan, tahun_angkatan, status_pendaftaran) VALUES (?, ?, ?)', [newIdNumber, tahun_angkatan, status_pendaftaran]);    
            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan", data: newIdNumber })
        }
    }
}

export default authenticateToken(handler)