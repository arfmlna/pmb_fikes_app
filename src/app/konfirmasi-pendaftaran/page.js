import React, { Suspense } from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/pendaftaran/Banner'
import NavigatingInfoKonfirmasiPendaftaran from '../components/konfirmasi-pendaftaran/NavigatingInfoKonfirmasiPendafataran'
import dynamic from 'next/dynamic'

const KonfirmasiPendaftaranForm = dynamic(() => import('../components/konfirmasi-pendaftaran/KonfirmasiPendaftaranForm'))

export default function KonfirmasiPendaftaranPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoKonfirmasiPendaftaran/>
        <Suspense fallback={<div>Loading...</div>}>
          <KonfirmasiPendaftaranForm/>
        </Suspense>
        <Banner/>
        <Footer/>
    </>
  )
}
