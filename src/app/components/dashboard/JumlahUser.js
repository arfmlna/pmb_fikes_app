'use client'

import axios from 'axios'
import Cookies from 'js-cookie'
// import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { BsPlusCircle } from 'react-icons/bs'
import { CiCircleInfo, CiEdit, CiTrash } from 'react-icons/ci'
import Swal from 'sweetalert2'
import { Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput } from 'flowbite-react'
import { Alert } from '../Alert'
// import { jwtDecode } from 'jwt-decode'

export default function JumlahUser() {

    const [user, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false);

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
            const filteredUsers = response.data.body.filter((user) => user.role === "users" || user.role === "petugas")
            setUsers(filteredUsers)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteUser = async (id) => {
        const result = await Swal.fire({
            title: "Info!",
            text: "Apa kamu yakin ingin menghapus user tersebut?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        })

        if (result.isConfirmed) {
            setLoading(true)
            try {
                const token = Cookies.get('token')
                await axios.delete(`/api/users/${id}`,
                    {
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        },
                        withCredentials: true
                    },
                )
                getAllUsers()
                Swal.fire({
                    title: "Deleted!",
                    text: "Users berhasil di hapus!",
                    icon: "success"
                });
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }
    };

    const editUser = async (e, id) => {
        e.preventDefault()
        setLoading(true);
        const token = Cookies.get('token')
        const formData = new FormData(e.target)
        const name = formData.get('name')
        const email = formData.get('email')
        const role = formData.get('role')
    
        try {
            const response = await axios.put(`/api/users/${id}`, {name, email, role}, { 
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                withCredentials: true 
            });
            
            getAllUsers()
            console.log("Update user successful:", response.data);
            Alert('Info', 'Berhasil Update User', 'success', 'OK!')
            // Handle successful login (e.g., redirect or store token in localStorage)
        } catch (err) {
            console.log(err)
            Alert('Info', 'Gagal Update User', 'error', 'OK!')
        } finally {
            setLoading(false);
            setOpenModal(false)
        }
    }
     
  return (
    <>
        <div className='flex flex-col justify-center items-center lg:px-10 lg:py-20 md:px-8 md:py-16 py-12 px-6 lg:gap-y-10 gap-y-5 h-full w-full'>
            <h1 className='text-center lg:text-4xl md:text-2xl text-xl'>Daftar User</h1>
            {loading ? (
                <h1 className='text-center lg:text-4xl md:text-2xl text-xl'>Loading...</h1>
            ) : (
                <>
                    <div className="p-6 overflow-scroll w-full px-0">
                        <table className="w-full min-w-max bg-white rounded-lg table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p className="block text-sm text-black leading-none">No</p>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p className="block text-sm text-black leading-none">ID</p>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p className="block text-sm text-black leading-none">Username</p>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p className="block text-sm text-black leading-none">Email</p>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <p className="block text-sm text-black leading-none text-center">Action</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((user, index) => (
                                    <tr key={index}>
                                        <Modal show={openModal} size="2xl" popup onClose={() => setOpenModal(false)}>
                                            <ModalHeader>
                                                <div className='flex items-center m-3'>
                                                    <span className='mr-1'>Edit User</span> <CiCircleInfo />
                                                </div>
                                            </ModalHeader>
                                            <ModalBody>
                                            <form onSubmit={(e) => editUser(e, user.id)} className="space-y-6">
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="name">Masukan Name</Label>
                                                    </div>
                                                    <TextInput id="name" name='name' placeholder="Jane Doe" required autoFocus
                                                    defaultValue={user.name} />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="email">Masukan Email</Label>
                                                    </div>
                                                    <TextInput id="email" name='email' placeholder="janedoe@gmail.com" required 
                                                    defaultValue={user.email} />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="role">Masukan Role</Label>
                                                    </div>
                                                    <Select id="role" name='role' required defaultValue={user.role}>
                                                        <option value="admin">Admin</option>
                                                        <option value="petugas">Petugas</option>
                                                        <option value="users">Users</option>
                                                    </Select>
                                                </div>
                                                <div className="w-full">
                                                    <Button type='submit'>Submit</Button>
                                                </div>
                                            </form>
                                            </ModalBody>
                                        </Modal>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="text-sm leading-normal text-black font-normal">{index +1}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{user.id}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{user.name}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{user.email}</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 flex justify-center">
                                            <button onClick={() => deleteUser(user.id)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <CiTrash className='w-4 h-4'/>
                                                </span>
                                            </button>
                                            <button onClick={() => setOpenModal(true)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <CiEdit className='w-4 h-4'/>
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>

    </>
  )
}