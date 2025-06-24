import React, { useEffect, useState } from 'react'
import { FaCalendar, FaUser, FaUserCheck } from "react-icons/fa";
import { FaUserXmark} from "react-icons/fa6";
import Cookies from 'js-cookie';
import axios from 'axios';
import { RiBarChart2Fill } from 'react-icons/ri';
import rupiah from '../method/Rupiah';
import { IoMdToday } from 'react-icons/io';
import { BsCalendarWeek } from 'react-icons/bs';
import { TbCalendarMonth } from 'react-icons/tb';
import ChartLaporan from '../chart/ChartLaporan';
import ChartDevelopment from '../chart/ChartDevelopment';
import ChartGenerals from '../chart/ChartGenerals';
import { getWeekOfYear, month, tgl, today, year } from '../method/formatTgl';

export default function DashboardComponent() {

    const [prodi, setProdi] = useState([])
    const [getData, setData] = useState({
        users: [],
        pendaftar: [],
        belum_daftar: [],
        admin: [],
        banyakProdiDiPilih: [],
        belum_terdaftar: [],
        banyakProdiDiPilihTerdaftar: [],
        totalPembayaran: ""
    })
    const [getLaporan, setLaporan] = useState({
        harian: [],
        mingguan: [],
        bulanan: [],
        tahunan: [],
    })

    useEffect(() => {
        getAllUsers()
        getProdi()
        getLaporanPendaftaran()
    }, [])
    
    const getAllUsers = async () => {
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
            const responsePendaftar = await axios.get(`/api/pendaftaran`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )

            const pembayaran = await axios.get(`/api/pembayaran`,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )

            const filteredUsers = response.data.body.filter((user) => user.role === "users")
            const filterPendaftar = response.data.body.filter((data) => data.user_id !== null && data.role === "users")
            // const filterBelumPendaftar = response.data.body.filter((data) => data.user_id === null && data.role === "users")
            const filteredAdmin = response.data.body.filter((user) => user.role === "admin")
            const banyakProdiDiPilih = Array.from({ length: 6 }, (_, i) => {
                const idProdi = String(i + 1);
                const countProdi1 = responsePendaftar.data.body.filter(user => user.prodi1 === idProdi).length;
                const countProdi2 = responsePendaftar.data.body.filter(user => user.prodi2 === idProdi).length;
                return countProdi1 + countProdi2;
            });
            const banyakProdiDiPilihTerdaftar = Array.from({ length: 6 }, (_, i) =>
                response.data.body.filter(user => user.role === 'users' && user.id_prodi === i + 1).length
            );

            const filterBelumTendaftar = responsePendaftar.data.body
            const pendaftarUserIds = new Set(responsePendaftar.data.body.map((data) => data.id_user));
            const belumTerdaftar = response.data.body.filter((data) => 
                data.role === "users" && data.user_id === null && !pendaftarUserIds.has(data.id)
            );
            
            const totalPembayaran = pembayaran.data.body.map(item => item.total).reduce((harga, total) => harga + total, 0);

            setData({
                users: filteredUsers,
                pendaftar: filterPendaftar,
                belum_daftar: belumTerdaftar,
                admin: filteredAdmin,
                banyakProdiDiPilih: banyakProdiDiPilih,
                belum_terdaftar: filterBelumTendaftar,
                banyakProdiDiPilihTerdaftar: banyakProdiDiPilihTerdaftar,
                totalPembayaran: totalPembayaran
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    const getProdi = async () => {
        const token = Cookies.get('token')
        const response = await axios.get('/api/prodi', 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const filteredProdiID = response.data.body.filter((user) => user.nama_prodi).map((data) => `${data.jenjang}-${data.nama_prodi}`)
        setProdi(filteredProdiID)
    }

    const getLaporanPendaftaran = async () => {
        const token = Cookies.get('token')
        const responseHarian = await axios.get('/api/laporan-pendaftaran/harian', 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const responseMingguan = await axios.get('/api/laporan-pendaftaran/mingguan', 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const responseBulanan = await axios.get('/api/laporan-pendaftaran/bulanan', 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        const responseTahunan = await axios.get('/api/laporan-pendaftaran/tahunan', 
            {
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true
            },
        )
        setLaporan({
            harian: responseHarian.data.body,
            mingguan: responseMingguan.data.body,
            bulanan: responseBulanan.data.body,
            tahunan: responseTahunan.data.body,
        })
    }
    
    return (
        <>
            <section className='flex flex-col w-full justify-start items-start py-10 md:px-10 px-4 gap-5'>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full items-center justify-center gap-5'>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <RiBarChart2Fill className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Pendapatan</p>
                            <p className='text-base font-bold group-hover:text-white text-black'>{rupiah(getData.totalPembayaran)}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <FaUserXmark className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Belum Mendaftar</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getData.belum_daftar.length}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <FaUserCheck className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Pendaftar</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getData.belum_terdaftar.length}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <FaUserCheck className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Calon mahasiswa</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getData.pendaftar.length}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <FaUser className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total User</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getData.users.length}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <IoMdToday className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Harian</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getLaporan.harian.filter((item) => item.tanggal === tgl(today)).reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <BsCalendarWeek className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Mingguan</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getLaporan.mingguan.filter((item) => item.minggu_ke === getWeekOfYear()).reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <TbCalendarMonth className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Bulanan</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getLaporan.bulanan.filter((item) => item.bulan === month()).reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</p>
                        </div>
                    </div>
                    <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                        <FaCalendar className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                        <div className='flex flex-col justify-start items-start gap-1'>
                            <p className='text-base group-hover:text-white text-black'>Total Tahunan</p>
                            <p className='text-xl font-bold group-hover:text-white text-black'>{getLaporan.tahunan.filter((items) => items.tahun === year()).reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</p>
                        </div>
                    </div>
                </div>
            </section>
            <ChartGenerals getData={getData} prodi={prodi} />
            <ChartDevelopment getLaporan={getLaporan} />
            <ChartLaporan getLaporan={getLaporan} />
        </>
    )
}
