import React from 'react'
import NavbarComponent from '../components/Navbar'
import CrudAdmins from '../components/crudUsers/crudAdmins'

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <CrudAdmins/>
    </>
  )
}
