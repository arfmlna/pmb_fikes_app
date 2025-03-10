import connect from "../connect"
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        try {
            const [existingUser] = await connect.query('SELECT * FROM users_api WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Email sudah digunakan!' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connect.query('INSERT INTO users_api (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, now, now]);    
            res.status(201).json({ message: 'Pengguna berhasil didaftarkan!', data: result });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mendaftarkan pengguna.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}