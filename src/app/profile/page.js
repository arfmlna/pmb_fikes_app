"use client"

import { useRouter } from 'next/navigation';
import EditUser from '../components/EditUser';
import { useLoading } from '../components/Loading/HandleLoading';
import Loading from '../components/Loading/Loading';
import NavbarComponent from '../components/Navbar';
import { useEffect } from 'react';

export default function Profile() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [router])

  const isLoading = useLoading()
  return (
    <>
      {isLoading ? (<Loading/>) : (
        <>
          <NavbarComponent/>
          <h1 className='flex justify-center items-center h-screen w-full text-white'>Profile</h1>
          <EditUser/>
        </>
      )}
    </>
  );
}
 