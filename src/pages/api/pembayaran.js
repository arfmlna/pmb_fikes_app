import connect from "../../lib/connect";
import authenticateToken from "./auth";

async function handler(req, res){
    if(req.method === 'GET'){
        try {
            const [result] = await connect.query(`SELECT pembayaran.*, pendaftaran.nama_lengkap FROM pembayaran JOIN pendaftaran ON pembayaran.user_id = pendaftaran.id_user`);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    }
}

export default authenticateToken(handler)