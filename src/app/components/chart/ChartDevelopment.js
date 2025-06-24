import { Card } from 'primereact/card'
import { Chart } from 'primereact/chart'
import React, { useCallback, useEffect, useState } from 'react'

export default function ChartDevelopment({getLaporan}) {
    const [chartDev, setChartDev] = useState({
        data: {
            harian: {},
            mingguan: {},
            bulanan: {},
            tahunan: {}
        },
        options: {}
    })
    let developmentChart = useCallback(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const dataHarian = {
            labels: getLaporan.harian.map(item => item.tanggal),
            datasets: [
                {
                    label: 'Jumlah Pendaftaran',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    data: getLaporan.harian.map(item => item.jumlah_pendaftaran),
                },
            ]
        }
        const dataMingguan = {
            labels: getLaporan.mingguan.map(item => `Minggu ${item.minggu_ke} - ${item.tahun}`),
            datasets: [
                {
                    label: 'Jumlah Pendaftaran',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    data: getLaporan.mingguan.map(item => item.jumlah_pendaftaran),
                }
            ]
        }
        const dataBulanan = {
            labels: getLaporan.bulanan.map(item => item.label_bulan),
            datasets: [
                {
                    label: 'Jumlah Pendaftaran',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    data: getLaporan.bulanan.map(item => item.jumlah_pendaftaran),
                }
            ]
        }
        const dataTahunan = {
            labels: getLaporan.tahunan.map(item => item.tahun),
            datasets: [
                {
                    label: 'Jumlah Pendaftaran',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    data: getLaporan.tahunan.map(item => item.jumlah_pendaftaran),
                }
            ]
        }

        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    },
                    display: false
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

        setChartDev({
            data: {
                harian: dataHarian,
                mingguan: dataMingguan,
                bulanan: dataBulanan,
                tahunan: dataTahunan
            },
            options: options
        })
    }, [getLaporan]);

    useEffect(() => {
        developmentChart()
    }, [developmentChart])

    return (
        <>
            <div className='mx-3 md:mx-14 mt-20'>
                    <h1 className='text-center text-3xl uppercase'>Perkembangan Pendaftaran</h1>
                </div>
                <div className='grid grid-cols-12 gap-5 mx-3 md:mx-14 mt-10'>
                    <Card title="Harian" subTitle={
                        <div>
                            <div>Total : {getLaporan.harian.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}</div> 
                        </div>
                    } className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                    {chartDev.data.harian?.datasets?.length > 0 ? (
                        <div className=''>
                            <Chart type="line" data={chartDev.data.harian} options={chartDev.options} height={300} />
                        </div>
                    ) : (
                        <p>Memuat data grafik...</p>
                    )}
                    </Card>
                    <Card title="Mingguan" subTitle={`Total : ${getLaporan.mingguan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}`} className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                    {chartDev.data.mingguan?.datasets?.length > 0 ? (
                        <div className=''>
                            <Chart type="line" data={chartDev.data.mingguan} options={chartDev.options} height={300} />
                        </div>
                    ) : (
                        <p>Memuat data grafik...</p>
                    )}
                    </Card>
                    <Card title="Bulanan" subTitle={`Total : ${getLaporan.bulanan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}`} className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                    {chartDev.data.bulanan?.datasets?.length > 0 ? (
                        <div className=''>
                            <Chart type="line" data={chartDev.data.bulanan} options={chartDev.options} height={300} />
                        </div>
                    ) : (
                        <p>Memuat data grafik...</p>
                    )}
                    </Card>
                    <Card title="Tahunan" subTitle={`Total : ${getLaporan.tahunan.reduce((acc, item) => acc + item.jumlah_pendaftaran, 0)}`} className='col-span-12 md:col-span-6 drop-shadow-2xl'>
                    {chartDev.data.tahunan?.datasets?.length > 0 ? (
                        <div className=''>
                            <Chart type="line" data={chartDev.data.tahunan} options={chartDev.options} height={300} />
                        </div>
                    ) : (
                        <p>Memuat data grafik...</p>
                    )}
                    </Card>
                </div>
        </>
    )
}
