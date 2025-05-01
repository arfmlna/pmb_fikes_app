'use client'
import axios from 'axios'
import { Label, Modal, ModalBody, ModalHeader, Select, TextInput } from 'flowbite-react'
import Cookies from 'js-cookie'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { Alert } from '../Alert'

export default function CRUDAngkatan() {
    const [dataAngkatan, setDataAngkatan] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id_angkatan: "",
        tahun_angkatan: "",
        status_pendaftaran: "",
    });

    useEffect(() => {
        getAngkatan()
    }, [])

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
            const angkatan = response.data.body;
            setDataAngkatan(angkatan)
        } catch (error) {
            console.error(error.message)
        }
    }

    const openCreateModal = () => {
        setFormData({
            id_angkatan: "",
            tahun_angkatan: "2020",
            status_pendaftaran: "",
        });
        setFormMode("create");
        setOpenModal(true);
    };
    
    const openEditModal = (angkatan) => {
        setFormData({ ...angkatan });
        setFormMode("edit");
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/angkatan/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getAngkatan()
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
        const tahun_angkatan = form.get('tahun_angkatan')
        const status_pendaftaran = form.get('status_pendaftaran')
        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/angkatan/${formData.id_angkatan}`, {tahun_angkatan, status_pendaftaran}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/angkatan`, {tahun_angkatan, status_pendaftaran}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            }
            
            getAngkatan()
            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update User', 'success', 'OK!')
        } catch (err) {
            console.log(err)
            Alert('Info', 'Gagal Update User', 'error', 'OK!')
        } finally {
            setOpenModal(false)
        }
    }

    const actionButton = (id_angkatan, tahun_angkatan, status_pendaftaran) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id_angkatan, tahun_angkatan, status_pendaftaran })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id_angkatan)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
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

    return (
        <div className='mx-10 mt-10'>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Menambahkan Angkatan</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tahun_angkatan">Tahun</Label>
                            </div>
                            <TextInput type="number" id="tahun_angkatan" name='tahun_angkatan' placeholder="2025" required 
                            defaultValue={formData.tahun_angkatan} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="status_pendaftaran">Status Pendaftaran</Label>
                            </div>
                            <Select id="status_pendaftaran" name='status_pendaftaran' required defaultValue={formData.status_pendaftaran}>
                                <option value="buka">Buka</option>
                                <option value="tutup">Tutup</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataAngkatan} paginator showGridlines stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='small' emptyMessage="Angkatan Tidak Tersedia." globalFilter={globalFilter} 
            header={headerTable} tableStyle={{ minWidth: '50rem' }} className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'
            rowClassName={(rowData) => rowData.status_pendaftaran === 'buka' ? 'bg-green-500 text-white' : 'bg-white'}>
                <Column sortable field="id_angkatan" header="ID"></Column>
                <Column sortable field="tahun_angkatan" header="Tahun Angkatan"></Column>
                <Column sortable field="status_pendaftaran" header="Status"></Column>
                <Column sortable header="Action" body={(rowData) => actionButton(rowData.id_angkatan, rowData.tahun_angkatan, rowData.status_pendaftaran)}></Column>
            </DataTable>
        </div>
    )
}
