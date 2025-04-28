import Link from 'next/link'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

export default function Banner() {
  return (
    <section className='flex justify-center items-center w-full h-full'>
        <div className='xl:max-w-7xl w-full sm:px-4 py-4 md:py-10 flex flex-col md:gap-6 gap-3 items-start md:px-10'>
            <div className='w-full h-full group sm:rounded-lg relative overflow-hidden'>
                <div className=' w-full sm:rounded-lg absolute z-10 h-full bg-gradient-to-r opacity-80 from-blue-950 to-blue-700'/>
                    <img src='/banner.png' className='w-full h-full group-hover:scale-105 transition-all duration-150 ease-out absolute object-cover object-center'/>
                    <div className='flex lg:flex-row flex-col justify-between items-center w-full'>
                        <article className='flex lg:p-10 p-6 flex-col max-w-xl justify-start gap-y-3 relative z-10 text-white'>
                            <div className='flex flex-col justify-start items-start gap-y-1.5'>
                                <h1 className='text-xl md:text-2xl font-bold'>Kami siap membantu anda</h1>
                            </div>
                            <p className='text-base text-left'>Apabila kamu memiliki kendala atau pertanyaan. Silakan hubungi kami atau dapat juga membaca Petunjuk Pendaftaran terlebih dahulu</p>
                        </article>
                        <div className='max-w-xl lg:p-10 p-6 w-full relative z-10 flex justify-center gap-5 items-center'>
                            <Link href={"#"} className='text-white w-full border flex rounded-lg justify-center items-center gap-3 border-white px-6 py-4'>
                                <BsWhatsapp/>
                                <p>Whatsapp</p>
                            </Link>
                            <Link href={"#"} className='text-white w-full border flex rounded-lg justify-center items-center gap-3 border-white px-6 py-4'>
                                <p>Petunjuk Pendaftaran</p>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    </section>
  )
}
