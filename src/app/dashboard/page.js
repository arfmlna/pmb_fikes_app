'use client'
import { Fragment, useEffect } from "react";
import { useLoading } from "../components/loading/HandleLoading";
import Loading from "../components/loading/Loading";
import NavbarComponent from "../components/Navbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import JumlahUser from "../components/dashboard/JumlahUser";

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    if (Cookies.get('role') !== 'admin') {
      router.push('/')
    }
  }, [router])
  
  const isLoading = useLoading()
    return (
      <Fragment>
        {isLoading ? (<Loading/>) : (
          <Fragment>
            <NavbarComponent/>
            <DashboardComponent/>
            <JumlahUser/>
          </Fragment>
        )}
      </Fragment>
    );
  return (
    <>
    </>
  );
}
 