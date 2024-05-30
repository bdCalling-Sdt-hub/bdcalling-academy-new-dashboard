import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { DatePicker, Table } from 'antd'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { render } from 'react-dom'
import { FaCheck } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { FiEdit } from 'react-icons/fi'
// import SelectInput from '../Components/Input/SelectInput'
const requestList = [
    {
        "_id": 1,
        "Name": "John Doe",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0156",
        "Designation": "Software Engineer",
        "Date": "2023-05-29",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 2,
        "Name": "Jane Smith",
        "Leave": "Casual Leave",
        "Phone": "+1-202-555-0178",
        "Designation": "Product Manager",
        "Date": "2023-05-30",
        "Status": "Pending",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 3,
        "Name": "Alice Johnson",
        "Leave": "Maternity Leave",
        "Phone": "+1-202-555-0192",
        "Designation": "UX Designer",
        "Date": "2023-06-01",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 4,
        "Name": "Bob Brown",
        "Leave": "Annual Leave",
        "Phone": "+1-202-555-0143",
        "Designation": "Data Analyst",
        "Date": "2023-06-05",
        "Status": "Rejected",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 5,
        "Name": "Charlie Green",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0187",
        "Designation": "HR Manager",
        "Date": "2023-06-07",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 6,
        "Name": "Emily White",
        "Leave": "Casual Leave",
        "Phone": "+1-202-555-0165",
        "Designation": "Marketing Specialist",
        "Date": "2023-06-09",
        "Status": "Pending",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 7,
        "Name": "Frank Black",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0134",
        "Designation": "Accountant",
        "Date": "2023-06-11",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 8,
        "Name": "Grace Blue",
        "Leave": "Annual Leave",
        "Phone": "+1-202-555-0199",
        "Designation": "Sales Manager",
        "Date": "2023-06-13",
        "Status": "Rejected",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 9,
        "Name": "Henry Violet",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0173",
        "Designation": "IT Support",
        "Date": "2023-06-15",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    },
    {
        "_id": 10,
        "Name": "Ivy Gray",
        "Leave": "Maternity Leave",
        "Phone": "+1-202-555-0154",
        "Designation": "Graphic Designer",
        "Date": "2023-06-17",
        "Status": "Pending",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png"
    }
]


const RequestTrainer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const onChange = (date, dateString) => {
    };
    const columns = [{
        title: '#Sl',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: 'Full Name',
        dataIndex: 'name',
        render: (_, record) =>
            <div className='start-center gap-2'>
                <img src={record?.img} className='h-8 w-8 rounded-full' alt="" /> <p>{record?.Name}</p>
            </div>
        ,
        key: 'name',
    },
    {
        title: 'Leave Type',
        dataIndex: 'Leave',
        key: 'Leave',
    },
    {
        title: 'Phone Number',
        dataIndex: 'Phone',
        key: 'Phone',
    },
    {
        title: 'Designation',
        dataIndex: 'Designation',
        key: 'Designation',
    },
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'Status',
        dataIndex: '_id',
        render: (_, record) =>
            <div className='center-center gap-2'>
                <button className='transition-all text-base font-medium px-6 py-[6px] bg-[#2492EB] rounded-md text-white hover:scale-105 active:scale-95'>Message</button>
                <button className='transition-all text-base font-medium px-6 py-[6px] bg-[#2BA24C] rounded-md text-white hover:scale-105 active:scale-95 center-center max-w-36'><FaCheck className='text-xl' /> Approved</button>

            </div>
        ,
        key: '_id',
    },
    {
        title: 'Actions',
        render: (_, record) => (
            <div className="start-center gap-3 text-2xl">
                <FiEdit className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                    // console.log(record._id)
                }} /> <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record._id)
                }} />
            </div>
        ),
        key: '_id',
    },
    ];
    return (
        <>
            <PageHeading text={`Trainer Request To class off`} />
            <div className='between-center gap-2 flex-wrap'>
                <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                    <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl' onChange={onChange} />
                    <div className='max-w-44 min-w-44'>
                        <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-[30px]`} placeholder={`+8801566026301`} />
                    </div>
                    <div className='max-w-44 min-w-44'>
                        <Input rules={{ ...register("designation", { required: false }) }} classNames={`rounded-[30px]`} placeholder={`designation`} />
                    </div>
                    <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                        <IoSearch />
                    </button>
                </form>
                <div className='flex justify-end items-end gap-3'>
                    <button className='transition-all text-base font-medium px-6 py-2 bg-[#2BA24C] rounded-md text-white hover:scale-105 active:scale-95'>Approved</button>
                    <button className='transition-all text-base font-medium px-6 py-2 text-[#FFC60B] border border-[#FFC60B] rounded-md hover:scale-105 active:scale-95'>Pending</button>
                    <button className='transition-all text-base font-medium px-6 py-2 text-[#FA1131] border border-[#FA1131] rounded-md  hover:scale-105 active:scale-95'>Rejected</button>
                </div>
            </div>
            <div id='allStudent' className='my-8 rounded-md bg-white'>
                <p className='section-title px-2'>All List</p>
                <Table dataSource={requestList} columns={columns} />
            </div>
        </>
    )
}

export default RequestTrainer
