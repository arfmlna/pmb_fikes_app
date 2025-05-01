import React, { useEffect, useState } from 'react'
import { FaJs, FaUser, FaUserCheck } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { FaRegHourglassHalf, FaUserXmark} from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { IoLogoAndroid } from "react-icons/io";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

export default function DashboardComponent() {
    const [chartDataPengguna, setChartPengguna] = useState({});
    const [chartDataRole, setChartRole] = useState({});
    const [chartDataProdi, setChartProdi] = useState({});
    const [chartOptionsPengguna, setChartOptionsPengguna] = useState({});
    const [chartOptionsRole, setChartOptionsRole] = useState({});
    const [chartOptionsProdi, setChartOptionsProdi] = useState({});
    const [prodi, setProdi] = useState([])
    const [getData, setData] = useState({
        users: [],
        pendaftar: [],
        belum_daftar: [],
        admin: [],
        banyakProdiDiPilih: []
      })

    useEffect(() => {
        getAllUsers()
        getProdi()
    }, [])

    useEffect(() => {
        if (getData.users.length || getData.pendaftar.length) {
            chartSetupPengguna();
        }
        chartSetupRole()
        chartSetupProdi()
    }, [getData]);

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
            const filteredUsers = response.data.body.filter((user) => user.role === "users")
            const filterPendaftar = response.data.body.filter((data) => data.user_id !== null && data.role === "users")
            const filterBelumPendaftar = response.data.body.filter((data) => data.user_id === null)
            const filteredAdmin = response.data.body.filter((user) => user.role === "admin")
            let banyakProdiDiPilih = Array.from({ length: 6 }, (_, i) =>
                response.data.body.filter(user => user.role === "users" && user.id_prodi === i + 1).length
            );
            
            setData({
                users: filteredUsers,
                pendaftar: filterPendaftar,
                belum_daftar: filterBelumPendaftar,
                admin: filteredAdmin,
                banyakProdiDiPilih: banyakProdiDiPilih, 
            })
            // setLoading(false)
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

    let chartSetupPengguna = () => {    
        const data = {
            labels: ['Pengguna', 'Pendaftar', 'Belum Daftar'],
            datasets: [
                {
                    label: 'Statistik Pengunjung',
                    data: [getData.users.length, getData.pendaftar.length, getData.belum_daftar.length],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        }

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartPengguna(data);
        setChartOptionsPengguna(options);
    }
    let chartSetupRole = () => {  
        const documentStyle = getComputedStyle(document.documentElement);  
        const data = {
            labels: ['Users', 'Admin'],
            datasets: [
                {
                    data: [getData.users.length, getData.admin.length],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }

        const options = {
            cutout: '60%'
        };

        setChartRole(data);
        setChartOptionsRole(options);
    }
    let chartSetupProdi = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            datasets: [
                {
                    data: getData.banyakProdiDiPilih,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--cyan-500')
                    ],
                    label: 'Statistik Prodi Pilihan'
                }
            ],
            labels: prodi,
        }

        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartProdi(data);
        setChartOptionsProdi(options);
    }

  return (
    <>
        <section className='flex flex-col w-full justify-start items-start py-10 md:px-10 px-4 gap-5'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full items-center justify-center gap-5'>
                {/* <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                    <RiBarChart2Fill className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                    <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-base group-hover:text-white text-black'>Total Pendapatan</p>
                        <p className='text-xl font-bold group-hover:text-white text-black'>Rp. 0</p>
                    </div>
                </div> */}
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
                        <p className='text-base group-hover:text-white text-black'>Total pendaftar</p>
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
            </div>
        </section>
        <div className='grid grid-cols-3 gap-5 mx-3 md:mx-14 mt-20'>
            <Card title="Statistik Pengunjung" className='col-span-3 md:col-span-1 flex items-center justify-center drop-shadow-2xl hover:scale-105'>
            {chartDataPengguna?.datasets?.length > 0 ? (
                <Chart type="bar" data={chartDataPengguna} options={chartOptionsPengguna} />
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
            <Card title="Statistik Role Model" className='col-span-3 md:col-span-1 flex items-center justify-center drop-shadow-2xl hover:scale-105'>
            {chartDataRole?.datasets?.length > 0 ? (
                <Chart type="doughnut" data={chartDataRole} options={chartOptionsRole} className='h-64'/>
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
            <Card title="Statistik Prodi Pilihan" className='col-span-3 md:col-span-1 drop-shadow-2xl hover:scale-105'>
            {chartDataRole?.datasets?.length > 0 ? (
                <Chart type="polarArea" data={chartDataProdi} options={chartOptionsProdi}/>
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
        </div>
    </>
  )
}
