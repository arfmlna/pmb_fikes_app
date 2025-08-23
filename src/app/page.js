'use client'
import NavbarComponent from './components/Navbar';
import { useLoading } from './components/Loadingku/HandleLoading';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';

const HeroSectionBeranda = dynamic(() => import('./components/beranda/HeroSectionBeranda'));
const BentoGridBeranda = dynamic(() => import('./components/beranda/BentoGridBeranda'));
const CaraDaftar = dynamic(() => import('./components/beranda/CaraDaftar'));
const Testimonials = dynamic(() => import('./components/beranda/Testimonials'));
const Slogan = dynamic(() => import('./components/beranda/Slogan'));

export default function Home() {

  const isLoading = useLoading();
  return (
    <>
      {/* {isLoading ? (<Loading/>) : ( */}
        <>
          <NavbarComponent/>
          <HeroSectionBeranda/>
          <BentoGridBeranda/>
          <CaraDaftar/>
          <Testimonials/>
          <Slogan/>
          <Footer/>
        </>
      {/* )} */}
    </>
  );
}
 