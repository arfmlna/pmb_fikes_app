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

export default function CrudAdmins() {
    const [dataUsers, setDataUsers] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
    });
    useEffect(() => {
        getUsers()
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
            const users = response.data.body.filter((data) => data.role === "admin");
            setDataUsers(users)
        } catch (error) {
            console.error(error.message)
        }
    }

    const openCreateModal = () => {
        setFormData({
            id: "",
            name: "",
            email: "",
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
    
        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/users/${formData.id}`, {name, email}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                const role = 'admin'
                response = await axios.post(`/api/users`, {name, email, password, role}, { 
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

    const actionButton = (id, name, email) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id, name, email })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }
    return (
        <div className='mx-10 mt-10'>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>{formMode === 'create' ? "Tambahkan" : formMode === 'edit' ? "Edit" : ""} Admin</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
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
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataUsers} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={[10, 15, 20, 25]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='large' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'>
                <Column sortable field="name" header="Nama"></Column>
                <Column sortable field="email" header="Email"></Column>
                <Column header="Action" body={(rowData) => actionButton(rowData.id, rowData.name, rowData.email)}></Column>
            </DataTable>
        </div>
    )
}
