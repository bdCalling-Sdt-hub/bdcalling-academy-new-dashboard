import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { MdArrowForwardIos } from 'react-icons/md'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
const AllAdmittedStudent = () => {
    const { id } = useParams()
    const [filterBy, setFilterBy] = useState({})
    const [requestingStudents, Students, StudentsError,] = useGetRequest('showAdmitStudent', `/show-admit-student?batch_id=${id}&${filterBy?.number && `phone_number=${filterBy?.number}`}`)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setFilterBy(data)
    };
    const data = Students?.data?.[0]?.students?.map((item, i) => {
        return {
            "key": i + 1,
            "_id": item?.id,
            "name": item?.user?.name,
            "Batch no": Students?.data?.[0]?.batch_id,
            "phone": item?.phone_number,
            "studentID": item?.user?.email,
            "course": Students?.data?.[0]?.course?.course_name,
            "Course type": "off line",
            "Payment status": "due",
            "img": `${imageUrl}/${item?.image}` || "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
            'date': item?.registration_date
        }
    })

    const columns = [
        {
            title: '#Sl',
            dataIndex: 'key',
            key: 'key'
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
            title: 'Actions',
            dataIndex: '_id',
            render: (_, record) => <div className='start-center gap-2'>
                <Link to={`/admitted-student-details/${record?._id}`} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <IoMdInformationCircleOutline />
                </Link>
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
