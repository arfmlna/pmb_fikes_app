'use client'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import getYearOptions from '../method/ListTahun'
import Cookies from 'js-cookie'
import { Alert } from '../Alert'
import parseData from '../method/GetCookies'
import { useRouter, useSearchParams } from 'next/navigation'
import formatDateToYMD from '../method/YMD'
import Link from 'next/link'

export default function PendaftaranForm() {
    const [getCountry, setCountry] = useState([])
    const [getProdi, setProdi] = useState([])
    const [getTmpt, setTmpt] = useState({
        provinsi: [],
        kota: []
    })
    const [getDataPendaftaran, setDataPendaftaran] = useState([])
    
    const searchParams = useSearchParams()
    let id_seleksi = searchParams.get("id_seleksi");
    let nama_seleksi = searchParams.get("nama_seleksi")
    let id_prodi = searchParams.get("id_prodi")
    
    const [getInputDefault, setInputDefault] = useState({
        kewarganegaraan: 'Indonesia',
        provinsi: 'Jawa Barat',
        domisili: 'Kota Tasikmalaya',
        prodi1: id_prodi,
    })

    const ijazah = useRef(null);
    const skhu = useRef(null);
    const transkip = useRef(null);
    const transkipSebelumnya = useRef(null);
    const ktp = useRef(null);
    const kk = useRef(null);
    const pasFoto = useRef(null);
    const dokumenLain = useRef(null);

    const years = getYearOptions(2000);
    const tahun_sekarang = new Date().getFullYear()
    const router = useRouter();

    useEffect(() => {
        country()
        tmpt()
        prodi()
        getPendaftaran()
    }, [])
    
    const country = async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
            const filter = response.data.data
            setCountry(filter)
        } catch (error) {
            console.log(error)
        }
    }

    const tmpt = async () => {
        try {
            const provinsi = await axios.get(`https://alamat.thecloudalert.com/api/provinsi/get/`)
            const kabkota = await axios.get(`https://alamat.thecloudalert.com/api/kabkota/get`)
            setTmpt({
                provinsi : provinsi.data.result,
                kota: kabkota.data.result
            })
        } catch (error) {
            console.log(error)
        }
    }

    const prodi = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get('/api/prodi', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            setProdi(response.data.body)
        } catch (error) {
            console.log(error)
        }
    }

    const getPendaftaran = async () => {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/pendaftaran/${parseData.id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            withCredentials: true
        })

        setDataPendaftaran(response.data.body)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const form = new FormData(e.target)
        // seleksi
        const jalur = form.get('jalur')
        // informasi pribadi
        const fullname = form.get('fullname')
        const no_hp = form.get('no_hp')
        const tgl_lahir = form.get('tgl_lahir')
        const warganegara = form.get('warganegara')
        const fullname_parent = form.get('fullname_parent')
        const jenis_kelamin = form.get('jenis_kelamin')
        const email = form.get('email')
        const tmpt_lahir = form.get('tmpt_lahir')
        const nik = form.get('nik')
        const no_hp_ortu = form.get('no_hp_ortu')
        // asal sekolah
        const provinsi = form.get('provinsi')
        const jenis_sekolah = form.get('jenis_sekolah')
        const jurusan = form.get('jurusan')
        const kabkota = form.get('kabkota')
        const npsn = form.get('npsn')
        const tahun_lulus = form.get('tahun_lulus')
        // program studi
        const prodi1 = form.get('prodi1')
        const prodi2 = form.get('prodi2')

        const formData = new FormData();
        formData.append('ijazah', ijazah.current.files[0]);
        formData.append('skhu', skhu.current.files[0]);
        formData.append('transkip', transkip.current.files[0]);
        formData.append('transkipSebelumnya', transkipSebelumnya.current.files[0]);
        formData.append('ktp', ktp.current.files[0]);
        formData.append('kk', kk.current.files[0]);
        formData.append('pasFoto', pasFoto.current.files[0]);
        formData.append('dokumenLain', dokumenLain.current.files[0]);
        
        if (Array.isArray(getDataPendaftaran) && getDataPendaftaran.length > 0 ) {
            console.log('put')
            const id_pendaftaran = form.get('id_pendaftaran')
            const id_user = parseData.id
            try {
                await axios.put(`/api/pendaftaran/${id_pendaftaran}`, { id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 }, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                })
                if (ijazah.current.files[0] ||
                    skhu.current.files[0] ||
                    transkip.current.files[0] ||
                    transkipSebelumnya.current.files[0] ||
                    ktp.current.files[0] ||
                    kk.current.files[0] ||
                    pasFoto.current.files[0] ||
                    dokumenLain.current.files[0]
                ) {
                    getDataPendaftaran.map((data, i) => {
                        let fileFields = [
                            { ref: ijazah.current.files[0], old: data.ijazah },
                            { ref: skhu.current.files[0], old: data.skhu },
                            { ref: transkip.current.files[0], old: data.nilai_rapot },
                            { ref: transkipSebelumnya.current.files[0], old: data.sertifikat },
                            { ref: ktp.current.files[0], old: data.ktp },
                            { ref: kk.current.files[0], old: data.kk },
                            { ref: pasFoto.current.files[0], old: data.foto },
                            { ref: dokumenLain.current.files[0], old: data.dokumen_lain },
                        ].filter(item => item.ref);  
                            
                        fileFields.forEach(({ ref, old }, index) => {
                            const names = ['ijazah', 'skhu', 'transkip', 'transkipSebelumnya', 'ktp', 'kk', 'pasFoto', 'dokumenLain'];
                            const fieldName = names[index];
                            if (ref) {
                                formData.append(fieldName, ref);
                              if (old) {
                                formData.append(`old_${fieldName}`, old);
                              }
                            }
                        });
                    })
    
                    const resFile = await axios.put('/api/upload', formData, { 
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        },
                        withCredentials: true 
                    });
                    const result = resFile.data
                    console.log(result.fileUrl)
                    if (resFile.status !== 200) {
                        Alert("Info", 'Upload gagal: ', 'warning', "OK!");
                    } else {
                        const {
                            ijazahUrl,
                            skhuUrl,
                            transkipUrl,
                            transkipSebelumnyaUrl,
                            ktpUrl,
                            kkUrl,
                            pasFotoUrl,
                            dokumenLainUrl,
                        } = result.fileUrl;
                        
                        const payload = {
                            ...(ijazahUrl && { ijazahUrl }),
                            ...(skhuUrl && { skhuUrl }),
                            ...(transkipUrl && { transkipUrl }),
                            ...(transkipSebelumnyaUrl && { transkipSebelumnyaUrl }),
                            ...(ktpUrl && { ktpUrl }),
                            ...(kkUrl && { kkUrl }),
                            ...(pasFotoUrl && { pasFotoUrl }),
                            ...(dokumenLainUrl && { dokumenLainUrl }),
                        };
                        
    
                        await axios.put(`/api/file/${parseData.id}`, payload, { 
                            headers: {
                                'Authorization' : `Bearer ${token}`
                            },
                            withCredentials: true 
                        })
                        Alert("Info", 'Data berhasil disimpan : ', 'success', "OK!");
                        router.replace(`/konfirmasi-pendaftaran?id_pendaftaran=${id_pendaftaran}`)
                    }
                } else {
                    router.replace(`/konfirmasi-pendaftaran?id_pendaftaran=${id_pendaftaran}&id_seleksi=${id_seleksi}`)
                }
                Alert("Info", 'Data berhasil disimpan : ', 'success', "OK!");
            } catch (error) {
                console.error('Upload error:', error);
                Alert("Info", 'upload error', "warning", "OK!");
            }
        } else {
            console.log('push')
            try {
                const resData = await axios.post(`/api/pendaftaran/${parseData.id}`, { jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 }, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                })
                const resFile = await axios.post('/api/upload', formData, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
          
                const result = resFile.data;
                
                if (resFile.status !== 200) {
                  Alert("Info", 'Upload gagal: ', 'warning', "OK!");
                } else {
                    const ijazahUrl = result.fileUrl.ijazahUrl
                    const skhuUrl = result.fileUrl.skhuUrl
                    const transkipUrl = result.fileUrl.transkipUrl
                    const transkipSebelumnyaUrl = result.fileUrl.transkipSebelumnyaUrl
                    const ktpUrl = result.fileUrl.ktpUrl
                    const kkUrl = result.fileUrl.kkUrl
                    const pasFotoUrl = result.fileUrl.pasFotoUrl
                    const dokumenLainUrl = result.fileUrl.dokumenLainUrl
                    
                    const id_pendaftaran = resData.data.id_pendaftaran
                    const responseFile = await axios.post(`/api/file/${parseData.id}`, {id_pendaftaran, ijazahUrl, skhuUrl, transkipUrl, transkipSebelumnyaUrl, ktpUrl, kkUrl,pasFotoUrl, dokumenLainUrl}, { 
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        },
                        withCredentials: true 
                    })
                    Alert("Info", 'Data berhasil disimpan : ', 'success', "OK!");
                    router.replace(`/konfirmasi-pendaftaran?id_pendaftaran=${id_pendaftaran}&id_seleksi=${id_seleksi}`)
                }
            } catch (err) {
                console.error('Upload error:', err);
                Alert("Info", 'upload error', "warning", "OK!");
            }
        }


    }

    return (
        <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
            <div className='xl:max-w-7xl mx-auto w-full'>
                <form onSubmit={(e) => handleForm(e)}>
                    {Array.isArray(getDataPendaftaran) && getDataPendaftaran.length > 0 ?
                        getDataPendaftaran.map((data, i) => {
                        return(
                        <div key={i} className='flex flex-col justify-center p-4 gap-2 border bg-white border-gray-300 rounded-lg w-full'>
                            <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                                <h1 className="font-bold text-left md:text-xl lg:text-2xl w-full text-black">Formulir pendaftaran mahasiswa baru</h1>
                                <p className="text-base text-left text-black">Lengkapi data pendaftaran untuk melanjutkan ke tahap selanjutnya.</p>
                            </div>
                            <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                            <input required name='id_pendaftaran' hidden defaultValue={data.id_pendaftaran} className="text-sm text-gray-600 bg-transparent pointer-events-none"/>
                                <h1 className="font-bold text-left md:text-lg w-full text-black">Kamu memilih jalur pendaftaran</h1>
                                <div className="flex items-center justify-between border border-blue-900 rounded-lg bg-gray-100 p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="text-blue-800 text-xl">
                                        📘
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-900 font-bold uppercase">
                                                JALUR {data.nama_seleksi} {data.nama_prodi1}/{data.nama_prodi2}
                                            </p>
                                            <input required name='jalur' hidden defaultValue={data.id_seleksi} className="text-sm text-gray-600 bg-transparent pointer-events-none"/>
                                            <p className="text-sm text-gray-600 bg-transparent pointer-events-none">Reguler</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="/pendaftaran" className="text-blue-800 text-sm underline">Pindah Jalur</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-center gap-3 py-5'>
                                <h1 className="font-bold text-base md:text-lg text-left text-black">Lengkapi data dirimu sekarang!</h1>
                                <p className="text-base text-left text-black">Jangan sampai kehabisan kuota! Sedikit lagi kamu akan terdaftar di perguruan tinggi impianmu.</p>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Informasi Pribadi</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Nama Lengkap</label>
                                            <input required defaultValue={data.nama_lengkap} name='fullname' placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">No. HP</label>
                                            <input required defaultValue={data.no_hp} name='no_hp' placeholder='No. HP' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tanggal Lahir</label>
                                            <input required 
                                                value={formatDateToYMD(data.tgl_lahir)}
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                }}
                                                name='tgl_lahir'
                                                type="date" 
                                                className='w-full p-2 rounded-lg border border-gray-300'
                                                min="1998-01-01"
                                                max="2010-12-31"
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Kewarganegaraan</label>
                                            <select value={data.kewarganegaraan || ""} onChange={(e) =>{
                                                console.log("Kewarganegaraan dipilih:", e.target.value);
                                            }} name='warganegara' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Kewarganegaraan - -</option>
                                                {getCountry.map((data, i) => (
                                                    <option key={i} value={data.name}>{data.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Nama Orang Tua / Wali</label>
                                            <input required defaultValue={data.nama_ortu} name='fullname_parent' placeholder='Nama Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jenis Kelamin</label>
                                            <select value={data.jenis_kelamin} onChange={(e) => console.log(e.target.value)} name='jenis_kelamin' placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Jenis Kelamin - -</option>
                                                <option value="laki-laki">Laki-Laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Alamat Email</label>
                                            <input required defaultValue={data.email} name='email' placeholder='example@gmail.com' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tempat Lahir</label>
                                            <input required defaultValue={data.tmpt_lahir} name='tmpt_lahir' placeholder='ISI TEMPAT LAHIR ANDA' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">NIK / No. KTP</label>
                                            <input required defaultValue={data.nik_ktp} name='nik' placeholder='Isi NIK /No. KTP Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">No. HP Orang Tua / Wali</label>
                                            <input required defaultValue={data.no_hp_ortu} name='no_hp_ortu' placeholder='No. HP Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Asal Sekolah</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Provinsi</label>
                                            <select value={data.provinsi} onChange={(e) => console.log(e.target.value)} name='provinsi' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Provinsi - -</option>
                                                {getTmpt.provinsi.map((data, i) => (
                                                    <option key={i} value={data.text}>{data.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jenis Sekolah</label>
                                            <select defaultValue={data.jenis_sekolah} onChange={(e) => console.log(e.target.value)} name='jenis_sekolah' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Jenis Sekolah - -</option>
                                                <option value="SMA">SMA</option>
                                                <option value="SMK">SMK</option>
                                                <option value="MA">MA</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jurusan Sekolah</label>
                                            <input required defaultValue={data.jurusan_sekolah} name='jurusan' placeholder='Isi Jurusan Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Kabupaten / Kota</label>
                                            <select defaultValue={data.alamat_sekolah} onChange={(e) => console.log(e.target.value)} name='kabkota' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Kabupaten / Kota - -</option>
                                                {getTmpt.kota.map((data,i) => (

                                                    <option key={i} value={data.text}>{data.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">NPSN / Nama Sekolah</label>
                                            <input required name='npsn' defaultValue={data.nama_sekolah} placeholder='Isi NPSN / Nama Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tahun Lulus</label>
                                            <select value={data.tahun_lulus} onChange={(e) => console.log(e.target.value)} name='tahun_lulus' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Tahun Lulus - -</option>
                                                {years.map((year, i) => (
                                                    <option key={i} value={year.value}>{year.value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Data Akademik</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Ijazah SMA/SMK/MAN (.pdf)</label>
                                            <input ref={ijazah} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.ijazah && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.ijazah}`} target="_blank" className="text-blue-600 underline">Lihat Ijazah</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan SKHU / Nilai UN / Surat Keterangan Lulus (.pdf)</label>
                                            <input ref={skhu} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.skhu && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.skhu}`} target="_blank" className="text-blue-600 underline">Lihat SKHU</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Transkip Nilai / Daftar Nilai Rapor (.pdf)</label>
                                            <input ref={transkip} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.nilai_rapot && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.nilai_rapot}`} target="_blank" className="text-blue-600 underline">Lihat Nilai Rapot</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Sertifikat / Ijazah / Transkip Nilai dari Pendidikan Sebelumnya (.pdf)</label>
                                            <input ref={transkipSebelumnya} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.sertifikat && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.sertifikat}`} target="_blank" className="text-blue-600 underline">Lihat Sertifikat</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Dokumen Pendukung</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan KTP / Bukti Sedang Proses (.pdf)</label>
                                            <input ref={ktp} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.ktp && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.ktp}`} target="_blank" className="text-blue-600 underline">Lihat KTP</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Kartu Keluarga (KK) (.pdf)</label>
                                            <input ref={kk} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.kk && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.kk}`} target="_blank" className="text-blue-600 underline">Lihat KK</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Pas Foto Ukuran 3x4 cm</label>
                                            <input ref={pasFoto} type="file" accept="" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.foto && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.foto}`} target="_blank" className="text-blue-600 underline">Lihat Foto</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Dokumen Lain (Prestasi, Rekomendasi, dll) (.pdf)</label>
                                            <input ref={dokumenLain} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                            <div>
                                            {data.dokumen_lain && (
                                                <>
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        File : <a href={`api/filename/${data.dokumen_lain}`} target="_blank" className="text-blue-600 underline">Lihat Dokumen Lain</a>
                                                    </p>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Pilihan Program Studi</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Pilihan 1</label>
                                            <select value={data.prodi1} onChange={(e) => console.log(e.target.value)} name='prodi1' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Program Studi 1 - -</option>
                                                {getProdi.map((data, i) => (
                                                    <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Pilihan 2</label>
                                            <select value={data.prodi2} onChange={(e) => console.log(e.target.value)} name='prodi2' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Program Studi 2 - -</option>
                                                {getProdi.map((data, i) => (
                                                    <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end w-full border-t border-t-gray-300 pt-5 mt-5'>
                                <button className='flex items-center group gap-2 bg-blue-900 px-6 py-3 rounded-lg text-white'>
                                    <p>Konfirmasi Pendaftaran</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                                </button>
                            </div>
                        </div>
                        )
                    }):(
                        <div className='flex flex-col justify-center p-4 gap-2 border bg-white border-gray-300 rounded-lg w-full'>
                            <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                                <h1 className="font-bold text-left md:text-xl lg:text-2xl w-full text-black">Formulir pendaftaran mahasiswa baru</h1>
                                <p className="text-base text-left text-black">Lengkapi data pendaftaran untuk melanjutkan ke tahap selanjutnya.</p>
                            </div>
                            <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                                <h1 className="font-bold text-left md:text-lg w-full text-black">Kamu memilih jalur pendaftaran</h1>
                                <div className="flex items-center justify-between border border-blue-900 rounded-lg bg-gray-100 p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="text-blue-800 text-xl">
                                        📘
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-900 font-bold uppercase">
                                                JALUR {nama_seleksi}
                                            </p>
                                            <input required name='jalur' hidden defaultValue={id_seleksi} className="text-sm text-gray-600 bg-transparent pointer-events-none"/>
                                            <p className="text-sm text-gray-600 bg-transparent pointer-events-none">Reguler</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="/pendaftaran" className="text-blue-800 text-sm underline">Pindah Jalur</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-center gap-3 py-5'>
                                <h1 className="font-bold text-base md:text-lg text-left text-black">Lengkapi data dirimu sekarang!</h1>
                                <p className="text-base text-left text-black">Jangan sampai kehabisan kuota! Sedikit lagi kamu akan terdaftar di perguruan tinggi impianmu.</p>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Informasi Pribadi</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Nama Lengkap</label>
                                            <input defaultValue={parseData?.name || ''} required name='fullname' placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">No. HP</label>
                                            <input required name='no_hp' placeholder='No. HP' maxLength={12} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tanggal Lahir</label>
                                            <input required 
                                                name='tgl_lahir'
                                                type="date" 
                                                className='w-full p-2 rounded-lg border border-gray-300'
                                                min="1998-01-01"
                                                max="2010-12-31"
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Kewarganegaraan</label>
                                            <select value={getInputDefault.kewarganegaraan} onChange={(e) => setInputDefault({
                                                kewarganegaraan: e.target.value
                                            })} name='warganegara' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Kewarganegaraan - -</option>
                                                {getCountry.map((data, i) => (
                                                    <option key={i} value={data.name}>{data.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Nama Orang Tua / Wali</label>
                                            <input required name='fullname_parent' placeholder='Nama Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jenis Kelamin</label>
                                            <select name='jenis_kelamin' placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Jenis Kelamin - -</option>
                                                <option value="laki-laki">Laki-Laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Alamat Email</label>
                                            <input defaultValue={parseData?.email || ''} required name='email' placeholder='example@gmail.com' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tempat Lahir</label>
                                            <input required defaultValue={'Tasikmalaya'} name='tmpt_lahir' placeholder='ISI TEMPAT LAHIR ANDA' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">NIK / No. KTP</label>
                                            <input maxLength={16} required name='nik' placeholder='Isi NIK /No. KTP Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">No. HP Orang Tua / Wali</label>
                                            <input maxLength={12} required name='no_hp_ortu' placeholder='No. HP Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Asal Sekolah</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Provinsi</label>
                                            <select value={getInputDefault.provinsi} onChange={(e) => setInputDefault({
                                                provinsi: e.target.value
                                            })} name='provinsi' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Provinsi - -</option>
                                                {getTmpt.provinsi.map((data, i) => (
                                                    <option key={i} value={data.text}>{data.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jenis Sekolah</label>
                                            <select defaultValue={'SMA'} onChange={(e) => e.target.value} name='jenis_sekolah' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Jenis Sekolah - -</option>
                                                <option value="SMA">SMA</option>
                                                <option value="SMK">SMK</option>
                                                <option value="MA">MA</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Jurusan Sekolah</label>
                                            <input required name='jurusan' placeholder='Isi Jurusan Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Kabupaten / Kota</label>
                                            <select value={getInputDefault.domisili} onChange={(e) => setInputDefault({
                                                domisili: e.target.value
                                            })} name='kabkota' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Kabupaten / Kota - -</option>
                                                {getTmpt.kota.map((data,i) => (
                                                    <option key={i} value={data.text}>{data.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">NPSN / Nama Sekolah</label>
                                            <input maxLength={8} required name='npsn' placeholder='Isi NPSN / Nama Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Tahun Lulus</label>
                                            <select defaultValue={tahun_sekarang} onChange={(e) => e.target.value} name='tahun_lulus' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Tahun Lulus - -</option>
                                                {years.map((year, i) => (
                                                    <option key={i} value={year.value}>{year.value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Data Akademik</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Ijazah SMA/SMK/MAN (.pdf)</label>
                                            <input ref={ijazah} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan SKHU / Nilai UN / Surat Keterangan Lulus (.pdf)</label>
                                            <input ref={skhu} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Transkip Nilai / Daftar Nilai Rapor (.pdf)</label>
                                            <input ref={transkip} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Sertifikat / Ijazah / Transkip Nilai dari Pendidikan Sebelumnya (.pdf)</label>
                                            <input ref={transkipSebelumnya} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Dokumen Pendukung</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan KTP / Bukti Sedang Proses (.pdf)</label>
                                            <input ref={ktp} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Scan Kartu Keluarga (KK) (.pdf)</label>
                                            <input ref={kk} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Pas Foto Ukuran 3x4 cm</label>
                                            <input ref={pasFoto} type="file" accept=".png,.jpg,.jpeg" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-black'>Dokumen Lain (Prestasi, Rekomendasi, dll) (.pdf)</label>
                                            <input ref={dokumenLain} type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Pilihan Program Studi</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>

                                            <label className="text-base text-left text-black">Pilihan 1</label>
                                            <select value={id_prodi} onChange={(e) => setInputDefault({
                                                prodi1: e.target.value
                                            })} name='prodi1'>
                                                <option defaultValue=''>- - Pilih Program Studi 1 - -</option>
                                                {getProdi.map((data, i) => (
                                                    <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-black">Pilihan 2</label>
                                            <select name='prodi2' className='w-full p-2 rounded-lg border border-gray-300'>
                                                <option value="">- - Pilih Program Studi 2 - -</option>
                                                {getProdi.map((data, i) => (
                                                    <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end w-full border-t border-t-gray-300 pt-5 mt-5'>
                                <button className='flex items-center group gap-2 bg-blue-900 px-6 py-3 rounded-lg text-white'>
                                    <p>Konfirmasi Pendaftaran</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}
