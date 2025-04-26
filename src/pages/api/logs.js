import authenticateToken from "./auth";
import connect from '../connect'

async function handler(req, res){
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query('SELECT login_logs.id AS login_log_id, login_logs.user_id, login_logs.login_time, users.id AS user_id, users.name, users.role FROM login_logs INNER JOIN users ON login_logs.user_id = users.id ORDER BY login_logs.user_id ASC')
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    }
}

export default authenticateToken(handler)