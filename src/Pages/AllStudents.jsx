import React, { useState } from 'react'
import PageHeading from '../Components/PageHeading'
import { FaPlus } from 'react-icons/fa6'
import { DatePicker, Divider, Modal, Radio, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdEditSquare, MdOutlineArrowBackIosNew } from 'react-icons/md'
import UpdateInput from '../Components/UpdateInput'
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

const AllStudents = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openAdmitModal, setOpenAdmitModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const [openStudentAddModal, setOpenStudentAddModal] = useState(false)
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
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenFollowUpModal(true)
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
                    setImage(null)
                    setOpenAdmitModal(true)
                }} className='p-1 bg-[#FFC60B] rounded hover:scale-105 active:scale-95 transition-all max-w-32'>
                    Admit
                </button>
                <button onClick={() => {
                    handelFilterData(record?._id)
                    setImage(null)
                    setOpenStudentAddModal(true)
                }} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <MdEditSquare />
                </button>
                <button className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                    <RxCross2 />
                </button>
            </div>,
            key: '_id'
        },
    ];
    const handelFilterData = (id) => {
        console.log(id)
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`All Students`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button className="btn-secondary max-w-44"><FaPlus /> Send Message</button>
                    <button onClick={() => {
                        setImage(null)
                        setOpenStudentAddModal(true)
                    }} className="btn-primary max-w-44"><FaPlus /> Add Student</button>
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
            {/* create and update student  modal */}
            <Modal
                centered
                footer={false}
                onCancel={() => setOpenStudentAddModal(false)}
                open={openStudentAddModal}
                width={600}
            >
                <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
                    <div className="center-center">
                        <div className={`h-28 w-28 rounded-full my-4  relative`}>
                            {
                                image ? <img className="h-full w-full rounded-full object-cover" src={image} alt="" /> : filterData?.profile ? <img className="h-full w-full rounded-full object-cover" src={filterData?.profile} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={`https://i.ibb.co/6NTVcx7/default-user-icon.webp`} alt="" />
                            }

                            <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                                <FaEdit />
                            </label>
                        </div>
                    </div>
                    <input id="profile" onChange={handleFileChange} className="hidden" name="profile" type="file" />
                    <div className="grid-2">
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...register("name", { required: true }) }} placeholder={`Full Name*`} defaultValue={filterData.name} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Phone Number*`} rules={{ ...register("phone", { required: true }) }} placeholder={`Phone Number*`} defaultValue={filterData.phone} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Email*`} type={'email'} rules={{ ...register("email", { required: true }) }} placeholder={`Email*`} defaultValue={filterData.email} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Date of Birth*`} type={`date`} rules={{ ...register("date", { required: true }) }} placeholder={`Date of Birth*`} defaultValue={filterData.date} />

                        <lebel className='mt-3 block w-full relative'>
                            Course Category
                            <select {...register("category", { required: true })} className="w-full outline-none border p-2 rounded-md" id="">
                                <option value="category">Please Select a Category</option>
                                <option value="category">category</option>
                                <option value="category">category</option>
                                <option value="category">category</option>
                            </select>
                            {
                                errors?.category && <p className="absolute -bottom-4 text-red-600">category is requerd</p>
                            }
                        </lebel>
                        <lebel className='mt-3 block w-full relative'>
                            Gender*
                            <select {...register("gender", { required: true })} className="w-full outline-none border p-2 rounded-md" id="">
                                <option value="gender">Gender</option>
                                <option value="gender">gender</option>
                                <option value="gender">gender</option>
                                <option value="gender">gender</option>
                            </select>
                            {
                                errors?.gender && <p className="absolute -bottom-4 text-red-600">gender is requerd</p>
                            }
                        </lebel>
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Blood Group*`} type={`text`} rules={{ ...register("blood", { required: true }) }} placeholder={`Blood Group*`} defaultValue={filterData?.blood} />
                        <lebel className='mt-3 block w-full relative'>
                            <p>Course Category</p>
                            <select {...register("religion*", { required: true })} className="w-full outline-none border p-2 rounded-md" id="">
                                <option value="religion">religion</option>
                                <option value="religion">religion</option>
                                <option value="category">religion</option>
                                <option value="religion">religion</option>
                            </select>
                            {
                                errors?.category && <p className="absolute -bottom-4 text-red-600">religion is requerd</p>
                            }
                        </lebel>
                    </div>
                    <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Address*`} type={`text`} rules={{ ...register("address", { required: true }) }} placeholder={`*Required Field`} defaultValue={filterData?.address} />
                    <div className="px-48 mt-8">
                        <input value={`Create`} className="btn-primary cursor-pointer" type="submit" />
                    </div>
                </form>
            </Modal>
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
                            setOpenAdmitModal(true)
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
            <Modal
                centered
                footer={false}
                open={openAdmitModal}
                onCancel={() => setOpenAdmitModal(false)}
                width={700}
            >
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="center-center">
                            <div className={`h-28 w-28 rounded-full my-4  relative`}>
                                {
                                    image ? <img className="h-full w-full rounded-full object-cover" src={image} alt="" /> : filterData?.img ? <img className="h-full w-full rounded-full object-cover" src={filterData?.img} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={`https://i.ibb.co/6NTVcx7/default-user-icon.webp`} alt="" />
                                }

                                <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                                    <FaEdit />
                                </label>
                            </div>
                        </div>
                        <input onChange={(e) => handleFileChange(e)} id="profile" className="hidden" name='profile' type="file" />
                        <div className='grid-2 gap-2 mb-2'>
                            <Input classNames={`border rounded`} rules={{ ...register('name', { required: true }) }} lebel={`Full Name*`} status={errors} placeholder={`student name`} />
                            <Input type={`number`} classNames={`border rounded`} rules={{ ...register('number', { required: true }) }} lebel={`Phone Number*`} status={errors} placeholder={`Phone Number`} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input classNames={`border rounded`} rules={{ ...register('studentID', { required: true }) }} lebel={`Students ID*`} status={errors} placeholder={`*Required Field`} />
                            <Input classNames={`border rounded`} rules={{ ...register('batchNo', { required: true }) }} lebel={`Batch No*`} status={errors} placeholder={`BAC-WP 2024`} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input classNames={`border rounded`} rules={{ ...register('email', { required: true }) }} lebel={`Email*`} status={errors} placeholder={`student email`} />
                            <div className='w-full relative'>
                                <p className="pb-2">Course Type*</p>
                                <select defaultValue={`off line`} className='w-full p-2 outline-none border rounded-md' {...register('courseType', { required: true })}>
                                    <option value="off line">off line</option>
                                    <option value="on line">on line</option>
                                </select>
                                {
                                    errors?.courseType && <p className="absolute -bottom-4 text-red-600">courseType is requerd</p>
                                }
                            </div>
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input classNames={`border rounded`} rules={{ ...register('courseName', { required: true }) }} lebel={`Course Name*`} status={errors} placeholder={`ux/Ui`} />
                            <div className='w-full relative'>
                                <p className="pb-2">Category*</p>
                                <select defaultValue={`*Required Field`} className='w-full p-2 outline-none border rounded-md' {...register('category', { required: true })}>
                                    <option value="*Required Field">off line</option>
                                    <option value="*Required Field">on line</option>
                                </select>
                                {
                                    errors?.category && <p className="absolute -bottom-4 text-red-600">category is requerd</p>
                                }
                            </div>
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input type={`date`} classNames={`border rounded`} rules={{ ...register('date', { required: true }) }} lebel={`Date of Birth*`} status={errors} placeholder={`*Required Field`} />
                            <div className='w-full relative'>
                                <p className="pb-2">Gender*</p>
                                <select defaultValue={`*Required Field`} className='w-full p-2 outline-none border rounded-md' {...register('gender', { required: true })}>
                                    <option value="*Required Field">off line</option>
                                    <option value="*Required Field">on line</option>
                                </select>
                                {
                                    errors?.gender && <p className="absolute -bottom-4 text-red-600">gender is requerd</p>
                                }
                            </div>
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input classNames={`border rounded`} rules={{ ...register('blood', { required: true }) }} lebel={`Blood Group*`} status={errors} placeholder={`*Required Field`} />
                            <div className='w-full relative'>
                                <p className="pb-2">Gender*</p>
                                <select defaultValue={`*Required Field`} className='w-full p-2 outline-none border rounded-md' {...register('religion', { required: true })}>
                                    <option value="*Required Field">off line</option>
                                    <option value="*Required Field">on line</option>
                                </select>
                                {
                                    errors?.religion && <p className="absolute -bottom-4 text-red-600">religion is requerd</p>
                                }
                            </div>
                        </div>
                        <Input classNames={`border rounded`} rules={{ ...register('address', { required: true }) }} lebel={`Address*`} status={errors} placeholder={`*Required Field`} />
                        <button onClick={() => {
                            setOpenPaymentModal(true)
                            setOpenAdmitModal(false)
                        }} className='btn-primary max-w-44 mx-auto mt-6'>
                            Next
                        </button>
                    </form>
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

export default AllStudents
