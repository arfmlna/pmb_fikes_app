import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import parseData from '../method/GetCookies'
import Cookies from 'js-cookie'
import axios from 'axios'
import formatDateToYMD from '../method/YMD'
import { Alert } from '../Alert'
import { useRouter } from 'next/navigation'

export default function PendaftaranForm() {
    const [getPendaftaran, setPendaftaran] = useState({
        users: {},
        pendaftaran: [],
        dokumen: {}
    })

    const [getInputValue, setInputValue] = useState({
        country: [],
        prodi: []
    })

    const [getSelect, setSelect] = useState({
        kewarganegaraan: '',
        prodi1: '',
        prodi2: '',
    })

    const router = useRouter()

    useEffect(() => {
    const data = getPendaftaran?.pendaftaran?.[0];
    if (data) {
        setSelect({
        kewarganegaraan: data.kewarganegaraan || '',
        prodi1: data.prodi1 || '',
        prodi2: data.prodi2 || ''
        });
    }
    }, [getPendaftaran]);


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const token = Cookies.get('token')
        const country = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
        const resProdi = await axios.get('/api/prodi', {
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            withCredentials: true
        })
        const resUsers = await axios.get(`/api/users/${parseData.id}`, 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const resPendaftaran = await axios.get(`/api/pendaftaran/${parseData.id}`, 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const resDokumen = await axios.get(`/api/document/${parseData.id}`, 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        setInputValue({
            country: country.data.data,
            prodi: resProdi.data.body
        })
        setPendaftaran({
            users: resUsers.data.body,
            pendaftaran: resPendaftaran.data.body,
            dokumen: resDokumen.data.body
        })
    }

    const updateStatus = async (id, status, statusName) => {
        const token = Cookies.get('token')
        try {
            const response = await axios.put(`/api/users/status/${id}`, { status, statusName }, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },);
            Alert('Info', 'Status diperbarui', 'success', 'OK!');
            router.replace('/')
            console.log(response.data)
        } catch (error) {
            Alert('Info', 'Status gagal diperbarui', 'error', 'OK!');
            console.error("Gagal memperbarui status:", error.response||error);
        }
    }

    const isAllTrue = getPendaftaran.pendaftaran?.[0]?.konfirmasi && getPendaftaran.dokumen?.[0]?.status_kk && getPendaftaran.dokumen?.[0]?.status_ijazah && getPendaftaran.dokumen?.[0]?.status_ktp && getPendaftaran.dokumen?.[0]?.status_rapot 

    return (
        <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
            <div className='xl:max-w-7xl mx-auto w-full'>
                <div className='flex flex-col justify-center p-4 gap-2 border bg-white border-gray-300 rounded-lg w-full'>
                    <div className='flex flex-col justify-center gap-3 py-5 border-b border-b-gray-300'>
                        <h1 className="font-bold text-left md:text-xl lg:text-2xl w-full text-black">Informasi pendaftaran</h1>
                    </div>
                    { getPendaftaran.pendaftaran.map((data, i) => (
                        <div key={i} className='flex flex-col w-full justify-center gap-3 py-5'>
                            <span>Kelengkapan Data : {data.konfirmasi ? '✅':'❌'}</span>
                            <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Nama Lengkap</label>
                                        <input disabled defaultValue={data.nama_lengkap} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">NIM</label>
                                        <input disabled defaultValue={getPendaftaran.users?.[0]?.user_id} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Tanggal Daftar</label>
                                        <input 
                                            disabled
                                            type="date" 
                                            className='w-full p-2 rounded-lg border border-gray-300'
                                            min="1998-01-01"
                                            max="2010-12-31"
                                            defaultValue={formatDateToYMD(data.created_at)}
                                            onChange={(e) => {e.target.value}}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Asal Sekolah</label>
                                        <select disabled value={getSelect.kewarganegaraan || ""} onChange={(e) => setSelect(
                                            (prev) => ({ ...prev, kewarganegaraan: e.target.value })
                                        )} className='w-full p-2 rounded-lg border border-gray-300'>
                                            <option value="">- - Pilih Kewarganegaraan - -</option>
                                            {getInputValue.country.map((data, i) => <option key={i} value={data.name}>{data.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-3 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Nama Orang Tua / Wali</label>
                                        <input disabled defaultValue={data.nama_ortu} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">ID Pendaftar</label>
                                        <input disabled defaultValue={data.id_user} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Jalur Pendaftaran</label>
                                        <input disabled defaultValue={data.nama_seleksi} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Periode</label>
                                        <input disabled defaultValue={getPendaftaran.users?.[0]?.tahun_angkatan} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center py-5 items-center gap-5 w-full'>
                                <h1 className="font-bold flex-shrink-0 text-base md:text-lg text-left text-black">Pilihan Program Studi</h1>
                                <hr className='bg-gray-300 w-full h-0.5'/>
                            </div>
                            <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                <div className='flex flex-col justify-center gap-3 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Pilihan 1</label>
                                        <select disabled value={getSelect.prodi1} onChange={(e) => setSelect(
                                            (prev) => ({ ...prev, prodi1: e.target.value })
                                        )} className='w-full p-2 rounded-lg border border-gray-300'>
                                            <option value="">- - Pilih Prodi 1 - -</option>
                                            {getInputValue.prodi.map((data, i) => <option key={i} value={data.id_prodi}>{data.jenjang}-{data.nama_prodi}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className="text-base text-left text-black">Pilihan 2</label>
                                        <select disabled value={getSelect.prodi1} onChange={(e) => setSelect({prodi2: e.target.value})} className='w-full p-2 rounded-lg border border-gray-300'>
                                            <option value="">- - Pilih Prodi 2 - -</option>
                                            {getInputValue.prodi.map((data, i) => <option key={i} value={data.id_prodi}>{data.jenjang}-{data.nama_prodi}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-start py-5 items-center gap-5 w-full'>
                                <h1 className="flex-shrink-0 text-base md:text-lg text-left text-black">Program Studi Diterima : 
                                    <span>
                                        {getPendaftaran.users?.[0]?.jenjang}-{getPendaftaran.users?.[0]?.nama_prodi}
                                    </span>
                                </h1>
                            </div>
                            <div className='flex flex-col justify-between lg:flex-row w-full lg:items-center gap-5'>
                                <div className='flex flex-col justify-center gap-3 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='text-black grid grid-cols-2'>
                                            <span>Kartu keluarga (.pdf) :</span> 
                                            {getPendaftaran.dokumen?.[0]?.status_kk ? 
                                            <span className='text-green-500 font-bold text-end'>diterima</span> : 
                                            <span className='text-red-600 font-bold text-end'>tidak diterima</span>}
                                        </label>
                                        <a className='underline' target='_blank' href={`api/filename/${data.kk}`}>
                                            <div className='w-full p-2 rounded-lg border border-gray-300'>
                                                    kk.pdf
                                            </div>
                                        </a>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='text-black grid grid-cols-2'>
                                            <span>Surat Ijazah/Ket lulus (.pdf) :</span> 
                                            {getPendaftaran.dokumen?.[0]?.status_ijazah ? 
                                            <span className='text-green-500 font-bold text-end'>diterima</span> : 
                                            <span className='text-red-600 font-bold text-end'>tidak diterima</span>}
                                        </label>
                                            <a className='underline' target='_blank' href={`api/filename/${data.ijazah}`}>
                                                <div className='w-full p-2 rounded-lg border border-gray-300'>
                                                    ijazah.pdf
                                                </div>
                                            </a>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-2 w-full'>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='text-black grid grid-cols-2'>
                                            <span>Scan KTP/Akta Kelahiran (.pdf) :</span> 
                                            {getPendaftaran.dokumen?.[0]?.status_ktp ? 
                                            <span className='text-green-500 font-bold text-end'>diterima</span> : 
                                            <span className='text-red-600 font-bold text-end'>tidak diterima</span>}
                                        </label>
                                        <a className='underline' target='_blank' href={`api/filename/${data.ktp}`}>
                                            <div className='w-full p-2 rounded-lg border border-gray-300'>
                                                    KTP.pdf
                                            </div>
                                        </a>
                                    </div>
                                    <div className='flex flex-col justify-center gap-2 w-full'>
                                        <label className='text-black grid grid-cols-2'>
                                            <span>Transkrip Nilai (.pdf) :</span> 
                                            {getPendaftaran.dokumen?.[0]?.status_rapot ? 
                                            <span className='text-green-500 font-bold text-end'>diterima</span> : 
                                            <span className='text-red-600 font-bold text-end'>tidak diterima</span>}
                                        </label>
                                            <a className='underline' target='_blank' href={`api/filename/${data.nilai_rapot}`}>
                                                <div className='w-full p-2 rounded-lg border border-gray-300'>
                                                    transkrip.pdf
                                                </div>
                                            </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                    <div className='flex justify-end w-full border-t border-t-gray-300 pt-5 mt-5 gap-x-4'>
                        <button className='flex items-center group gap-2 bg-red-500 px-6 py-3 rounded-lg text-white' onClick={() => updateStatus(parseData.id, !getPendaftaran.users?.[0]?.mengundurkan, 'mengundurkan')}>
                            <p>Mengundurkan diri</p>
                        </button>
                        <button disabled={!isAllTrue} onClick={() => updateStatus(parseData.id, !getPendaftaran.users?.[0]?.heregistrasi, 'heregistrasi')} className={`flex items-center group gap-2 bg-blue-900 px-6 py-3 rounded-lg text-white ${isAllTrue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                            <p>Daftar Ulang</p><BsArrowRight className='group-hover:translate-x-1 transition-all ease-out'/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}