import authenticateToken from "./auth";
import connect from "../../lib/connect";

async function handler(req, res) {
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'PUT') {
        const { old_email, new_email } = req.body;

        try {
            const userId = req.user.id;

            const [users] = await connect.query('SELECT * FROM users WHERE id = ?', [userId]);
            const user = users[0];

            if (!user) {
                return res.status(404).json({ message: "Pengguna tidak ditemukan." });
            }

            if (user.email !== old_email) {
                return res.status(400).json({ message: "Email saat ini tidak cocok." });
            }

            const [existingUser] = await connect.query('SELECT * FROM users WHERE email = ?', [new_email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: "Email baru sudah digunakan oleh pengguna lain." });
            }

            const [result] = await connect.query(
                'UPDATE users SET email = ?, updated_at = ? WHERE id = ?',
                [new_email, now, userId]
            );

            res.status(200).json({ message: "Email berhasil diubah.", data: result });
        } catch (error) {
            console.error("Error changing email:", error);
            res.status(500).json({ message: "Gagal mengubah email." });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler);
