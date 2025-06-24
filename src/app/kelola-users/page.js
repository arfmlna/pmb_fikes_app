import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'
const CrudUsers = dynamic(() => import('../components/crudUsers/crudUsers'))

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <CrudUsers/>
    </>
  )
}
