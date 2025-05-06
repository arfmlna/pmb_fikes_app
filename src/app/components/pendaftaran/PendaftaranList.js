'use client'
import axios from 'axios'
import { Button } from 'flowbite-react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'

export default function PendaftaranList() {
  const [prodi, setProdi] = useState([])
  const [filterProdi, setFilterProdi] = useState([])
  const [filterSeleksi, setFilterSeleksi] = useState([])
  const [seleksi, setSeleksi] = useState([])

  const router = useRouter()

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
  
  async function fetchSeleksi(id_prodi) {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('/api/seleksi_prodi', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      const data = res.data.body.filter((item) => item.id_prodi == id_prodi)
      setFilterSeleksi(data)
    } catch (error) {
      console.error("Gagal fetch data prodi:", error);
    }
  }

  async function jenjangHandle(event) {
    const value = event.target.value;

    if (value) {
      const filter = prodi.filter((item) => item.jenjang === value);
      setFilterProdi(filter);
    } else {
      setFilterProdi(prodi);
    }
  }

  function prodiHandle(e){
    const selectedId = e.target.value;
    fetchSeleksi(selectedId);
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jenjang = formData.get('jenjang')
    let prodi = formData.get('prodi')
    let seleksi = formData.get('seleksi')
    const token = Cookies.get('token');
    const response = await axios.get(`/api/seleksi_prodi/${seleksi}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    })
    setSeleksi(response.data.body)
  }


  return (
    <>
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

            <form onSubmit={handleSubmit} className='flex md:flex-row flex-col justify-between items-center w-full gap-4 p-4'>
              {/* Select option for Jenjang */}
              <select name='jenjang' onClick={jenjangHandle} className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
                <option value="">-- Pilih Jenjang --</option>
                <option value="S1">S1 - Sarjana</option>
                <option value="D3">D3 - Diploma</option>
                <option value="Prof">Prof - Profesi</option>
                {/* Add options here */}
              </select>

              {/* Select option for Program Studi */}
              <select name='prodi' onClick={prodiHandle} className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
                <option>-- Pilih Program Studi --</option>
                {filterProdi.map((data, i) => {
                  return(
                    <option value={data.id_prodi} key={i}>{data.jenjang} - {data.nama_prodi}</option>
                  )
                })}
                {/* Add options here */}
              </select>

              {/* Select option for Sistem Kuliah */}
              <select name='seleksi' className='capitalize border border-gray-300 rounded-md p-3 w-full text-gray-600'>
                <option>-- Pilih Jalur Seleksi --</option>
                {filterSeleksi.map((data, i) => <option className='capitalize' value={data.id} key={i}>{data.nama_seleksi}</option> )}
              </select>

              {/* Search button */}
              <button className='bg-blue-900 text-white font-semibold rounded-md px-6 py-3 w-full'>
                Cari Jalur Pendaftaran
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className='mt-5 flex justify-center items-center w-full relative z-40 h-full'>
        <div className='xl:max-w-7xl w-full px-4 py-4 md:py-10 flex flex-col md:gap-6 gap-3 items-start md:px-10'>
          <div className='w-full h-full group rounded-lg  p-4'>
            {seleksi.map((data, i) => {
              return(
              <Card key={i} className='shadow-lg'>
                <h3 className='text-xl capitalize'>Jalur Seleksi - Seleksi {data.nama_seleksi} {data.nama_prodi}</h3>
                <Button className='my-5'>Reguler</Button>
                <p className='my-5'>12-12-2025 - 30-02-2026</p>
                <p className='my-5'>Biaya Daftar RP. 300.000</p>
                <Button onClick={() => router.replace(`/daftar?id_seleksi=${data.id}&nama_seleksi=${data.nama_seleksi}%20${data.nama_prodi}`)} className='mt-5 w-full'>Daftar Sekarang</Button>
              </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
