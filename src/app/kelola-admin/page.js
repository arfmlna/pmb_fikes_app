import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const CrudAdmins = dynamic(() => import('../components/crudUsers/crudAdmins')) 

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <CrudAdmins/>
    </>
  )
}
