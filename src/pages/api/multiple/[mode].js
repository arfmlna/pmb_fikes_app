import connect from "../../../lib/connect"
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    const {mode} = req.query
    let date = new Date()
    let now = `${date.toISOString().split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    if (req.method === 'POST') {
        if (mode === 'register') {
            const users = req.body;
    
            if (!Array.isArray(users)) {
                return res.status(400).json({ message: 'Data harus berupa array user.' });
            }
        
            try {
                const insertResults = [];
        
                for (const user of users) {
                    const { name, email, password, role = 'users' } = user;
        
                    const [existingUser] = await connect.query('SELECT * FROM users WHERE email = ?', [email]);
                    if (existingUser.length > 0) {
                        insertResults.push({ email, status: 'gagal', reason: 'Email sudah digunakan' });
                        continue;
                    }
        
                    const [maxResultID] = await connect.query('SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM users');
                    const lastId = maxResultID[0]?.max_id || 0;
                    const newIdNumber = lastId + 1;
                    const paddedId = String(newIdNumber).padStart(6, "0");
                    const newId = `FKS${paddedId}`;
        
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await connect.query(
                        'INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [newId, name, email, hashedPassword, role, now, now]
                    );
        
                    insertResults.push({ email, status: 'sukses' });
                }
        
                res.status(201).json({ message: 'Batch insert selesai', hasil: insertResults });
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Terjadi kesalahan saat batch insert user.' });
            }
        } else if(mode === 'pendaftaran'){
            const data = req.body;
            // Cek apakah input berupa array
            if (!Array.isArray(data)) {
                return res.status(400).json({ message: 'Data harus berupa array pendaftaran.' });
            }

            try {
                const hasil = [];

                for (const item of data) {
                    const {
                        id_user, id_seleksi, nama_lengkap, no_hp, tgl_lahir, kewarganegaraan, nama_ortu,
                        jenis_kelamin, email, tmpt_lahir, nik_ktp, no_hp_ortu, provinsi, jenis_sekolah,
                        jurusan_sekolah, alamat_sekolah, nama_sekolah, tahun_lulus, prodi1, prodi2
                    } = item;

                    const [result] = await connect.query(`
                        INSERT INTO pendaftaran (
                            id_user, id_seleksi, nama_lengkap, no_hp, tgl_lahir, kewarganegaraan,
                            nama_ortu, jenis_kelamin, email, tmpt_lahir, nik_ktp, no_hp_ortu,
                            provinsi, jenis_sekolah, jurusan_sekolah, alamat_sekolah,
                            nama_sekolah, tahun_lulus, prodi1, prodi2
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, [
                        id_user, id_seleksi, nama_lengkap, no_hp, tgl_lahir, kewarganegaraan, nama_ortu,
                        jenis_kelamin, email, tmpt_lahir, nik_ktp, no_hp_ortu, provinsi, jenis_sekolah,
                        jurusan_sekolah, alamat_sekolah, nama_sekolah, tahun_lulus, prodi1, prodi2
                    ]);

                    hasil.push({
                        id_pendaftaran: result.insertId,
                        status: 'sukses',
                        email
                    });
                }

                res.status(201).json({ message: 'Semua pendaftaran berhasil', hasil });

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Gagal menyimpan data pendaftaran.' });
            }
        } else if(mode === 'dokumen-pendaftaran'){
            const documents = req.body; // expects an array of objects
            if (!Array.isArray(documents) || documents.length === 0) {
                return res.status(400).json({ message: 'Data dokumen tidak boleh kosong dan harus dalam bentuk array.' });
            }

            const values = documents.map(doc => [
                doc.user_id,
                doc.id_pendaftaran,
                doc.ijazahUrl,
                doc.skhuUrl,
                doc.transkipUrl,
                doc.transkipSebelumnyaUrl,
                doc.ktpUrl,
                doc.kkUrl,
                doc.pasFotoUrl,
                doc.dokumenLainUrl
            ]);

            const placeholders = values.map(() => '(?,?,?,?,?,?,?,?,?,?)').join(',');

            const sql = `
                INSERT INTO dokumen_pendaftaran
                (user_id, id_pendaftaran, ijazah, skhu, nilai_rapot, sertifikat, ktp, kk, foto, dokumen_lain)
                VALUES ${placeholders}
            `;

            const flatValues = values.flat();

            try {
                const [result] = await connect.query(sql, flatValues);
                res.status(201).json({ message: 'Semua dokumen berhasil ditambahkan!', data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: `Gagal menambahkan dokumen: ${error.message}` });
            }
        } else if(mode === 'pembayaran'){
            const data = req.body;

            if (!Array.isArray(data)) {
                return res.status(400).json({ message: 'Data harus berupa array!' });
            }

            const values = data.map(item => [
                item.id_pendaftaran,
                item.user_id,
                item.total,
                item.bukti_pembayaran
            ]);

            try {
                const [result] = await connect.query(
                    'INSERT INTO pembayaran (id_pendaftaran, user_id, total, bukti_pembayaran) VALUES ?',
                    [values]
                );

                // Update konfirmasi untuk semua user_id yang dikirim
                const userIds = [...new Set(data.map(item => item.user_id))];
                await Promise.all(
                    userIds.map(uid =>
                        connect.query('UPDATE pendaftaran SET konfirmasi = 1 WHERE id_user = ?', [uid])
                    )
                );

                res.status(201).json({ message: 'Berhasil menambahkan data pembayaran!', inserted: result.affectedRows });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Gagal menambahkan data pembayaran', error: error.message });
            }

        }
    }
}