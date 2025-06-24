import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

export default function PendaftaranForm() {
  return (
    <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
        <div className='xl:max-w-7xl mx-auto w-full'>
            <div className='flex flex-col justify-center p-4 gap-2 border bg-white border-gray-300 rounded-lg w-full'>
                <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                    <h1 className="font-bold text-left md:text-xl lg:text-2xl w-full text-black">Informasi dokumen pendaftaran</h1>
                </div>
                <div className='flex flex-col w-full justify-center gap-3 py-5'>
                    <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Nama Lengkap</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">NIM</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Tanggal Daftar</label>
                                <input 
                                    type="date" 
                                    className='w-full p-2 rounded-lg border border-gray-300'
                                    min="1998-01-01"
                                    max="2010-12-31"
                                />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Asal Sekolah</label>
                                <select className='w-full p-2 rounded-lg border border-gray-300'>
                                    <option value="">- - Pilih Kewarganegaraan - -</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Malaysia">Malaysia</option>
                                </select>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Nama Orang Tua / Wali</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">ID Pendaftar</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Tanggal Daftar</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Jalur Pendaftaran</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Periode</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className="text-base text-left text-black">Sistem Kuliah</label>
                                <input className='w-full p-2 rounded-lg border border-gray-300'/>
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
                    <div className='flex justify-start py-5 items-center gap-5 w-full'>
                        <h1 className="flex-shrink-0 text-base md:text-lg text-left text-black">Program Studi Diterima : <span>D1 Keperawatan</span></h1>
                    </div>
                    <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Kartu keluarga (.pdf) : status</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Surat Ijazah/Keterangan lulus (.pdf) : status</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Scan KTP/Akta Kelahiran (.pdf) : status</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                <label className='text-black'>Transkrip Nilai (.pdf) : status</label>
                                <input type="file" accept=".pdf" className='w-full p-2 rounded-lg border border-gray-300' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end w-full border-t border-t-gray-300 pt-5 mt-5 gap-x-4'>
                    <button className='flex items-center group gap-2 bg-red-500 px-6 py-3 rounded-lg text-white'>
                        <p>Mengundurkan diri</p>
                    </button>
                    <button className='flex items-center group gap-2 bg-blue-900 px-6 py-3 rounded-lg text-white'>
                        <p>Daftar Ulang</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}