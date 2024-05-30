import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaFileExcel, FaPlus, FaRegFilePdf } from 'react-icons/fa6'
import { DatePicker, Divider, Modal, Radio, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { MdEditSquare, MdOutlineArrowBackIosNew } from 'react-icons/md'
import { FiPrinter } from 'react-icons/fi'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { SiMicrosoftword } from 'react-icons/si'
const data = [
    {
        "_id": "1",
        "name": "Alice Smith",
        "Batch no": "BAC-WP2024",
        "phone": "123-456-7890",
        "studentID": "student1@example.com",
        "course": "Mathematics",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "2",
        "name": "Bob Johnson",
        "Batch no": "BAC-WP2024",
        "phone": "234-567-8901",
        "studentID": "student2@example.com",
        "course": "Physics",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "3",
        "name": "Charlie Brown",
        "Batch no": "BAC-WP2024",
        "phone": "345-678-9012",
        "studentID": "student3@example.com",
        "course": "Chemistry",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "4",
        "name": "David Wilson",
        "Batch no": "BAC-WP2024",
        "phone": "456-789-0123",
        "studentID": "student4@example.com",
        "course": "Biology",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "5",
        "name": "Eva Martinez",
        "Batch no": "BAC-WP2024",
        "phone": "567-890-1234",
        "studentID": "student5@example.com",
        "course": "English",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "6",
        "name": "Frank Garcia",
        "Batch no": "BAC-WP2024",
        "phone": "678-901-2345",
        "studentID": "student6@example.com",
        "course": "History",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "7",
        "name": "Grace Miller",
        "Batch no": "BAC-WP2024",
        "phone": "789-012-3456",
        "studentID": "student7@example.com",
        "course": "Geography",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "8",
        "name": "Hank Lee",
        "Batch no": "BAC-WP2024",
        "phone": "890-123-4567",
        "studentID": "student8@example.com",
        "course": "Economics",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "9",
        "name": "Ivy Harris",
        "Batch no": "BAC-WP2024",
        "phone": "901-234-5678",
        "studentID": "student9@example.com",
        "course": "Political Science",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "10",
        "name": "Jack Clark",
        "Batch no": "BAC-WP2024",
        "phone": "012-345-6789",
        "studentID": "student10@example.com",
        "course": "Sociology",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "11",
        "name": "Karen Lewis",
        "Batch no": "BAC-WP2024",
        "phone": "123-456-7891",
        "studentID": "student11@example.com",
        "course": "Philosophy",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
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
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "13",
        "name": "Mona Hall",
        "Batch no": "BAC-WP2024",
        "phone": "345-678-9013",
        "studentID": "student13@example.com",
        "course": "Music",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "14",
        "name": "Nick Young",
        "Batch no": "BAC-WP2024",
        "phone": "456-789-0124",
        "studentID": "student14@example.com",
        "course": "Theater",
        "Course type": "off line",
        "Payment status": "paid",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    },
    {
        "_id": "15",
        "name": "Olivia King",
        "Batch no": "BAC-WP2024",
        "phone": "567-890-1235",
        "studentID": "student15@example.com",
        "course": "Dance",
        "Course type": "off line",
        "Payment status": "due",
        "img": "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png"
    }
]
const AdmittedStudents = () => {
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openPrintModal, setOpenPrintModal] = useState(false)
    const [openDropModal, setOpenDropModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [exportType, setExportType] = useState('pdf')
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
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Batch no',
            dataIndex: 'Batch no',
            key: 'Batch no'
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
            title: 'Course type',
            dataIndex: 'Course type',
            key: 'Course type'
        },
        {
            title: 'Payment status',
            dataIndex: 'Payment status',
            render: (_, record) => <div className='start-center gap-2'>
                <p className={`${record?.['Payment status'] === 'due' ? 'text-red-600' : 'text-green-500'} font-semibold`}>{record?.['Payment status']}</p>
                <button onClick={()=>{
                    handelFilterData(record._id)
                    setOpenPaymentModal(true)
                }} disabled={record?.['Payment status'] != 'due'} className='p-2 py-1 bg-[#FFC60B] text-white font-semibold rounded'>payment</button>
            </div>,
            key: 'Payment status'
        },
        {
            title: 'Set Follow Up',
            dataIndex: '_id',
            render: (_, record) => <div className='start-center gap-2'>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenFollowUpModal(true)
                    setOpenPrintModal(false)
                    setOpenDropModal(false)
                }} className='btn-primary max-w-32'>
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
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenPrintModal(true)
                    setOpenFollowUpModal(false)
                    setOpenDropModal(false)
                }} className='text-2xl text-[#2ba24c] hover:scale-105 active:scale-95'>
                    <FiPrinter />
                </button>
                <Link to={`/admitted-students/students-information/${record?._id}`} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <IoMdInformationCircleOutline />
                </Link>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenPrintModal(false)
                    setOpenFollowUpModal(false)
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
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`All Admitted Students`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => setOpenFollowUpModal(true)} className="btn-secondary max-w-32">Follow Up</button>
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
               {/* payment modal  */}
               <Modal
                centered
                footer={false}
                open={openPaymentModal}
                onCancel={() => setOpenPaymentModal(false)}
                width={700}
            >
                <div>
                    <div className='start-center gap-4'>
                        <MdOutlineArrowBackIosNew className='cursor-pointer' onClick={() => {
                            setOpenPaymentModal(false)
                        }} /> <h4>Payment</h4>
                    </div>
                    <div className='start-center gap-2 my-2'>
                        <input onClick={() => {
                            setFullPaymentType(true)
                        }} defaultChecked={fullpaymentType} className='cursor-pointer' type="radio" value="paymentType" name="paymentOption" id="fullPayment" />
                        <label for="fullPayment">Full Payment</label>

                        <input onClick={() => {
                            setFullPaymentType(false)
                        }} defaultChecked={!fullpaymentType} className='cursor-pointer' type="radio" value="instalmentpayment" name="paymentOption" id="instalmentPayment" />
                        <label for="instalmentPayment">Instalment Payment</label>
                    </div>
                    {
                        fullpaymentType ? <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid-2 gap-2 mb-2'>
                                    <div className='w-full relative'>
                                        <p className="pb-2">Discount</p>
                                        <select defaultValue={`*Required Field`} className='w-full p-2 outline-none border rounded-md' {...register('discount', { required: false })}>
                                            <option value="tk 2000">tk 2000</option>
                                            <option value="tk 2000">tk 2000</option>
                                        </select>

                                    </div>
                                    <Input classNames={`border rounded`} rules={{ ...register('reference', { required: false }) }} lebel={`Reference`} status={errors} placeholder={`CEO, Monir sir`} />
                                </div>
                            </form>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Payable Amount Date:</p>
                                <p className='text-end text-sm'>04/05/2024</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Name:</p>
                                <p className='text-end text-sm'>UX/UI Design</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course ID:</p>
                                <p className='text-end text-sm'>202402</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Student ID:</p>
                                <p className='text-end text-sm'>BDA202415</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Fee:</p>
                                <p className='text-end text-sm'>15000Tk</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Due Amount:</p>
                                <p className='text-end text-sm'>0</p>
                            </div>
                            <hr className='w-full my-2 block' />
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm font-semibold'>Total Paymet :</p>
                                <p className='text-end text-sm font-semibold'>13000Tk</p>
                            </div>
                            <button className='btn-primary max-w-32 mx-auto mt-7'>
                                Confirm
                            </button>
                        </> : <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid-2 gap-2 mb-2'>
                                    <div className='w-full relative'>
                                        <p className="pb-2">Discount</p>
                                        <select defaultValue={`tk 2000`} className='w-full p-2 outline-none border rounded-md' {...register('discount', { required: false })}>
                                            <option value="tk 2000">tk 2000</option>
                                            <option value="tk 2000">tk 2000</option>
                                        </select>

                                    </div>
                                    <Input classNames={`border rounded`} rules={{ ...register('reference', { required: false }) }} lebel={`Reference`} status={errors} placeholder={`CEO, Monir sir`} />
                                </div>
                                <div className='border p-2 rounded'>
                                    <div className='grid-2 gap-2 mb-2'>
                                        <div className='w-full relative'>
                                            <p className="pb-2">Installment Type</p>
                                            <select defaultValue={`3 installment`} className='w-full p-2 outline-none border rounded-md' {...register('installmentType', { required: false })}>
                                                <option value="3 installment">3 installment</option>
                                                <option value="3 installment">3 installment</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`7000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded text-gray-300`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-green-500'>
                                            <img className='w-10 h-10' src='https://i.ibb.co/4Zff45B/check-mark-1-1.png' alt="" />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`3000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`3000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Payable Amount Date:</p>
                                <p className='text-end text-sm'>04/05/2024</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Name:</p>
                                <p className='text-end text-sm'>UX/UI Design</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course ID:</p>
                                <p className='text-end text-sm'>202402</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Student ID:</p>
                                <p className='text-end text-sm'>BDA202415</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Fee:</p>
                                <p className='text-end text-sm'>15000Tk</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Due Amount:</p>
                                <p className='text-end text-sm text-red-600'>6000</p>
                            </div>
                            <hr className='w-full my-2 block' />
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm font-semibold'>Total Paymet :</p>
                                <p className='text-end text-sm font-semibold'>13000Tk</p>
                            </div>
                            <button className='btn-primary max-w-32 mx-auto mt-7'>
                                Confirm
                            </button>
                        </>
                    }

                </div>
            </Modal>
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
                        <button className='text-[#FFFFFF] bg-red-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Dropout</button>
                        <button className='text-[#FFFFFF] bg-green-600 p-2 px-4 rounded-md hover:scale-105 active:scale-95 font-medium'>Cancel</button>
                    </div>
                </div>
            </Modal>
            {/* print modal  */}
            <Modal
                centered
                footer={false}
                open={openPrintModal}
                onCancel={() => setOpenPrintModal(false)}
                width={600}
            >
                <div>
                    <div className='grid-2-start gap-2'>
                        <div className='w-full'>
                            <img className='mt-5' src="https://i.ibb.co/LScrG6N/image-336.png" alt="" />
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Billed To:</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Rahman Abir</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>+880 1744545477</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>House: 14, Block #A, Banasree, Dhaka 1219</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Bkash</p>
                        </div>
                        <div className='w-full'>
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Invoice No: 1234</p>
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-9'>Payments Information:</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Bkash</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Account Name: Rahman Abir</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Pay Date: 13 March, 2024</p>
                        </div>
                    </div>
                    <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Students Information:</p>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>UX/UI Design</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>202402</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Student ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>202402</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Payable Amount Date:</p>
                        <p className='text-base text-[var(--primary-color)]'>04/05/2024</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Due Amount:</p>
                        <p className='text-base text-[var(--primary-color)] text-red-500'>15000</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-4 my-1'>
                        <p className='text-base font-medium text-[var(--primary-color)] text-start'>Course Name</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-center'>Price</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-center'>Quantity</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-end'>Total Amount</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-4 my-1'>
                        <p className='text-base text-[var(--primary-color)] text-start'>UX/Ui Design</p>
                        <p className='text-base text-[var(--primary-color)] text-center'>15000Tk</p>
                        <p className='text-base text-[var(--primary-color)] text-center'>1</p>
                        <p className='text-base text-[var(--primary-color)] text-end'>15000Tk</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-2 my-1'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Amount:</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-end'>15000Tk</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='start-center gap-3 my-6'>
                        <button onClick={() => {
                            setExportType('pdf')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'pdf' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <FaRegFilePdf />
                            PDF
                        </button>
                        <button onClick={() => {
                            setExportType('word')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'word' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <SiMicrosoftword />
                            WORD
                        </button>
                        <button onClick={() => {
                            setExportType('excel')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'excel' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <FaFileExcel />
                            EXCEL
                        </button>
                    </div>
                    <div className='start-center gap-4'>
                        <button className='btn-primary max-w-40'>Download Invoice</button>
                        <button className='btn-secondary max-w-28'>Print</button>
                    </div>
                </div>
            </Modal>
            {/* Follow up Modal  */}
            <Modal
                centered
                footer={false}
                open={openFollowUpModal}
                onCancel={() => setOpenFollowUpModal(false)}
            >
                <div className=''>
                    <h3 className='section-title -mt-7'>Follow Up Comments</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='border border-[var(--primary-bg)] rounded-md p-2'>
                        <div className='start-center gap-3'>
                            <img src={filterData?.img} className='h-8 w-8 rounded-full' alt="" /> <p className='text-base font-semibold'>{filterData?.name}</p>
                        </div>
                        <textarea className='resize-none w-full border rounded-md outline-none mt-5 min-h-32 p-2' {...register('comment', { required: true })} />
                        {errors.comment && <p className='text-red-500'>comment is required <sup className=''>*</sup></p>}
                        <div className='between-center mt-2'>
                            <div className='start-center gap-2'>
                                <span onClick={() => colorHandeler('blue')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'blue') ? 'bg-[#2492EB]' : 'bg-transparent')} border-[#2492EB] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('green')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'green') ? 'bg-[#2BA24C]' : 'bg-transparent')} border-[#2BA24C] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('yellow')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'yellow') ? 'bg-[#FFC60B]' : 'bg-transparent')} border-[#FFC60B] border rounded-full`}></span>
                            </div>
                            <button className='btn-primary max-w-32'>Send Comment</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AdmittedStudents
