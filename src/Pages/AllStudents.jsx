import React, { useState } from 'react'
import PageHeading from '../Components/PageHeading'
import { FaPlus } from 'react-icons/fa6'
import { DatePicker, Divider, Radio, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { BsInfoCircle } from 'react-icons/bs'
const data = [
    {
        "_id": "1",
        "name": "Alice Smith",
        "phone": "123-456-7890",
        "email": "student1@example.com",
        "course": "Mathematics",
        "date": "2024-01-15",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "2",
        "name": "Bob Johnson",
        "phone": "234-567-8901",
        "email": "student2@example.com",
        "course": "Physics",
        "date": "2024-01-16",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "3",
        "name": "Charlie Brown",
        "phone": "345-678-9012",
        "email": "student3@example.com",
        "course": "Chemistry",
        "date": "2024-01-17",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "4",
        "name": "David Wilson",
        "phone": "456-789-0123",
        "email": "student4@example.com",
        "course": "Biology",
        "date": "2024-01-18",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "5",
        "name": "Eva Martinez",
        "phone": "567-890-1234",
        "email": "student5@example.com",
        "course": "English",
        "date": "2024-01-19",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "6",
        "name": "Frank Garcia",
        "phone": "678-901-2345",
        "email": "student6@example.com",
        "course": "History",
        "date": "2024-01-20",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "7",
        "name": "Grace Miller",
        "phone": "789-012-3456",
        "email": "student7@example.com",
        "course": "Geography",
        "date": "2024-01-21",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "8",
        "name": "Hank Lee",
        "phone": "890-123-4567",
        "email": "student8@example.com",
        "course": "Economics",
        "date": "2024-01-22",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "9",
        "name": "Ivy Harris",
        "phone": "901-234-5678",
        "email": "student9@example.com",
        "course": "Political Science",
        "date": "2024-01-23",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "10",
        "name": "Jack Clark",
        "phone": "012-345-6789",
        "email": "student10@example.com",
        "course": "Sociology",
        "date": "2024-01-24",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "11",
        "name": "Karen Lewis",
        "phone": "123-456-7891",
        "email": "student11@example.com",
        "course": "Philosophy",
        "date": "2024-01-25",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "12",
        "name": "Leo Walker",
        "phone": "234-567-8902",
        "email": "student12@example.com",
        "course": "Art",
        "date": "2024-01-26",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "13",
        "name": "Mona Hall",
        "phone": "345-678-9013",
        "email": "student13@example.com",
        "course": "Music",
        "date": "2024-01-27",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "14",
        "name": "Nick Young",
        "phone": "456-789-0124",
        "email": "student14@example.com",
        "course": "Theater",
        "date": "2024-01-28",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "15",
        "name": "Olivia King",
        "phone": "567-890-1235",
        "email": "student15@example.com",
        "course": "Dance",
        "date": "2024-01-29",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    }
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Course Category',
        dataIndex: 'course',
        key: 'course'
    },
    {
        title: 'Date Of admission',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Set Follow Up',
        dataIndex: '_id',
        render: (_, record) => <div className='start-center gap-2'>
            <button className='btn-primary max-w-32'>
                <FaPlus /> Follow Up
            </button>
            <span className='w-5 h-5 bg-[#2492EB] rounded-full'></span>
            <span className='w-5 h-5 bg-[#2BA24C] rounded-full'></span>
            <span className='w-5 h-5 bg-[#FFC60B] rounded-full'></span>
        </div>,
        key: '_id'
    },
    {
        title: 'Actions',
        dataIndex: '_id',
        render: (_, record) => <div className='start-center gap-2'>
            <button className='p-1 bg-[#FFC60B] rounded hover:scale-105 active:scale-95 transition-all max-w-32'>
                Admit
            </button>
            <button className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                <BsInfoCircle />
            </button>
            <button className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                <RxCross2 />
            </button>
        </div>,
        key: '_id'
    },
];
const AllStudents = () => {
    const [selectionType, setSelectionType] = useState('checkbox');

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const onChange = (date, dateString) => {
        // console.log(date, dateString);
    };
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`Admin List`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button className="btn-secondary max-w-44"><FaPlus /> Send Message</button>
                    <button className="btn-primary max-w-44"><FaPlus /> Add Student</button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl' onChange={onChange} />
                <div className='max-w-44 min-w-44'>
                    <Input rules={{ ...register("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`+8801566026301`} />
                </div>
                <select name='category' className='p-2 border-none outline-none rounded-3xl text-gray-400'>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                </select>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                    <IoSearch />
                </button>
            </form>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <h3 className='section-title px-5'>Add Student List</h3>
                <div>
                    <Radio.Group
                        onChange={({ target: { value } }) => {
                            setSelectionType(value);
                        }}
                        value={selectionType}
                    >
                        <Radio value="checkbox">Checkbox</Radio>
                        <Radio value="radio">radio</Radio>
                    </Radio.Group>

                    <Divider />

                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </>
    )
}

export default AllStudents
