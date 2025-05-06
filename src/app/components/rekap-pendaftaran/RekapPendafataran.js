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
import tgl from '../method/formatTgl'
import formatDateToYMD from '../method/YMD'
import getYearOptions from '../method/ListTahun'

export default function RekapPendafataran() {
    const [dataPendaftaran, setDataPendaftaran] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({
        id_pendaftaran: "",
        id_user: "",
        jalur: "",
        fullname: "",
        no_hp: "",
        tgl_lahir: "",
        warganegara: "",
        fullname_parent: "",
        jenis_kelamin: "",
        email: "",
        tmpt_lahir: "",
        nik: "",
        no_hp_ortu: "",
        provinsi: "",
        jenis_sekolah: "",
        jurusan: "",
        kabkota: "",
        npsn: "",
        tahun_lulus: "",
        prodi1: "",
        prodi2: ""
    });
    const [seleksiprodi, setSeleksiprodi] = useState({
        prodi: [],
        seleksi: []
    })
    const [getCountry, setCountry] = useState([])
    const [getTmpt, setTmpt] = useState({
        provinsi: [],
        kota: []
    })
    const [getProdi, setProdi] = useState([])
    const [users, setUsers] = useState([])


    useEffect(() => {
        getPendaftaran()
        getSeleksiProdi()
        country()
        tmpt()
        prodi()
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get('/api/users', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            const data = response.data.body.filter((data) => data.role === 'users')
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const country = async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
            const filter = response.data.data
            setCountry(filter)
        } catch (error) {
            console.log(error)
        }
    }

    const tmpt = async () => {
        try {
            const provinsi = await axios.get(`https://alamat.thecloudalert.com/api/provinsi/get/`)
            const kabkota = await axios.get(`https://alamat.thecloudalert.com/api/kabkota/get`)
            setTmpt({
                provinsi : provinsi.data.result,
                kota: kabkota.data.result
            })
        } catch (error) {
            console.log(error)
        }
    }

    const years = getYearOptions(2000);

    const prodi = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get('/api/prodi', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            setProdi(response.data.body)
        } catch (error) {
            console.log(error)
        }
    }

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

    const getPendaftaran = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get(`/api/pendaftaran`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const pendaftaran = response.data.body;
            setDataPendaftaran(pendaftaran)
        } catch (error) {
            console.error(error.message)
        }
    }

    const openCreateModal = () => {
        setFormData({
            id_user: "",
            jalur: "",
            fullname: "",
            no_hp: "",
            tgl_lahir: "",
            warganegara: "",
            fullname_parent: "",
            jenis_kelamin: "",
            email: "",
            tmpt_lahir: "",
            nik: "",
            no_hp_ortu: "",
            provinsi: "",
            jenis_sekolah: "",
            jurusan: "",
            kabkota: "",
            npsn: "",
            tahun_lulus: "",
            prodi1: "",
            prodi2: ""
        });
        setFormMode("create");
        setOpenModal(true);
    };
    
    const openEditModal = (pendaftaran) => {
        setFormData({ ...pendaftaran });
        setFormMode("edit");
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.delete(`/api/pendaftaran/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            })
            getPendaftaran()
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
        const id_user = form.get('id_user')
        const jalur = form.get('jalur')
        const fullname = form.get('fullname')
        const no_hp = form.get('no_hp')
        const tgl_lahir = form.get('tgl_lahir')
        const warganegara = form.get('warganegara')
        const fullname_parent = form.get('fullname_parent')
        const jenis_kelamin = form.get('jenis_kelamin')
        const email = form.get('email')
        const tmpt_lahir = form.get('tmpt_lahir')
        const nik = form.get('nik')
        const no_hp_ortu = form.get('no_hp_ortu')
        const provinsi = form.get('provinsi')
        const jenis_sekolah = form.get('jenis_sekolah')
        const jurusan = form.get('jurusan')
        const kabkota = form.get('kabkota')
        const npsn = form.get('npsn')
        const tahun_lulus = form.get('tahun_lulus')
        const prodi1 = form.get('prodi1')
        const prodi2 = form.get('prodi2')

        try {
            let response
            if (formMode === "edit") {
                response = await axios.put(`/api/pendaftaran/${formData.id_pendaftaran}`, {id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            } else {
                response = await axios.post(`/api/pendaftaran/${id_user}`, {jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2}, { 
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true 
                });
            }
            
            getPendaftaran()
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

    const actionButton = (id_pendaftaran, id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2) => {
        return (
            <div className='flex gap-3'>
                <Button 
                onClick={() => openEditModal({ id_pendaftaran, id_user, jalur, fullname, no_hp, tgl_lahir, warganegara, fullname_parent, jenis_kelamin, email, tmpt_lahir, nik, no_hp_ortu, provinsi, jenis_sekolah, jurusan, kabkota, npsn, tahun_lulus, prodi1, prodi2 })} 
                className='bg-yellow-200' icon="pi pi-pen-to-square" text />
                <Button
                onClick={() => handleDelete(id_user)} className='bg-red-600' icon="pi pi-trash" text />
            </div>
        )
    }
    
    return (
      <>
          <div className='flex flex-col justify-center items-center lg:px-10 lg:py-20 md:px-8 md:py-16 py-12 px-6 lg:gap-y-10 gap-y-5 h-full w-screen'>
              <h1 className='text-center lg:text-4xl md:text-2xl text-xl'>Daftar Rekap Pendafataran</h1>
              {!dataPendaftaran ? (
                  <h1 className='text-center lg:text-4xl md:text-2xl text-xl'>Loading...</h1>
              ) : (
                  <>
                    <div className='w-full'>
                        <Modal size='4xl' show={openModal} onClose={() => setOpenModal(false)}>
                            <ModalHeader>Pendafataran</ModalHeader>
                            <ModalBody>
                                <form onSubmit={(e) => handleForm(e)} className="space-y-6">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="id_user">Masukan ID Users</Label>
                                        </div>
                                        <Select id="id_user" name='id_user' required defaultValue={formData.id_user}>
                                            {users.map((data, i) => (<option key={i} value={data.id}>{data.id}</option>))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="jalur">Masukan Seleksi</Label>
                                        </div>
                                        <Select id="jalur" name='jalur' required defaultValue={formData.jalur}>
                                            {seleksiprodi.seleksi.map((data, i) => <option key={i} value={data.id_seleksi}>{data.nama_seleksi}</option>)}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="fullname">Masukan Fullname</Label>
                                        </div>
                                        <TextInput id="fullname" name='fullname' placeholder="Fullname" required 
                                        defaultValue={formData.fullname} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="no_hp">Masukan No. HP</Label>
                                        </div>
                                        <TextInput id="no_hp" name='no_hp' placeholder="Pendidikan Teknologi Informasi" required 
                                        defaultValue={formData.no_hp} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="tgl_lahir">Masukan No. HP</Label>
                                        </div>
                                        <TextInput type='date' id="tgl_lahir" name='tgl_lahir' placeholder="Pendidikan Teknologi Informasi" required 
                                        defaultValue={formatDateToYMD(formData.tgl_lahir)} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="warganegara">Masukan Seleksi</Label>
                                        </div>
                                        <Select id="warganegara" name='warganegara' required defaultValue={formData.warganegara}>
                                            {getCountry.map((data, i) => (
                                                <option key={i} value={data.name}>{data.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="fullname_parent">Masukan Nama Orang Tua</Label>
                                        </div>
                                        <TextInput id="fullname_parent" name='fullname_parent' placeholder="Nama Orang Tua" required 
                                        defaultValue={formData.fullname_parent} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="jenis_kelamin">Masukan Seleksi</Label>
                                        </div>
                                        <Select id="jenis_kelamin" name='jenis_kelamin' required defaultValue={formData.jenis_kelamin}>
                                            <option value={'perempuan'}>Perempuan</option>
                                            <option value={'laki-laki'}>Laki-Laki</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email">Masukan Email</Label>
                                        </div>
                                        <TextInput id="email" name='email' placeholder="Email" required 
                                        defaultValue={formData.email} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="tmpt_lahir">Masukan Tempat Lahir</Label>
                                        </div>
                                        <TextInput id="tmpt_lahir" name='tmpt_lahir' placeholder="Tempat Lahir" required 
                                        defaultValue={formData.tmpt_lahir} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="nik">Masukan NIK</Label>
                                        </div>
                                        <TextInput id="nik" name='nik' placeholder="NIK" required 
                                        defaultValue={formData.nik} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="no_hp_ortu">Masukan No. HP Orang Tua</Label>
                                        </div>
                                        <TextInput id="no_hp_ortu" name='no_hp_ortu' placeholder="No. HP Orang Tua" required 
                                        defaultValue={formData.no_hp_ortu} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="provinsi">Masukan Provinsi</Label>
                                        </div>
                                        <Select id="provinsi" name='provinsi' required defaultValue={formData.provinsi}>
                                            {getTmpt.provinsi.map((data, i) => (
                                                <option key={i} value={data.text}>{data.text}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="jenis_sekolah">Masukan Jenis Sekolah</Label>
                                        </div>
                                        <Select id="jenis_sekolah" name='jenis_sekolah' required defaultValue={formData.jenis_sekolah}>
                                                <option value="">- - Pilih Jenis Sekolah - -</option>
                                                <option value="SMA">SMA</option>
                                                <option value="SMK">SMK</option>
                                                <option value="MA">MA</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="jurusan">Masukan Jurusan</Label>
                                        </div>
                                        <TextInput id="jurusan" name='jurusan' placeholder="Jurusan" required 
                                        defaultValue={formData.jurusan} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="kabkota">Masukan Jenis Sekolah</Label>
                                        </div>
                                        <Select id="kabkota" name='kabkota' required defaultValue={formData.kabkota}>
                                            {getTmpt.kota.map((data,i) => (
                                                <option key={i} value={data.text}>{data.text}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="npsn">Masukan Nama Sekolah</Label>
                                        </div>
                                        <TextInput id="npsn" name='npsn' placeholder="Nama Sekolah" required 
                                        defaultValue={formData.npsn} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="tahun_lulus">Masukan Tahun Lulus</Label>
                                        </div>
                                        <Select type='number' id="tahun_lulus" name='tahun_lulus' placeholder="Tahun Lulus" required 
                                        defaultValue={formData.tahun_lulus}>
                                            {years.map((year, i) => (
                                                <option key={i} value={year.value}>{year.value}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="prodi1">Masukan Jenis Sekolah</Label>
                                        </div>
                                        <Select id="prodi1" name='prodi1' required defaultValue={formData.prodi1}>
                                            {getProdi.map((data, i) => (
                                                <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="prodi2">Masukan Jenis Sekolah</Label>
                                        </div>
                                        <Select id="prodi2" name='prodi2' required defaultValue={formData.prodi2}>
                                            {getProdi.map((data, i) => (
                                                <option key={i} value={data.id_prodi}>{data.jenjang} {data.nama_prodi}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <Button className='py-3 px-4 bg-blue-600 text-white rounded-md' type='submit' label='SUBMIT'/>
                                    </div>
                                </form>
                            </ModalBody>
                        </Modal>
                        <h1 className='capitalize text-3xl mb-5 font-extrabold underline'>seleksi</h1>
                        <Button className='px-5 py-3 mb-5' icon="pi pi-plus" text raised onClick={openCreateModal} />
                        <DataTable value={dataPendaftaran} paginator showGridlines stripedRows rows={10} rowsPerPageOptions={[10, 15, 20, 25]} paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown" currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight resizableColumns size='small' emptyMessage="Prodi Tidak Tersedia." globalFilter={globalFilter} header={headerTable} tableStyle={{ minWidth: '50rem' }}
                        className="rounded-md overflow-hidden shadow-md border border-gray-300 text-sm"
                        paginatorClassName='bg-[#fafafa]'>
                            <Column sortable className='py-7' body={(rowData, options) => options.rowIndex+1} header="ID"></Column>
                            <Column sortable className='py-7' field="id_user" header="ID Users"></Column>
                            <Column sortable className='py-7' field="nama_seleksi" header="Seleksi"></Column>
                            <Column sortable className='py-7' field="nama_lengkap" header="Nama Lengkap"></Column>
                            <Column sortable className='py-7' field="no_hp" header="No. HP"></Column>
                            <Column sortable className='py-7' body={(rowData) => tgl(rowData.tgl_lahir)} header="TGL Lahir"></Column>
                            <Column sortable className='py-7' field="kewarganegaraan" header="Warganegara"></Column>
                            <Column sortable className='py-7' field="nama_ortu" header="Nama Orang Tua"></Column>
                            <Column sortable className='py-7' field="jenis_kelamin" header="Jenis Kelamin"></Column>
                            <Column sortable className='py-7' field="email" header="Email"></Column>
                            <Column sortable className='py-7' field="tmpt_lahir" header="Tempat Lahir"></Column>
                            <Column sortable className='py-7' field="nik_ktp" header="NIK/KTP"></Column>
                            <Column sortable className='py-7' field="no_hp_ortu" header="No. HP Orang Tua"></Column>
                            <Column sortable className='py-7' field="provinsi" header="Provinsi"></Column>
                            <Column sortable className='py-7' field="jenis_sekolah" header="Jenis Sekolah"></Column>
                            <Column sortable className='py-7' field="jurusan_sekolah" header="Jurusan Sekolah"></Column>
                            <Column sortable className='py-7' field="alamat_sekolah" header="Alamat Sekolah"></Column>
                            <Column sortable className='py-7' field="nama_sekolah" header="Nama Sekolah"></Column>
                            <Column sortable className='py-7' field="tahun_lulus" header="Tahun Lulus"></Column>
                            <Column sortable className='py-7' field="nama_prodi1" header="Prodi Pilihan 1"></Column>
                            <Column sortable className='py-7' field="nama_prodi2" header="Prodi Pilihan 2"></Column>
                            <Column sortable className='py-7' body={(rowData) => (
                                <Select defaultValue={rowData.konfirmasi}>
                                    <option value={1}>sudah</option>
                                    <option value={0}>belum</option>
                                </Select>
                            )} header="Status"></Column>
                            <Column sortable className='py-7' header="Action" body={(rowData) => actionButton(
                                rowData.id_pendaftaran, rowData.id_user, rowData.id_seleksi, rowData.nama_lengkap, rowData.no_hp, rowData.tgl_lahir, rowData.kewarganegaraan, rowData.nama_ortu, rowData.jenis_kelamin, rowData.email, rowData.tmpt_lahir, rowData.nik_ktp, rowData.no_hp_ortu, rowData.provinsi, rowData.jenis_sekolah, rowData.jurusan_sekolah, rowData.alamat_sekolah, rowData.nama_sekolah, rowData.tahun_lulus, rowData.prodi1, rowData.prodi2
                            )}></Column>
                        </DataTable>
                    </div>
                  </>
              )}
          </div>
  
      </>
    )
  }
