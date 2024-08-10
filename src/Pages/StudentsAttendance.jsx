import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaCheck, FaFileExcel, FaPlus, FaRegFilePdf } from 'react-icons/fa6'
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
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
const StudentsAttendance = () => {
    const [page, setPage] = useState(0)
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openPrintModal, setOpenPrintModal] = useState(false)
    const [openDropModal, setOpenDropModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const [filterData, setFilterData] = useState({})
    const [dob, setdob] = useState('')
    const [filterBy, setFilterBy] = useState({})
    const [exportType, setExportType] = useState('pdf')
    const [followUp, setFollowUp] = useState({ _id: false, index: false })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [requestingAttendance, Attendance, AttendanceError, refetch] = useGetRequest('StudentsAttendance', `/attendances?page=${page}${filterBy?.number && `&phone_number=${filterBy?.number}`}${filterBy?.batch && `&batch_id=${filterBy?.batch}`}${filterBy?.dob && `&date=${filterBy?.dob}`}`)//
    const data = Attendance?.data?.map((item, i) => {
        return {
            "key": i + 1,
            "_id": item?.student_id,
            "name": item?.student?.user?.name,
            "Batch no": item?.batch?.batch_id,
            "phone": item?.student?.phone_number,
            "email": item?.student?.user?.email,
            "batch": item?.batch?.batch_name,
            "status": "Absent",
            "date": item?.date,
            "img": `${imageUrl}/${item?.student?.image}` || "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
            "status": item?.is_present
        }
    })
    const onSubmit = data => setFilterBy({ ...data, dob });
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
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => <div className='flex justify-start items-center gap-2'>
                {
                    record?.status == 1 ? <div className='flex justify-start items-center rounded-md gap-2  font-semibold px-3 py-1 text-green-600 bg-green-100 w-fit'>
                        <p className={``}>Present</p>
                    </div> : <div className='flex justify-start items-center rounded-md gap-2  font-semibold px-3 py-1 text-red-600 bg-red-100 w-fit'>
                        <p className={``}>Absent</p>
                    </div>
                }
            </div>,
            key: 'Payment status'
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
    console.log(Attendance)
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
                    <Input rules={{ ...register("batch", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch ID`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`+8801566026301`} />
                </div>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                    <IoSearch />
                </button>
            </form>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                {
                    (filterBy?.batch || filterBy?.number || filterBy?.dob) && <div className='flex justify-start items-center gap-2 mb-2 -mt-3 ml-5'>Filter by
                        {filterBy?.number && <><strong>number</strong>   : {filterBy?.number}</>}
                        {filterBy?.batch && <> <strong>batch</strong> : {filterBy?.batch} </>}
                        {filterBy?.dob && <> <strong> date</strong> : {filterBy?.dob} </>}
                        <button onClick={() => setFilterBy({})} className='text-xl p-1 rounded-full text-white bg-red-500'>
                            <RxCross2 />
                        </button>
                    </div>
                }
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

        </>
    )
}

export default StudentsAttendance
