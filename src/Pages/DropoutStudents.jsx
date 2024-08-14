import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { DatePicker, Form, Modal, Select, Table } from 'antd'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import useGetRequest from '../Hooks/useGetRequest'
import SelectInput from '../Components/Input/SelectInput'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import usePostRequest from '../Hooks/usePostRequest'
import { RxCross2 } from 'react-icons/rx'

const DropoutStudents = () => {
    const [form] = Form.useForm()
    const [page, setPage] = useState(1)
    const [openExchangeUpModal, setopenExchangeUpModal] = useState(false)
    const [openRefundModal, setopenRefundModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errorsFilter } } = useForm();
    const [filterBy, setFilterBy] = useState({})
    const [filterData, setFilterData] = useState({})
    const [dob, setDob] = useState()
    const [allStudent, setAllStudent] = useState([])
    const [exchangeData, setExchangeData] = useState({})
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories?no_pagination=1`)
    const [requestingStudents, Students, StudentsError, refetch] = useGetRequest('Category', `/show-dropout-student?page=${page}${filterBy?.name ? `&name=${filterBy?.name}`:''}${filterBy?.dob ? `&registration_date=${filterBy?.dob}`:''}${filterBy?.number ? `&phone_number=${filterBy?.number}`:''}${filterBy?.category ? `&category_name=${filterBy?.category}`:''}${filterBy?.BatchID ? `&batch_id=${filterBy?.BatchID}`:''}`)
    console.log(`/show-dropout-student?page=${page}${filterBy?.name ? `&name=${filterBy?.name}`:''}${filterBy?.dob ? `&registration_date=${filterBy?.dob}`:''}${filterBy?.number ? `&phone_number=${filterBy?.number}`:''}${filterBy?.category ? `&category_name=${filterBy?.category}`:''}${filterBy?.BatchID ? `&batch_id=${filterBy?.BatchID}`:''}`)
    const { mutate: mutateAdmit, isLoading: isAdmitLoading, data: AdmitData, error: errorAdmit } = usePostRequest('admitStudents', '/admit-student');
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `/batches?no_pagination=1`)
    const { mutate, isLoading, addData, error } = usePostRequest('refund', '/refund');
    const CategoryOptions = Category?.data?.map(item => {
        return { label: item?.category_name, value: item?.category_name }
    })
    console.log(`/show-dropout-student?page=${page}${filterBy?.name && `&name=${filterBy?.name}`}${filterBy?.dob && `&registration_date=${filterBy?.dob}`}${filterBy?.number && `&phone_number=${filterBy?.number}`}${filterBy?.category && `&category_name=${filterBy?.category}`}${filterBy?.BatchID && `&batch_id=${filterBy?.BatchID}`}`)
    const onSubmit = data => { };
    const BatchOptions = Batch?.data?.map(item => {
        return { label: item?.batch_name, value: item?.id }
    }) || []
    const CategoryOptions2 = Category?.data?.map(item => {
        return { label: item?.category_name, value: item?.id }
    })
    const onSubmitFilter = data => { setFilterBy({ ...data, ...dob }) };

    const onChange = (date, dateString) => {
        setDob({ dob: dateString })
    };
    const data = allStudent?.map((item, i) => {
        return {
            key: i + 1,
            "_id": item?.studentID,
            "name": item?.name,
            "Batch no": item?.batch_id,
            "phone": item?.phone_number,
            "email": item?.email,
            "course": item?.course_name,
            "Course type": item?.course?.course_type,
            "Payment status": item?.order?.status,
            "img": item?.image ? `${imageUrl}/${item?.image}` : "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
            price: item?.order?.[0]?.price,
            batch_id: item?.batch_id,
            batchID: item?.order?.[0]?.batch_id
        }
    })
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
            title: 'Batch no',
            dataIndex: 'Batch no',
            key: 'Batch no'
        },
        {
            title: 'Student Email',
            dataIndex: 'email',
            key: 'email'
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
                <button onClick={() => {
                    handelFilterData(record._id)
                    setopenRefundModal(true)
                }} disabled={record?.['Payment status'] == 'due'} className='p-2 py-1 bg-[#FFC60B] text-white font-semibold rounded'>Refund</button>
            </div>,
            key: 'Payment status'
        },
        {
            title: 'Course Exchange',
            dataIndex: '_id',
            render: (_, record) => <div style={{
                '--primary-bg': '#2BA24C'
            }} className='start-center gap-2' >
                <button onClick={() => {
                    handelFilterData(record._id)
                    setopenExchangeUpModal(true)
                }} className='btn-primary max-w-32'>
                    Exchange
                </button>
            </div >,
            key: '_id'
        },
        // {
        //     title: 'Actions',
        //     dataIndex: '_id',
        //     render: (_, record) => <div className='start-center gap-2'>
        //         <Link to={`/admitted-students`} className='text-2xl text-[var(--primary-bg)] hover:scale-105 active:scale-95'>
        //             <IoMdInformationCircleOutline />
        //         </Link>
        //     </div>,
        //     key: '_id'
        // },
    ];
    const handelFilterData = (id) => {
        const newData = data.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    useEffect(() => {
        const result = [];
        Students?.data.forEach(batch => {
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
        // console.log(result)
    }, [Students])

    const [refundAmount, setRefundAmount] = useState('');

    const handleStudentRefund = () => {
        console.log(filterData)
        const data = {
            refund_amount: Number(filterData?.price) - refundAmount,
            student_id: filterData?._id,
            batch_id: filterData?.batchID
        }
        const formData = new FormData()
        Object.keys(data)?.map(key => {
            formData.append(key, data[key])
        })
        mutate(formData)
    };
    useEffect(() => {
        if ((!error && addData) || (AdmitData && !errorAdmit)) refetch(); setopenExchangeUpModal(false); form.resetFields()
    }, [error, addData, AdmitData, errorAdmit])
    const onExchange = values => {
        const paymentData = {
            student_id: filterData?._id,
            batch_id: values?.batch_id,
            name: filterData?.name,
            email: filterData?.email,
            phone_number: filterData?.phone,
            category_id: values?.category_id
        }
        const formData = new FormData()
        Object.keys(paymentData).map(key => {
            formData.append(key, paymentData[key])
        })
        mutateAdmit(formData)
    }
    useEffect(() => {
        form.setFieldsValue({})
    }, [])
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`All Dropout Students`} />
                </div>
            </div>
            <form onSubmit={handleSubmitFilter(onSubmitFilter)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl' onChange={onChange} />
                <div className='max-w-44 min-w-44'>
                    <Input rules={{ ...registerFilter("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input rules={{ ...registerFilter("BatchID", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch ID`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input type={`number`} rules={{ ...registerFilter("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`+8801566026301`} />
                </div>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                    <IoSearch />
                </button>
                <button type='button' onClick={() => {
                    setFilterBy({})
                }} className='text-2xl p-[10px] bg-[red] text-white rounded-full'>
                    <RxCross2 />
                </button>
            </form>
            <div id='allStudent' className='bg-[var(--third-color)] my-8 rounded-md '>
                <div>
                    <Table

                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: Students?.per_page || 12,
                            total: Students?.total || 0,
                            onChange: (page) => setPage(page),
                            showSizeChanger: false
                        }}
                    />
                </div>
            </div>
            {/* Refund modal  */}
            <Modal
                centered
                footer={false}
                open={openRefundModal}
                onCancel={() => setopenRefundModal(false)}
                width={700}
            >
                <div>
                    <div className='start-center gap-4'>
                        <h4 className='text-[#333333] font-medium'>Student Refund </h4>
                    </div>
                    <>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Refund Date:</p>
                            <p className='text-end text-sm'>{new Date().toISOString().split('T')[0]}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course Name:</p>
                            <p className='text-end text-sm'>{filterData?.course}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Batch ID:</p>
                            <p className='text-end text-sm'>{filterData?.batch_id}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Student ID:</p>
                            <p className='text-end text-sm'>{filterData?._id}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Student Amount:</p>
                            <p className='text-end text-sm'>{filterData?.price}TK</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm text-red-600'>Amount deducted:</p>
                            <p className='text-end text-sm  border rounded w-fit ml-auto text-gray-400 select-none'>
                                <input type='number'
                                    placeholder="Refund Amount"
                                    value={refundAmount}
                                    onChange={(e) => {
                                        setRefundAmount(e.target.value);
                                    }}
                                    className="p-2 outline-none border "
                                />
                            </p>
                        </div>
                        <hr className='w-full my-2 block' />
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm font-semibold'>Total Payment :</p>
                            <p className='text-end text-sm font-semibold'>{Number(filterData?.price) - refundAmount}Tk</p>
                        </div>
                        <button onClick={() => handleStudentRefund()} className='btn-primary max-w-32 mx-auto mt-7'>
                            Confirm
                        </button>
                    </>

                </div>
            </Modal>
            {/* exchange up Modal  */}
            <Modal
                centered
                footer={false}
                open={openExchangeUpModal}
                onCancel={() => setopenExchangeUpModal(false)}
                width={700}
            >
                <div className=''>
                    <h3 className='text-lg text-[var(--primary-bg)] -mt-5'>Dropped  Course</h3>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Student Name:</p>
                        <p className='text-end text-sm'>{filterData?.name}</p>
                    </div>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Student email:</p>
                        <p className='text-end text-sm'>{filterData?.email}</p>
                    </div>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Course Name:</p>
                        <p className='text-end text-sm'>{filterData?.course}</p>
                    </div>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Batch ID:</p>
                        <p className='text-end text-sm'>{filterData?.batch_id}</p>
                    </div>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Student ID:</p>
                        <p className='text-end text-sm'>{filterData?._id}</p>
                    </div>
                    <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Course Fee:</p>
                        <p className='text-end text-sm'>{filterData?.price}Tk</p>
                    </div>
                    <h3 className='text-lg text-[var(--primary-bg)] mt-5'>Exchange  Course</h3>
                    <Form
                        layout='vertical'
                        onFinish={onExchange}
                        form={form}
                    >
                        <div className='md:grid md:grid-cols-2 lg:grid-cols-3 justify-start items-start md:items-center gap-3 flex flex-col'>
                            <Form.Item
                                name={`category_id`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'please select a batch'
                                    }
                                ]}
                            >
                                <Select style={{
                                    height: '42px'
                                }} placeholder="please select a category"
                                    options={CategoryOptions2}
                                />
                            </Form.Item>
                            <Form.Item
                                name={`batch_id`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'please select a batch'
                                    }
                                ]}
                            >
                                <Select style={{
                                    height: '42px'
                                }}
                                    onChange={(value) => {
                                        const selectedBatch = Batch?.data?.data?.filter((item, i) => item.id == value)
                                        setExchangeData({ course_id: selectedBatch?.[0]?.course_id, course_name: selectedBatch?.[0]?.course?.course_name, price: selectedBatch?.[0]?.course?.price })
                                    }}
                                    placeholder="please select a batch"
                                    options={BatchOptions}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input style={{
                                    height: '42px'
                                }} classNames={`border  pointer-events-none`} placeholder={exchangeData?.course_name} />
                            </Form.Item>
                            <Form.Item>
                                <Input style={{
                                    height: '42px'
                                }} classNames={`border  pointer-events-none`} placeholder={`${exchangeData?.price}TK`} />
                            </Form.Item>
                        </div>
                        <button className='btn-primary max-w-32 mx-auto mt-7'>
                            Confirm
                        </button>
                    </Form>
                </div>
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
        </>
    )
}

export default DropoutStudents
