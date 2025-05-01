"use client"

import { useRouter } from 'next/navigation';
import EditUser from '../components/EditUser';
import { useLoading } from '../components/Loadingku/HandleLoading';
import NavbarComponent from '../components/Navbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Loading from '../components/Loadingku/Loading';

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
          <EditUser/>
        </>
      )}
    </>
  );
}
 