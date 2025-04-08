'use client'

// import { easeOut } from 'framer-motion';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react'
import { FaUniversity } from 'react-icons/fa';
import { LuNotebookText } from "react-icons/lu";
import { TbCashRegister } from "react-icons/tb";

export default function CaraDaftar() {

    const titleOne = useRef()
    const titleTwo = useRef()
    const svgItem = useRef()
    const imageItem = useRef()

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger)
    //     const animateOnScroll = (element, {opacity, x, y}) => {
    //         gsap.fromTo(element, {opacity: 0, x,y}, {
    //             opacity: 1,
    //             duration: 1,
    //             scale: 1,
    //             x: 0,
    //             y: 0,
    //             ease: easeOut,
    //             scrollTrigger: {
    //                 trigger: element,
    //                 start: "top bottom",
    //                 end: "center center"
    //             }
    //         })
    //     }

    //     const animateOnDekstop = () => {
    //         animateOnScroll(titleOne.current, {opacity: 0, y: 100})
    //         animateOnScroll(titleTwo.current, {opacity: 0, y: 100})
    //         animateOnScroll(imageItem.current, {opacity: 0, x: 1000})
    //         Array.from(svgItem.current.children).forEach(svg => {
    //             animateOnScroll(svg, {opacity: 0, y: 100});
    //         })
    //     }
        
    //     const animateOnMobile = () => {
    //         animateOnScroll(titleOne.current, {opacity: 0, y: 100})
    //         animateOnScroll(titleTwo.current, {opacity: 0, y: 100})
    //         animateOnScroll(imageItem.current, {opacity: 0, y: 100})
    //         Array.from(svgItem.current.children).forEach(svg => {
    //             animateOnScroll(svg, {opacity: 0, y: 100});
    //         })
    //     }

    //     const isDekstop = window.matchMedia("(min-width: 768px)").matches
        
    //     isDekstop ? animateOnDekstop() : animateOnMobile()
    // }, [])

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='xl:max-w-7xl w-full px-4 py-4 md:py-10 md:px-10'>
            <div className='lg:px-10 z-10 overflow-hidden flex relative xl:max-w-[1280px] xl:px-0 w-full h-full lg:py-20  md:px-8 md:py-16 py-14 px-6 lg:flex-row items-center flex-col lg:justify-between justify-center gap-y-10 lg:gap-y-0'>
                <div className='flex justify-center flex-col items-center lg:items-start lg:gap-y-10 gap-y-5 max-w-xl'>
                    <div className='flex flex-col xl:w-full lg:w-3/4 w-full h-auto overflow-hidden justify-center lg:gap-y-3 gap-y-1.5'>
                        <h2 ref={titleOne} className='text-black text-center lg:text-start xl:text-lg text-base'>Mudah dan Cepat</h2>
                        <h1 ref={titleTwo} className='text-black text-center lg:text-start xl:text-4xl md:text-2xl text-xl max-w-xl font-semibold '>Daftar ke FIKES dengan 3 Cara Mudah</h1>
                    </div>
                    <div ref={svgItem} className='flex flex-col h-auto overflow-hidden justify-center lg:text-start lg:items-start items-center lg:gap-y-10 gap-y-5'>
                        <div className='flex lg:justify-start justify-center group h-auto overflow-hidden items-center gap-x-5'>
                            <FaUniversity className='size-14 text-black bg-transparent group-hover:bg-blue-900 group-hover:text-white transition-all duration-150 ease-out p-2 rounded-lg' />
                            <div className='flex flex-col justify-center gap-y-1'>
                                <h2 className='text-black text-base font-semibold'>Pilih Program Studi</h2>
                                <p className='text-black text-base max-w-xs'>Pilih program studi di fakultas ilmu kesehatan sesuai keinginan anda.</p>
                            </div>
                        </div>
                        <div className='flex lg:justify-start justify-center group h-auto overflow-hidden items-center gap-x-5'>
                            <LuNotebookText className='size-14 text-black bg-transparent group-hover:bg-blue-900 group-hover:text-white transition-all duration-150 ease-out p-2 rounded-lg' />
                            <div className='flex flex-col justify-center gap-y-1'>
                                <h2 className='text-black text-base font-semibold'>Pilih Metode Pendaftaran</h2>
                                <p className='text-black text-base max-w-xs'>Pilih metode pendaftaran di prodi yang anda pilih sesuai keinginan.</p>
                            </div>
                        </div>
                        <div className='flex lg:justify-start justify-center group h-auto overflow-hidden items-center gap-x-5'>
                            <TbCashRegister className='size-14 text-black bg-transparent group-hover:bg-blue-900 group-hover:text-white transition-all duration-150 ease-out p-2 rounded-lg' />
                            <div className='flex flex-col justify-center gap-y-1'>
                                <h2 className='text-black text-base font-semibold'>Pembayaran</h2>
                                <p className='text-black text-base max-w-xs'>Anda bisa melunasi pembayaran dalam waktu 24 jam.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={imageItem} className='xl:w-full lg:w-1/2 w-full lg:h-[500px] md:h-[400px] h-[300px] relative max-w-xl group overflow-hidden rounded-lg shadow-black shadow-lg'>
                    <img src='/umtas.jpg' className='w-full transition-all duration-500 ease-out group-hover:scale-110 absolute object-cover object-left brightness-75 h-full'/>
                </div>
            </div>
        </div>
    </section>
  )
}