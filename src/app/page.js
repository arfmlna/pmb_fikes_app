'use client'
import NavbarComponent from './components/Navbar';
import Loading from './components/loading/Loading';
import { useLoading } from './components/loading/HandleLoading';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSectionBeranda from './components/HeroSectionBeranda';
import Footer from './components/Footer';
import BentoGridBeranda from './components/BentoGridBeranda';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') && localStorage.getItem('role') != 'users') {
      router.push('/dashboard')
    } else if (!localStorage.getItem('role') && localStorage.getItem('role') === 'users') {
      router.push('/')
    } 
  }, [router])

  const isLoading = useLoading();
  return (
    <>
      {/* {isLoading ? (<Loading/>) : ( */}
        <>
          <NavbarComponent/>
          <HeroSectionBeranda/>
          <BentoGridBeranda/>
          <Footer/>
        </>
      {/* )} */}
    </>
  );
}
 