"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function DaftarProdi() {
  const [selectedTab, setSelectedTab] = useState("D3");

  const dataProgram = {
    D3: [
      { name: "D3 Kebidanan", jalur: 4 },
      { name: "D3 Keperawatan", jalur: 4 },
    ],
    S1: [
      { name: "S1 - Kebidanan", jalur: 5 },
      { name: "S1 - Ilmu Keperawatan", jalur: 3 },
    ],
    Profesi: [
      { name: "Prof - Pendidikan Profesi Kebinanan", jalur: 2 },
      { name: "Prof - Profesi Ners", jalur: 2 },
    ],
  };

  const renderPrograms = (programs) => (
    <div className="flex flex-col gap-4 mt-4">
      {programs.map((program, index) => (
        <div key={index} className="flex justify-between items-center border rounded-md p-4">
          <div>
            <h2 className="text-md md:text-lg font-semibold">{program.name}</h2>
            <p className="text-sm text-gray-600">Tersedia {program.jalur} Jalur Pendaftaran</p>
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
          {renderPrograms(dataProgram[selectedTab])}
        </div>
      </div>
    </section>
  );
}
