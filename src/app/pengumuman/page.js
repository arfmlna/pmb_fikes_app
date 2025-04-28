import React from 'react'
import DaftarPengumuman from '../components/pengumuman/DaftarPengumuman'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/pendaftaran/Banner'
import NavigatingInfo from '../components/pengumuman/NavigatingInfo'

export default function PengumumanPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfo/>
        <DaftarPengumuman/>
        <Banner/>
        <Footer/>
    </>
  )
}
