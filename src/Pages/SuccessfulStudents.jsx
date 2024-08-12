import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaCheck, FaFileExcel, FaPlus, FaRegFilePdf } from 'react-icons/fa6'
import { DatePicker, Divider, Modal, Radio, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import {  MdOutlineArrowBackIosNew } from 'react-icons/md'
import { SiMicrosoftword } from 'react-icons/si'
import useGetRequest from '../Hooks/useGetRequest'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'


const SuccessfulStudents = () => {
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const [openPrintModal, setOpenPrintModal] = useState(false)
    const [openDropModal, setOpenDropModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const [filterData, setFilterData] = useState({})
    const [exportType, setExportType] = useState('pdf')
    const [followUp, setFollowUp] = useState({ _id: false, index: false })
    const { register, handleSubmit, formState: { errors } } = useForm();
    // query
    const [requestingStores, Stores, StoresError,] = useGetRequest('successStory', `/successful-student`)
    const TableData = Stores?.data?.map((item, i)=>{
        const names = item?.students?.map(student => student?.user?.name).join(', ');
        const image = item?.students?.map(student => student?.image).join(', ');
        const phone = item?.students?.map(student => student?.phone_number).join(', ');
        const studentId = item?.students?.map(student => student?.user?.email).join(', ');
        const  date = item?.students?.map(student => student?.registration_date).join(', ');
        const  status = item?.students?.map(student => student?.status).join(', ');
        return {
            key : i+1,
            name : names,
            img: `${imageUrl}/${image}` || ProfileImage,
            phone : phone,
            studentID : studentId,
            course : item?.course?.course_name,
            date: date,
            status : status


        }
    })
    console.log(TableData)
    // const tableData =  Stores?.data.map()
    const onSubmit = data => console.log(data);
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
            dataIndex: 'phone',
            key: 'phone'
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
            title: 'Date Of Admition',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => <div>
                <div className='flex justify-start items-center rounded-md gap-2 text-white font-semibold px-3 py-1 bg-green-500 w-fit'>
                    <FaCheck />
                    <p className={``}>{record?.['status']}</p>
                </div>
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
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`Successful Students list`} />
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
                        dataSource={TableData}
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
                        <button onClick={() => {
                            setOpenPrintModal(false)
                        }} className='btn-primary max-w-40'>Download Invoice</button>
                        <button onClick={() => {
                            setOpenPrintModal(false)
                        }} className='btn-secondary max-w-28'>Print</button>
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
                            <button onClick={() => {
                                setOpenFollowUpModal(false)
                            }} className='btn-primary max-w-32'>Send Comment</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}


export default SuccessfulStudents





// [
//     {
//       id: 5,
//       course_id: 4,
//       batch_id: 'BCA-ELI-2401',
//       batch_name: 'test',
//       start_date: '2024-08-29',
//       end_date: '2024-08-22',
//       seat_limit: 4156,
//       seat_left: 4156,
//       image: 'adminAsset/image/120062413.jpeg',
//       discount_price: 7789,
//       created_at: '2024-08-09T08:58:37.000000Z',
//       updated_at: '2024-08-09T08:58:37.000000Z',
//       students: [
//         {
//           id: 4,
//           category_id: 1,
//           user_id: 14,
//           status: 'enrolled',
//           phone_number: '564564',
//           gender: 'male',
//           religion: 'islam',
//           registration_date: '2024-08-23',
//           dob: '2024-08-22',
//           blood_group: 'undefined',
//           address: 'qae sdfg as',
//           add_by: 'super admin',
//           student_type: 'super admin',
//           messages: [
//             'deadline near', 'deadline near', '[",ksjgfiusdf aspe"]', '["erfw3rfdsdfcs sdf "]'
//           ],
//           event_name: null,
//           image: 'adminAsset/image/736473981.jpeg',
//           created_at: '2024-08-09T08:59:30.000000Z',
//           updated_at: '2024-08-11T05:29:10.000000Z',
//           pivot: { batch_id: 5, student_id: 4 },
//           user: {
//             id: 14,
//             name: 'Berk Nunez',
//             email: 'siya4273@gmail.com',
//             email_verified_at: '2024-08-09T08:59:30.000000Z',
//             role: 'STUDENT',
//             otp: '0',
//             designation: null,
//             expertise: null,
//             image: null,
//             user_status: '0',
//             phone_number: null,
//             created_at: '2024-08-09T08:59:30.000000Z',
//             updated_at: '2024-08-09T08:59:30.000000Z'
//           },
//           order: [
//             {
//               id: 6,
//               student_id: 4,
//               batch_id: 1,
//               course_fee: '774',
//               discount_price: '12',
//               price: '762',
//               amount: '762',
//               due: '0',
//               discount_reference: null,
//               gateway_name: 'Nagad',
//               installment_date: [ { first_installment: '2024-08-10' } ],
//               payment_type: 'one_time',
//               transaction_id: null,
//               currency: 'TK',
//               status: 'paid',
//               created_at: '2024-08-10T19:42:28.000000Z',
//               updated_at: '2024-08-10T19:42:28.000000Z'
//             }
//           ]
//         }
//       ],
//       course: {
//         id: 4,
//         course_category_id: 1,
//         course_name: 'Elizabeth Hughes',
//         language: 'Consectetur culpa qu',
//         course_details: '4564531000v wieuo; dlfg ty h',
//         course_time_length: '45',
//         price: '456787',
//         max_student_length: null,
//         skill_Level: 'Asperiores nesciunt',
//         address: 'ftgh fgh fgh f rf fgh',
//         thumbnail: 'adminAsset/image/210537811.jpeg',
//         career_opportunities: [ 'fghfg' ],
//         curriculum: [ 'hfgh ' ],
//         tools: [ 'fgh ' ],
//         job_position: [ 'fghfgh ' ],
//         popular_section: 0,
//         status: 'pending',
//         course_type: 'offline',
//         created_at: '2024-08-09T08:57:47.000000Z',
//         updated_at: '2024-08-09T08:57:47.000000Z',
//         course_category: {
//           id: 1,
//           category_name: 'web Development',
//           created_at: '2024-08-08T04:04:45.000000Z',
//           updated_at: '2024-08-11T00:15:06.000000Z'
//         }
//       }
//     },
//     {
//       id: 1,
//       course_id: 2,
//       batch_id: 'BCA-ONYS-2401',
//       batch_name: 'Aileen Roberson',
//       start_date: '2024-08-22',
//       end_date: '2024-08-15',
//       seat_limit: 31,
//       seat_left: 31,
//       image: 'adminAsset/image/379582754.jpeg',
//       discount_price: 188,
//       created_at: '2024-08-08T04:09:20.000000Z',
//       updated_at: '2024-08-09T12:11:56.000000Z',
//       students: [
//         {
//           id: 4,
//           category_id: 1,
//           user_id: 14,
//           status: 'enrolled',
//           phone_number: '564564',
//           gender: 'male',
//           religion: 'islam',
//           registration_date: '2024-08-23',
//           dob: '2024-08-22',
//           blood_group: 'undefined',
//           address: 'qae sdfg as',
//           add_by: 'super admin',
//           student_type: 'super admin',
//           messages: [
//             'deadline near', 'deadline near', '[",ksjgfiusdf aspe"]', '["erfw3rfdsdfcs sdf "]'
//           ],
//           event_name: null,
//           image: 'adminAsset/image/736473981.jpeg',
//           created_at: '2024-08-09T08:59:30.000000Z',
//           updated_at: '2024-08-11T05:29:10.000000Z',
//           pivot: { batch_id: 1, student_id: 4 },
//           user: {
//             id: 14,
//             name: 'Berk Nunez',
//             email: 'siya4273@gmail.com',
//             email_verified_at: '2024-08-09T08:59:30.000000Z',
//             role: 'STUDENT',
//             otp: '0',
//             designation: null,
//             expertise: null,
//             image: null,
//             user_status: '0',
//             phone_number: null,
//             created_at: '2024-08-09T08:59:30.000000Z',
//             updated_at: '2024-08-09T08:59:30.000000Z'
//           },
//           order: [
//             {
//               id: 6,
//               student_id: 4,
//               batch_id: 1,
//               course_fee: '774',
//               discount_price: '12',
//               price: '762',
//               amount: '762',
//               due: '0',
//               discount_reference: null,
//               gateway_name: 'Nagad',
//               installment_date: [ { first_installment: '2024-08-10' } ],
//               payment_type: 'one_time',
//               transaction_id: null,
//               currency: 'TK',
//               status: 'paid',
//               created_at: '2024-08-10T19:42:28.000000Z',
//               updated_at: '2024-08-10T19:42:28.000000Z'
//             }
//           ]
//         }
//       ],
//       course: {
//         id: 2,
//         course_category_id: 1,
//         course_name: 'Nyssa Caldwell',
//         language: 'Minus ea provident',
//         course_details: 'Dolor aliquam dolore',
//         course_time_length: 'In rem illo cupidita',
//         price: '774',
//         max_student_length: null,
//         skill_Level: 'Cupiditate deserunt',
//         address: 'Ut nisi fugiat modi',
//         thumbnail: 'adminAsset/image/1943901522.jpeg',
//         career_opportunities: [ 'Tempor incididunt un' ],
//         curriculum: [ 'Ipsam rerum illum s' ],
//         tools: [ 'Qui amet qui reicie' ],
//         job_position: [ 'Nostrum minus dolor ' ],
//         popular_section: 1,
//         status: 'pending',
//         course_type: 'online',
//         created_at: '2024-08-08T04:06:02.000000Z',
//         updated_at: '2024-08-09T12:23:18.000000Z',
//         course_category: {
//           id: 1,
//           category_name: 'web Development',
//           created_at: '2024-08-08T04:04:45.000000Z',
//           updated_at: '2024-08-11T00:15:06.000000Z'
//         }
//       }
//     }
//   ]