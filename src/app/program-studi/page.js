import React from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import DaftarProdi from '../components/program-studi/DaftarProdi'
import NavigatingInfo from '../components/program-studi/NavigatingInfo'
import Banner from '../components/pendaftaran/Banner'

export default function ProgramStudiPage() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfo/>
        <DaftarProdi/>
        <Banner/>
        <Footer/>
    </>
  )
}
