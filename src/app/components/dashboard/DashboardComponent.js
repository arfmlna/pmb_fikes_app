import React, { useEffect, useState } from 'react'
import { FaJs, FaUser, FaUserCheck } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { FaRegHourglassHalf} from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { IoLogoAndroid } from "react-icons/io";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function DashboardComponent() {

    const [user, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
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
            const filteredUsers = response.data.body.filter((user) => user.role === "users")
            setUsers(filteredUsers)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <section className='flex flex-col w-full justify-start items-start py-10 md:px-10 px-4 gap-5'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full items-center justify-center gap-5'>
            <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                <RiBarChart2Fill className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                <div className='flex flex-col justify-start items-start gap-1'>
                    <p className='text-base group-hover:text-white text-black'>Total Pendapatan</p>
                    <p className='text-xl font-bold group-hover:text-white text-black'>Rp. 0</p>
                </div>
            </div>
            <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                <FaUserCheck className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                <div className='flex flex-col justify-start items-start gap-1'>
                    <p className='text-base group-hover:text-white text-black'>Total pendaftar</p>
                    <p className='text-xl font-bold group-hover:text-white text-black'>0</p>
                </div>
            </div>
            <div className='flex justify-start w-auto p-4 hover:bg-blue-900 group bg-transparent transition-all duration-150 ease-out rounded-lg items-center gap-5'>
                <FaUser className='w-10 h-10 group-hover:text-white text-black flex-shrink-0'/>
                <div className='flex flex-col justify-start items-start gap-1'>
                    <p className='text-base group-hover:text-white text-black'>Total User</p>
                    <p className='text-xl font-bold group-hover:text-white text-black'>{user.length}</p>
                </div>
            </div>
        </div>
    </section>
  )
}
