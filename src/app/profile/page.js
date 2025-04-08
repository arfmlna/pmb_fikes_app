"use client"

import { useRouter } from 'next/navigation';
import EditUser from '../components/EditUser';
import { useLoading } from '../components/loading/HandleLoading';
import Loading from '../components/loading/Loading';
import NavbarComponent from '../components/Navbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Profile() {
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
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
 