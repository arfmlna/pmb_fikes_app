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
            const [result] = await connect.query('SELECT login_logs.id AS login_log_id, login_logs.user_id, login_logs.login_time, users.id AS user_id, users.name, users.role FROM login_logs INNER JOIN users ON login_logs.user_id = users.id WHERE users.id = ? ORDER BY login_logs.user_id ASC', [id])
            if (result.length === 0) {
                return res.status(404).json({ message: "Data tidak ditemukan" });
            }
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else {
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler)