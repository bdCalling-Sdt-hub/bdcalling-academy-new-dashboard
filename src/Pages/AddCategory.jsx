import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import {  FaPlus } from 'react-icons/fa6'
import {  Modal, Table } from 'antd'
import { useForm } from 'react-hook-form'

import { RxCross2 } from 'react-icons/rx'
import { FaEdit } from 'react-icons/fa'
import UpdateInput from '../Components/Input/UpdateInput'
const data = [
    {
        "_id": "1",
        "categoryName": "App Development",
    },
    {
        "_id": "2",
        "categoryName": "App Development",
    },
    {
        "_id": "3",
        "categoryName": "App Development",
    },
    {
        "_id": "4",
        "categoryName": "App Development",
    },
    {
        "_id": "5",
        "categoryName": "App Development",
    },
    {
        "_id": "6",
        "categoryName": "App Development",
    },
    {
        "_id": "7",
        "categoryName": "App Development",
    },
    {
        "_id": "8",
        "categoryName": "App Development",
    },
    {
        "_id": "9",
        "categoryName": "App Development",
    },
    {
        "_id": "10",
        "categoryName": "App Development",
    },
    {
        "_id": "11",
        "categoryName": "App Development",
    },
    {
        "_id": "12",
        "categoryName": "App Development",
    },
    {
        "_id": "13",
        "categoryName": "App Development",
    },
]

const AddCategory = () => {
    const [openAddCategoryModal, setopenAddCategoryModal] = useState(false)
    const [openDropModal, setOpenDropModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filterData, setFilterData] = useState({})
    const onSubmit = data => console.log(data);
    const columns = [
        {
            title: '#Sl',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (_, record) => <div className='start-center gap-2'>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setopenAddCategoryModal(true)
                    setOpenDropModal(false)
                }} className='text-2xl text-[#2ba24c] hover:scale-105 active:scale-95'>
                    <FaEdit />
                </button>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setopenAddCategoryModal(false)
                    setOpenDropModal(true)
                }} className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                    <RxCross2 />
                </button>
            </div>,
            key: '_id'
        },
    ];
    const handelFilterData = (id) => {
        const newData = data.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`Category List`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => {
                        setopenAddCategoryModal(true)
                        setFilterData({})
                    }} className="btn-primary max-w-44"><FaPlus /> Add Category</button>
                </div>
            </div>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
            {/* drop modal  */}
            <Modal
                centered
                footer={false}
                open={openDropModal}
                onCancel={() => setOpenDropModal(false)}
                width={400}
            >
                <div className=''>
                    <p className='text-2xl text-center mt-4 text-[#5C5C5C]'>want to dropout this Category ?</p>
                    <div className='between-center mt-6'>
                        <button onClick={()=>{
                            setOpenDropModal(false)
                        }} className='text-[#FFFFFF] bg-red-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Dropout</button>
                        <button onClick={()=>{
                            setOpenDropModal(false)
                        }} className='text-[#FFFFFF] bg-green-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Cancel</button>
                    </div>
                </div>
            </Modal>
            {/* add category modal  */}
            <Modal
                centered
                footer={false}
                open={openAddCategoryModal}
                onCancel={() => setopenAddCategoryModal(false)}
                width={500}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Category Name`} rules={{ ...register("categoryName", { required: true }) }} placeholder={`write your name`} defaultValue={filterData.categoryName} />
                <button onClick={()=>{
                    setopenAddCategoryModal(false)
                }} className='btn-primary max-w-32 mx-auto mt-6'>Create</button>
                </form>
            </Modal>
            {/* Follow up Modal  */}
        </>
    )
}
export default AddCategory
