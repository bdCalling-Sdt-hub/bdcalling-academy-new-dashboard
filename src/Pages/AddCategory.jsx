import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaPlus } from 'react-icons/fa6'
import { Modal, Table } from 'antd'
import { useForm } from 'react-hook-form'

import { RxCross2 } from 'react-icons/rx'
import { FaEdit } from 'react-icons/fa'
import UpdateInput from '../Components/Input/UpdateInput'
import usePostRequest from '../Hooks/usePostRequest'
import usePatchRequest from '../Hooks/usePatchRequest'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import useGetRequest from '../Hooks/useGetRequest'


const AddCategory = () => {
    const [filterData, setFilterData] = useState({})
    const { mutate, isLoading, data, error } = usePostRequest('Category', '/categories');
    const { mutate: updateCategory, isLoading: updateLoading, data: updateData, } = usePatchRequest('Category', `/categories/${filterData?.id}`);
    const { mutate: DeleteCategory, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Category', `/categories/${filterData?.id}`);
    const [requestingCategory, Category, CategoryError, refetch, isError] = useGetRequest('Category', `/categories`)
    const [creatingCategory, setCreatingCategory] = useState(true)
    const [openAddCategoryModal, setopenAddCategoryModal] = useState(false)
    const [openDropModal, setOpenDropModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (creatingCategory) {
            mutate({ category_name: filterData?.category_name })
        } else {
            updateCategory({ category_name: filterData?.category_name })
        }
        // console.log(filterData)
    };
    const handleDelete = ()=>{
        DeleteCategory()
    }
    const columns = [
        {
            title: '#Sl',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Category Name',
            dataIndex: 'category_name',
            key: 'category_name'
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            render: (_, record) => <div className='start-center gap-2'>
                <button onClick={() => {
                    handelFilterData(record.id)
                    setopenAddCategoryModal(true)
                    setOpenDropModal(false)
                    setCreatingCategory(false)
                }} className='text-2xl text-[#2ba24c] hover:scale-105 active:scale-95'>
                    <FaEdit />
                </button>
                <button onClick={() => {
                    handelFilterData(record.id)
                    setopenAddCategoryModal(false)
                    setOpenDropModal(true)
                    setCreatingCategory(false)
                }} className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                    <RxCross2 />
                </button>
            </div>,
            key: 'id'
        },
    ];
    // console.log(Category)
    const handelFilterData = (id) => {
        const newData = Category?.data?.data?.filter(item => item.id === id)
        setFilterData(newData[0])
    }
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    // rerender after update 
    useEffect(() => {
        if (isLoading || updateLoading || DeleteLoading) return
        if (data || updateData || DeleteData) refetch();setFilterData({});setopenAddCategoryModal(false);setOpenDropModal(false)
    }, [isLoading, data, updateLoading, updateData, DeleteData, DeleteLoading])
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
                        setCreatingCategory(true)
                    }} className="btn-primary max-w-44"><FaPlus /> Add Category</button>
                </div>
            </div>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <div>
                    <Table
                        columns={columns}
                        dataSource={Category?.data?.data || []}
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
                        <button onClick={handleDelete} className='text-[#FFFFFF] bg-red-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Dropout</button>
                        <button onClick={() => {
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
                    <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Category Name`} rules={{ ...register("category_name", { required: true }) }} placeholder={`write your name`} defaultValue={filterData.category_name} />
                    <button className='btn-primary max-w-32 mx-auto mt-6'>Create</button>
                </form>
            </Modal>
            {/* Follow up Modal  */}
        </>
    )
}
export default AddCategory
