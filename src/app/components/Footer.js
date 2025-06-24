"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import icon from '../fikesicon.png'

export default function Footer() {

    const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-10 w-full bg-white transition backdrop-blur-sm flex justify-center items-center">
        <div className='flex flex-col justify-center items-center w-full xl:max-w-[1280px]'>
            <div className="flex flex-wrap gap-5 md:flex-nowrap lg:px-16 xl:px-0 px-4 md:px-14 justify-between items-end h-auto w-full">
                <div className="flex flex-wrap md:gap-10 gap-5 lg:gap-0 justify-between items-start h-auto w-full">
                    <div className="flex flex-col lg:gap-y-6 md:gap-y-4 gap-y-2 justify-center items-start">
                        <h1 className="md:text-2xl text-xl text-black font-bold">PMB FIKES</h1>
                        <p className="text-neutral-900 text-base max-w-xs">Tak hanya pintar secara akademik, kami mencetak lulusan yang peduli dan siap mengabdi.</p>
                        <Image src={icon} width={70} height={70} alt="icon"/>
                    </div>
                    <div className="flex flex-col lg:gap-y-6 md:gap-y-4 gap-y-2 justify-center items-start">
                        <h1 className="text-base font-bold text-black">Menu</h1>
                        <div className="flex flex-col gap-y-1.5 justify-center items-start">
                            <Link href="/" className="text-neutral-900 lg:hover:text-black transition lg:hover:font-semibold text-base">Beranda</Link>
                            <Link href="/pendaftaran" className="text-neutral-900 lg:hover:text-black transition lg:hover:font-semibold text-base">Pendaftaran</Link>
                            <Link href="/program-studi" className="text-neutral-900 lg:hover:text-black transition lg:hover:font-semibold text-base">Program Studi</Link>
                            <Link href="/pengumuman" className="text-neutral-900 lg:hover:text-black transition lg:hover:font-semibold text-base">Informasi dan Pengumuman</Link>
                        </div>
                    </div>
                    <div className="flex flex-col lg:gap-y-6 md:gap-y-4 gap-y-2 justify-center items-start">
                        <h1 className="text-base text-black font-bold">Hubungi Kita</h1>
                        <p className="text-neutral-900 text-base max-w-[16rem]">Anda bisa menghubungi kami secara langsung untuk konsultasi.</p>
                        <p className="text-neutral-900 text-base">+62 8564 3722 814</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-3 lg:gap-x-10">
                    <Link href="https://wa.me/+6285643722814?text=Halo%20kak%2Cmau%20nanya%20info%20jasa%20Pembuatan%20website" rel="noopener noreferrer" target="_blank">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="text-black lg:w-10 lg:h-10 w-7 h-7 p-1.5 rounded-full lg:hover:text-white lg:hover:bg-blue-900 lg:hover:duration-300 transition-all"
                            viewBox="0 0 448 512">
                            <path
                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                    </Link>
                    <Link href='mailto:ghifarfreelance@gmail.com' rel='noopener noreferrer' target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black lg:w-10 lg:h-10 w-7 h-7 p-1.5 rounded-full lg:hover:text-white lg:hover:bg-blue-900 lg:hover:duration-300 transition-all">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </Link>
                </div>
            </div>
            <hr className="w-full h-0.5 bg-black mt-10"/>
            <p className="text-black  lg:px-16 xl:px-0 px-4 md:px-14 text-center lg:text-base text-xs md:py-10 py-5">Hak cipta ® {currentYear} PMB FIKES semua hak cipta dilindungi undang-undang </p>
        </div>
    </footer>
  )
}