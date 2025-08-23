"use client"

import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'

export default function RekapitulasiComponent() {
  const [selectedProdi, setSelectedProdi] = useState(null)
  const [data, setData] = useState({})

  const getRekapitulasi = async () => {
    try {
        const token = Cookies.get('token')
        const response = await axios.get(`/api/rekapitulasi/${selectedProdi}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            withCredentials: true
        })
        setData(response.data.body)
      } catch (error) {
        console.log(error.massage)
      }
  }

  const handleCari = () => {
    getRekapitulasi()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Rekapitulasi PMB FIKES</h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
          value={selectedProdi}
          onChange={(e) => setSelectedProdi(e.target.value)}
        >
          <option value="">Pilih Prodi</option>
          <option value="1">S1 Ilmu Keperawatan</option>
          <option value="3">D3 Keperawatan</option>
          <option value="4">S1 Kebidanan</option>
          <option value="2">D3 Kebidanan</option>
          <option value="5">Prof Profesi Ners</option>
          <option value="6">Prof Pendidikan Profesi Kebinaan</option>
        </select>
        <button
          onClick={handleCari}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Cari
        </button>
      </div>

      {data && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Jumlah Pendaftar Secara Umum</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Total: {data?.[0]?.total}</li>
              <li>Wanita: {data?.[0]?.wanita}</li>
              <li>Pria: {data?.[0]?.pria}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Jumlah Pendaftar Berdasarkan Sekolah</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Asal SMK/MK: {data?.[0]?.smk}</li>
              <li>Asal SMA/MA: {data?.[0]?.sma}</li>
              <li>Selain SMA/SMK: {data?.[0]?.not_sma_smk}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Jumlah Pendaftar Berdasarkan Provinsi</h3>
            <ul className="list-disc list-inside text-gray-700">  
              <li>Jawa Barat: {data?.[0]?.jawa_barat}</li>
              <li>Jawa Tengah: {data?.[0]?.jawa_tengah}</li>
              <li>Jawa Timur: {data?.[0]?.jawa_timur}</li>
              <li>Lainnya: {data?.[0]?.selain_jawa  }</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
