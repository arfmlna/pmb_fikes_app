'use client'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

export default function PendaftaranList() {
  const [prodi, setProdi] = useState([])
  const [filterProdi, setFilterProdi] = useState([])

  useEffect(() => {
    async function fetchProdi() {
      try {
        const token = Cookies.get('token');
        const res = await axios.get('/api/prodi', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        
        setProdi(res.data.body);
        setFilterProdi(res.data.body);
      } catch (error) {
        console.error("Gagal fetch data prodi:", error);
      }
    }

    fetchProdi();
  }, [])

  async function jenjangHandle(event) {
    const value = event.target.value;

    if (value) {
      const filter = prodi.filter((item) => item.jenjang === value);
      setFilterProdi(filter);
    } else {
      setFilterProdi(prodi);
    }
  }

  function prodiHandle(){

  }

  return (
    <section className='flex justify-center items-center w-full relative z-40 h-full'>
      <div className='xl:max-w-7xl w-full px-4 py-4 md:py-10 flex flex-col md:gap-6 gap-3 items-start md:px-10'>
        <div className='w-full h-full group rounded-lg bg-white border border-gray-300  p-4'>
          <article className='flex p-4 flex-col justify-start gap-y-3 relative z-10'>
            <h1 className='text-xl md:text-2xl font-bold'>
              Cari Jalur Pendaftaran
            </h1>
            <p className='text-base text-left'>
              Temukan jalur pendaftaran sesuai dengan pilihan program studi yang diminati.
            </p>
          </article>

          <div className='flex md:flex-row flex-col justify-between items-center w-full gap-4 p-4'>
            {/* Select option for Jenjang */}
            <select onClick={jenjangHandle} className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
              <option value="">-- Pilih Jenjang --</option>
              <option value="S1">S1 - Sarjana</option>
              <option value="D3">D3 - Diploma</option>
              <option value="Prof">Prof - Profesi</option>
              {/* Add options here */}
            </select>

            {/* Select option for Program Studi */}
            <select onClick={prodiHandle} className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
              <option>-- Pilih Program Studi --</option>
              {filterProdi.map((data, i) => {
                return(
                  <option key={i}>{data.jenjang} - {data.nama_prodi}</option>
                )
              })}
              {/* Add options here */}
            </select>

            {/* Select option for Sistem Kuliah */}
            <select className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
              <option>-- Pilih Sistem Kuliah --</option>
              <option>Reguler</option>
              {/* Add options here */}
            </select>

            {/* Search button */}
            <button className='bg-blue-900 text-white font-semibold rounded-md px-6 py-3 w-full'>
              Cari Jalur Pendaftaran
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
