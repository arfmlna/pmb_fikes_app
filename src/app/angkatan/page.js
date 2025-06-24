import React from 'react'
import NavbarComponent from '../components/Navbar'
import 'primeicons/primeicons.css';
import dynamic from 'next/dynamic';

const CRUDAngkatan = dynamic(() => import('../components/crudAngkatan/crudAngkatan'));

export default function Alumni() {
  return (
    <>
        <NavbarComponent/>
        <CRUDAngkatan/>
    </>
  )
}
