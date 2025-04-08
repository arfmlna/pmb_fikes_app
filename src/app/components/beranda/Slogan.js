import Link from 'next/link'
import React from 'react'

export default function Slogan() {
  return (
    <section className='w-full justify-center my-36 relative items-center flex'>
    <div className='w-full justify-center group relative items-center flex'>
        <div className='w-full absolute z-10 h-[50vh] group-hover:bg-blue-900 bg-transparent transition-all duration-150 ease-out'/>
        <div className='xl:max-w-7xl w-full z-20 px-4 md:px-10'>
            <main className='w-full flex-col flex justify-center items-center gap-1.5 md:gap-3'>
                <h1 className='group-hover:text-white text-black transition-all duration-150 ease-out md:text-4xl text-2xl text-center font-extrabold'>Tunggu Apa Lagi?</h1>
                <p className='group-hover:text-white text-black transition-all duration-150 ease-out text-base md:text-lg text-center max-w-2xl'>Jangan lewatkan kesempatan emas ini! Yuk, daftar sekarang ke Fakultas Ilmu Kesehatan sesuai dengan prodi impianmu. Jangan sampai ketinggalan, ya!</p>
                <Link href={'/pendaftaran'} className='px-6 py-2 rounded-lg bg-blue-900 font-bold text-center text-base md:text-lg hover:bg-white hover:text-black transition-all duration-150 ease-out text-white'>Daftar sekarang!</Link>
            </main>
        </div>
    </div>
    </section>
  )
}
