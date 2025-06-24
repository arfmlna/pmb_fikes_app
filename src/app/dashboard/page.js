'use client'
import { Fragment, Suspense, useEffect } from "react";
import { useLoading } from "../components/Loadingku/HandleLoading";
import Loading from "../components/Loadingku/Loading";
import NavbarComponent from "../components/Navbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CrudUsers from "../components/crudUsers/crudUsers";
import { Card } from "primereact/card";
import dynamic from "next/dynamic";

const DashboardComponent = dynamic(() => import("../components/dashboard/DashboardComponent"))

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
            <Suspense fallback={<svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}>
              <DashboardComponent/>
            </Suspense>
            <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
            <div className="grid grid-cols-2 gap-5 mx-1 md:mx-14 my-20">
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
 