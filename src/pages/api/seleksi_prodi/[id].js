import connect from "@/pages/connect"
import authenticateToken from "../auth"

async function handler(req, res){
    const { id } = req.query
    const {id_prodi, id_seleksi, mulai, selesai, harga} = req.body
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT ps.*, p.nama_prodi, s.nama_seleksi FROM prodi_seleksi ps JOIN prodi p ON ps.id_prodi = p.id_prodi JOIN seleksi s ON ps.id_seleksi = s.id_seleksi WHERE ps.id = ?', [id])
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'PUT'){
        try {
            const [result] = await connect.query('UPDATE prodi_seleksi SET id_prodi = ?, id_seleksi = ?, mulai = ?, selesai = ?, harga = ? WHERE id = ?', [
                id_prodi, id_seleksi, mulai, selesai, harga, id
            ])
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method == "DELETE"){
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
        }
        try {
            const [result] = await connect.query('DELETE FROM prodi_seleksi WHERE id = ?', [id])
            res.status(200).json({ massage: "Data berhasil dihapus", data: result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Pengguna gagal dihapus" })
        }
    } else {
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler)