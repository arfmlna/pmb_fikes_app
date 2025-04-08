'use client'
import NavbarComponent from './components/Navbar';
import { useLoading } from './components/loading/HandleLoading';
import HeroSectionBeranda from './components/beranda/HeroSectionBeranda';
import Footer from './components/Footer';
import BentoGridBeranda from './components/beranda/BentoGridBeranda';
import CaraDaftar from './components/beranda/CaraDaftar';
import Testimonials from './components/beranda/Testimonials';
import Slogan from './components/beranda/Slogan';

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
 