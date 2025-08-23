import authenticateToken from "../auth";
import connect from '../../../lib/connect'

async function handler(req, res){
    const {prodi} = req.query
    if (req.method === 'GET') {
        try {
            const [result] = await connect.query("SELECT COUNT(*) AS total, SUM(jenis_kelamin = 'perempuan') AS wanita, SUM(jenis_kelamin = 'laki-laki') AS pria, SUM(jenis_sekolah LIKE '%SMK%') AS smk, SUM(jenis_sekolah LIKE '%SMA%') AS sma, SUM( NOT ( jenis_sekolah LIKE '%SMK%' OR jenis_sekolah LIKE '%SMA%' ) ) AS not_sma_smk, SUM(provinsi = 'Jawa Barat') AS jawa_barat, SUM(provinsi = 'Jawa Tengah') AS jawa_tengah, SUM(provinsi = 'Jawa Timur') AS jawa_timur, SUM(provinsi NOT IN ('Jawa Barat', 'Jawa Tengah', 'Jawa Timur')) AS selain_jawa FROM pendaftaran WHERE prodi1 = ?", [prodi])
            if (result.length === 0) {
                return res.status(404).json({ message: "Data tidak ditemukan" });
            }
            res.status(200).json({ message:"Data berhasil didapat", body: result })
        } catch (error) {
            res.status(500).json({ message:"Data berhasil gagal didapat" })
        }
    }
}

export default authenticateToken(handler)