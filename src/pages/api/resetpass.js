import authenticateToken from "./auth";
import connect from "../../lib/connect";
import bcrypt from 'bcryptjs'

async function handler(req, res) {
    if (req.method == 'PUT') {
        let date = new Date()
        let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const { old_password, new_password } = req.body;
        try {
            const userId = req.user.id;
            const [users] = await connect.query('SELECT * FROM users WHERE id = ?', [userId]);
            const user = users[0];
            if (!user) {
                return res.status(404).json({ message: "Pengguna tidak ditemukan." });
            }
            const isMatch = await bcrypt.compare(old_password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Password saat ini salah." });
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            const [result] = await connect.query('UPDATE users SET password = ?, updated_at = ? WHERE id = ?', [hashedPassword, now, userId]);    
            res.status(201).json({ message: 'password berhasil diupdate!', data: result });
        } catch (error) {
            res.status(500).json({ message:"password gagal diupdate" })
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler)