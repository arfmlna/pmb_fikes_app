import connect from "../../../../lib/connect";
import authenticateToken from "../../auth";

async function handler(req, res){
    const {id} = req.query
    const {status, statusName} = req.body
    if(req.method === 'PUT'){
        if (statusName === 'heregistrasi') {
            try {
                const [result] = await connect.query('UPDATE users set heregistrasi = ? WHERE id = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        } else if(statusName === 'mengundurkan'){
            try {
                const [result] = await connect.query('UPDATE users set Mengundurkan = ? WHERE id = ?', [status, id])
                res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
            } catch (error) {
                console.log(error)
                res.status(500).json({ message:"Gagal ditambahkan" })
            }
        }
    }
}

export default authenticateToken(handler)