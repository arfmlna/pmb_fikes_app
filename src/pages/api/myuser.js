import authenticateToken from './auth';

function handler(req, res) {
    if (req.method == 'GET') {
        try {
            res.status(200).json({ message: `Halo, ${req.user.email}! Anda berhasil mengakses resource ini.` });
        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler);
