import authenticateToken from "../auth";
import connect from '../../../lib/connect'

async function handler(req, res){
    const {params} = req.query
    if (req.method === 'GET') {
        if (params === "harian") {
            try {
                const [result] = await connect.query("SELECT DATE_FORMAT(p.created_at, '%d %M %Y') AS tanggal, DAYNAME(p.created_at) AS hari, COUNT(*) AS jumlah_pendaftaran, SUM(p.prodi1 = 1) AS prodi1_1, SUM(p.prodi1 = 2) AS prodi1_2, SUM(p.prodi1 = 3) AS prodi1_3, SUM(p.prodi1 = 4) AS prodi1_4, SUM(p.prodi1 = 5) AS prodi1_5, SUM(p.prodi1 = 6) AS prodi1_6, SUM(p.prodi2 = 1) AS prodi2_1, SUM(p.prodi2 = 2) AS prodi2_2, SUM(p.prodi2 = 3) AS prodi2_3, SUM(p.prodi2 = 4) AS prodi2_4, SUM(p.prodi2 = 5) AS prodi2_5, SUM(p.prodi2 = 6) AS prodi2_6 FROM pendaftaran p WHERE p.created_at >= CURDATE() - INTERVAL 7 DAY GROUP BY DATE(p.created_at) ORDER BY p.created_at ASC LIMIT 7")
                if (result.length === 0) {
                    return res.status(404).json({ message: "Data tidak ditemukan" });
                }
                res.status(200).json({ message:"Data berhasil didapat", body: result })
            } catch (error) {
                res.status(500).json({ message:"Data berhasil gagal didapat" })
            }
        }
        if (params === "mingguan") {
            try {
                const [result] = await connect.query("SELECT YEAR(created_at) AS tahun, WEEK(created_at, 1) AS minggu_ke, COUNT(*) AS jumlah_pendaftaran, SUM(p.prodi1 = 1) AS prodi1_1, SUM(p.prodi1 = 2) AS prodi1_2, SUM(p.prodi1 = 3) AS prodi1_3, SUM(p.prodi1 = 4) AS prodi1_4, SUM(p.prodi1 = 5) AS prodi1_5, SUM(p.prodi1 = 6) AS prodi1_6, SUM(p.prodi2 = 1) AS prodi2_1, SUM(p.prodi2 = 2) AS prodi2_2, SUM(p.prodi2 = 3) AS prodi2_3, SUM(p.prodi2 = 4) AS prodi2_4, SUM(p.prodi2 = 5) AS prodi2_5, SUM(p.prodi2 = 6) AS prodi2_6 FROM pendaftaran p WHERE YEAR(created_at) = YEAR(CURDATE()) GROUP BY YEAR(created_at), WEEK(created_at, 1) ORDER BY minggu_ke ASC LIMIT 12")
                if (result.length === 0) {
                    return res.status(404).json({ message: "Data tidak ditemukan" });
                }
                res.status(200).json({ message:"Data berhasil didapat", body: result })
            } catch (error) {
                res.status(500).json({ message:"Data berhasil gagal didapat" })
            }
        }
        if (params === "bulanan") {
            try {
                const [result] = await connect.query("SELECT DATE_FORMAT(created_at, '%Y-%m') AS bulan, DATE_FORMAT(created_at, '%M %Y') AS label_bulan,  COUNT(*) AS jumlah_pendaftaran, SUM(p.prodi1 = 1) AS prodi1_1, SUM(p.prodi1 = 2) AS prodi1_2, SUM(p.prodi1 = 3) AS prodi1_3, SUM(p.prodi1 = 4) AS prodi1_4, SUM(p.prodi1 = 5) AS prodi1_5, SUM(p.prodi1 = 6) AS prodi1_6, SUM(p.prodi2 = 1) AS prodi2_1, SUM(p.prodi2 = 2) AS prodi2_2, SUM(p.prodi2 = 3) AS prodi2_3, SUM(p.prodi2 = 4) AS prodi2_4, SUM(p.prodi2 = 5) AS prodi2_5, SUM(p.prodi2 = 6) AS prodi2_6 FROM pendaftaran p WHERE YEAR(created_at) = YEAR(CURDATE()) GROUP BY bulan ORDER BY bulan ASC LIMIT 7")
                if (result.length === 0) {
                    return res.status(404).json({ message: "Data tidak ditemukan" });
                }
                res.status(200).json({ message:"Data berhasil didapat", body: result })
            } catch (error) {
                res.status(500).json({ message:"Data berhasil gagal didapat" })
            }
        }
        if (params === "tahunan") {
            try {
                const [result] = await connect.query("SELECT YEAR(created_at) AS tahun, COUNT(*) AS jumlah_pendaftaran, SUM(p.prodi1 = 1) AS prodi1_1, SUM(p.prodi1 = 2) AS prodi1_2, SUM(p.prodi1 = 3) AS prodi1_3, SUM(p.prodi1 = 4) AS prodi1_4, SUM(p.prodi1 = 5) AS prodi1_5, SUM(p.prodi1 = 6) AS prodi1_6, SUM(p.prodi2 = 1) AS prodi2_1, SUM(p.prodi2 = 2) AS prodi2_2, SUM(p.prodi2 = 3) AS prodi2_3, SUM(p.prodi2 = 4) AS prodi2_4, SUM(p.prodi2 = 5) AS prodi2_5, SUM(p.prodi2 = 6) AS prodi2_6 FROM pendaftaran p GROUP BY YEAR(created_at) ORDER BY tahun ASC")
                if (result.length === 0) {
                    return res.status(404).json({ message: "Data tidak ditemukan" });
                }
                res.status(200).json({ message:"Data berhasil didapat", body: result })
            } catch (error) {
                res.status(500).json({ message:"Data berhasil gagal didapat" })
            }
        }
    }
}

export default authenticateToken(handler)