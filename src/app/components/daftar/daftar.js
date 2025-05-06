'use client'
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../components/Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Card } from 'primereact/card'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { Alert } from '../components/Alert'
import { useRouter } from 'next/navigation'
import parseData from '../components/method/GetCookies'

export default function Daftar() {
    const [dataProdi, setDataProdi] = useState([])
    const [dataAngkatan, setAngkatan] = useState([])

    const router = useRouter()

    useEffect(() => {
        getProdi()
        getAngkatan()
    }, [])

    const getProdi = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/prodi`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const prodi = response.data.body;
            setDataProdi(prodi)
        } catch (error) {
            console.error(error.message)
        }
    }
    
    const getAngkatan = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/angkatan`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )

            const angkatan = response.data.body.filter((data) => data.status_pendaftaran === 'buka');
            setAngkatan(angkatan)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const form = new FormData(e.target)
        const prodi = form.get('prodi')
        const angkatan = form.get('angkatan')
        
        try {
            let response = await axios.put(`/api/daftar/${parseData.id}`, {prodi, angkatan}, { 
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true 
            });

            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update User', 'success', 'OK!')
            Cookies.set("user", response.data.user, { expires: 1 })
            router.replace('/daftar')
        } catch (err) {
            console.log(err)
            Alert('Info', 'Gagal Update User', 'error', 'OK!')
        }
    }

    return (
        <>
            <NavbarComponent />
            <div className='mt-10 mx-12'>
                { parseData.user_id && parseData.id_prodi && parseData ? (
                    <Card title="Pendaftar[terdaftar]">
                        <p>selesai</p>
                    </Card>
                ) : (
                    <Card title="Pendaftaran">
                        <form className="max-w-sm mx-auto" onSubmit={(e) => handleForm(e)}>
                            <div className='mb-4'>
                                <div className="mb-2 block">
                                    <Label htmlFor="angkatan">Angkatan</Label>
                                </div>
                                    {dataAngkatan.map((data, i) => (
                                        <div key={i}>
                                            <TextInput disabled type="number" required defaultValue={data.tahun_angkatan} />
                                            <TextInput id="angkatan" name='angkatan' type="hidden" required defaultValue={data.id_angkatan} />
                                        </div>
                                    ))}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="prodi" className="block mb-2 text-sm font-medium text-gray-900">Pilih Prodi</label>
                                <Select id="prodi" name='prodi' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="">Pilih Prodi</option>
                                    {dataProdi.map((data, i) => <option key={i} value={data.id_prodi}>{data.nama_prodi}</option>)}
                                </Select>
                            </div>
                            <Button type='submit'>SUBMIT</Button>
                        </form>
                    </Card>
                ) }
            </div>
        </>
    )
}