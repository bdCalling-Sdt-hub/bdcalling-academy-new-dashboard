import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaCheck, FaFileExcel, FaPlus, FaRegFilePdf } from 'react-icons/fa6'
import { DatePicker, Divider, Modal, Radio, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { SiMicrosoftword } from 'react-icons/si'
import useGetRequest from '../Hooks/useGetRequest'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import { RxCross2 } from 'react-icons/rx'


const SuccessfulStudents = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filterBy, setFilterBy] = useState({})


    // query
    const [requestingStores, Stores, StoresError,] = useGetRequest('successStory', `/successful-student?&page=${page}${filterBy?.number ? `&phone_number=${filterBy?.number}` : ""}${filterBy?.name ? `&name=${filterBy?.name}` : ""}`)
    const TableData = Stores?.data?.map((item, i) => {
        return {
            key: i + 1,
            name: item?.students[0]?.user?.name,
            img: `${imageUrl}/${item?.students[0]?.image}` || ProfileImage,
            phone: item?.students[0]?.phone_number,
            studentID: item?.students[0]?.user?.email,
            course: item?.course?.course_name,
            date: item?.students[0]?.registration_date,
            status: item?.students[0]?.status


        }
    })
    const onSubmit = data => {
        setFilterBy({ ...data })
    };
    const onChange = (date, dateString) => {
    };
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
            title: 'Course Name',
            dataIndex: 'course',
            key: 'course'
        },
        {
            title: 'Date Of Admition',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => <div>
                <div className='flex justify-start items-center rounded-md gap-2 text-white font-semibold px-3 py-1 bg-green-500 w-fit'>
                    <FaCheck />
                    {/* <p className={``}>{record?.['status']}</p> */}
                    <p className={``}>completed</p>
                </div>
            </div>,
            key: 'Payment status'
        },
    ];


    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`Successful Students list`} />
                </div>
                {/* <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => setOpenFollowUpModal(true)} className="btn-secondary max-w-32">Follow Up</button>
                </div> */}
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
                <button type='button' onClick={() => {
                    setFilterBy({})
                }} className='text-2xl p-[10px] bg-[red] text-white rounded-full'>
                    <RxCross2 />
                </button>
            </form>


            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                {/* {
                    (filterBy?.name || filterBy?.number || filterBy?.category || filterBy?.dob) && <div className='flex justify-start items-center gap-2 mb-2 -mt-3 ml-5'>Filter by
                        {filterBy?.name && <><strong>name</strong> : {filterBy?.name} </>}
                        {filterBy?.number && <><strong>number</strong>   : {filterBy?.number}</>}
                        {filterBy?.category && <> <strong>category</strong> : {filterBy?.category} </>}
                        {filterBy?.dob && <> <strong>date of birth</strong> : {filterBy?.dob} </>}
                        <button onClick={() => setFilterBy({})} className='text-xl p-1 rounded-full text-white bg-red-500'>
                            <RxCross2 />
                        </button>
                    </div>
                } */}
                <div>
                    <Table
                        columns={columns}
                        dataSource={TableData}
                        pagination={{
                            total: Stores?.total || 0,
                            onChange: (page, pagesize) => setPage(page),
                            showSizeChanger: false,
                            pageSize: Stores?.per_page
                        }}
                    />
                </div>
            </div>
        </>
    )
}


export default SuccessfulStudents




