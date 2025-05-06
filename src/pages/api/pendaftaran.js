import connect from "../connect";
import authenticateToken from "./auth";

async function handler(req, res){
    if(req.method === 'GET'){
        try {
            
            const [result] = await connect.query(`
            SELECT pendaftaran.*, prodi1.nama_prodi AS nama_prodi1, prodi2.nama_prodi AS nama_prodi2, seleksi.nama_seleksi, dokumen_pendaftaran.* FROM pendaftaran JOIN prodi AS prodi1 ON pendaftaran.prodi1 = prodi1.id_prodi LEFT JOIN prodi AS prodi2 ON pendaftaran.prodi2 = prodi2.id_prodi LEFT JOIN seleksi ON pendaftaran.id_seleksi = seleksi.id_seleksi LEFT JOIN dokumen_pendaftaran ON dokumen_pendaftaran.user_id = pendaftaran.id_user`);

            res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message:"Gagal ditambahkan" })
        }
    } 
    // else if (req.method === 'POST') {
    //     const { id, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 } = req.body;
    //     try {
            
    //         const [result] = await connect.query('INSERT INTO pendaftaran(id_user, id_seleksi, nama_lengkap, no_hp, tgl_lahir, kewarganegaraan, nama_ortu, jenis_kelamin, email, tmpt_lahir, nik_ktp, no_hp_ortu, provinsi, jenis_sekolah, jurusan_sekolah, alamat_sekolah, nama_sekolah, tahun_lulus, prodi1, prodi2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2]);

    //         res.status(201).json({ message: 'Berhasil ditambahkan!', body: result});
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({ message:"Gagal ditambahkan" })
    //     }
    // }
}

export default authenticateToken(handler)