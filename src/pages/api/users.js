import authenticateToken from "./auth";
import connect from '../connect'
import bcrypt from 'bcryptjs'

async function handler(req, res){
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('select * from users')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    } else if (req.method === 'POST'){
        const { name, email, password, role='alumni' } = req.body;
        try {
            const [existingUser] = await connect.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Email sudah digunakan!' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connect.query('INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [name, email, hashedPassword, role, now, now]);    
            res.status(201).json({ message: 'Pengguna berhasil didaftarkan!', data: result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Pengguna gagal didaftarkan" })
        }
    }
}

export default authenticateToken(handler)