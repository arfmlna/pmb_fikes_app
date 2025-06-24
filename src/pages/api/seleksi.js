import connect from "../../lib/connect"
import authenticateToken from "./auth"

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT * from seleksi')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST'){
            const { nama_seleksi } = req.body;
            try {
                const [result] = await connect.query('INSERT INTO seleksi (nama_seleksi) VALUES (?)', [nama_seleksi]);    
                res.status(201).json({ message: 'Berhasil ditambahkan!', data: result });
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
    }
}

export default authenticateToken(handler)