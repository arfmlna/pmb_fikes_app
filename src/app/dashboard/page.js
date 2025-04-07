'use client'
import { Fragment, useEffect } from "react";
import { useLoading } from "../components/Loading/HandleLoading";
import Loading from "../components/Loading/Loading";
import NavbarComponent from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    if (localStorage.getItem('role') !== 'admin') {
      router.push('/')
    }
  }, [router])
  
  const isLoading = useLoading()
    return (
      <Fragment>
        {isLoading ? (<Loading/>) : (
          <Fragment>
            <NavbarComponent/>
            <h1 className='flex justify-center items-center h-screen w-full text-white'>Dashboard</h1>
          </Fragment>
        )}
      </Fragment>
    );
  return (
    <>
    </>
  );
}
 