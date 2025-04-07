import connect from '../connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
        const [users] = await connect.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau password salah!' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await connect.query('INSERT INTO login_logs (user_id, login_time) VALUES (?, ?)', [
            user.id,
            new Date()
        ]);

        res.status(200).json({ message: 'Login berhasil!', token, id: user.id, role: user.role });
        } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}
