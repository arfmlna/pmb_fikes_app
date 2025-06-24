import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const CrudDokumen = dynamic(() => import('../components/crudDokumen/crudDokumen'))

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <CrudDokumen/>
    </>
  )
}
