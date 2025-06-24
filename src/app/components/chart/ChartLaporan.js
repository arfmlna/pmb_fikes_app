import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart'
import React, { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'primereact/button';

export default function ChartLaporan({ getLaporan }) {
    const [chartLaporan, setChartLaporan] = useState({
        harian: {
            data: {}
        },
        mingguan: {
            data: {}
        },
        bulanan: {
            data: {}
        },
        tahunan: {
            data: {}
        },
        options: {}
    })

    let LaporanChart = useCallback(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const dataHarian = {
            labels: getLaporan.harian.map(item => item.tanggal),
            datasets: [
                {
                    label: 'S1 Ilmu Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: getLaporan.harian.map(item => item.prodi1_1),
                },
                {
                    label: 'D3 Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: getLaporan.harian.map(item => item.prodi1_2),
                },
                {
                    label: 'S1 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: getLaporan.harian.map(item => item.prodi1_3),
                },
                {
                    label: 'D3 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: getLaporan.harian.map(item => item.prodi1_4),
                },
                {
                    label: 'Prof Ners',
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    data: getLaporan.harian.map(item => item.prodi1_5),
                },
                {
                    label: 'Prof Pedidikan Profesi Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--marron-500'),
                    backgroundColor: documentStyle.getPropertyValue('--marron-500'),
                    data: getLaporan.harian.map(item => item.prodi1_6),
                },
            ]
        }
        const dataMingguan = {
            labels: getLaporan.mingguan.map(item => `Minggu ${item.minggu_ke} - ${item.tahun}`),
            datasets: [
                {
                    label: 'S1 Ilmu Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_1),
                },
                {
                    label: 'D3 Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_2),
                },
                {
                    label: 'S1 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_3),
                },
                {
                    label: 'D3 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_4),
                },
                {
                    label: 'Prof Ners',
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_5),
                },
                {
                    label: 'Prof Pedidikan Profesi Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--marron-500'),
                    backgroundColor: documentStyle.getPropertyValue('--marron-500'),
                    data: getLaporan.mingguan.map(item => item.prodi1_6),
                },
            ]
        }
        const dataBulanan = {
            labels: getLaporan.bulanan.map(item => item.label_bulan),
            datasets: [
                {
                    label: 'S1 Ilmu Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_1),
                },
                {
                    label: 'D3 Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_2),
                },
                {
                    label: 'S1 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_3),
                },
                {
                    label: 'D3 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_4),
                },
                {
                    label: 'Prof Ners',
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_5),
                },
                {
                    label: 'Prof Pedidikan Profesi Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--marron-500'),
                    backgroundColor: documentStyle.getPropertyValue('--marron-500'),
                    data: getLaporan.bulanan.map(item => item.prodi1_6),
                },
            ]
        }
        const dataTahunan = {
            labels: getLaporan.tahunan.map(item => item.tahun),
            datasets: [
                {
                    label: 'S1 Ilmu Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_1),
                },
                {
                    label: 'D3 Keperawatan',
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_2),
                },
                {
                    label: 'S1 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_3),
                },
                {
                    label: 'D3 Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_4),
                },
                {
                    label: 'Prof Ners',
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_5),
                },
                {
                    label: 'Prof Pedidikan Profesi Kebidanan',
                    borderColor: documentStyle.getPropertyValue('--marron-500'),
                    backgroundColor: documentStyle.getPropertyValue('--marron-500'),
                    data: getLaporan.tahunan.map(item => item.prodi1_6),
                },
            ]
        }

        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                datalabels: {
                color: '#000',
                anchor: 'end',
                align: 'top',
                font: {
                    weight: 'bold'
                },
                formatter: (value) => value
                },
                legend: {
                    labels: {
                        color: textColor
                    },
                    display: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary,
                        // precision: 0
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
            }
        };

        setChartLaporan({
            harian: {
                data: dataHarian
            },
            mingguan: {
                data: dataMingguan
            },
            bulanan: {
                data: dataBulanan
            },
            tahunan: {
                data: dataTahunan
            },
            options: options
        })
    }, [getLaporan]);

    useEffect(() => {
        LaporanChart()
    }, [LaporanChart])
    
    const exportPdf = (datas, mode) => {
    const doc = new jsPDF('portrait');
    if (mode === 'harian') {
        autoTable(doc, {
            head: [[
                'Tanggal', 'Hari', 'Jumlah', 'S1 Ilmu Keperawatan', 'D3 Keperawatan', 'S1 Kebidanan', 'D3 Kebidanan', 'Prof Profesi Ners', 'Prof Pendidikan Profesi Kebidanan'
            ]],
            body: datas.map((data) => [
                data.tanggal, data.hari, data.jumlah_pendaftaran, data.prodi1_1, data.prodi1_2, data.prodi1_3, data.prodi1_4, data.prodi1_5, data.prodi1_6
            ]),
            margin: { top: 30 },
                didDrawPage: (data) => {
                doc.setFontSize(12);
                doc.text('Laporan Pendaftaran Mahasiswa', data.settings.margin.left, 20);
            }
        });
        doc.save('Laporan-harian-pendaftaran.pdf');
    } else if(mode === 'mingguan'){
        autoTable(doc, {
            head: [[
                'Tahun', 'Minggu', 'Jumlah', 'S1 Ilmu Keperawatan', 'D3 Keperawatan', 'S1 Kebidanan', 'D3 Kebidanan', 'Prof Profesi Ners', 'Prof Pendidikan Profesi Kebidanan'
            ]],
            body: datas.map((data) => [
                data.tahun, data.minggu_ke, data.jumlah_pendaftaran, data.prodi1_1, data.prodi1_2, data.prodi1_3, data.prodi1_4, data.prodi1_5, data.prodi1_6
            ]),
            margin: { top: 30 },
                didDrawPage: (data) => {
                doc.setFontSize(12);
                doc.text('Laporan Pendaftaran Mahasiswa', data.settings.margin.left, 20);
            }
        });
        doc.save('Laporan-mingguan-pendaftaran.pdf');
    } else if(mode === 'bulanan'){
        autoTable(doc, {
            head: [[
                'Bulan', 'Label Bulan', 'Jumlah', 'S1 Ilmu Keperawatan', 'D3 Keperawatan', 'S1 Kebidanan', 'D3 Kebidanan', 'Prof Profesi Ners', 'Prof Pendidikan Profesi Kebidanan'
            ]],
            body: datas.map((data) => [
                data.bulan, data.label_bulan, data.jumlah_pendaftaran, data.prodi1_1, data.prodi1_2, data.prodi1_3, data.prodi1_4, data.prodi1_5, data.prodi1_6
            ]),
            margin: { top: 30 },
                didDrawPage: (data) => {
                doc.setFontSize(12);
                doc.text('Laporan Pendaftaran Mahasiswa', data.settings.margin.left, 20);
            }
        });
        doc.save('Laporan-bulanan-pendaftaran.pdf');
    } else if(mode === 'tahunan'){
        autoTable(doc, {
            head: [[
                'Tahun', 'Jumlah', 'S1 Ilmu Keperawatan', 'D3 Keperawatan', 'S1 Kebidanan', 'D3 Kebidanan', 'Prof Profesi Ners', 'Prof Pendidikan Profesi Kebidanan'
            ]],
            body: datas.map((data) => [
                data.tahun, data.jumlah_pendaftaran, data.prodi1_1, data.prodi1_2, data.prodi1_3, data.prodi1_4, data.prodi1_5, data.prodi1_6
            ]),
            margin: { top: 30 },
                didDrawPage: (data) => {
                doc.setFontSize(12);
                doc.text('Laporan Pendaftaran Mahasiswa', data.settings.margin.left, 20);
            }
        });
        doc.save('Laporan-tahunan-pendaftaran.pdf');
    }
    }
    
    const exportExcel = (datas) => {
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(data, 'Laporan-pendaftaran.xlsx');
    };
    return (
        <>
            <div className='mx-3 md:mx-14 mt-20'>
                <h1 className='text-center text-3xl uppercase'>Laporan Pendaftaran</h1>
            </div>
            <div className='grid grid-cols-12 gap-5 mx-3 md:mx-14 mt-10'>
                <Card title="Harian" subTitle={
                    <div className='grid grid-cols-2'>
                        <div>Total : {getLaporan.harian.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</div> 
                        <div className='justify-self-end flex gap-5'>
                            <Button icon="pi pi-file-pdf" rounded className="bg-red-700 text-white" onClick={() => exportPdf(getLaporan.harian, 'harian')} />
                            <Button icon="pi pi-file-excel" rounded className="bg-green-700 text-white" onClick={() => exportExcel(getLaporan.harian)} />
                        </div>
                    </div>
                } className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                {chartLaporan.harian.data?.datasets?.length > 0 ? (
                    <div className=''>
                        <Chart type="bar" data={chartLaporan.harian.data} options={chartLaporan.options} height={300} />
                    </div>
                ) : (
                    <p>Memuat data grafik...</p>
                )}
                </Card>
                <Card title="Mingguan" subTitle={
                    <div className='grid grid-cols-2'>
                        <div>Total : {getLaporan.mingguan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</div>
                        <div className='justify-self-end flex gap-5'>
                            <Button icon="pi pi-file-pdf" rounded className="bg-red-700 text-white" onClick={() => exportPdf(getLaporan.mingguan, 'mingguan')} />
                            <Button icon="pi pi-file-excel" rounded className="bg-green-700 text-white" onClick={() => exportExcel(getLaporan.mingguan)} />
                        </div>
                    </div>
                } className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                {chartLaporan.mingguan.data?.datasets?.length > 0 ? (
                    <div className=''>
                        <Chart type="bar" data={chartLaporan.mingguan.data} options={chartLaporan.options} height={300} />
                    </div>
                ) : (
                    <p>Memuat data grafik...</p>
                )}
                </Card>
                <Card title="Bulanan" subTitle={
                    <div className='grid grid-cols-2'>
                        <div>Total : {getLaporan.bulanan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</div> 
                        <div className='justify-self-end flex gap-5'>
                            <Button icon="pi pi-file-pdf" rounded className="bg-red-700 text-white" onClick={() => exportPdf(getLaporan.bulanan, 'bulanan')} />
                            <Button icon="pi pi-file-excel" rounded className="bg-green-700 text-white" onClick={() => exportExcel(getLaporan.bulanan)} />
                        </div>
                    </div>
                } className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                {chartLaporan.bulanan.data?.datasets?.length > 0 ? (
                    <div className=''>
                        <Chart type="bar" data={chartLaporan.bulanan.data} options={chartLaporan.options} height={300} />
                    </div>
                ) : (
                    <p>Memuat data grafik...</p>
                )}
                </Card>
                <Card title="Tahunan" subTitle={
                    <div className='grid grid-cols-2'>
                        <div>Total : {getLaporan.tahunan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</div> 
                        <div className='justify-self-end flex gap-5'>
                            <Button icon="pi pi-file-pdf" rounded className="bg-red-700 text-white" onClick={() => exportPdf(getLaporan.tahunan, 'tahunan')} />
                            <Button icon="pi pi-file-excel" rounded className="bg-green-700 text-white" onClick={() => exportExcel(getLaporan.tahunan)} />
                        </div>
                    </div>
                } className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                {chartLaporan.tahunan.data?.datasets?.length > 0 ? (
                    <div className=''>
                        <Chart type="bar" data={chartLaporan.tahunan.data} options={chartLaporan.options} height={300} />
                    </div>
                ) : (
                    <p>Memuat data grafik...</p>
                )}
                </Card>
            </div>
        </>
    )
}
