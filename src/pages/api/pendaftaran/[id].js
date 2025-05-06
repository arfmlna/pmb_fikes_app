import connect from "@/pages/connect";
import authenticateToken from "../auth";

async function handler(req, res){
    const {id} = req.query
    if(req.method === 'GET'){
        try {
            
            const [result] = await connect.query(`
                SELECT pendaftaran.*, prodi1.nama_prodi AS nama_prodi1, prodi2.nama_prodi AS nama_prodi2, seleksi.nama_seleksi, dokumen_pendaftaran.* FROM pendaftaran JOIN prodi AS prodi1 ON pendaftaran.prodi1 = prodi1.id_prodi LEFT JOIN prodi AS prodi2 ON pendaftaran.prodi2 = prodi2.id_prodi LEFT JOIN seleksi ON pendaftaran.id_seleksi = seleksi.id_seleksi LEFT JOIN dokumen_pendaftaran ON dokumen_pendaftaran.user_id = pendaftaran.id_user WHERE pendaftaran.id_user = ?
                `, [id]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if (req.method === 'POST') {
        const { jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 } = req.body;
        
        try {
            
            const [result] = await connect.query('INSERT INTO pendaftaran(id_user, id_seleksi, nama_lengkap, no_hp, tgl_lahir, kewarganegaraan, nama_ortu, jenis_kelamin, email, tmpt_lahir, nik_ktp, no_hp_ortu, provinsi, jenis_sekolah, jurusan_sekolah, alamat_sekolah, nama_sekolah, tahun_lulus, prodi1, prodi2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if (req.method === 'PUT'){
        const { id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 } = req.body;
        
        try {
            
            const [result] = await connect.query("UPDATE pendaftaran SET id_user=?, id_seleksi=?,nama_lengkap=?,no_hp=?,tgl_lahir=?,kewarganegaraan=?,nama_ortu=?,jenis_kelamin=?,email=?,tmpt_lahir=?,nik_ktp=?,no_hp_ortu=?,provinsi=?,jenis_sekolah=?,jurusan_sekolah=?,alamat_sekolah=?,nama_sekolah=?,tahun_lulus=?,prodi1=?,prodi2=? WHERE id_pendaftaran=?", [id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2, id]);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } else if(req.method === 'DELETE'){
    if (!id) {
        return res.status(400).json({ message: 'ID diperlukan untuk menghapus data' });
    }
    try {
        const [result] = await connect.query('DELETE FROM pendaftaran WHERE id = ?', [id])
        res.status(200).json({ massage: "Data berhasil dihapus", data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:"Pengguna gagal dihapus" })
    }
    } else {
        res.status(405).end(`Metode ${req.method} tidak diizinkan.`);
    }
}

export default authenticateToken(handler)