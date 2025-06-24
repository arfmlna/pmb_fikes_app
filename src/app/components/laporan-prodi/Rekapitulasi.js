"use client"

import React, { useState } from 'react'

const mockData = {
  'Keperawatan': {
    umum: { total: 120, wanita: 80, pria: 40 },
    sekolah: { smk: 60, sma: 45, lainnya: 15 },
    provinsi: [
      { nama: 'Jawa Tengah', jumlah: 40 },
      { nama: 'Jawa Barat', jumlah: 30 },
      { nama: 'DIY', jumlah: 20 },
      { nama: 'Lainnya', jumlah: 30 },
    ],
  },
  'Kebidanan': {
    umum: { total: 90, wanita: 85, pria: 5 },
    sekolah: { smk: 50, sma: 30, lainnya: 10 },
    provinsi: [
      { nama: 'Jawa Tengah', jumlah: 35 },
      { nama: 'Jawa Timur', jumlah: 25 },
      { nama: 'Lainnya', jumlah: 30 },
    ],
  },
  'Gizi': {
    umum: { total: 70, wanita: 50, pria: 20 },
    sekolah: { smk: 30, sma: 30, lainnya: 10 },
    provinsi: [
      { nama: 'Jawa Tengah', jumlah: 20 },
      { nama: 'Jawa Barat', jumlah: 25 },
      { nama: 'Lainnya', jumlah: 25 },
    ],
  },
}

export default function RekapitulasiComponent() {
  const [selectedProdi, setSelectedProdi] = useState('')
  const [data, setData] = useState(null)

  const handleCari = () => {
    if (selectedProdi) {
      setData(mockData[selectedProdi])
    } else {
      setData(null)
    }
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
          <option value="Keperawatan">Keperawatan</option>
          <option value="Kebidanan">Kebidanan</option>
          <option value="Gizi">Gizi</option>
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
              <li>Total: {data.umum.total}</li>
              <li>Wanita: {data.umum.wanita}</li>
              <li>Pria: {data.umum.pria}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Jumlah Pendaftar Berdasarkan Sekolah</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Asal SMK/MK: {data.sekolah.smk}</li>
              <li>Asal SMA/MA: {data.sekolah.sma}</li>
              <li>Selain SMA/SMK: {data.sekolah.lainnya}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Jumlah Pendaftar Berdasarkan Provinsi</h3>
            <ul className="list-disc list-inside text-gray-700">
              {data.provinsi.map((prov, idx) => (
                <li key={idx}>
                  {prov.nama}: {prov.jumlah}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
