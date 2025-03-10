import connect from '../connect';
import authenticateToken from './auth';

async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            const [result] = await connect.query(`select * from users_api`)
            res.status(200).json({ message: 'Data berhasil didapat', data:result })
        } catch (error) {
            res.status(500).json({ message: 'error' })
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler);
