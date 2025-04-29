import React from 'react'
import NavbarComponent from '../components/Navbar'
import 'primeicons/primeicons.css';
import CRUDAngkatan from '../components/crudAngkatan/crudAngkatan';

export default function Alumni() {
  return (
    <>
        <NavbarComponent/>
        <CRUDAngkatan/>
    </>
  )
}
