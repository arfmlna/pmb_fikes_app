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
import Link from 'next/link';
import { Pagination } from '../method/Pagination';

export default function CrudDokumen() {
    const [dokumen, setDokumen] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    
    useEffect(() => {
        getDokumen()
    }, [])

    const getDokumen = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/dokumen`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const users = response.data.body
            
            setDokumen(users)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/dokumen'/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getDokumen()
            console.log("Update successful:", response.data);
            Alert('Info', 'Berhasil Update', 'success', 'OK!')
        } catch (error) {
            console.log(error)
            Alert('Info', 'Gagal Update', 'error', 'OK!')
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

    const actionButton = (id) => {
        return (
            <div className='flex gap-3'>
                <Button
                onClick={() => handleDelete(id)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }

    const rowExpansionTemplate = (data) => {
    return (
        <div className="p-6 bg-gray-50 border-l-4 border-blue-200 rounded-b-md text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <p className="font-semibold text-gray-700">Dokumen Ijazah</p>
                    <Link href={`/api/filename/${data.ijazah}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen SKHU</p>
                    <Link href={`/api/filename/${data.skhu}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen Nilai Rapot</p>
                    <Link href={`/api/filename/${data.nilai_rapot}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen Sertifikat</p>
                    <Link href={`/api/filename/${data.sertifikat}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen KTP</p>
                    <Link href={`/api/filename/${data.ktp}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen KK</p>
                    <Link href={`/api/filename/${data.kk}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Foto</p>
                    <Link href={`/api/filename/${data.foto}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Dokumen Lain</p>
                    <Link href={`/api/filename/${data.dokumen_lain}`} target='_blank' className='text-blue-700 underline'>click</Link>
                </div>
            </div>
        </div>
    );
    };

    const pages = Pagination(dokumen.length, 10)

    return (
        <div className='mx-1 md:mx-10 mt-10'>
            <DataTable value={dokumen} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={pages} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='large' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
            className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
            paginatorClassName='bg-[#fafafa]' expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
                <Column expander style={{ width: '3em' }} />
                <Column sortable body={(rowData) => rowData.user_id !== null && rowData.user_id !== undefined ? rowData.user_id : <p className='text-yellow-300'>Belum Daftar</p>} field="user_id" header="NIM"></Column>
                <Column sortable field="nama_lengkap" header="Name"></Column>

                <Column header="Action" body={(rowData) => actionButton(rowData.id)}></Column>
            </DataTable>
        </div>
    )
}
