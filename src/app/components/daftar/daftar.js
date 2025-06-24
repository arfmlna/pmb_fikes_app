'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Alert } from '../Alert';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Label, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Pagination } from '../method/Pagination';

export default function CrudUsers() {
    const [getDataPendaftaran, setDataPendaftaran] = useState(null)
    const [dataProdi, setDataProdi] = useState([])
    const [dataAngkatan, setAngkatan] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        id_prodi: "",
        id_angkatan: "",
    });

    useEffect(() => {
        getUsers()
        getProdi()
        getAngkatan()
        getPendaftaran()
    }, [])

    const getUsers = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/users`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const users = response.data.body.filter((data) => data.role === "users");
            setDataUsers(users)
        } catch (error) {
            console.error(error)
        }
    }

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

    const getPendaftaran = async (id) => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/pendaftaran/${id}`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const prodi1 = response?.data?.body[0]?.prodi1
            setDataPendaftaran(prodi1)
        } catch (error) {
            Alert("Info", error, "error", "OK")
        }
    }
    
    const openEditModal = (users) => {
        setFormData({ ...users });
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/users/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getUsers()
            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update', 'success', 'OK!')
        } catch (error) {
            console.log(error)
            Alert('Info', 'Gagal Update', 'error', 'OK!')
        }
    }
      
    const handleForm = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const form = new FormData(e.target)
        const prodi = form.get('id_prodi')
        const angkatan = form.get('id_angkatan')
        
        try {
            let response = await axios.put(`/api/daftar/${formData.id}`, {prodi, angkatan}, { 
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true 
            });
            getUsers()
            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update User', 'success', 'OK!')
        } catch (err) {
            console.log(err)
            Alert('Info', 'Gagal Update User', 'error', 'OK!')
        } finally {
            setOpenModal(false)
        }
    }

    const headerTable = (
        <div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"></InputIcon>
                <InputText
                    type='text'
                    className='rounded-sm w-full md:w-[calc(100%/4)] py-2 pe-2 placeholder-shown:ps-9 focus:ps-9'
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari Data"
                />
            </IconField>
        </div>
    );

    const actionButton = (id, id_prodi, id_angkatan) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={async () => {
                    await getPendaftaran(id)
                    openEditModal({ id, id_prodi, id_angkatan })
                }} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    const pages = Pagination(dataUsers.length, 10)

    return (
        <div className='mx-10 mt-10'>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Edit Keputusan Akhir</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="id_prodi">Masukan Prodi</Label>
                            </div>
                            <select id="id_prodi" name='id_prodi' defaultValue={formData.id_prodi || getDataPendaftaran} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option defaultValue="">Pilih Prodi</option>
                                {dataProdi.map((data, i) => <option key={i} value={data.id_prodi}>{data.nama_prodi}</option>)}
                            </select>
                        </div>
                        <div className='mb-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="id_angkatan">Angkatan</Label>
                            </div>
                            <select id="id_angkatan" name='id_angkatan' defaultValue={formData.id_angkatan} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {dataAngkatan.map((data, i) => <option key={i} value={data.id_angkatan}>{data.tahun_angkatan}</option>)}
                            </select>
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <DataTable value={dataUsers} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={pages} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='normal' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'>
                <Column sortable field="id" header="ID"></Column>
                <Column sortable body={(rowData) => rowData.user_id !== null && rowData.user_id !== undefined ? rowData.user_id : <p className='text-yellow-300'>Belum Daftar</p>} field="user_id" header="NIM"></Column>
                <Column sortable field="name" header="Nama"></Column>
                <Column sortable body={(rowData) => rowData.nama_prodi !== null && rowData.nama_prodi !== undefined ? rowData.nama_prodi : <p className='text-yellow-300'>Belum Pilih Prodi</p>} field="nama_prodi" header="Prodi"></Column>
                <Column sortable body={(rowData) => rowData.tahun_angkatan !== null && rowData.tahun_angkatan !== undefined ? rowData.tahun_angkatan : <p className='text-yellow-300'>Belum Daftar</p>} field="tahun_angkatan" header="Angkatan"></Column>
                <Column sortable body={(rowData) => {return rowData.user_id && rowData.nama_prodi && rowData.tahun_angkatan ? (<p className="text-green-400">Lulus</p>) : (<p className="text-red-700">Belum Lolos</p>)}} field="user_id" header="Kelulusan"></Column>
                <Column header="Action" body={(rowData) => actionButton(rowData.id, rowData.id_prodi, rowData.id_angkatan)}></Column>
            </DataTable>
        </div>
    )
}
