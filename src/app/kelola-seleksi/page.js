import React from 'react'
import NavbarComponent from '../components/Navbar'
import dynamic from 'next/dynamic'

const CrudSeleksi = dynamic(() => import('../components/crudSeleksi/crudSeleksi'))
const CrudSeleksiProdi = dynamic(() => import('../components/crudSeleksi/crudSeleksiProdi'))

export default function page() {
  return (
    <>
        <NavbarComponent/>
        <div className='grid grid-cols-1 md:grid-cols-2 mx-10 mt-10 gap-5 mb-12'>
          <div className=''>
            <CrudSeleksi/>
          </div>
          <div>
            <CrudSeleksiProdi/>
          </div>
        </div>
    </>
  )
}
