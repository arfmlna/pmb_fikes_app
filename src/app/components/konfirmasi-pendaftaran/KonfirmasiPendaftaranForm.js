import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export default function KonfirmasiPendaftaranForm() {
  return (
    <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
        <div className='xl:max-w-7xl mx-auto w-full'>
            <div className='flex flex-col justify-center p-4 gap-2 border bg-blue-900 border-gray-300 rounded-lg w-full'>
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
                                <p className="text-sm text-black font-bold">
                                    JALUR PESANTREN – <span>JALUR PESANTREN Seleksi</span>
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
                                <p className="text-base text-left text-white font-bold">Muhamamd Iqbal Alghifari</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">No. HP : </label>
                                <p className="text-base text-left text-white font-bold">085795635990</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Tanggal Lahir : </label>
                                <p className="text-base text-left text-white font-bold">14 April 2004</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Kewarganegaraan : </label>
                                <p className="text-base text-left text-white font-bold">Indonesia</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Nama Orang Tua / Wali : </label>
                                <p className="text-base text-left text-white font-bold">Asep Brigez</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Jenis Kelamin : </label>
                                <p className="text-base text-left text-white font-bold">Pria</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Alamat Email : </label>
                                <p className="text-base text-left text-white font-bold">iqbal@gmail.com</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Tempat Lahir : </label>
                                <p className="text-base text-left text-white font-bold">Tasikmnalaya</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">NIK / No. KTP : </label>
                                <p className="text-base text-left text-white font-bold">8921378917412421</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">No. HP Orang Tua / Wali : </label>
                                <p className="text-base text-left text-white font-bold">0982340932xxxx</p>
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
                                    <p className="text-base text-left text-white font-bold">Jawa Barat</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className="text-base text-left text-white">Jenis Sekolah : </label>
                                    <p className="text-base text-left text-white font-bold">SMK</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className="text-base text-left text-white">Jurusan Sekolah : </label>
                                    <p className="text-base text-left text-white font-bold">Teknik Komputer Jaringan</p>
                                </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Kabupaten / Kota : </label>
                                <p className="text-base text-left text-white font-bold">Kota Tasikmalaya</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">NPSN / Nama Sekolah : </label>
                                <p className="text-base text-left text-white font-bold">SMKN 2 Tasikmalaya</p>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-white">Tahun Lulus : </label>
                                <p className="text-base text-left text-white font-bold">2022</p>
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
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Scan SKHU / Nilai UN / Surat Keterangan Lulus (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Scan Transkip Nilai / Daftar Nilai Rapor (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Sertifikat / Ijazah / Transkip Nilai dari Pendidikan Sebelumnya (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
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
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Scan Kartu Keluarga (KK) (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Pas Foto Ukuran 3x4 cm (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className='text-white'>Dokumen Lain (Prestasi, Rekomendasi, dll) (.pdf) : </label>
                                    <p className="text-base text-left text-white font-bold">file.pdf</p>
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
                                    <p className="text-base text-left text-white font-bold">S1 Ilmu Keperawatan</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <label className="text-base text-left text-white">Pilihan 2 : </label>
                                    <p className="text-base text-left text-white font-bold">S1 Ilmu Kebidanan</p>
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
                            <button className='flex items-center group gap-2 bg-white px-6 py-3 rounded-lg text-black'>
                                <BsArrowLeft className='group-hover:-translate-x-1 transition-all ease-out'/><p>Ubah Data</p>
                            </button>
                            <button className='flex items-center group gap-2 bg-white px-6 py-3 rounded-lg text-black'>
                                <p>Daftar Sekarang</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}
