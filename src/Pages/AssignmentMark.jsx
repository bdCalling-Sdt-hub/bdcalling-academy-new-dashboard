import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { DatePicker, Form, message, Modal, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { FaEdit } from 'react-icons/fa'
const data = [
    {
        "_id": "1",
        "name": "Alice Smith",
        "Batch no": "BAC-WP2024",
        "StudentsID": "123-456-7890",
        "classType": "student1@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "2",
        "name": "Bob Johnson",
        "Batch no": "BAC-WP2024",
        "StudentsID": "234-567-8901",
        "classType": "student2@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "3",
        "name": "Charlie Brown",
        "Batch no": "BAC-WP2024",
        "StudentsID": "345-678-9012",
        "classType": "student3@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "4",
        "name": "David Wilson",
        "Batch no": "BAC-WP2024",
        "StudentsID": "456-789-0123",
        "classType": "student4@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "5",
        "name": "Eva Martinez",
        "Batch no": "BAC-WP2024",
        "StudentsID": "567-890-1234",
        "classType": "student5@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "6",
        "name": "Frank Garcia",
        "Batch no": "BAC-WP2024",
        "StudentsID": "678-901-2345",
        "classType": "student6@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "7",
        "name": "Grace Miller",
        "Batch no": "BAC-WP2024",
        "StudentsID": "789-012-3456",
        "classType": "student7@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "8",
        "name": "Hank Lee",
        "Batch no": "BAC-WP2024",
        "StudentsID": "890-123-4567",
        "classType": "student8@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "9",
        "name": "Ivy Harris",
        "Batch no": "BAC-WP2024",
        "StudentsID": "901-234-5678",
        "classType": "student9@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "10",
        "name": "Jack Clark",
        "Batch no": "BAC-WP2024",
        "StudentsID": "012-345-6789",
        "classType": "student10@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "11",
        "name": "Karen Lewis",
        "Batch no": "BAC-WP2024",
        "StudentsID": "123-456-7891",
        "classType": "student11@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "12",
        "name": "Leo Walker",
        "Batch no": "BAC-WP2024",
        "StudentsID": "234-567-8902",
        "classType": "student12@example.com",
        "Grade": "Art",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "13",
        "name": "Mona Hall",
        "Batch no": "BAC-WP2024",
        "StudentsID": "345-678-9013",
        "classType": "student13@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "14",
        "name": "Nick Young",
        "Batch no": "BAC-WP2024",
        "StudentsID": "456-789-0124",
        "classType": "student14@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "15",
        "name": "Olivia King",
        "Batch no": "BAC-WP2024",
        "StudentsID": "567-890-1235",
        "classType": "student15@example.com",
        "Grade": "Excellent",
        "batch": "off line",
        "status": "Absent",
        "score": "45/50 (85%)",
        "date": '12-08-2023',
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    }
]
const AssignmentMark = () => {
    const [openDropModal, setOpenDropModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [filterData, setFilterData] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const onChange = (date, dateString) => {
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
            title: 'Students ID',
            dataIndex: 'StudentsID',
            key: 'StudentsID'
        },
        {
            title: 'Class Topic',
            dataIndex: 'classType',
            key: 'classType'
        },
        {
            title: 'Grade',
            dataIndex: 'Grade',
            key: 'Grade'
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score'
        },
        {
            title: 'Batch No',
            dataIndex: 'batch',
            key: 'batch'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Passed / failed',
            dataIndex: 'status',
            render: (_, record) => <div className='flex justify-start items-center gap-2'>
                <div className='flex justify-start items-center rounded-md gap-2  font-semibold px-3 py-1 text-green-600 bg-green-100 w-fit'>
                    <p className={``}>Present</p>
                </div>
            </div>,
            key: 'Payment status'
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (
                    <div className='flex justify-start items-center gap-2'>
                        <FaEdit onClick={() => setOpenEditModal(true)} className='text-2xl cursor-pointer text-green-600' />
                        <RxCross2 className='text-2xl text-red-600' />
                    </div>
                )
            }
        }
    ];
    const handelFilterData = (id) => {
        const newData = data.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    const [colorType, setColorType] = useState(['blue'])
    const colorHandeler = (color) => {
        if (colorType.find(item => item == color)) {
            const newColor = colorType.filter(item => item != color)
            setColorType([...newColor])
        } else {
            setColorType([...colorType, color])
        }
    }
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    const onFinish = () => {

    }
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`Successful Students list`} />
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
                    <p className='text-2xl text-center mt-4 text-[#5C5C5C]'>want to dropout this student ?</p>
                    <div className='between-center mt-6'>
                        <button onClick={() => {
                            setOpenDropModal(false)
                        }} className='text-[#FFFFFF] bg-red-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Dropout</button>
                        <button onClick={() => {
                            setOpenDropModal(false)
                        }} className='text-[#FFFFFF] bg-green-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Cancel</button>
                    </div>
                </div>
            </Modal>
            {/* print modal  */}
            <Modal
                centered
                footer={false}
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
            >
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <p className='text-2xl font-semibold mb-3'>Add Score</p>
                    <Form.Item
                        name={`name`}
                        label={`Name`}
                        rules={[
                            {
                                required: 'true',
                                message: 'please input name'
                            }
                        ]}
                    >
                        <Input placeholder={`shaharul siyam`} classNames={`border `} />
                    </Form.Item>
                    <Form.Item
                        name={`studentID`}
                        label={`Student ID`}
                        rules={[
                            {
                                required: 'true',
                                message: 'please input student ID'
                            }
                        ]}
                    >
                        <Input placeholder={`4t5`} classNames={`border `} />
                    </Form.Item>
                    <Form.Item
                        name={`Score`}
                        label={`Score`}
                        rules={[
                            {
                                required: 'true',
                                message: 'please input Score'
                            }
                        ]}
                    >
                        <Input placeholder={`465463`} type={`number`} classNames={`border `} />
                    </Form.Item>
                    <Form.Item
                        name={`date`}
                        label={`Date`}
                        rules={[
                            {
                                required: 'true',
                                message: 'please input date'
                            }
                        ]}
                    >
                        <Input placeholder={`465463`} type={`date`} classNames={`border `} />
                    </Form.Item>
                    <div className='flex justify-start items-center gap-3'>
                        <button className='px-10 py-2 border border-blue-500 text-white bg-blue-500 rounded-md '> Save </button>
                        <button className='px-10 py-2 border border-blue-500 text-blue-500 rounded-md '> Reset </button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default AssignmentMark
