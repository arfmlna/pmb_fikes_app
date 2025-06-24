import connect from "../../../../lib/connect";
import authenticateToken from "../../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'PUT'){
        const { status } = req.body;
        try {
            const [result] = await connect.query('UPDATE pendaftaran set konfirmasi = ? WHERE id_pendaftaran = ?', [status, id])

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    }
}

export default authenticateToken(handler)