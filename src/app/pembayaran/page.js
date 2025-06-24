import React, { Suspense } from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import DetailPembayaran from '../components/pembayaran/DetailPembayaran';
import Banner from '../components/pendaftaran/Banner';
import NavigatingInfoPembayaran from '../components/pembayaran/NavigatingInfo';

export default function Pembayaran() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoPembayaran/>
        <Suspense fallback={<div>Loading...</div>}>
          <DetailPembayaran/>
        </Suspense>
        <Banner/>
        <Footer/>
    </>
  )
}
