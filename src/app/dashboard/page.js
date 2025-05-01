'use client'
import { Fragment, useEffect } from "react";
import { useLoading } from "../components/Loadingku/HandleLoading";
import Loading from "../components/Loadingku/Loading";
import NavbarComponent from "../components/Navbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import JumlahUser from "../components/dashboard/JumlahUser";
import CrudUsers from "../components/crudUsers/crudUsers";
import { Card } from "primereact/card";

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
            {/* <JumlahUser/> */}
            <div className="grid grid-cols-2 gap-5 mx-3 md:mx-14 my-20">
              <Card title="Kelola Users" className="col-span-2">
                <CrudUsers/>
              </Card>
            </div>
          </Fragment>
        )} 
      </Fragment>
    );
  return (
    <>
    </>
  );
}
 