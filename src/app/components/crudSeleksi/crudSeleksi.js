'use client'
import axios from 'axios'
import { Label, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import Cookies from 'js-cookie'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Alert } from '../Alert'

export default function CrudSeleksi() {
    const [dataSeleksi, setDataSeleksi] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id_seleksi: "",
        nama_seleksi: "",
    });


    useEffect(() => {
        getSeleksi()
    }, [])

    const getSeleksi = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/seleksi`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const seleksi = response.data.body;
            setDataSeleksi(seleksi)
        } catch (error) {
            console.error(error.message)
        }
    }

    const openCreateModal = () => {
        setFormData({
            id_seleksi: "",
            nama_seleksi: "",
        });
        setFormMode("create");
        setOpenModal(true);
    };
    
    const openEditModal = (seleksi) => {
        setFormData({ ...seleksi });
        setFormMode("edit");
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/seleksi/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getSeleksi()
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
        const nama_seleksi = form.get('nama_seleksi')

        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/seleksi/${formData.id_seleksi}`, {nama_seleksi}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/seleksi`, {nama_seleksi}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            }
            
            getSeleksi()
            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update User', 'success', 'OK!')
        } catch (err) {
            console.log(err)
            Alert('Info', 'Gagal Update User', 'error', 'OK!')
        } finally {
            setOpenModal(false)
        }
    }

    const actionButton = (id_seleksi, nama_seleksi) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id_seleksi, nama_seleksi })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id_seleksi)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    return (
        <div className=''>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>{formMode === 'create' ? "Tambahkan" : formMode === 'edit' ? "Edit" : ""} Jenis Seleksi</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nama_seleksi">Masukan Seleksi</Label>
                            </div>
                            <TextInput id="nama_seleksi" name='nama_seleksi' required defaultValue={formData.nama_seleksi}/>
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <h1 className='capitalize text-3xl mb-5 font-extrabold'>Jenis Seleksi</h1>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataSeleksi} showGridlines stripedRows resizableColumns size='large' emptyMessage="Jenis Seleksi Tidak Tersedia." globalFilter={globalFilter} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'>
                <Column header="No." body={(rowData, options) => options.rowIndex+1} className='py-5'></Column>
                <Column sortable field="nama_seleksi" header="Nama Seleksi" className='py-5'></Column>
                <Column header="Action" body={(rowData) => actionButton(rowData.id_seleksi, rowData.nama_seleksi)} className='py-5'></Column>
            </DataTable>
        </div>
    )
}
