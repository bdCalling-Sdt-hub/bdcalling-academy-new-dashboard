import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaPlus } from 'react-icons/fa'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import SelectInput from '../Components/Input/SelectInput'
import BatchCard from '../Components/Cards/BatchCard'
import { Link, useNavigate } from 'react-router-dom'
const categoryOptions = ['Course Name', 'Course Name']
const batchData = [
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B001",
        "course": "Introduction to Programming"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B002",
        "course": "Data Structures and Algorithms"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B003",
        "course": "Web Development"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B004",
        "course": "Database Management Systems"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B002",
        "course": "Data Structures and Algorithms"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B003",
        "course": "Web Development"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B004",
        "course": "Database Management Systems"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
    {
        "img": "https://i.ibb.co/qkhhrpv/Rectangle-138-1.png",
        "batchID": "B005",
        "course": "Machine Learning"
    },
]

const AddBatch = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = batchData.length
    const [itemPerPage, setItemPerPage] = useState(8)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    return (
        <>
            <PageHeading text={`All Batch`} />
            <div className='between-center gap-2'>
                <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                    <div className='max-w-44 min-w-44'>
                        <SelectInput options={categoryOptions} rules={{ ...register('course', { required: false }) }} />
                    </div>
                    <div className='max-w-44 min-w-44'>
                        <Input rules={{ ...register("batch", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch ID`} />
                    </div>
                    <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                        <IoSearch />
                    </button>
                </form>
                <div className="flex justify-end items-center w-full gap-3">
                    <Link to={`/add-batch/add`} className="btn-primary max-w-40"><FaPlus />Add Batch</Link>
                </div>
            </div>
            <div className='grid-4 my-10'>
                {
                    batchData.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map((item, index) => <BatchCard key={index} item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/add-batch?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/add-batch?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/add-batch?page=${Number(page) + 1}`)
                    setPage(Number(page) + 1)
                }} className={`rounded-sm m-1 h-10 w-16 block bg-[var(--primary-bg)] text-white`}>prev</button>
            </div>
        </>
    )
}

export default AddBatch
