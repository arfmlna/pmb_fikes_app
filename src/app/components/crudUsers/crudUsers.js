'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Alert } from '../Alert';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Label, Modal, ModalBody, ModalHeader, Select, TextInput } from 'flowbite-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Pagination } from '../method/Pagination';

export default function CrudUsers() {
    const [dataProdi, setDataProdi] = useState([])
    const [dataAngkatan, setAngkatan] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id: "",
        user_id: "",
        name: "",
        email: "",
        role: "",
        id_prodi: "",
        id_angkatan: "",
    });
    useEffect(() => {
        getUsers()
        getProdi()
        getAngkatan()
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
            console.error(error.message)
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

            const angkatan = response.data.body
            setAngkatan(angkatan)
        } catch (error) {
            console.error(error.message)
        }
    }

    const openCreateModal = () => {
        setFormData({
            id: "",
            user_id: "",
            name: "",
            email: "",
            role: "",
            id_prodi: "",
            id_angkatan: "",
        });
        setFormMode("create");
        setOpenModal(true);
    };
    
    const openEditModal = (users) => {
        setFormData({ ...users });
        setFormMode("edit");
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
        const user_id = form.get('user_id')
        const name = form.get('name')
        const email = form.get('email')
        const password = form.get('password')
        const id_prodi = form.get('id_prodi')
        const id_angkatan = form.get('id_angkatan')
    
        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/users/${formData.id}`, {user_id, name, email, id_prodi, id_angkatan}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/users`, {user_id, name, email, password, id_prodi, id_angkatan}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            }
            
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

    const actionButton = (id, user_id, name, email, id_prodi, id_angkatan) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id, user_id, name, email, id_prodi, id_angkatan })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    const pages = Pagination(dataUsers.length, 10)

    return (
        <div className='mx-1 md:mx-10 mt-10'>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>{formMode === 'create' ? "Tambahkan" : formMode === 'edit' ? "Edit" : ""} Users</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="user_id">Masukan NIM</Label>
                            </div>
                            <TextInput id="user_id" name='user_id' placeholder="Masukan NIM" required 
                            defaultValue={formData.user_id} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Masukan Nama</Label>
                            </div>
                            <TextInput id="name" name='name' placeholder="Masukan Nama" required 
                            defaultValue={formData.name} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Masukan Email</Label>
                            </div>
                            <TextInput id="email" name='email' placeholder="Masukan Email" required 
                            defaultValue={formData.email} />
                        </div>
                        {formMode === "create" ? (
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password">Masukan Password</Label>
                                </div>
                                <TextInput id="password" name='password' placeholder="Masukan Password" required />
                            </div>
                        ) : ""}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="id_prodi">Masukan Prodi</Label>
                            </div>
                            <Select id="id_prodi" name='id_prodi' defaultValue={formData.id_prodi} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option defaultValue="">Pilih Prodi</option>
                                {dataProdi.map((data, i) => <option key={i} value={data.id_prodi}>{data.nama_prodi}</option>)}
                            </Select>
                        </div>
                        <div className='mb-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="id_angkatan">Angkatan</Label>
                            </div>
                            <Select id="id_angkatan" name='id_angkatan' defaultValue={formData.id_angkatan} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option defaultValue="">Pilih Angkatan</option>
                                {dataAngkatan.map((data, i) => <option key={i} value={data.id_angkatan}>{data.tahun_angkatan}</option>)}
                            </Select>
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataUsers} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={pages} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='normal' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'>
                <Column sortable field="id" header="ID"></Column>
                <Column sortable body={(rowData) => rowData.user_id !== null && rowData.user_id !== undefined ? rowData.user_id : <p className='text-yellow-300'>Belum Daftar</p>} field="user_id" header="NIM"></Column>
                <Column sortable field="name" header="Nama"></Column>
                <Column sortable field="email" header="Email"></Column>
                <Column sortable body={(rowData) => rowData.nama_prodi !== null && rowData.nama_prodi !== undefined ? rowData.nama_prodi : <p className='text-yellow-300'>Belum Pilih Prodi</p>} field="nama_prodi" header="Prodi"></Column>
                <Column sortable body={(rowData) => rowData.tahun_angkatan !== null && rowData.tahun_angkatan !== undefined ? rowData.tahun_angkatan : <p className='text-yellow-300'>Belum Daftar</p>} field="tahun_angkatan" header="Angkatan"></Column>
                <Column header="Action" body={(rowData) => actionButton(rowData.id, rowData.user_id, rowData.name, rowData.email, rowData.id_prodi, rowData.id_angkatan)}></Column>
            </DataTable>
        </div>
    )
}
