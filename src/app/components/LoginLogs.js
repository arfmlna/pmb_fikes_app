import axios from 'axios'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react'
import Cookie from 'js-cookie'
import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'

export default function LoginLogs() {
    const [openModal, setOpenModal] = useState(false)
    const [logs, setLogs] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);


    const roleUser = Cookie.get('role')
    const id = Cookie.get('userId')

    const getLogsUser = async (status, id=null) => {
        setOpenModal(status)
        try {
            const token = Cookie.get('token')
            let query = ``
            if (id) {
                query = `/api/logs/${id}`
            } else {
                query = `/api/logs`
            }
            const response = await axios.get(query,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const logs = response.data.body;
            setLogs(logs)
        } catch (error) {
            console.error(error.message)
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

    const time = (logs) => {
        return new Date(logs.login_time).toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
    })
    }


    return (
        <>
            <Modal size='7xl' show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Logs Login</ModalHeader>
                <ModalBody>
                    <DataTable value={logs} paginator showGridlines stripedRows rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='small' emptyMessage="Logs not found." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}>
                        <Column sortable field="user_id" header="user ID"></Column>
                        <Column sortable field="name" header="Name"></Column>
                        <Column sortable field="role" header="Role"></Column>
                        <Column sortable field="login_time" header="Date" body={time}></Column>
                    </DataTable>
                </ModalBody>
                <ModalFooter>
                <Button onClick={() => setOpenModal(false)}>I accept</Button>
                </ModalFooter>
            </Modal>
            <section className="flex w-full items-center justify-center">
                <div className="xl:max-w-7xl mx-auto w-full bg-white">
                    <section className="flex flex-col w-full gap-10 justify-center p-10">
                        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">Login Logs</h1>
                        <div className="flex flex-col justify-center items-start gap-4">
                            <Button onClick={() => getLogsUser(true, id)} className="text-sm md:text-md lg:text-lg font-bold">Lihat Aktivitas Login</Button>
                            { roleUser == "admin" ? <Button onClick={() => getLogsUser(true)} className="text-sm md:text-md lg:text-lg font-bold">Lihat Aktivitas Semua Users Login</Button> : "" }
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}
