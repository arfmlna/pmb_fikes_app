import connect from "@/lib/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'GET'){
        try {
            const [result] = await connect.query(`SELECT * FROM dokumen_pendaftaran WHERE user_id = ?`, [id])
            res.status(201).json({ message: 'Data Berhasil didapatkan!', body: result });
        } catch (error) {
            res.status(500).json({ message:`Data Gagal didapatkan: ${error}` })
        }
    } else if (req.method === 'POST') {
        const { id_pendaftaran, ijazahUrl, skhuUrl, transkipUrl, transkipSebelumnyaUrl, ktpUrl, kkUrl, pasFotoUrl, dokumenLainUrl } = req.body;
        try {
            
            const [result] = await connect.query('INSERT INTO `dokumen_pendaftaran`(`user_id`, `id_pendaftaran`,  `ijazah`, `skhu`, `nilai_rapot`, `sertifikat`, `ktp`, `kk`, `foto`, `dokumen_lain`) VALUES (?,?,?,?,?,?,?,?,?,?)', [id, id_pendaftaran, ijazahUrl, skhuUrl, transkipUrl, transkipSebelumnyaUrl, ktpUrl, kkUrl, pasFotoUrl, dokumenLainUrl]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', data: result, });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:`Gagal ditambahkan: ${error}` })
        }
    } else if (req.method === 'PUT') {
        const {
            ijazahUrl, skhuUrl, transkipUrl,
            transkipSebelumnyaUrl, ktpUrl, kkUrl,
            pasFotoUrl, dokumenLainUrl
        } = req.body;
    
        const fields = [];
        const values = [];
    
        if (ijazahUrl) {
            fields.push('ijazah = ?');
            values.push(ijazahUrl);
        }
        if (skhuUrl) {
            fields.push('skhu = ?');
            values.push(skhuUrl);
        }
        if (transkipUrl) {
            fields.push('nilai_rapot = ?');
            values.push(transkipUrl);
        }
        if (transkipSebelumnyaUrl) {
            fields.push('sertifikat = ?');
            values.push(transkipSebelumnyaUrl);
        }
        if (ktpUrl) {
            fields.push('ktp = ?');
            values.push(ktpUrl);
        }
        if (kkUrl) {
            fields.push('kk = ?');
            values.push(kkUrl);
        }
        if (pasFotoUrl) {
            fields.push('foto = ?');
            values.push(pasFotoUrl);
        }
        if (dokumenLainUrl) {
            fields.push('dokumen_lain = ?');
            values.push(dokumenLainUrl);
        }
    
        // Cegah query kosong
        if (fields.length === 0) {
            return res.status(400).json({ message: 'Tidak ada data untuk diperbarui.' });
        }
    
        values.push(id); // user_id untuk WHERE clause
        const sql = `UPDATE dokumen_pendaftaran SET ${fields.join(', ')} WHERE user_id = ?`;
    
        try {
            const [result] = await connect.query(sql, values);
            res.status(200).json({ message: 'Berhasil diperbarui!', data: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Gagal diperbarui: ${error}` });
        }
    }
    
}

export default authenticateToken(handler)