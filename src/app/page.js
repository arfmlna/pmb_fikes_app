'use client'
import NavbarComponent from './components/Navbar';
import Loading from './components/Loading/Loading';
import { useLoading } from './components/Loading/HandleLoading';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'users') {
      router.push('/dashboard')
    }
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [router])

  const isLoading = useLoading();
  return (
    <>
      {isLoading ? (<Loading/>) : (
        <>
          <NavbarComponent/>
            <h1 className='flex justify-center items-center h-screen w-full text-white'>Home</h1>
        </>
      )}
    </>
  );
}
 