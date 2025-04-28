import Link from 'next/link';
import React from 'react'
import { AiFillBank } from "react-icons/ai";
import { BsChevronRight } from 'react-icons/bs';
import { FaHandshake, FaUserGraduate } from "react-icons/fa";
import { IoIosBook } from "react-icons/io";

export default function InformasiDanPengumuman() {
  return (
    <section className='flex justify-center items-center w-full h-full'>
        <div className='xl:max-w-7xl w-full px-4 py-4 md:py-10 flex flex-col md:gap-6 gap-3 items-start md:px-10'>
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-xl md:text-2xl font-bold text-black text-left'>Informasi & Pengumuman</h1>
                <Link href={"/pengumuman"} className='flex text-blue-900 justify-center font-bold items-center gap-2'>
                    <p className=''>Lihat Semua Informasi</p>
                    <BsChevronRight className='text-blue-900'/>
                </Link>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 text-white'>
                <Link href={"#"} className='group rounded-lg bg-white flex flex-col gap-3 border p-4 hover:border-black transition-all duration-300 ease-out border-gray-300'>
                    <img src='/labskill.jpg' className='w-full h-full rounded-lg object-cover object-center'/>
                    <div className='flex flex-col gap-y-1.5'>
                        <h1 className='text-base text-black'>30 April 2025</h1>
                        <h1 className='text-base text-black uppercase font-bold'>Seleksi bebas tes</h1>
                        <p className='text-sm text-center bg-blue-200 text-blue-700 p-2 rounded-lg'>Informasi</p>
                    </div>
                </Link>
            </div>
        </div>
    </section>
  )
}
