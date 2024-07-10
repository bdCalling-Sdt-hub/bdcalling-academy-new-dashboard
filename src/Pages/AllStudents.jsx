import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa6'
import { DatePicker, message, Modal, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { FaEdit } from 'react-icons/fa'
import { MdEditSquare, MdOutlineArrowBackIosNew } from 'react-icons/md'
import UpdateInput from '../Components/Input/UpdateInput'
import usePatchRequest from '../Hooks/usePatchRequest'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import useGetRequest from '../Hooks/useGetRequest'
import usePostRequest from '../Hooks/usePostRequest'
import SelectInput from '../Components/Input/SelectInput'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import ProfileImage from '../assets/corporate-user-icon.webp'
import toast from 'react-hot-toast'
const AllStudents = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openAdmitModal, setOpenAdmitModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerStudent, handleSubmit: handleStudent, formState: { errors: StudentError } } = useForm();
    const { register: registerMassage, handleSubmit: handleMassage, formState: { errors: MassageError } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const [openStudentAddModal, setOpenStudentAddModal] = useState(false)
    const [followUp, setFollowUp] = useState({ _id: false, index: false })
    const [inputType, setInputType] = useState('password')
    const [text, setText] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [search,setSearch]=useState({name:'',phone_number:'',category_name:''})
    // query 
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories`)
    const { mutate, isLoading, data, error } = usePostRequest('Students', '/students');
    const { mutate: followUpMessage, isLoading: messageLoading, data: MessageData, error: MessageError } = usePostRequest('follow', '/follow-up-message');
    const { mutate: updateStudents, isLoading: updateLoading, data: updateData, } = usePatchRequest('Students', `/students/${filterData?._id}`);
    const { mutate: DeleteStudents, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Students', `/students/${filterData?._id}`);
    const [requestingStudents, Students, StudentsError, refetch, isError] = useGetRequest('Students', `/show/all/student?`)//phone_number=01317659523&name=r&category_name=1&
    const TableData = Students?.data?.map((item, index) => {
        return {
            key: index + 1,
            name: item?.user?.name,
            email: item?.user?.email,
            phone_number: item?.phone_number,
            img: `${imageUrl}/${item?.image}` || ProfileImage,
            course: item?.category?.category_name,
            _id: item?.id,
            gender: item?.gender,
            religion: item?.religion,
            registration_date: item?.registration_date,
            category_id: item?.category_id,
            blood_group: item?.blood_group,
            religion: item?.religion,
            dob: item?.dob,
            address: item?.address
        }
    })


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onSubmit = data => {

    };

    // add student
    const onSubmitStudent = (values) => {
        const data = {
            name: filterData?.name,
            email: filterData?.email,
            password: filterData?.password,
            phone_number: filterData?.phone_number,
            gender: filterData?.gender,
            religion: filterData?.religion,
            dob: filterData?.dob,
            blood_group: filterData?.blood_group,
            registration_date: filterData.registration_date,
            student_type: 'super admin',
            address: filterData?.address,
            category_id: values?.category
            // add_by:'super admin'
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        if (image) {
            formData.append('image', image)
        }
        if (text) {
            mutate(formData)
        } else {
            formData.append('_method', 'PUT')
            updateStudents(formData)
        }
    }

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
            dataIndex: 'phone_number',
            key: 'phone_number'
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
            render: (_, record) => <div className='start-center gap-2 relative'>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenFollowUpModal(true)
                    setSelectedRowKeys([record.key])
                }} className='btn-primary max-w-32'>
                    <FaPlus /> Follow Up
                </button>
                {
                    [...Array(3).keys()].map(item => <span key={item} onMouseLeave={() => {
                        setFollowUp({ _id: false, index: false })
                    }} onMouseEnter={() => {
                        setFollowUp({ _id: record._id, index: item })
                    }} className={`w-5 h-5 ${item == 0 ? 'bg-[#2492EB]' : item == 1 ? 'bg-[#2BA24C]' : 'bg-[#FFC60B]'} rounded-full`}></span>)
                }
                {
                    [...Array(3).keys()].map(item => <div key={item} className={`${(followUp?._id == record?._id && followUp?.index == item) ? 'block' : 'hidden'} ${item == 0 ? 'border-[#2492EB]' : item == 1 ? 'border-[#2BA24C]' : 'border-[#FFC60B]'} absolute top-[40px] right-0 p-3 border-2 rounded-md bg-white z-50 carr-shadow w-[400px]`}>
                        <p className='text-[#5C5C5C] '>Dear student Your 2ns/3rd instilment date is 10/8/2024.
                            Pleas pay your payment Dear student Your 2ns/3rd instilment date is 10/8/2024.
                            Pleas pay your payment Dear student Your 2ns/3rd instilment date is 10/8/2024.
                            Pleas pay your payment</p>
                    </div>)
                }
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
                    setText(false)
                    handelFilterData(record?._id)
                    setImage(null)
                    setOpenStudentAddModal(true)
                }} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <MdEditSquare />
                </button>
                <button onClick={() => {
                    handelFilterData(record._id)
                    handleDelete()
                }} className='text-2xl text-red-500 hover:scale-105 active:scale-95'>
                    <RxCross2 />
                </button>
            </div>,
            key: '_id'
        },
    ];
    const handelFilterData = (id) => {
        const newData = TableData?.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    // const [colorType, setColorType] = useState(['blue'])
    // const colorHandeler = (color) => {
    //     if (colorType.find(item => item == color)) {
    //         const newColor = colorType.filter(item => item != color)
    //         setColorType([...newColor])
    //     } else {
    //         setColorType([...colorType, color])
    //     }
    // }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        } else {
            setImage(null)
        }
    };
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    const CategoryOptions = Category?.data?.data?.map(item => {
        return { name: item?.category_name, value: item?.id }
    })
    useEffect(() => {
        if (isLoading, updateLoading, DeleteLoading) return
        if (data, updateData, DeleteData) setOpenPaymentModal(false); setOpenAdmitModal(false); setOpenStudentAddModal(false); setOpenFollowUpModal(false); setOpenStudentAddModal(false); refetch()
    }, [isLoading, data, updateData, updateLoading, DeleteLoading, DeleteData])
    //delete users
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {filterData?.name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteStudents()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }

    // send followup message
    const HandleSendMassage = (value) => {
        const data = {
            ids: selectedRowKeys,
            messages: [value.comment]
        }
        const formData = new FormData()
        formData.append('ids[]', selectedRowKeys)
        formData.append('messages[]', value.comment)
        followUpMessage(formData)
    }
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`All Students`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => {
                        selectedRowKeys?.length <= 0 ? toast.error('please select students') : setOpenFollowUpModal(true)
                    }} className="btn-secondary max-w-44"><FaPlus /> Send Message</button>
                    <button onClick={() => {
                        setText(true)
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
                    <Table
                        columns={columns}
                        dataSource={TableData || []}
                        rowSelection={rowSelection}
                        pagination={{
                            total: Students?.total || 0,
                            onChange: (page, pagesize) => setPage(page),
                            showSizeChanger: false
                        }}
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
                <form className="text-base" onSubmit={handleStudent(onSubmitStudent)}>
                    <div className="center-center">
                        <div className={`h-28 w-28 rounded-full my-4  relative`}>
                            {
                                image ? <img className="h-full w-full rounded-full object-cover" src={URL.createObjectURL(image)} alt="" /> : filterData?.img ? <img className="h-full w-full rounded-full object-cover" src={filterData?.img} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={ProfileImage} alt="" />
                            }
                            <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                                <FaEdit />
                            </label>
                        </div>
                    </div>
                    <input id="profile" onChange={handleFileChange} className="hidden" name="profile" type="file" />
                    <div className="grid-2">
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...registerStudent("name", { required: true }) }} placeholder={`Full Name*`} defaultValue={filterData.name} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Phone Number*`} rules={{ ...registerStudent("phone_number", { required: true }) }} placeholder={`Phone Number*`} defaultValue={filterData.phone_number} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full ${text ? "" : "pointer-events-none"} border`} lebel={`Email*`} type={'email'} rules={{ ...registerStudent("email", { required: true }) }} placeholder={`Email*`} defaultValue={filterData.email} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Date of Birth*`} type={`date`} rules={{ ...registerStudent("dob", { required: true }) }} placeholder={`Date of Birth*`} defaultValue={filterData.dob} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Admission Date`} type={`date`} rules={{ ...registerStudent("registration_date", { required: true }) }} placeholder={`Admission date`} defaultValue={filterData.registration_date} />
                        {
                            text && <div className="relative mb-3">
                                <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Password`} type={inputType} rules={{ ...registerStudent("password", { required: false }) }} placeholder={`Password`} defaultValue={filterData?.password} />
                                {
                                    inputType === 'password' ? <FaEyeSlash onClick={() => setInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500 cursor-pointer" /> : <FaEye onClick={() => setInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                                }
                            </div>
                        }
                        <SelectInput lebel={`Course Category`} handler={inputHandeler} defaultValue={filterData?.category_id} classNames={`border`} status={StudentError} options={CategoryOptions} rules={{ ...registerStudent("category", { required: true }) }} />
                        <SelectInput lebel={`Gender`} handler={inputHandeler} defaultValue={filterData.gender} classNames={`border`} status={StudentError} options={[
                            { name: 'Female', value: 'female' },
                            { name: 'Male', value: 'male' },
                        ]} rules={{ ...registerStudent("gender", { required: true }) }} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Blood Group*`} type={`text`} rules={{ ...registerStudent("blood_group", { required: true }) }} placeholder={`Blood Group*`} defaultValue={filterData?.blood_group} />
                        <SelectInput defaultValue={filterData?.religion} lebel={`Religion`} handler={inputHandeler} classNames={`border`} status={StudentError} options={[
                            { name: 'Islam', value: 'islam' },
                            { name: 'Buddhism', value: 'buddhism' },
                            { name: 'Hinduism', value: 'hinduism' },
                            { name: 'Christianity', value: 'christianity' },
                            { name: 'Other', value: 'other' },
                        ]} rules={{ ...registerStudent("religion", { required: true }) }} />
                    </div>
                    <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Address*`} type={`text`} rules={{ ...registerStudent("address", { required: true }) }} placeholder={`*Required Field`} defaultValue={filterData?.address} />
                    <div className="px-48 mt-8">
                        <input value={text ? 'create' : 'update'} className="btn-primary cursor-pointer capitalize" type="submit" />
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
                            <button onClick={() => {
                                setOpenPaymentModal(false)
                            }} className='btn-primary max-w-32 mx-auto mt-7'>
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
                            <button onClick={() => {
                                setOpenPaymentModal(false)
                            }} className='btn-primary max-w-32 mx-auto mt-7'>
                                Confirm
                            </button>
                        </>
                    }

                </div>
            </Modal>
            {/* admit modal  */}
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
                    <form onSubmit={handleMassage(HandleSendMassage)} className='border border-[var(--primary-bg)] rounded-md p-2'>
                        {
                            selectedRowKeys?.length > 1 ? <p className='text-lg font-semibold'>send message to {selectedRowKeys?.length} Students</p> : <div className='start-center gap-3'>
                                send message to  <img src={filterData?.img} className='h-8 w-8 rounded-full' alt="" /> <p className='text-base font-semibold'>{filterData?.name}</p>
                            </div>
                        }

                        <textarea className='resize-none w-full border rounded-md outline-none mt-5 min-h-32 p-2' {...registerMassage('comment', { required: true })} />
                        {MassageError.comment && <p className='text-red-500'>comment is required <sup className=''>*</sup></p>}
                        <div className='between-center mt-2'>
                            <div className='start-center gap-2'>
                                <span className={`cursor-pointer w-5 h-5  bg-[#2492EB] border-[#2492EB] border rounded-full`}></span>
                                <span className={`cursor-pointer w-5 h-5 bg-[#2BA24C] border-[#2BA24C] border rounded-full`}></span>
                                <span className={`cursor-pointer w-5 h-5 bg-[#FFC60B] border-[#FFC60B] border rounded-full`}></span>
                            </div>
                            {/* <div className='start-center gap-2'>
                                <span onClick={() => colorHandeler('blue')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'blue') ? 'bg-[#2492EB]' : 'bg-transparent')} border-[#2492EB] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('green')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'green') ? 'bg-[#2BA24C]' : 'bg-transparent')} border-[#2BA24C] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('yellow')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'yellow') ? 'bg-[#FFC60B]' : 'bg-transparent')} border-[#FFC60B] border rounded-full`}></span>
                            </div> */}
                            <button className='btn-primary max-w-32'>Send Comment</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AllStudents
