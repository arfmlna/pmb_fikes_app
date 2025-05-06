import connect from "../connect"
import authenticateToken from "./auth"


async function handler(req, res){
    const {id_prodi, id_seleksi, mulai, selesai, harga} = req.body
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT ps.*, p.nama_prodi, s.nama_seleksi FROM prodi_seleksi ps JOIN prodi p ON ps.id_prodi = p.id_prodi JOIN seleksi s ON ps.id_seleksi = s.id_seleksi')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if(req.method === 'POST'){
        try {
            const [result] = await connect.query('INSERT INTO `prodi_seleksi`(`id_prodi`, `id_seleksi`, `mulai`, `selesai`, `harga`) VALUES (?,?,?,?,?)', [id_prodi, id_seleksi, mulai, selesai, harga])
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    }
}

export default authenticateToken(handler)