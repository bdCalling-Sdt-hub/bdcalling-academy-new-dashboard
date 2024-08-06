import earn from '../assets/earn.png'
import earn2 from '../assets/earn2.png'
import bag from '../assets/bag.png'
import tower from '../assets/tower.png'
import bkash from '../assets/bkash.png'
import nagad from '../assets/nagad.png'
import zcash from '../assets/zcash.png'
import teacher from '../assets/teacher.png'
import students from '../assets/students.png'
import moneyBag from '../assets/moneyBag.png'
import Line from '../assets/Line.png'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd'

const Wallet = () => {
    const [open, setOpen] = useState(false)
    const chartData = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'June',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Aug',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Sept',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Otc',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Nov',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Dec',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const data = [
        {
            title: 'Yearly Earning',
            earning: '100k',
            title1: 'Yearly Cost',
            cost: '96k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={earn} />
        },
        {
            title: 'Monthly Earning',
            earning: '12k',
            title1: 'Monthly Cost',
            cost: '8k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={earn2} />
        },
        {
            title: 'Weekly Earning',
            earning: '12k',
            title1: 'Weekly Cost',
            cost: '8k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={bag} />
        },
        {
            title: 'Daily Earning',
            earning: '12k',
            title1: 'Daily Cost',
            cost: '8k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={tower} />
        },
    ]
    const data2 = [
        {
            title: 'Baksh Payment ',
            earning: '100k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={bkash} />
        },
        {
            title: 'Nagad Payment ',
            earning: '100k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={nagad} />
        },
        {
            title: 'SSLCOMMERZ Payment',
            earning: '100k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={zcash} />
        },
    ]
    const data3 = [
        {
            title: 'Teacher Cost',
            earning: '12k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={teacher} />
        },
        {
            title: 'Student Cost',
            earning: '1k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={students} />
        },
        {
            title: 'Others Cost',
            earning: '15k',
            avg: '10% Higher Then Last Years',
            icon: <img className='h-full w-full object-cover' src={moneyBag} />
        },
    ]
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };
    return (
        <div className='mt-4'>
            <h4 className='text-2xl font-semibold'>All Wallet</h4>

            <div className='grid grid-cols-4 gap-3 mt-3'>
                {
                    data?.map((item) => <div style={{
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                    }} className='bg-white p-4 rounded-md'>
                        <div className='flex justify-between items-start'>
                            <div style={{
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }} className='w-12 h-12 p-3 rounded-full'>
                                {item?.icon}
                            </div>
                            <div className='w-full text-end flex justify-between flex-col gap-2'>
                                <p>{item?.title}</p>
                                <p className='text-2xl font-semibold text-[#2492EB]'>{item?.earning}</p>
                                <div className='flex justify-end items-center gap-2'>
                                    <p>{item?.title1}</p>
                                    <button onClick={() => setOpen(!open)} className='text-2xl'>
                                        <MdOutlineKeyboardArrowDown />
                                    </button>
                                </div>
                                <p className='text-2xl font-semibold text-red-500'>{item?.cost}</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-center gap-2'><img src={Line} className='h-4' alt="" /> <p>{item?.avg}</p></div>
                    </div>)
                }
                {
                    open && <div className='grid grid-cols-3 col-span-3 gap-3 mt-3 bg-[#E8E8E8] p-3 rounded-md'>
                        {
                            data3?.map((item) => <div style={{
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }} className='bg-white p-4 py-6 rounded-md'>
                                <div className='flex justify-between items-start'>
                                    <div style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }} className='w-12 h-12 p-3 rounded-full'>
                                        {item?.icon}
                                    </div>
                                    <div className='w-full text-end flex justify-between flex-col gap-2'>
                                        <p>{item?.title}</p>
                                        <p className='text-2xl font-semibold text-[#2492EB]'>{item?.earning}</p>
                                    </div>
                                </div>
                                <div className='flex justify-start items-center gap-2'><img src={Line} className='h-4' alt="" /> <p>{item?.avg}</p></div>
                            </div>)
                        }
                    </div>
                }

                {
                    <div className='grid grid-cols-3 col-span-3 gap-3 mt-3  rounded-md'>
                        {
                            data2?.map((item) => <div style={{
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }} className='bg-white p-4 py-6 rounded-md'>
                                <div className='flex justify-between items-start'>
                                    <div style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }} className='w-12 h-12 p-3 rounded-full'>
                                        {item?.icon}
                                    </div>
                                    <div className='w-full text-end flex justify-between flex-col gap-2'>
                                        <p>{item?.title}</p>
                                        <p className='text-2xl font-semibold text-[#2492EB]'>{item?.earning}</p>
                                    </div>
                                </div>
                                <div className='flex justify-start items-center gap-2'><img src={Line} className='h-4' alt="" /> <p>{item?.avg}</p></div>
                            </div>)
                        }
                    </div>
                }

            </div>
            <div style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }} className='w-full h-[500px] bg-white p-3 rounded-md mt-4'>
                <div className='flex justify-between items-center gap-2 py-2'>
                    <p className='text-lg font-medium'>transaction Ratio</p>
                    <div className='flex justify-end items-center gap-4'>
                        <p className='flex justify-end items-center gap-1'><span className='h-4 w-4 rounded-full bg-[#2492EB]'></span> Earning</p>
                        <p className='flex justify-end items-center gap-1'><span className='h-4 w-4 rounded-full bg-[#DF5164]'></span> Cost</p>
                        <Select
                            defaultValue="2024"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {value: '2024',label: '2024'},
                                {value: '2025',label: '2025'},
                                {value: '2026',label: '2026'},
                            ]}
                        />
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#2492EB" activeBar={<Rectangle fill="#2492EB" stroke="#2492EB" />} />
                        <Bar dataKey="uv" fill="#DF5164" activeBar={<Rectangle fill="#DF5164" stroke="#DF5164" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Wallet
