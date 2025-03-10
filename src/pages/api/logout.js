export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict;');
            
            res.status(200).json({ message: 'Logout berhasil!' });
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ message: 'Terjadi kesalahan saat logout.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}
