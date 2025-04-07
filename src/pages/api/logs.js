import authenticateToken from "./auth";
import connect from '../connect'

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('select * from login_logs')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    }
}

export default authenticateToken(handler)