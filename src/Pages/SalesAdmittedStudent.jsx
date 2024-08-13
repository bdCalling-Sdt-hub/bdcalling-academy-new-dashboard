import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaEye, FaEyeSlash, FaInfo, FaPlus, FaPrint } from 'react-icons/fa6'
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
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import ProfileImage from '../assets/corporate-user-icon.webp'
import toast from 'react-hot-toast'
import SalseStudentAddForm from '../Components/Forms/SalseStudentAddForm'
const SalesAdmittedStudent = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openAdmitModal, setOpenAdmitModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerStudent, handleSubmit: handleStudent, formState: { errors: StudentError } } = useForm();
    const { register: registerMassage, handleSubmit: handleMassage, formState: { errors: MassageError } } = useForm();
    const { register: registerAdmit, handleSubmit: handleAdmit, formState: { errors: AdmitError } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [openAdmitStudentModal, setOpenAdmitStudentModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [openStudentAddModal, setOpenStudentAddModal] = useState(false)
    const [followUp, setFollowUp] = useState({ _id: false, index: false })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filterBy, setFilterBy] = useState({})
    const [SendMessageTo, setSendMessage] = useState([])
    // query 
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories`)
    const [requestingBatchStudents, BatchStudents, BatchStudentsError, refetch] = useGetRequest('batchStudents', `/show-phoenix-students?page=${page}${filterBy?.number && `&phone_number=${filterBy?.number}`}${filterBy?.name && `&name=${filterBy?.name}`}${filterBy?.batch && `&batch_id=${filterBy?.batch}`}${filterBy?.dob && `&registration_date=${filterBy?.dob}`}`)
    const { mutate, isLoading, data, error } = usePostRequest('Students', '/students');
    const { mutate: mutateAdmit, isLoading: isAdmitLoading, data: AdmitData, error: errorAdmit } = usePostRequest('admitStudents', '/admit-student');
    const { mutate: followUpMessage, isLoading: messageLoading, data: MessageData, error: MessageError } = usePostRequest('follow', '/follow-up-message');
    const { mutate: updateStudents, isLoading: updateLoading, data: updateData, } = usePatchRequest('Students', `/students/${filterData?._id}`);
    const { mutate: DeleteStudents, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Students', `/students/${filterData?._id}`);
    const [dob, setdob] = useState('')
    const [AllStudents, setAllStudent] = useState([])
    const [formFor, setFormfor] = useState('add')
    const TableData = AllStudents.map((item, index) => {
        return {
            key: index + 1,
            name: item?.name,
            email: item?.email,
            phone_number: item?.phone_number,
            img: item?.image ? `${imageUrl}/${item?.image}` : ProfileImage,
            _id: item?._id,
            batch_id: item?.batch_id,
            gender: item?.gender,
            registration_date: item?.registration_date,
            category_id: item?.category_id,
            blood_group: item?.blood_group,
            religion: item?.religion,
            dob: item?.dob,
            address: item?.address,
            course: item?.course,
            course_type: item?.course_type,
            order: item?.order,
            messages: item?.messages,
            course_name: item?.course_name
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
            title: 'Batch no',
            dataIndex: 'batch_id',
            key: 'batch_id'
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name'
        },
        {
            title: 'Course Type',
            dataIndex: 'course_type',
            key: 'course_type'
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
                {/* <button onClick={() => {
                    handelFilterData(record._id)
                    setImage(null)

                }} className='p-1 text-green-500 text-2xl rounded hover:scale-105 active:scale-95 transition-all max-w-32'>
                    <RiPrinterFill />
                </button> */}
                {/* <Link to={`/admitted-students/students-information/${record._id}/${record?.order[0]?.batch_id}`} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
                    <CiCircleInfo />
                </Link> */}
                <button onClick={() => {
                    handelFilterData(record._id)
                    setOpenAdmitStudentModal(true)
                    setFormfor('update')
                }} className='text-2xl text-blue-500 hover:scale-105 active:scale-95'>
                    <FaEdit />
                </button>
            </div>,
            key: '_id'
        },
    ];
    const handelFilterData = (id) => {
        const newData = TableData?.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    useEffect(() => {
        if (isLoading, updateLoading, DeleteLoading, messageLoading) return
        if (data, updateData, DeleteData, MessageData) setOpenPaymentModal(false); setOpenAdmitModal(false); setOpenStudentAddModal(false); setOpenFollowUpModal(false); setOpenStudentAddModal(false); refetch()
    }, [isLoading, data, updateData, updateLoading, DeleteLoading, DeleteData, MessageData, messageLoading])
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
        // return
        followUpMessage(formData)
    }

    // const handle admit student

    useEffect(() => {
        if (isAdmitLoading) return
        if (AdmitData && !errorAdmit) setOpenPaymentModal(true); setOpenAdmitModal(false)
    }, [errorAdmit, AdmitData, isAdmitLoading])
    useEffect(() => {
        const result = [];
        BatchStudents?.data.forEach(batch => {
            batch.students.forEach(student => {
                result.push({
                    id: batch?.id,
                    courseId: batch?.course_id,
                    studentID: student?.id,
                    batch_id: batch?.batch_id,
                    course_name: batch?.course?.course_name,
                    name: student?.user?.name,
                    image: student.image,
                    phone_number: student?.phone_number,
                    order: student?.order,
                    _id: student?.id,
                    email: student?.user?.email,
                    course_type: batch?.course?.course_type,
                    messages: student?.messages,
                    course: batch?.course
                });
            });
        });
        setAllStudent(result)
    }, [BatchStudents])
    return (
        <>
            <div className='grid-2 '>
                <div className='w-full'>
                    <PageHeading text={`Admitted Student`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => {
                        setOpenAdmitStudentModal(true)
                    }} className="bg-blue-500 text-white py-2 px-3 rounded-md max-w-44"> Admit Student</button>
                    <button onClick={() => {
                        selectedRowKeys?.length <= 0 ? toast.error('please select students') : setOpenFollowUpModal(true)
                    }} className="btn-secondary max-w-44"><FaPlus /> Send Message</button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-11 items-center gap-4 flex-wrap max-w-[60%] bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <DatePicker className=' py-2 border-none rounded-3xl col-span-2' onChange={onChange} />
                <div className=' col-span-2'>
                    <Input rules={{ ...register("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className=' col-span-2'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`8801566026301`} />
                </div>
                <div className=' col-span-2'>
                    <Input rules={{ ...register("batch", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch ID`} />
                </div>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full w-fit'>
                    <IoSearch />
                </button>
            </form>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <h3 className='section-title px-5'>Admitted Students List</h3>
                {
                    (filterBy?.name || filterBy?.number || filterBy?.batch || filterBy?.dob) && <div className='flex justify-start items-center gap-2 mb-2 -mt-3 ml-5'>Filter by
                        {filterBy?.name && <><strong>name</strong> : {filterBy?.name} </>}
                        {filterBy?.number && <><strong>number</strong>   : {filterBy?.number}</>}
                        {filterBy?.batch && <> <strong>batch</strong> : {filterBy?.batch} </>}
                        {filterBy?.dob && <> <strong>registration date</strong> : {filterBy?.dob} </>}
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
                            total: BatchStudents?.total || 0,
                            onChange: (page, pagesize) => setPage(page),
                            showSizeChanger: false
                        }}
                    />
                </div>
            </div>
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
                            <button className='btn-primary max-w-32'>Send Comment</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openAdmitStudentModal}
                onCancel={() => setOpenAdmitStudentModal(false)}
                centered
                footer={false}
                width={900}
            >
                <SalseStudentAddForm setOpenAdmitStudentModal={setOpenAdmitStudentModal} refetch={refetch} filteredData={filterData} image={image} setImage={setImage} formFor={formFor} />
            </Modal>
        </>
    )
}


export default SalesAdmittedStudent
