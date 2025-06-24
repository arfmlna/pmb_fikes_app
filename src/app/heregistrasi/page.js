"use client";
import React, { Suspense } from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/pendaftaran/Banner'
import NavigatingInfoDaftar from '../components/daftar/NavigatingInfo'
import HeregistrasiForm from '../components/heregistrasi/HeregistrasiForm';

export default function DaftarPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoDaftar/>
        <Suspense fallback={<p>Loading...</p>}>
          <HeregistrasiForm/>
        </Suspense>
        <Banner/>
        <Footer/>
    </>
  )
}
