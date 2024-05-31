import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { DatePicker, Modal, Table } from 'antd'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { render } from 'react-dom'
import { FaCheck } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { FiEdit } from 'react-icons/fi'
import LeaveForm from '../Components/Forms/LeaveForm'
// import SelectInput from '../Components/Input/SelectInput'
const requestList =[
    {
        "Name": "Alice Johnson",
        "Leave": "Maternity Leave",
        "Phone": "+1-202-555-0192",
        "Email": "alice.johnson@example.com",
        "Designation": "UX Designer",
        "Date": "2023-06-01",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "User Experience Design",
        "Reason": "Expecting a baby",
        "Comments": "Leave granted for six months"
    },
    {
        "_id": 4,
        "Name": "Bob Brown",
        "Leave": "Annual Leave",
        "Phone": "+1-202-555-0143",
        "Email": "bob.brown@example.com",
        "Designation": "Data Analyst",
        "Date": "2023-06-05",
        "Status": "Rejected",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Data Analysis",
        "Reason": "Vacation plans",
        "Comments": "Leave request denied due to project deadlines"
    },
    {
        "_id": 5,
        "Name": "Charlie Green",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0187",
        "Email": "charlie.green@example.com",
        "Designation": "HR Manager",
        "Date": "2023-06-07",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Human Resources Management",
        "Reason": "Flu",
        "Comments": "Approved with doctor's note"
    },
    {
        "_id": 6,
        "Name": "Emily White",
        "Leave": "Casual Leave",
        "Phone": "+1-202-555-0165",
        "Email": "emily.white@example.com",
        "Designation": "Marketing Specialist",
        "Date": "2023-06-09",
        "Status": "Pending",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Marketing Strategies",
        "Reason": "Personal matters",
        "Comments": "Pending approval from the manager"
    },
    {
        "_id": 7,
        "Name": "Frank Black",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0134",
        "Email": "frank.black@example.com",
        "Designation": "Accountant",
        "Date": "2023-06-11",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Financial Accounting",
        "Reason": "Migraine",
        "Comments": "Approved with prior medical history"
    },
    {
        "_id": 8,
        "Name": "Grace Blue",
        "Leave": "Annual Leave",
        "Phone": "+1-202-555-0199",
        "Email": "grace.blue@example.com",
        "Designation": "Sales Manager",
        "Date": "2023-06-13",
        "Status": "Rejected",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Sales and Negotiation",
        "Reason": "Travel",
        "Comments": "Leave request denied due to sales targets"
    },
    {
        "_id": 9,
        "Name": "Henry Violet",
        "Leave": "Sick Leave",
        "Phone": "+1-202-555-0173",
        "Email": "henry.violet@example.com",
        "Designation": "IT Support",
        "Date": "2023-06-15",
        "Status": "Approved",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "IT Support and Maintenance",
        "Reason": "Fever",
        "Comments": "Approved with two days of rest"
    },
    {
        "_id": 10,
        "Name": "Ivy Gray",
        "Leave": "Maternity Leave",
        "Phone": "+1-202-555-0154",
        "Email": "ivy.gray@example.com",
        "Designation": "Graphic Designer",
        "Date": "2023-06-17",
        "Status": "Pending",
        "img": "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
        "Expert": "Graphic Design",
        "Reason": "Expecting a baby",
        "Comments": "Pending approval, expected delivery in August"
    }
]

const RequestTrainer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const [filterdData, setFilterdData] = useState({})
    const handelEdit = (id) => {
        setImage(null)
        const newData = requestList.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenLeaveModal(true)
    }
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    const [image, setImage] = useState(null);
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
                    handelEdit(record._id)
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
            <Modal
                centered
                footer={false}
                open={openLeaveModal}
                onCancel={() => setOpenLeaveModal(false)}
                width={700}
            >
                <LeaveForm image={image} setImage={setImage} filterdData={filterdData} inputHandeler={inputHandeler} register={register}
                    handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} />
            </Modal>
        </>
    )
}

export default RequestTrainer
