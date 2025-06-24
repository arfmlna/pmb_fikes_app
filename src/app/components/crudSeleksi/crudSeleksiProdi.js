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
import rupiah from '../method/Rupiah'
import { tgl } from '../method/formatTgl'
import formatDateToYMD from '../method/YMD'

export default function CrudSeleksiProdi() {
    const [dataSeleksi, setDataSeleksi] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id: "",
        id_prodi: "",
        id_seleksi: "",
        mulai: "",
        selesai: "",
        harga: "",
        nama_prodi: "",
        nama_seleksi: "",
    });
    const [seleksiprodi, setSeleksiprodi] = useState({
        prodi: [],
        seleksi: []
    })


    useEffect(() => {
        getSeleksi()
        getSeleksiProdi()
    }, [])

    const getSeleksiProdi = async () => {
        try {
            const token = Cookies.get('token')
            const responseProdi = await axios.get(`/api/prodi`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const responseSeleksi = await axios.get(`/api/seleksi`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )

            setSeleksiprodi({
                prodi: responseProdi.data.body,
                seleksi: responseSeleksi.data.body
            })

        } catch (error) {
            console.error(error.message)
        }
    }

    const getSeleksi = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/seleksi_prodi`,
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
            id: "",
            id_prodi: "",
            id_seleksi: "",
            mulai: "",
            selesai: "",
            harga: "",
            nama_prodi: "",
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
            const response = await axios.delete(`/api/seleksi_prodi/${id}`, {
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
        const id_prodi = form.get('id_prodi')
        const id_seleksi = form.get('id_seleksi')
        const mulai = form.get('mulai')
        const selesai = form.get('selesai')
        const harga = form.get('harga')

        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/seleksi_prodi/${formData.id}`, { id_prodi, id_seleksi, mulai, selesai, harga}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/seleksi_prodi`, { id_prodi, id_seleksi, mulai, selesai, harga}, { 
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

    const actionButton = (id, id_prodi, id_seleksi, mulai, selesai, harga, nama_prodi, nama_seleksi) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id, id_prodi, id_seleksi, mulai, selesai, harga, nama_prodi, nama_seleksi })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    return (
        <div className=''>
            <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>{formMode === 'create' ? "Tambahkan" : formMode === 'edit' ? "Edit" : ""} Seleksi</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="id_prodi">Masukan Prodi</Label>
                            </div>
                            <Select id="id_prodi" name='id_prodi' required defaultValue={formData.id_prodi}>
                                {seleksiprodi.prodi.map((data,i) => <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option> )}
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="id_seleksi">Masukan Seleksi</Label>
                            </div>
                            <Select id="id_seleksi" name='id_seleksi' required defaultValue={formData.id_seleksi}>
                                {seleksiprodi.seleksi.map((data, i) => <option key={i} value={data.id_seleksi}>{data.nama_seleksi}</option>)}
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mulai">Masukan Mulai</Label>
                            </div>
                            <TextInput type='date' id="mulai" name='mulai' required defaultValue={formatDateToYMD(formData.mulai)}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="selesai">Masukan Selesai</Label>
                            </div>
                            <TextInput type='date' id="selesai" name='selesai' required defaultValue={formatDateToYMD(formData.selesai)}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="harga">Masukan Harga</Label>
                            </div>
                            <TextInput id="harga" name='harga' required defaultValue={formData.harga}/>
                        </div>
                        <div className="w-full">
                            <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <h1 className='capitalize text-3xl mb-5 font-extrabold'>Seleksi</h1>
            <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
            <DataTable value={dataSeleksi} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={[10, 15, 20, 25]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='large' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]'>
                <Column body={(rowData, options) => options.rowIndex+1} header="ID"></Column>
                <Column sortable field='nama_prodi' body={(rowData) => `${rowData.jenjang}-${rowData.nama_prodi}`} header="Prodi"></Column>
                <Column sortable field="nama_seleksi" header="Seleksi"></Column>
                <Column sortable field='mulai' body={(rowData) => tgl(rowData.mulai)} header="Mulai"></Column>
                <Column sortable field='selesai' body={(rowData) => tgl(rowData.selesai)} header="Selesai"></Column>
                <Column sortable field='harga' body={(rowData) => rupiah(rowData.harga)} header="Harga"></Column>
                <Column header="Action" body={(rowData) => actionButton(rowData.id, rowData.id_prodi, rowData.id_seleksi, rowData.mulai, rowData.selesai, rowData.harga, rowData.nama_prodi, rowData.nama_seleksi)}></Column>
            </DataTable>
        </div>
    )
}
