import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSectionBeranda() {
  return (
    <section className='w-full h-full justify-center items-center flex'>
        <Image width='720' height='720' alt='fikes-cover' priority src='/fikes-cover.webp' className=' w-full brightness-50 object-cover object-center absolute z-0 top-20 min-h-screen'/>
        <div className='xl:max-w-7xl w-full z-20 px-4 md:px-10'>
          <main className='w-full flex-col flex justify-center items-center gap-1.5 md:gap-3 h-screen'>
            <h1 className='text-white md:text-4xl text-2xl text-center font-extrabold'>Menjadi Cahaya Harapan Kesehatan Bangsa</h1>
            <p className='text-white text-base md:text-lg text-center max-w-xl'>Tak hanya pintar secara akademik, kami mencetak lulusan yang peduli dan siap mengabdi.</p>
            <Link href={'/pendaftaran'} className='px-6 py-2 rounded-lg bg-white font-bold text-center text-base md:text-lg hover:bg-blue-900 hover:text-white transition-all duration-150 ease-out text-black'>Daftar sekarang!</Link>
          </main>
        </div>
    </section>
  )
}
