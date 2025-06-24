import connect from "../../lib/connect"
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'POST') {
        const { name, email, password, role='users' } = req.body;
        try {
            const [existingUser] = await connect.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Email sudah digunakan!' });
            }
            
            const [maxResultID] = await connect.query('SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM users');
            const lastId = maxResultID[0]?.max_id || 0;
            const newIdNumber = lastId + 1;
            const paddedId = String(newIdNumber).padStart(6, "0");
            const newId = `FKS${paddedId}`;

            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connect.query('INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [newId, name, email, hashedPassword, role, now, now]);

            res.status(201).json({ message: 'Pengguna berhasil didaftarkan!', data: result });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mendaftarkan pengguna.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}