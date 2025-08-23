import connect from "../../../../lib/connect";
import authenticateToken from "../../auth";

async function handler(req, res){
    const {id} = req.query
    const {status, statusName} = req.body
    if(req.method === 'PUT'){
        if (statusName === 'ijazah') {
            try {
                const [result] = await connect.query('UPDATE dokumen_pendaftaran set status_ijazah = ? WHERE id_pendaftaran = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        } else if(statusName === 'rapot'){
            try {
                const [result] = await connect.query('UPDATE dokumen_pendaftaran set status_rapot = ? WHERE id_pendaftaran = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        } else if(statusName === 'ktp'){
            try {
                const [result] = await connect.query('UPDATE dokumen_pendaftaran set status_ktp = ? WHERE id_pendaftaran = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        } else if(statusName === 'kk'){
            try {
                const [result] = await connect.query('UPDATE dokumen_pendaftaran set status_kk = ? WHERE id_pendaftaran = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        }
    }
}

export default authenticateToken(handler)