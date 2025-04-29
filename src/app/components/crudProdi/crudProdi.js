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

export default function CRUDProdi() {
    const [dataProdi, setDataProdi] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id_prodi: "",
        jenjang: "",
        nama_prodi: "",
        banyak_jalur: "",
    });


    useEffect(() => {
        getProdi()
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

    const openCreateModal = () => {
        setFormData({
          id_prodi: "",
          jenjang: "",
          nama_prodi: "",
          banyak_jalur: "",
        });
        setFormMode("create");
        setOpenModal(true);
    };
    
    const openEditModal = (prodi) => {
        setFormData({ ...prodi });
        setFormMode("edit");
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/prodi/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getProdi()
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
        const jenjang = form.get('jenjang')
        const nama_prodi = form.get('nama_prodi')
        const banyak_jalur = form.get('banyak_jalur')
        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/prodi/${formData.id_prodi}`, {jenjang, nama_prodi, banyak_jalur}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/prodi`, {jenjang, nama_prodi, banyak_jalur}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            }
            
            getProdi()
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

    const actionButton = (id_prodi, jenjang, nama_prodi, banyak_jalur) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id_prodi, jenjang, nama_prodi, banyak_jalur })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id_prodi)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    return (
        <div className='mx-10 mt-10'>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Menambahkan Prodi</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="jenjang">Masukan Jenjang</Label>
                            </div>
                            <Select id="jenjang" name='jenjang' required defaultValue={formData.jenjang}>
                                <option value="S1">S1</option>
                                <option value="D3">D3</option>
                                <option value="Prof">Profesi</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nama_prodi">Masukan Nama Prodi</Label>
                            </div>
                            <TextInput id="nama_prodi" name='nama_prodi' placeholder="Pendidikan Teknologi Informasi" required 
                            defaultValue={formData.nama_prodi} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="banyak_jalur">Masukan Banyak Jalur</Label>
                            </div>
                            <TextInput type='number' min='1' id="banyak_jalur" name='banyak_jalur' placeholder="1" required 
                            defaultValue={formData.banyak_jalur} />
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataProdi} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={[10, 15, 20, 25]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='small' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}>
                <Column sortable field="id_prodi" header="ID"></Column>
                <Column sortable field="jenjang" header="Jenjang"></Column>
                <Column sortable field="nama_prodi" header="Nama Prodi"></Column>
                <Column sortable field="banyak_jalur" header="Banyak Jalur"></Column>
                <Column sortable header="Action" body={(rowData) => actionButton(rowData.id_prodi, rowData.jenjang, rowData.nama_prodi, rowData.banyak_jalur)}></Column>
            </DataTable>
        </div>
    )
}
