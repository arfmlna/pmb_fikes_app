import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const CRUDProdi = dynamic(() => import('../components/crudProdi/crudProdi'))

export default function Prodi() {
  return (
    <>
        <NavbarComponent/>
        <CRUDProdi/>
    </>
  )
}
