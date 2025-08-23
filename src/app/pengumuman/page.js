import React from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'

const NavigatingInfo = dynamic(() => import('../components/pengumuman/NavigatingInfo'))
const DaftarPengumuman = dynamic(() => import('../components/pengumuman/DaftarPengumuman'))
const Banner = dynamic(() => import('../components/pendaftaran/Banner'))

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
