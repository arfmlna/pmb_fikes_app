import React from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'

const DaftarProdi = dynamic(() => import('../components/program-studi/DaftarProdi'))
const NavigatingInfo = dynamic(() => import('../components/program-studi/NavigatingInfo'))
const Banner = dynamic(() => import('../components/pendaftaran/Banner'))

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
