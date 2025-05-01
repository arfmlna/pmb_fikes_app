"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsEye, BsPen } from 'react-icons/bs'

export default function RekapPendafataran() {
  const [user, setUsers] = useState([])
      const [loading, setLoading] = useState(true)
  
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
      <>
          <div className='flex flex-col justify-center items-center lg:px-10 lg:py-20 md:px-8 md:py-16 py-12 px-6 lg:gap-y-10 gap-y-5 h-full w-full'>
              <h1 className='text-center lg:text-4xl md:text-2xl text-xl'>Daftar Rekap Pendafataran</h1>
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
                                          <p className="block text-sm text-black leading-none">Action</p>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {user.map((user, index) => (
                                      <tr key={index}>
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
                                          <td className="p-4 border-b flex justify-center items-center gap-3 border-blue-gray-50">
                                              <button onClick={() => deleteUser(user.id)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <CiTrash className='w-4 h-4'/>
                                                  </span>
                                              </button>
                                              <button onClick={() => deleteUser(user.id)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <BsPen className='w-4 h-4'/>
                                                  </span>
                                              </button>
                                              <button onClick={() => deleteUser(user.id)} className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <BsEye className='w-4 h-4'/>
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
