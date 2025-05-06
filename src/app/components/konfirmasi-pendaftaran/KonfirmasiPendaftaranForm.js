'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import parseData from '../method/GetCookies'
import Cookies from 'js-cookie'
import tgl from '../method/formatTgl'
import { useRouter } from 'next/navigation'

export default function KonfirmasiPendaftaranForm() {
    const [getDataPendaftaran, setDataPendaftaran] = useState([])

    const router = useRouter()

    useEffect(() => {
        getPendaftaran()
    }, [])

    const getPendaftaran = async () => {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/pendaftaran/${parseData.id}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            withCredentials: true
        })

        setDataPendaftaran(response.data.body)
    }

    return (
        <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
            <div className='xl:max-w-7xl mx-auto w-full'>
                {getDataPendaftaran.map((data, i) => {
                    return(
                    <div key={i} className='flex flex-col justify-center p-4 gap-2 border bg-blue-900 border-gray-300 rounded-lg w-full'>
                        <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                            <h1 className="font-bold text-left md:text-xl lg:text-2xl w-full text-white">Konfirmasi formulir pendaftaran mahasiswa baru</h1>
                            <p className="text-base text-left text-white">Konfirmasi formulir pendaftaran yang telah anda isi sebelumnya untuk menghindari kesalahan memasukkan data.</p>
                        </div>
                        <div className='flex flex-col justify-center gap-3'>
                            <h1 className="font-bold text-left md:text-lg w-full text-white">Kamu memilih jalur pendaftaran</h1>
                            <div className="flex items-center justify-between border rounded-lg bg-gray-100 p-4">
                                <div className="flex items-start gap-4">
                                    <div className="text-black text-xl">
                                    📘
                                    </div>
                                    <div>
                                        <p className="text-sm text-black font-bold uppercase">
                                            Jalur {data.nama_seleksi} {data.nama_prodi1}
                                        </p>
                                        <p className="text-sm text-black">Reguler</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full justify-center gap-3 py-5'>
                            <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-white">Informasi Pribadi</h1>
                                <hr className='bg-gray-300 w-full h-0.5'/>
                            </div>
                            <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Nama Lengkap : </label>
                                        <p className="text-base text-left text-white font-bold">{data.nama_lengkap}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">No. HP : </label>
                                        <p className="text-base text-left text-white font-bold">{data.no_hp}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Tanggal Lahir : </label>
                                        <p className="text-base text-left text-white font-bold">{tgl(data.tgl_lahir)}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Kewarganegaraan : </label>
                                        <p className="text-base text-left text-white font-bold">{data.kewarganegaraan}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Nama Orang Tua / Wali : </label>
                                        <p className="text-base text-left text-white font-bold">{data.nama_ortu}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-3 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Jenis Kelamin : </label>
                                        <p className="text-base text-left text-white font-bold">{data.jenis_kelamin}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Alamat Email : </label>
                                        <p className="text-base text-left text-white font-bold">{data.email}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Tempat Lahir : </label>
                                        <p className="text-base text-left text-white font-bold">{data.tmpt_lahir}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">NIK / No. KTP : </label>
                                        <p className="text-base text-left text-white font-bold">{data.nik_ktp}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">No. HP Orang Tua / Wali : </label>
                                        <p className="text-base text-left text-white font-bold">{data.no_hp_ortu}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-white">Asal Sekolah</h1>
                                <hr className='bg-gray-300 w-full h-0.5'/>
                            </div>
                            <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-white">Provinsi : </label>
                                            <p className="text-base text-left text-white font-bold">{data.provinsi}</p>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-white">Jenis Sekolah : </label>
                                            <p className="text-base text-left text-white font-bold">{data.jenis_sekolah}</p>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-white">Jurusan Sekolah : </label>
                                            <p className="text-base text-left text-white font-bold">{data.jurusan_sekolah}</p>
                                        </div>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Kabupaten / Kota : </label>
                                        <p className="text-base text-left text-white font-bold">{data.alamat_sekolah}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">NPSN / Nama Sekolah : </label>
                                        <p className="text-base text-left text-white font-bold">{data.nama_sekolah}</p>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-white">Tahun Lulus : </label>
                                        <p className="text-base text-left text-white font-bold">{data.tahun_lulus}</p>
                                    </div>
                                </div>
                            </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-white">Data Akademik</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Scan Ijazah SMA/SMK/MAN (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.ijazah} target="_blank" className="text-blue-600 underline">Lihat Ijazah</a>
                                            </p>
                                        </div>  
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Scan SKHU / Nilai UN / Surat Keterangan Lulus (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.skhu} target="_blank" className="text-blue-600 underline">Lihat SKHU</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Scan Transkip Nilai / Daftar Nilai Rapor (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.nilai_rapot} target="_blank" className="text-blue-600 underline">Lihat Nilai Rapot</a>
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Sertifikat / Ijazah / Transkip Nilai dari Pendidikan Sebelumnya (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.sertifikat} target="_blank" className="text-blue-600 underline">Lihat Sertifikat</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-white">Dokumen Pendukung</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Scan KTP / Bukti Sedang Proses (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.ktp} target="_blank" className="text-blue-600 underline">Lihat KTP</a>
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Scan Kartu Keluarga (KK) (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.kk} target="_blank" className="text-blue-600 underline">Lihat KK</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Pas Foto Ukuran 3x4 cm (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.foto} target="_blank" className="text-blue-600 underline">Lihat foto</a>
                                            </p>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className='text-white'>Dokumen Lain (Prestasi, Rekomendasi, dll) (.pdf) : </label>
                                            <p className="text-sm text-white mb-1">
                                                File : <a href={data.skhu} target="_blank" className="text-blue-600 underline">Lihat Dokumen Lain</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                    <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-white">Pilihan Program Studi</h1>
                                    <hr className='bg-gray-300 w-full h-0.5'/>
                                </div>
                                <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                    <div className='flex flex-col justify-center gap-3 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-white">Pilihan 1 : </label>
                                            <p className="text-base text-left text-white font-bold">{data.nama_prodi1}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <div className='flex flex-col justify-center gap-2 w-full'>
                                            <label className="text-base text-left text-white">Pilihan 2 : </label>
                                            <p className="text-base text-left text-white font-bold">{data.nama_prodi2}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full border-t border-t-gray-300 gap-3 pt-5  mt-5'>
                                <div className='flex justify-start items-center gap-3 w-full'>
                                    <input type='checkbox'/>
                                    <p className="text-base flex-shrink-0 text-left text-white">Saya menyetujui bahwa data yang telah dimasukkan adalah Benar dan dapat dipertanggungjawabkan.</p>
                                </div>
                                <div className='flex justify-end gap-3 w-full'>
                                    <button className='flex items-center group gap-2 bg-white px-6 py-3 rounded-lg text-black' onClick={() => {
                                        router.back()
                                    }}>
                                        <BsArrowLeft className='group-hover:-translate-x-1 transition-all ease-out'/><p>Ubah Data</p>
                                    </button>
                                    <button className='flex items-center group gap-2 bg-white px-6 py-3 rounded-lg text-black' onClick={() => {
                                        router.replace('/pembayaran')
                                    }}>
                                        <p>Daftar Sekarang</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                                    </button>
                                </div>
                            </div>
                    </div>
                    )
                })}
            </div>
        </section>
    )
}
