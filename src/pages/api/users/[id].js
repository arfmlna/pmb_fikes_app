import authenticateToken from '../auth'
import connect from '../../connect'
import bcrypt from 'bcryptjs'

async function handler(req, res) {
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const {id} = req.query
    if (req.method === 'GET') {
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk memperbarui data' });
        }
        try {
            const [result] = await connect.query('select * from users where id = ?', [id])
            if (result.length === 0) {
                return res.status(404).json({ message: "Data tidak ditemukan" });
            }
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if(req.method === 'PUT'){
        const { name, email, password, role } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk mengupdate data' });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connect.query('UPDATE users SET name = ?, email = ?, password = ?, role = ?, created_at = ?, updated_at = ? WHERE id = ?', [name, email, hashedPassword, role, now, now, id]);    
            res.status(201).json({ message: 'Pengguna berhasil diupdate!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Pengguna gagal diupdate" })
        }
    } else if(req.method == "DELETE"){
        if (!id) {
            return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
        }
        try {
            const [result] = await connect.query('DELETE FROM users WHERE id = ?', [id])
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