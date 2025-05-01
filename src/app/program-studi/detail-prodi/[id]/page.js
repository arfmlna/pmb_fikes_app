import DetailArticle from '@/app/components/detail-prodi/DetailArticle'
import NavigatingInfoDetailProdi from '@/app/components/detail-prodi/NavigatingInfoDetailProdi'
import Footer from '@/app/components/Footer'
import NavbarComponent from '@/app/components/Navbar'
import Banner from '@/app/components/pendaftaran/Banner'
import React from 'react'

export default function DetailProdi() {
  return (
    <>
        <NavbarComponent/>
        <NavigatingInfoDetailProdi/>
        <DetailArticle/>
        <Banner/>
        <Footer/>
    </>
  )
}
