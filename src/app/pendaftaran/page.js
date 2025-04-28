import React from 'react'
import NavbarComponent from '../components/Navbar'
import HeroSectionPendaftaran from '../components/pendaftaran/HeroSectionPendaftaran'
import Footer from '../components/Footer'
import PendaftaranList from '../components/pendaftaran/PendaftaranList'
import ProgramStudi from '../components/pendaftaran/ProgramStudi'
import Banner from '../components/pendaftaran/Banner'
import InformasiDanPengumuman from '../components/pendaftaran/InformasiDanPengumuman'

export default function PendaftaranPage() {
  return (
    <>
        <NavbarComponent/>
        <HeroSectionPendaftaran/>
        <PendaftaranList/>
        <ProgramStudi/>
        <InformasiDanPengumuman/>
        <Banner/>
        <Footer/>
    </>
  )
}
