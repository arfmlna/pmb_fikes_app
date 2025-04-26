import Image from 'next/image'
import React from 'react'

export default function HeroSectionPendaftaran() {
  return (
    <section className='w-full h-full justify-center items-center flex'>
        <Image width='600' height='600' alt='' src='/166.jpg' className=' w-full rounded-lg object-cover lg:object-center object-left absolute z-0 top-20 h-[55vh]'/>
        <div className=' w-full rounded-lg absolute z-0 top-20 h-[55vh] bg-gradient-to-r opacity-80 from-black to-transparent'/>
        <div className='xl:max-w-7xl w-full z-10 py-10 px-4 md:px-10'>
            <main className='flex flex-col justify-start gap-8 items-start w-full h-auto'>
                <h1 className='text-white md:text-4xl text-2xl max-w-2xl font-extrabold'>Portal Pendaftaran Mahasiswa Baru FIKES</h1>
                <p className='text-white text-sm md:text-base max-w-xl'>Cari tau informasi program studi, biaya kuliah, dan informasi pendaftaran Fakultas Ilmu Kesehatan di
                Universitas Muhammadiyah Tasikmalaya</p>
            </main>
        </div>
    </section>
  )
}
