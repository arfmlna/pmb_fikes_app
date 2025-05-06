import connect from "@/pages/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'GET'){
        try {
            const result = await connect.query("SELECT * FROM dokumen_pendaftaran")
            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result, });
        } catch (error) {
            res.status(500).json({ message:`Gagal ditambahkan: ${error}` })
        }
    } else if (req.method === 'POST') {
        const { ijazahUrl, skhuUrl, transkipUrl, transkipSebelumnyaUrl, ktpUrl, kkUrl, pasFotoUrl, dokumenLainUrl } = req.body;
        try {
            
            const [result] = await connect.query('INSERT INTO `dokumen_pendaftaran`(`user_id`, `ijazah`, `skhu`, `nilai_rapot`, `sertifikat`, `ktp`, `kk`, `foto`, `dokumen_lain`) VALUES (?,?,?,?,?,?,?,?,?)', [id, ijazahUrl, skhuUrl, transkipUrl, transkipSebelumnyaUrl, ktpUrl, kkUrl, pasFotoUrl, dokumenLainUrl]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result, });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:`Gagal ditambahkan: ${error}` })
        }
    }
}

export default authenticateToken(handler)