import authenticateToken from "./auth";
import connect from '../../lib/connect'

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT p.id_prodi, p.nama_prodi, p.jenjang, COUNT(ps.id_seleksi) AS jumlah_seleksi FROM prodi p LEFT JOIN prodi_seleksi ps ON p.id_prodi = ps.id_prodi GROUP BY p.id_prodi, p.nama_prodi, p.jenjang')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST'){
        const { jenjang, nama_prodi} = req.body;
        try {
            const [rows] = await connect.query('SELECT MAX(id_prodi) AS id_prodi FROM prodi');
            const lastId = rows[0].id_prodi || 1;
            const newIdNumber = lastId + 1;
            
            const [result] = await connect.query('INSERT INTO prodi (id_prodi, jenjang, nama_prodi) VALUES (?, ?, ?)', [newIdNumber, jenjang, nama_prodi]);    
            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan", data: newIdNumber })
        }
    }
}

export default authenticateToken(handler)