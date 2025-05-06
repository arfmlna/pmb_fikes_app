import connect from "@/pages/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'GET'){
        try {
            
            const [result] = await connect.query(`SELECT * FROM pembayaran WHERE id = ?`, [id]);
            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if (req.method === 'POST') {
        const { user_id, total, bukti_pembayaran } = req.body;
        try {
            const [result] = await connect.query('INSERT INTO pembayaran (user_id, total, bukti_pembayaran) VALUES (?,?,?)', [user_id, total, bukti_pembayaran]);
            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            await connect.query('UPDATE pendaftaran set konfirmasi = 1 WHERE id_user = ?', [user_id])
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if (req.method === 'PUT'){
        const { user_id, total, bukti_pembayaran } = req.body;
        try {
            const [result] = await connect.query("UPDATE pembayaran SET user_id=?, total=?, bukti_pembayaran=?  WHERE id = 1", [user_id, total, bukti_pembayaran, id]);
            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if(req.method === 'DELETE'){
    if (!id) {
        return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
    }
    try {
        const [result] = await connect.query('DELETE FROM pembayaran WHERE id = ?', [id])
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