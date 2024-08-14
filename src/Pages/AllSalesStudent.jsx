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
import AdmitPaymentModal from '../Components/Forms/AdmitPaymentModal'
const AllSalesStudent = () => {

    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openAdmitModal, setOpenAdmitModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerStudent, handleSubmit: handleStudent, formState: { errors: StudentError } } = useForm();
    const { register: registerMassage, handleSubmit: handleMassage, formState: { errors: MassageError } } = useForm();
    const { register: registerAdmit, handleSubmit: handleAdmit, formState: { errors: AdmitError } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [openStudentAddModal, setOpenStudentAddModal] = useState(false)
    const [followUp, setFollowUp] = useState({ _id: false, index: false })
    const [inputType, setInputType] = useState('password')
    const [text, setText] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [search, setSearch] = useState({ name: '', phone_number: '', category_name: '' })
    const [AdmitValues, setAdmitValues] = useState(null)
    const [singleCourse, setSingleCourse] = useState(null)
    const [SendMessageTo, setSendMessage] = useState([])
    // query 

    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories?no_pagination=1`)
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `/batches?no_pagination=1`)
    const { mutate, isLoading, data, error } = usePostRequest('Students', '/students');
    const { mutate: mutateAdmit, isLoading: isAdmitLoading, data: AdmitData, error: errorAdmit } = usePostRequest('admitStudents', '/admit-student');
    const { mutate: followUpMessage, isLoading: messageLoading, data: MessageData, error: MessageError } = usePostRequest('follow', '/follow-up-message');
    const { mutate: updateStudents, isLoading: updateLoading, data: updateData, } = usePatchRequest('Students', `/students/${filterData?._id}`);
    const { mutate: DeleteStudents, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Students', `/students/${filterData?._id}`);
    const [filterBy, setFilterBy] = useState({})
    const [dob, setdob] = useState('')
    const [requestingStudents, Students, StudentsError, refetch, isError] = useGetRequest('Students', `/show-phoenix-students?page=${page}${filterBy?.number && `&phone_number=${filterBy?.number}`}${filterBy?.name && `&name=${filterBy?.name}`}${filterBy?.category && `&category_name=${filterBy?.category}`}${filterBy?.dob && `&dob=${filterBy?.dob}`}`)//phone_number=01317659523&name=r&category_name=1&
    const [requestingCourse, Course, CourseError] = useGetRequest('course', `/courses?no_pagination=1`)
    const CourseOptions = Course?.data?.map(item => {
        return { name: item?.course_name, value: item?.id }
    }) || []
    const BatchOptions = Batch?.data?.map(item => {
        return { name: item?.batch_name, value: item?.id }
    }) || []
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
            address: item?.address,
            messages: item?.messages
        }
    })
    const onSelectChange = (newSelectedRowKeys) => {
        const FilteredId = []
        TableData.map(item => {
            if (newSelectedRowKeys.includes(item.key)) {
                FilteredId.push(item._id)
            }
        })
        setSendMessage(FilteredId)
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onSubmit = data => {
        setFilterBy({ ...data, dob })
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
        setdob(dateString)
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
            title: 'Set Follow Up',
            dataIndex: '_id',
            render: (_, record) => <div className='start-center gap-2 relative'>
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenFollowUpModal(true)
                    setSelectedRowKeys([record.key])
                    setSendMessage([record._id])
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
                    record?.messages?.map((item, index) => <div key={index} className={`${(followUp?._id == record?._id && followUp?.index == index) ? 'block' : 'hidden'} ${index == 0 ? 'border-[#2492EB]' : index == 1 ? 'border-[#2BA24C]' : 'border-[#FFC60B]'} absolute top-[40px] right-0 p-3 border-2 rounded-md bg-white z-50 carr-shadow w-[400px]`}>
                        <p className='text-[#5C5C5C] '>{item}</p>
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
    const CategoryOptions = Category?.data?.map(item => {
        return { name: item?.category_name, value: item?.id }
    })
    const CategoryOptions2 = Category?.data?.map(item => {
        return { name: item?.category_name, value: item?.category_name }
    })
    useEffect(() => {
        if (isLoading, updateLoading, DeleteLoading,messageLoading) return
        if (data, updateData, DeleteData,MessageData) setOpenPaymentModal(false); setOpenAdmitModal(false); setOpenStudentAddModal(false); setOpenFollowUpModal(false); setOpenStudentAddModal(false); refetch()
    }, [isLoading, data, updateData, updateLoading, DeleteLoading, DeleteData,MessageData,messageLoading])
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
            ids: JSON.stringify(SendMessageTo),
            messages: JSON.stringify([value.comment])
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.forEach(element => {
            console.log(element)
        })
        // return
        followUpMessage(formData)
    }

    // const handle admit student
    const HandleAdmitStudent = async (value) => {
        setAdmitValues({ ...filterData, batchNo: value?.batchNo, method: value?.method })
        const filterCourse = Course?.data?.filter(item => item?.id == value.courseName)
        setSingleCourse(filterCourse[0])
        const paymentData = {
            student_id: filterData?._id,
            batch_id: value?.batchNo,
            name: value?.name,
            email: value?.email,
            phone_number: value?.phone_number,
            gender: value?.gender,
            religion: value?.religion,
            dob: value?.date,
            blood_group: value?.blood,
            address: value?.address,
            category_id: value?.category
        }
        const formData = new FormData()
        Object.keys(paymentData).map(key => {
            formData.append(key, paymentData[key])
        })
        mutateAdmit(formData)
    }
    useEffect(() => {
        if (isAdmitLoading) return
        if (AdmitData && !errorAdmit) setOpenPaymentModal(true); setOpenAdmitModal(false)
    }, [errorAdmit, AdmitData, isAdmitLoading])
    return (
        <>
            <div className='grid-2 '>
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
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-9 items-center gap-4 flex-wrap max-w-[60%] bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl col-span-2' onChange={onChange} />
                <div className='max-w-44 min-w-44 col-span-2'>
                    <Input rules={{ ...register("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className='max-w-44 min-w-44 col-span-2'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`8801566026301`} />
                </div>
                <div className='col-span-2'>
                    <SelectInput classNames={`border`} status={errors} options={CategoryOptions2} rules={{ ...register("category", { required: false }) }} />
                </div>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full w-fit'>
                    <IoSearch />
                </button>
            </form>


            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <h3 className='section-title px-5'>Add Student List</h3>
                {
                    (filterBy?.name || filterBy?.number || filterBy?.category || filterBy?.dob) && <div className='flex justify-start items-center gap-2 mb-2 -mt-3 ml-5'>Filter by
                        {filterBy?.name && <><strong>name</strong> : {filterBy?.name} </>}
                        {filterBy?.number && <><strong>number</strong>   : {filterBy?.number}</>}
                        {filterBy?.category && <> <strong>category</strong> : {filterBy?.category} </>}
                        {filterBy?.dob && <> <strong>date of birth</strong> : {filterBy?.dob} </>}
                        <button onClick={() => setFilterBy({})} className='text-xl p-1 rounded-full text-white bg-red-500'>
                            <RxCross2 />
                        </button>
                    </div>
                }
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
                <AdmitPaymentModal setOpenPaymentModal={setOpenPaymentModal} AdmitValues={AdmitValues} setOpenAdmitModal={setOpenAdmitModal} course={singleCourse} />
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
                    <form onSubmit={handleAdmit(HandleAdmitStudent)}>
                        <div className="center-center">
                            <div className={`h-28 w-28 rounded-full my-4  relative`}>
                                {
                                    image ? <img className="h-full w-full rounded-full object-cover" src={URL.createObjectURL(image)} alt="" /> : filterData?.img ? <img className="h-full w-full rounded-full object-cover" src={filterData?.img} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={`https://i.ibb.co/6NTVcx7/default-user-icon.webp`} alt="" />
                                }

                                <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="admitProfile">
                                    <FaEdit />
                                </label>
                            </div>
                        </div>
                        <input onChange={(e) => {
                            handleFileChange(e)
                        }
                        } id="admitProfile" className="hidden" name='profile' type="file" />
                        {
                            AdmitError?.image && <p className='text-center text-red-600'>image is required</p>
                        }
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput handler={inputHandeler} defaultValue={filterData?.name} classNames={`border rounded`} rules={{ ...registerAdmit('name', { required: true }) }} lebel={`Full Name*`} status={AdmitError} placeholder={`student name`} />
                            <UpdateInput handler={inputHandeler} defaultValue={filterData?.phone_number} type={`number`} classNames={`border rounded`} rules={{ ...registerAdmit('phone_number', { required: true }) }} lebel={`Phone Number*`} status={AdmitError} placeholder={`Phone Number`} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput handler={inputHandeler} defaultValue={filterData?._id} classNames={`border rounded`} rules={{ ...registerAdmit('studentID', { required: true }) }} lebel={`Students ID*`} status={AdmitError} placeholder={`*Required Field`} />
                            <SelectInput lebel={`Batch`} classNames={`border`} status={AdmitError} options={BatchOptions} rules={{ ...registerAdmit("batchNo", { required: true }) }} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput handler={inputHandeler} defaultValue={filterData?.email} classNames={`border rounded`} rules={{ ...registerAdmit('email', { required: true }) }} lebel={`Email*`} status={AdmitError} placeholder={`student email`} />
                            <SelectInput lebel={`Course Type`} classNames={`border`} status={AdmitError} options={[
                                { name: 'online', value: 'online' },
                                { name: 'offline', value: 'offline' }
                            ]} rules={{ ...registerAdmit("courseType", { required: true }) }} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            {/* <Input classNames={`border rounded`} rules={{ ...registerAdmit('courseName', { required: true }) }} lebel={`Course Name*`} status={AdmitError} placeholder={`ux/Ui`} /> */}
                            <SelectInput lebel={`Course Name`} classNames={`border`} status={AdmitError} options={CourseOptions} rules={{ ...registerAdmit("courseName", { required: true }) }} />
                            <SelectInput lebel={`Course Category`} classNames={`border`} status={AdmitError} options={CategoryOptions} rules={{ ...registerAdmit("category", { required: true }) }} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput defaultValue={filterData?.dob} handler={inputHandeler} type={`date`} classNames={`border rounded`} rules={{ ...registerAdmit('date', { required: true }) }} lebel={`Date of Birth*`} status={AdmitError} placeholder={`*Required Field`} />
                            <SelectInput defaultValue={filterData?.gender} lebel={`Gender`} classNames={`border`} status={AdmitError} options={[
                                { name: 'male', value: 'male' },
                                { name: 'female', value: 'female' },
                            ]} rules={{ ...registerAdmit("gender", { required: true }) }} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput defaultValue={filterData?.blood_group} handler={inputHandeler} classNames={`border rounded`} rules={{ ...registerAdmit('blood', { required: true }) }} lebel={`Blood Group*`} status={AdmitError} placeholder={`*Required Field`} />
                            <SelectInput defaultValue={filterData?.religion} lebel={`Religion`} classNames={`border`} status={AdmitError} options={[
                                { name: 'Islam', value: 'islam' },
                                { name: 'Buddhism', value: 'buddhism' },
                                { name: 'Hinduism', value: 'hinduism' },
                                { name: 'Christianity', value: 'christianity' },
                                { name: 'Other', value: 'other' },
                            ]} rules={{ ...registerAdmit("religion", { required: true }) }} />
                        </div>
                        <div className='grid-2 gap-2 mb-2'>
                            <UpdateInput defaultValue={filterData?.address} handler={inputHandeler} classNames={`border rounded`} rules={{ ...registerAdmit('address', { required: true }) }} lebel={`Address*`} status={AdmitError} placeholder={`*Required Field`} />
                            <SelectInput defaultValue={filterData?.method} lebel={`Payment method`} classNames={`border`} status={AdmitError} options={[
                                { name: 'Bkash', value: 'Bkash' },
                                { name: 'Nagad', value: 'Nagad' },
                                { name: 'Cash', value: 'Cash' },
                            ]} rules={{ ...registerAdmit("method", { required: true }) }} />
                        </div>
                        <button className='btn-primary max-w-44 mx-auto mt-6'>
                            {isAdmitLoading ? 'loading....' : "Next"}
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


export default AllSalesStudent
