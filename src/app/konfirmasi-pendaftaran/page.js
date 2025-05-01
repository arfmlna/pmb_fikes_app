import React from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import KonfirmasiPendaftaranForm from '../components/konfirmasi-pendaftaran/KonfirmasiPendaftaranForm'
import Banner from '../components/pendaftaran/Banner'
import NavigatingInfoKonfirmasiPendaftaran from '../components/konfirmasi-pendaftaran/NavigatingInfoKonfirmasiPendafataran'

export default function KonfirmasiPendaftaranPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoKonfirmasiPendaftaran/>
        <KonfirmasiPendaftaranForm/>
        <Banner/>
        <Footer/>
    </>
  )
}
