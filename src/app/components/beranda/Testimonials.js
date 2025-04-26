"use client"

import Image from "next/image";
// import { easeOut } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {

    const titleItemOne = useRef()
    const titleItemTwo = useRef()
    const testimonialsItem = useRef()
    const scrollContainerRef = useRef(); // Ref for the scroll container

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger)
    //     const animateOnScroll = (element, {opacity, x, y}) => {
    //         gsap.fromTo(element, {opacity: 0, x,y}, {
    //             opacity: 1,
    //             duration: 1,
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
    //         animateOnScroll(titleItemOne.current, {opacity: 0, y: 100})
    //         animateOnScroll(titleItemTwo.current, {opacity: 0, y: 100})
    //         animateOnScroll(testimonialsItem.current, {opacity: 0})
    //     }
        
    //     const animateOnMobile = () => {
    //         animateOnScroll(titleItemOne.current, {opacity: 0, y: 100})
    //         animateOnScroll(titleItemTwo.current, {opacity: 0, y: 100})
    //         animateOnScroll(testimonialsItem.current, {opacity: 0})
    //     }

    //     const isDekstop = window.matchMedia("(min-width: 768px)").matches

    //     isDekstop ? animateOnDekstop() : animateOnMobile()
    // }, [])

    useEffect(() => {
        const container = scrollContainerRef.current;
    
        // Drag-to-scroll functionality
        let isDown = false;
        let startX;
        let scrollLeft;
    
        const handleMouseDown = (e) => {
          isDown = true;
          container.classList.add("active");
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        };
    
        const handleMouseLeave = () => {
          isDown = false;
          container.classList.remove("active");
        };
    
        const handleMouseUp = () => {
          isDown = false;
          container.classList.remove("active");
        };
    
        const handleMouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 2; // Scroll faster
          container.scrollLeft = scrollLeft - walk;
        };
    
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);
    
        return () => {
          container.removeEventListener("mousedown", handleMouseDown);
          container.removeEventListener("mouseleave", handleMouseLeave);
          container.removeEventListener("mouseup", handleMouseUp);
          container.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

    return (
        <section className='flex justify-center items-center w-full'>
            <div className="lg:px-10 z-10 xl:max-w-[1280px] flex relative w-full overflow-hidden h-full md:px-10 py-10 px-4 lg:flex-row items-center lg:items-start flex-col lg:justify-between justify-center gap-y-5">
                <div className='flex justify-center xl:w-full lg:w-1/2 w-full h-auto overflow-hidden flex-col lg:gap-y-10 gap-y-5 max-w-xl'>
                    <div className='flex flex-col justify-center h-auto lg:gap-y-3 gap-y-1.5 w-full lg:border-b-black border-none lg:border-b-[2px] lg:pb-10 pb-0'>
                        <h2 ref={titleItemOne} className='text-black text-center lg:text-start xl:text-lg md:text-base text-sm'>Testimonial</h2>
                        <h1 ref={titleItemTwo} className='text-black text-center lg:text-start xl:text-6xl md:text-4xl text-2xl max-w-xl font-semibold leading-tight'>Apa yang Mereka Katakan Tentang Kita.</h1>
                    </div>
                </div>
                <div ref={scrollContainerRef} className='overflow-x-scroll xl:w-full lg:w-2/3 w-full h-auto max-w-2xl py-5 overflow-hidden' style={{scrollSnapType: 'x mandatory', scrollbarColor: 'transparent transparent', userSelect: 'none'}}>
                    <div ref={testimonialsItem} className='w-max h-auto flex items-center justify-center gap-5'>
                        <div className='lg:w-[400px] md:w-[350px] w-[300px] lg:h-[500px] md:h-[450px] h-[400px] relative shadow-black shadow-lg rounded-xl overflow-hidden'>
                            <Image width='600' height='600' alt="" src="/umtas.jpg" className='w-full h-full object-cover brightness-75 absolute z-10'/>
                            <div className='flex justify-center items-end p-5 w-full h-full absolute z-20 group'>
                                <div className='w-full p-3 flex flex-col justify-center items-center md:gap-y-5 group-hover:bg-blue-900 group-hover:bg-opacity-80 group-hover:backdrop-blur-sm group-hover:text-white transition-all duration-150 ease-out gap-y-2.5 bg-white bg-opacity-80 backdrop-blur-sm rounded-md text-black'>
                                    <div className="flex flex-col justify-center items-center md:gap-y-2 gap-y-1">
                                        <Image width='600' height='600' alt="" src="/plague-doctor.jpg" className="w-10 h-10 object-fill rounded-full"/>
                                        <h1 className="xl:text-xl md:text-lg text-base font-semibold">Dr. Plague</h1>
                                    </div>
                                    <p className="text-center md:text-base text-sm italic">"Dengan kuliah di fakultas ilmu kesehatan universitas muhammadiyah tasikmalaya saya bisa menangani wabah "Black Death" di berbagai benua."</p>
                                    <div className="flex justify-center items-center md:gap-x-2 gap-x-1">
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[400px] md:w-[350px] w-[300px] lg:h-[500px] md:h-[450px] h-[400px] relative shadow-black shadow-lg rounded-xl overflow-hidden'>
                            <Image width='600' height='600' alt="" src="/labskill.jpg" className='w-full h-full object-cover brightness-75 absolute z-10'/>
                            <div className='flex justify-center items-end p-5 w-full h-full absolute z-20 group'>
                                <div className='w-full p-3 flex flex-col justify-center items-center md:gap-y-5 group-hover:bg-blue-900 group-hover:bg-opacity-80 group-hover:backdrop-blur-sm group-hover:text-white transition-all duration-150 ease-out gap-y-2.5 bg-white bg-opacity-80 backdrop-blur-sm rounded-md text-black'>
                                    <div className="flex flex-col justify-center items-center md:gap-y-2 gap-y-1">
                                        <Image width='600' height='600' alt="" src="/mangunkusumo.webp" className="w-10 h-10 object-fill rounded-full"/>
                                        <h1 className="xl:text-xl md:text-lg text-base font-semibold">Dr. Cipto Mangunkusumo</h1>
                                    </div>
                                    <p className="text-center md:text-base text-sm italic">"Dengan kuliah di fakultas ilmu kesehatan universitas muhammadiyah tasikmalaya saya bisa menangani wabah "Septicemic Plague" (PES) di Malang, Indonesia."</p>
                                    <div className="flex justify-center items-center md:gap-x-2 gap-x-1">
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[400px] md:w-[350px] w-[300px] lg:h-[500px] md:h-[450px] h-[400px] relative shadow-black shadow-lg rounded-xl overflow-hidden'>
                            <Image width='600' height='600' alt="" src="/perpustakaan.jpg" className='w-full h-full object-cover brightness-75 absolute z-10'/>
                            <div className='flex justify-center items-end p-5 w-full h-full absolute z-20 group'>
                                <div className='w-full p-3 flex flex-col justify-center items-center md:gap-y-5 group-hover:bg-blue-900 group-hover:bg-opacity-80 group-hover:backdrop-blur-sm group-hover:text-white transition-all duration-150 ease-out gap-y-2.5 bg-white bg-opacity-80 backdrop-blur-sm rounded-md text-black'>
                                    <div className="flex flex-col justify-center items-center md:gap-y-2 gap-y-1">
                                        <Image width='600' height='600' alt="" src="/Edward jenner.jpg" className="w-10 h-10 object-fill rounded-full"/>
                                        <h1 className="xl:text-xl md:text-lg text-base font-semibold">Edward Jenner</h1>
                                    </div>
                                    <p className="text-center md:text-base text-sm italic">"Dengan kuliah di fakultas ilmu kesehatan universitas muhammadiyah tasikmalaya saya bisa menemukan vaksin untuk menangani penyakit cacar air."</p>
                                    <div className="flex justify-center items-center md:gap-x-2 gap-x-1">
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                        <FaStar className='text-yellow-500 md:size-6 size-4'/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    )
}