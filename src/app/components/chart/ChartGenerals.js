import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useCallback, useEffect, useState } from 'react'

export default function ChartGenerals({getData, prodi}) {
    const [data, setData] = useState({
        pengguna: {
            data: {},
            options: {}
        },
        pendaftar: {
            data: {},
            options: {}
        },
        calonMahasiswa: {
            data: {},
            options: {}
        }
    })
    let chartSetup = useCallback(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        if (!getData.users.length && !getData.pendaftar.length && !getData.belum_terdaftar && !getData.belum_daftar) {
            return;
        }
        let dataset = [getData.pendaftar.length, getData.belum_terdaftar.length, getData.belum_daftar.length]
        const dataPengguna = {
            labels: ['Calon Mhs','Pendaftar', 'Belum Daftar', ],
            datasets: [
                {
                    label: 'Pengguna',
                    data: dataset,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                }
            ]
        }
        const dataPendaftar = {
            labels: prodi,
            datasets: [
                {
                    data: getData.banyakProdiDiPilihTerdaftar,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--cyan-500')
                    ],
                    borderColor: documentStyle.getPropertyValue('--surface-border'),
                    borderWidth: 1,
                    label: 'Statistik Prodi Pilihan'
                }
            ],
        }
        const dataCalonMhs = {
            labels: prodi,
            datasets: [
                {
                    data: getData.banyakProdiDiPilih,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--cyan-500')
                    ],
                    borderColor: documentStyle.getPropertyValue('--surface-border'),
                    borderWidth: 1,
                    label: 'Statistik Prodi Pilihan'
                }
            ]
        };

        const optionPengguna = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        const optionPendaftar = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((value / total) * 100).toFixed(2);
                            return `${context.label}: ${value} (${percent}%)`;
                        }
                    }
                }
            }
        };
        const optionCalonMhs = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((value / total) * 100).toFixed(2);
                            return `${context.label}: ${value} (${percent}%)`;
                        }
                    }
                }
            }
        };
        
        setData({
            pengguna: {
                data: dataPengguna,
                options: optionPengguna
            },
            pendaftar: {
                data: dataPendaftar,
                options: optionPendaftar
            },
            calonMahasiswa: {
                data: dataCalonMhs,
                options: optionCalonMhs
            }
        })
    }, [getData, prodi])

    useEffect(() => {
        if (getData.users.length > 0 || getData.pendaftar.length > 0) {
            chartSetup()
        }
    }, [getData, chartSetup])

    return (
        <div className='grid grid-cols-12 gap-5 mx-3 md:mx-14 mt-20'>
            <div className='col-span-2'></div>
            <Card title="Pengguna" subTitle={`Total : ${getData.users.length}`} className='col-span-12 md:col-span-8 drop-shadow-2xl'>
            {data.pengguna.data?.datasets?.length > 0 ? (
                <Chart type="bar" data={data.pengguna.data} options={data.pengguna.options} height={350} />
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
            <div className='col-span-2'></div>
            <Card title="Prodi Pilihan Pendaftar" className='col-span-12 md:col-span-6 drop-shadow-2xl'>
            {data.pendaftar.data?.datasets?.length > 0 ? (
                <Chart type="doughnut" data={data.pendaftar.data} options={data.pendaftar.options}/>
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
            <Card title="Prodi Pilihan Calon mahasiswa" className='col-span-12 md:col-span-6 drop-shadow-2xl'>
            {data.calonMahasiswa.data?.datasets?.length > 0 ? (
                <Chart type="doughnut" data={data.calonMahasiswa.data} options={data.calonMahasiswa.options}/>
            ) : (
                <p>Memuat data grafik...</p>
            )}
            </Card>
        </div>
    )
}
