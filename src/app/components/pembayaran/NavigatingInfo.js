import Link from 'next/link'
import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { RiHomeFill } from 'react-icons/ri'

export default function NavigatingInfoPembayaran() {
  return (
    <section className='bg-white w-full p-4 border-b-gray-300 border-t border-b border-t-gray-300'>
      <div className='xl:max-w-7xl mx-auto w-full'>
        <div className='flex text-base justify-start text-gray-500 items-center gap-1.5'>
            <RiHomeFill/>
            <Link href={"/"} className='underline font-semibold'>Beranda</Link>
            <BsChevronRight/>
            <Link href={"/daftar"} className='underline font-semibold'>Daftar</Link>
            <BsChevronRight/>
            <p>Pembayaran</p>
        </div>
      </div>
    </section>
  )
}
