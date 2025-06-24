import NavbarComponent from '@/app/components/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'

const RekapPendafataran = dynamic(() => import('@/app/components/rekap-pendaftaran/RekapPendafataran'))

export default function RekapPendaftaranPage() {
  return (
    <>
        <NavbarComponent/>
        <RekapPendafataran/>
    </>
  )
}
