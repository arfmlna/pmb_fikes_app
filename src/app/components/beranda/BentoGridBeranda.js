import React from 'react'
import { AiFillBank } from "react-icons/ai";
import { FaHandshake, FaUserGraduate } from "react-icons/fa";
import { IoIosBook } from "react-icons/io";

export default function BentoGridBeranda() {
  return (
    <section className='flex justify-center items-center w-full h-full'>
        <div className='xl:max-w-7xl w-full px-4 py-4 md:py-10 flex flex-col md:gap-6 gap-3 items-start md:px-10'>
        <h1 className='text-xl md:text-2xl font-bold text-black text-left'>Mengapa Memilih Fakultas Ilmu Kesehatan?</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:grid-rows-2 grid-rows-1 gap-3 w-full h-full text-white'>
                <div className='w-full h-full group lg:col-span-3 md:col-span-2 col-span-1 rounded-lg relative overflow-hidden'>
                    <img src='/labskill.jpg' className='w-full h-full group-hover:scale-105 brightness-[.2] group-hover:brightness-[.4] transition-all duration-150 ease-out absolute object-cover object-center'/>
                    <article className='flex p-4 flex-col justify-start gap-y-3 relative z-10'>
                        <div className='flex flex-col justify-start items-start gap-y-1.5'>
                            <AiFillBank className='size-10 md:size-16'/>
                            <h1 className='text-xl md:text-2xl font-bold'>Fasilitas Lengkap</h1>
                        </div>
                        <p className='text-base text-left'>Fakultas Ilmu Kesehatan UMTAS memiliki banyak fasilitas untuk menunjang perkuliahan, diantaranya ada Computer Based Test (CBT), Perpustakaan, Laboraturium Komputer, Laboraturim Skill, dan lain sebagainya</p>
                    </article>
                </div>
                <div className='w-full h-full group col-span-1 rounded-lg relative overflow-hidden'>
                    <img src='/CBT.jpg' className='w-full h-full group-hover:scale-105 brightness-[.2] group-hover:brightness-[.4] transition-all duration-150 ease-out absolute object-cover object-center'/>
                    <article className='flex flex-col justify-start gap-y-3 relative z-10 p-4'>
                        <div className='flex flex-col justify-start items-start gap-y-1.5'>
                            <FaUserGraduate className='size-10 md:size-16'/>
                            <h1 className='text-xl md:text-2xl font-bold'>Dosen Terampil</h1>
                        </div>
                        <p className='text-base text-left'>Fakultas Ilmu Kesehatan UMTAS memiliki banyak Dosen-Dosen terampil yang siap membantu mahasiswa mencapai cita-citanya dalam bidang kesehatan</p>
                    </article>
                </div>
                <div className='w-full h-full group col-span-1 rounded-lg relative overflow-hidden'>
                    <img src='/aula.jpg' className='w-full h-full group-hover:scale-105 brightness-[.2] group-hover:brightness-[.4] transition-all duration-150 ease-out absolute object-cover object-center'/>
                    <article className='flex flex-col justify-start gap-y-3 relative z-10 p-4'>
                        <div className='flex flex-col justify-start items-start gap-y-1.5'>
                            <IoIosBook className='size-10 md:size-16'/>
                            <h1 className='text-xl md:text-2xl font-bold'>Kurikulum</h1>
                        </div>
                        <p className='text-base text-left'>Fakultas Ilmu Kesehatan UMTAS memiliki kurikulum yang sesuai dengan perkembangan zaman sehingga dapat menghasilkan tenaga kesehatan yang islami dan kompeten</p>
                    </article>
                </div>
                <div className='w-full h-full group lg:col-span-3 md:col-span-2 col-span-1 rounded-lg relative overflow-hidden'>
                    <img src='/perpustakaan.jpg' className='w-full h-full group-hover:scale-105 brightness-[.2] group-hover:brightness-[.4] transition-all duration-150 ease-out absolute object-cover object-center'/>
                    <article className='flex p-4 flex-col justify-start gap-y-3 relative z-10'>
                        <div className='flex flex-col justify-start items-start gap-y-1.5'>
                            <FaHandshake className='size-10 md:size-16'/>
                            <h1 className='text-xl md:text-2xl font-bold'>Kerja Sama</h1>
                        </div>
                        <p className='text-base text-left'>Fakultas Ilmu Kesehatan UMTAS telah lama membangun kerjasama dengan banyak Rumah Sakit, Klinik, dan berbagai institusi di bidang kesehatan yang dapat membantu karir lulusan dalam bidang kesehatan</p>
                    </article>
                </div>
            </div>
        </div>
    </section>
  )
}
