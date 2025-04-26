"use client"

import { useRouter } from 'next/navigation';
import EditUser from '../components/EditUser';
import { useLoading } from '../components/Loadingku/HandleLoading';
import NavbarComponent from '../components/Navbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import LoginLogs from '../components/LoginLogs';
import Loading from '../components/Loadingku/Loading';
import parseData from '../components/method/GetCookies';

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
          <div className='flex justify-center items-center h-[85vh] w-full text-black text-3xl'>
            <div className='rounded-full ring-2 ring-black hover:shadow-2xl animate-bounce w-40 h-40 flex items-center justify-center'>
              <div>
                <h3 className='uppercase text-xl'>{parseData.name}</h3>
              </div>
            </div>
          </div>
          <LoginLogs/>
          <EditUser/>
        </>
      )}
    </>
  );
}
 