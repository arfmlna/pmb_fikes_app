
import connect from '@/lib/connect';
import authenticateToken from '../auth';

async function handler(req, res){
    const {id} = req.query
    if (req.method === 'GET') {
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk memperbarui data' });
        }
        try {
            const [result] = await connect.query('select * from seleksi')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'PUT'){
        const { nama_seleksi } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk memperbarui data' });
        }
        try {
            const [result] = await connect.query("UPDATE seleksi SET nama_seleksi = ? WHERE id_seleksi = ?", 
                [nama_seleksi, id]);    
            res.status(200).json({ message: 'Berhasil ditambahkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if(req.method == "DELETE"){
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
        }
        try {
            const [result] = await connect.query('DELETE FROM seleksi WHERE id_seleksi = ?', [id])
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