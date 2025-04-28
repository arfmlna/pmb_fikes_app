import Link from 'next/link';
import React from 'react'
import { AiFillBank } from "react-icons/ai";
import { BsChevronCompactLeft, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaHandshake, FaUserGraduate } from "react-icons/fa";
import { IoIosBook } from "react-icons/io";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from 'react-icons/lu';

export default function DaftarPengumuman() {
  return (
    <section className='flex justify-center items-center w-full h-full py-4 md:py-10 md:px-10 px-4'>
        <div className='xl:max-w-7xl w-full p-6 bg-white border rounded-lg border-gray-300 flex flex-col md:gap-6 gap-3 items-start'>
            <div className='flex flex-col gap-1.5 border-b border-b-gray-300 pb-5 w-full'>
                <h1 className='text-xl md:text-2xl font-bold text-black text-left'>Informasi & Pengumuman</h1>
                <p className='text-base text-black text-left'>Informasi pendaftaran dan pengumuman mengenai pendaftaran</p>
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
            <div className='flex justify-between w-full items-center'>
                <p className='text-black text-base'>Menampilkan - dari - Informasi dan Pengumuman</p>
                <div className='flex justify-end items-center gap-3'>
                    <button>
                        <LuChevronsLeft/>
                    </button>
                    <button>
                        <LuChevronLeft/>
                    </button>
                    <p className='bg-blue-700 p-2 rounded-md text-white'>1</p>
                    <button>
                        <LuChevronsRight/>
                    </button>
                    <button>
                        <LuChevronRight/>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}
