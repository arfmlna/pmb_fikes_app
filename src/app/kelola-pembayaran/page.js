import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const CrudPembayaran = dynamic(() => import('../components/crudPembayaran/crudPembayaran'))

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <CrudPembayaran/>
    </>
  )
}
