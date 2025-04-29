import React from 'react'

export default function PendaftaranList() {
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
            <select className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
              <option>-- Pilih Jenjang --</option>
              <option>S1 - Sarjana</option>
              <option>D3 - Diploma</option>
              <option>Prof - Profesi</option>
              {/* Add options here */}
            </select>

            {/* Select option for Program Studi */}
            <select className='border border-gray-300 rounded-md p-3 w-full text-gray-600'>
              <option>-- Pilih Program Studi --</option>
              <option>S1 - Kebidanan</option>
              <option>S1 - Ilmu Keperawatan</option>
              <option>D3 - Keperawatan</option>
              <option>D3 - Kebidanan</option>
              <option>Prof - Pendidikan Profesi Kebinanan</option>
              <option>Prof - Profesi Ners</option>
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
