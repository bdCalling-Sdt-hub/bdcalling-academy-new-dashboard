import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdArrowForwardIos } from 'react-icons/md'
const data = [
    {
        "_id": "1",
        "name": "Alice Smith",
        "Batch no": "BAC-WP2024",
        "phone": "123-456-7890",
        "studentID": "student1@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",

        'date': '12-08-2023'
    },
    {
        "_id": "2",
        "name": "Bob Johnson",
        "Batch no": "BAC-WP2024",
        "phone": "234-567-8901",
        "studentID": "student2@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "3",
        "name": "Charlie Brown",
        "Batch no": "BAC-WP2024",
        "phone": "345-678-9012",
        "studentID": "student3@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "4",
        "name": "David Wilson",
        "Batch no": "BAC-WP2024",
        "phone": "456-789-0123",
        "studentID": "student4@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "5",
        "name": "Eva Martinez",
        "Batch no": "BAC-WP2024",
        "phone": "567-890-1234",
        "studentID": "student5@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "6",
        "name": "Frank Garcia",
        "Batch no": "BAC-WP2024",
        "phone": "678-901-2345",
        "studentID": "student6@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "7",
        "name": "Grace Miller",
        "Batch no": "BAC-WP2024",
        "phone": "789-012-3456",
        "studentID": "student7@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "8",
        "name": "Hank Lee",
        "Batch no": "BAC-WP2024",
        "phone": "890-123-4567",
        "studentID": "student8@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "9",
        "name": "Ivy Harris",
        "Batch no": "BAC-WP2024",
        "phone": "901-234-5678",
        "studentID": "student9@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "10",
        "name": "Jack Clark",
        "Batch no": "BAC-WP2024",
        "phone": "012-345-6789",
        "studentID": "student10@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "11",
        "name": "Karen Lewis",
        "Batch no": "BAC-WP2024",
        "phone": "123-456-7891",
        "studentID": "student11@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "12",
        "name": "Leo Walker",
        "Batch no": "BAC-WP2024",
        "phone": "234-567-8902",
        "studentID": "student12@example.com",
        "course": "Art",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "13",
        "name": "Mona Hall",
        "Batch no": "BAC-WP2024",
        "phone": "345-678-9013",
        "studentID": "student13@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "14",
        "name": "Nick Young",
        "Batch no": "BAC-WP2024",
        "phone": "456-789-0124",
        "studentID": "student14@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    },
    {
        "_id": "15",
        "name": "Olivia King",
        "Batch no": "BAC-WP2024",
        "phone": "567-890-1235",
        "studentID": "student15@example.com",
        "course": "UI/UX Design",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
        'date': '12-08-2023'
    }
]
const AllAdmittedStudent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const columns = [
        {
            title: '#Sl',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Student Name',
            dataIndex: 'name',
            render: (_, record) => <div className='start-center gap-2'>
                <img src={record?.img} className='h-10 w-10 rounded-full' alt={record?.name} /> <p className='text-sm text-[var(--primary-color)]'>{record?.name}</p>
            </div>,
            key: 'name'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentID'
        },
        {
            title: 'Department',
            dataIndex: 'course',
            key: 'course'
        },
        {
            title: 'Date Of Admition',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (_, record) => <div className='start-center gap-2'>
                <Link to={`/admitted-students/students-information/${record?._id}`} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <IoMdInformationCircleOutline />
                </Link>
                <button className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                    <RxCross2 />
                </button>
            </div>,
            key: '_id'
        },
    ];
    return (
        <>
            <div className='w-full  start-center gap-3'>
                <PageHeading text={`All Batch`} /> <MdArrowForwardIos className='text-[var(--primary-bg)]' /> <p className='text-lg text-[var(--primary-bg)]'>All Students</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <div className='max-w-44 min-w-44'>
                    <Input rules={{ ...register("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`+8801566026301`} />
                </div>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                    <IoSearch />
                </button>
            </form>


            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    )
}
export default AllAdmittedStudent
