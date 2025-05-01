import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

export default function PendaftaranForm() {
  return (
    <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
        <div className='xl:max-w-7xl mx-auto w-full'>
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
                                <p className="text-sm text-blue-900 font-bold">
                                    JALUR PESANTREN – <span>JALUR PESANTREN Seleksi</span>
                                </p>
                                <p className="text-sm text-gray-600">Reguler</p>
                            </div>
                        </div>
                        <div>
                            <a href="#" className="text-blue-800 text-sm underline">Pindah Jalur</a>
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
                                <input placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">No. HP</label>
                                <input placeholder='No. HP' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Tanggal Lahir</label>
                                <input 
                                    type="date" 
                                    className='w-full p-2 rounded-lg border border-gray-300'
                                    min="1998-01-01"
                                    max="2010-12-31"
                                />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Kewarganegaraan</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Kewarganegaraan - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Nama Orang Tua / Wali</label>
                                <input placeholder='Nama Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Jenis Kelamin</label>
                                <input placeholder='Nama lengkap' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Alamat Email</label>
                                <input placeholder='example@gmail.com' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Tempat Lahir</label>
                                <input placeholder='ISI TEMPAT LAHIR ANDA' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">NIK / No. KTP</label>
                                <input placeholder='Isi NIK /No. KTP Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">No. HP Orang Tua / Wali</label>
                                <input placeholder='No. HP Orang Tua / Wali' className='w-full p-2 rounded-lg border border-gray-300'/>
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
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Provinsi - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Jenis Sekolah</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Jenis Sekolah - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Jurusan Sekolah</label>
                                <input placeholder='Isi Jurusan Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Kabupaten / Kota</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Kabupaten / Kota - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">NPSN / Nama Sekolah</label>
                                <input placeholder='Isi NPSN / Nama Sekolah Anda' className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Tahun Lulus</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Tahun Lulus - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
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
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Scan SKHU / Nilai UN / Surat Keterangan Lulus (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Scan Transkip Nilai / Daftar Nilai Rapor (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Sertifikat / Ijazah / Transkip Nilai dari Pendidikan Sebelumnya (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
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
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Scan Kartu Keluarga (KK) (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Pas Foto Ukuran 3x4 cm (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Dokumen Lain (Prestasi, Rekomendasi, dll) (.pdf)</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
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
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Provinsi - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Pilihan 2</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Kabupaten / Kota - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
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
        </div>
    </section>
  )
}
