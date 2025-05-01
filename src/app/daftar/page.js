import React from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import PendaftaranForm from '../components/daftar/PendaftaranForm'
import Banner from '../components/pendaftaran/Banner'
import NavigatingInfoDaftar from '../components/daftar/NavigatingInfo'

export default function DaftarPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoDaftar/>
        <PendaftaranForm/>
        <Banner/>
        <Footer/>
    </>
  )
}
