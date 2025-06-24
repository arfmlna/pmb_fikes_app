import connect from "../../../lib/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'GET'){
        try {
            const [result] = await connect.query(`SELECT dokumen_pendaftaran.*, pendaftaran.nama_lengkap FROM dokumen_pendaftaran JOIN pendaftaran ON dokumen_pendaftaran.user_id = pendaftaran.id_user WHERE dokumen_pendaftaran.user_id = ?`, [id]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    }
}

export default authenticateToken(handler)