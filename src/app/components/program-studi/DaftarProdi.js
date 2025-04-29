"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function DaftarProdi() {
  const [selectedTab, setSelectedTab] = useState("D3");

  const [dataProdi, setDataProdi] = useState({
    D3: [],
    S1: [],
    Profesi: [],
  })

  useEffect(() => {
    getProdi()
  }, [])

  async function getProdi() {
    const token = Cookies.get('token')
    const res = await axios.get(`/api/prodi`,
      {
          headers: {
              'Authorization' : `Bearer ${token}`
          },
          withCredentials: true
      },
  )
    const filteredD3 = res.data.body.filter((prodi) => prodi.jenjang === "D3")
    const filteredS1 = res.data.body.filter((prodi) => prodi.jenjang === "S1")
    const filteredProf = res.data.body.filter((prodi) => prodi.jenjang === "Prof")

    setDataProdi({
      D3: filteredD3,
      S1: filteredS1,
      Profesi: filteredProf,
    });
  }

  const renderPrograms = (programs) => (
    <div className="flex flex-col gap-4 mt-4">
      {programs.map((program, index) => (
        <div key={index} className="flex justify-between items-center border rounded-md p-4">
          <div>
            <h2 className="text-md md:text-lg font-semibold">{program.jenjang} {program.nama_prodi}</h2>
            <p className="text-sm text-gray-600">Tersedia {program.banyak_jalur} Jalur Pendaftaran</p>
          </div>
          <button className="border border-blue-900 text-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-blue-900 hover:text-white transition">
            Lihat Detail
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <section className="flex flex-col md:flex-row gap-6 w-full p-4 md:p-10 max-w-7xl mx-auto">
      {/* Bagian Kiri */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="border rounded-lg p-6 bg-white shadow">
            <div className="flex flex-col gap-1.5 py-4">
                <h1 className="text-lg md:text-xl font-bold">Informasi Program Studi</h1>
                <p className="text-base">Informasi program studi Fakultas Ilmu Kesehatan di Universitas Muhammadiyah Tasikmalaya</p>
            </div>

          {/* Tabs */}
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 mb-4">
                <button
                onClick={() => setSelectedTab("D3")}
                className={`px-4 py-2 rounded-md border ${selectedTab === "D3" ? "border-blue-900 text-blue-900" : "border-gray-300 text-gray-500"}`}
                >
                D3 - Diploma III
                </button>
                <button
                onClick={() => setSelectedTab("S1")}
                className={`px-4 py-2 rounded-md border ${selectedTab === "S1" ? "border-blue-900 text-blue-900" : "border-gray-300 text-gray-500"}`}
                >
                S1 - Sarjana
                </button>
                <button
                onClick={() => setSelectedTab("Profesi")}
                className={`px-4 py-2 rounded-md border ${selectedTab === "Profesi" ? "border-blue-900 text-blue-900" : "border-gray-300 text-gray-500"}`}
                >
                Prof - Profesi
                </button>
            </div>
            <div className="p-4 border flex justify-end gap-3 items-center border-gray-300 rounded-lg">
                <BsSearch/>
                <input placeholder="Cari program studi..." className="w-auto focus:outline-none"/>
            </div>
          </div>

          {/* List Program Studi */}
          {renderPrograms(dataProdi[selectedTab])}
        </div>
      </div>
    </section>
  );
}
