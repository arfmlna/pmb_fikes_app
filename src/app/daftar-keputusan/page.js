import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const Daftar = dynamic(() => import('../components/daftar/daftar'))

export default function DaftarKeputusanPage() {
  return (
    <>
        <NavbarComponent/>
        <Daftar/>
    </>
  )
}
