"use client"

import React, { useState } from 'react'

export default function DetailPembayaran() {

    const [voucher, setVoucher] = useState('');
    const [voucherError, setVoucherError] = useState('');
    const [buktiPembayaran, setBuktiPembayaran] = useState(null);
    const [metode, setMetode] = useState('');
    const biayaFormulir = 100000;
    const biayaAdmin = 4000;

    const handleVoucher = () => {
    if (voucher !== 'DISKON2025') {
        setVoucherError('Voucher yang kamu masukkan salah, atau sudah kedaluwarsa');
    } else {
        setVoucherError('');
    }
    };

    const handleFileChange = (e) => {
    setBuktiPembayaran(e.target.files[0]);
    };

    const total = biayaFormulir;

  return (
    <section className='flex justify-center items-center px-4 py-4 md:py-10 md:px-10'>
        <div className='xl:max-w-7xl mx-auto w-full'>
            <div className="p-4 md:flex gap-6">
                <div className="md:w-2/3 w-full bg-white rounded-lg border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Pilih Metode Pembayaran</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Pilih metode pembayaran dan segera lakukan pembayaran biaya formulir
                    </p>

                    {/* Jalur Pendaftaran */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium mb-2">Kamu Memilih Jalur Pendaftaran</label>
                        <div className="flex items-center justify-between border border-blue-800 bg-gray-100 rounded-lg p-4">
                            <div className="flex gap-4 items-start">
                                <div className="text-blue-800 text-xl">📘</div>
                                <div>
                                    <p className="text-sm font-bold text-blue-900">
                                    JALUR PESANTREN – <span className="font-normal">JALUR PESANTREN Seleksi</span>
                                    </p>
                                    <p className="text-sm text-gray-600">Reguler</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Voucher */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium mb-2">Voucher Pendaftaran</label>
                        <div className="flex gap-2">
                            <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                            placeholder="Kode voucher"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                            />
                            <button
                            onClick={handleVoucher}
                            className="px-4 py-2 border border-blue-800 text-blue-800 rounded text-sm"
                            >
                                Terapkan
                            </button>
                        </div>
                        {voucherError && (
                            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            ❌ {voucherError}
                            </p>
                        )}
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium mb-2">Pilih Metode Pembayaran</label>
                        <div
                            onClick={() => setMetode('BNI')}
                            className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer ${
                            metode === 'BNI' ? 'border-blue-600' : 'border-gray-300'
                            }`}
                        >
                            <div>
                                <p className="text-sm font-semibold">BNI</p>
                                <p className="text-xs text-gray-500">Biaya admin Rp. {biayaAdmin.toLocaleString()}</p>
                                <p className="text-xs mt-1">No. Rekening: <span className="font-semibold text-gray-700">1234567890 a.n Yayasan Pendidikan</span></p>
                            </div>
                                <img src="/bni-logo.png" alt="BNI" className="h-6 w-auto" />
                        </div>
                    </div>

                    {/* Upload Bukti */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium mb-2">Upload Bukti Pembayaran</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
                        />
                    </div>
                </div>

                <div className="md:w-1/3 w-full bg-white rounded-lg border p-6 shadow-sm mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Biaya Formulir Pendaftaran</span>
                        <span>Rp. {biayaFormulir.toLocaleString()}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                        <span>Total Pembayaran</span>
                        <span>Rp. {total.toLocaleString()}</span>
                    </div>

                    <button
                    disabled={!buktiPembayaran || metode === ''}
                    className={`w-full mt-6 py-2 rounded text-white text-sm font-semibold ${
                        !buktiPembayaran || metode === ''
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-700 hover:bg-blue-800'
                    }`}
                    >
                        🛡️ Bayar
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}
