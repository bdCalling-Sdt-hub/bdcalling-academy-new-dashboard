import React, { useEffect } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Form, Select, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FaCheck } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import usePostRequest from '../Hooks/usePostRequest'
import useGetRequest from '../Hooks/useGetRequest'
import { RxCross2 } from 'react-icons/rx'
const ClassLeaveRequest = () => {
    const { mutate, isLoading, data: PostLeaveData, error } = usePostRequest('Leave', '/request-leave-application');
    const [requestingLeave, Leave, LeaveError, refetch] = useGetRequest('Leave', `/show-leave-application`)
    const data = Leave?.data?.data?.map((item, i) => {
        return {
            key: i + 1,
            Status: item?.leave_status === 'pending' ? 0 : item?.leave_status === 'rejected' ? 2 : 1,
            Recommender: item?.recommend_by,
            date_from: item?.date_from,
            date_to: item?.date_to,
            LeaveType: item?.leave_type,
            id: item?.id
        }
    })
    const [form] = Form.useForm()
    const onFinish = (value) => {
        const formData = new FormData()
        Object.keys(value).map(key => {
            formData.append(key, value[key])
        })
        mutate(formData)
    }
    useEffect(() => {
        form.setFieldsValue({})
    }, [form])
    const columns = [
        {
            title: '#sl',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Leave Type',
            dataIndex: 'LeaveType',
            key: 'LeaveType'
        },
        {
            title: 'Date From',
            dataIndex: 'date_from',
            key: 'date_from'
        },
        {
            title: 'Date To',
            dataIndex: 'date_to',
            key: 'date_to'
        },
        {
            title: 'Comment',
            dataIndex: 'Recommender',
            key: 'Recommender'
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (_, record) => {
                return <button className={`${_ === 0 ? 'bg-yellow-500' : _ === 1 ? "bg-green-500" : 'bg-red-500'} text-white flex justify-center items-center  py-2 w-36 gap-2`}>
                    {_ === 0 ? <IoTimeOutline /> : _ === 1 ? < FaCheck /> : <RxCross2 />}   {_ === 0 ? "Pending" : _ === 1 ? 'Approved' : 'Rejected'}
                </button>
            }
        },
    ]
    useEffect(() => {
        if (isLoading) return
        if (PostLeaveData) form.resetFields(); refetch()
    }, [PostLeaveData, isLoading])
    return (
        <>
            <PageHeading text={`Leave Request`} />
            <div className='start-center gap-2 text-[var(--primary-bg)] mb-2'>
                <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Leave Request</p>
            </div>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
            >
                <div className='grid-3 gap-4'>
                    <Form.Item
                        name={'leave_type'}
                        label={<span>Leave Type</span>}
                        rules={[
                            {
                                required: true,
                                message: 'this field is required'
                            }
                        ]}
                    >
                        {/* <input className='w-full p-2 border rounded-md focus:outline-none' type="text" /> */}
                        <Select style={{
                            outline: 'none'
                        }} placeholder='Leave Type' className='w-full h-[40px] border rounded-md focus:outline-none' options={[
                            { label: 'Casual', value: 'casual' },
                            { label: 'Sick', value: 'sick' },
                            { label: 'Vacation', value: 'vacation' },
                            { label: 'Maternity', value: 'maternity' },
                            { label: 'Paternity', value: 'paternity' },
                            { label: 'Bereavement', value: 'bereavement' },
                            { label: 'Study', value: 'study' },
                            { label: 'Unpaid', value: 'unpaid' },
                            { label: 'Compensatory', value: 'compensatory' },
                            { label: 'Sabbatical', value: 'sabbatical' },
                        ]
                        }>
                        </Select>
                    </Form.Item>
                    <div className='grid-2 gap-2'>
                        <Form.Item
                            name={'date_from'}
                            label={<span>From</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'this field is required'
                                }
                            ]}
                        >
                            <input className='w-full h-[40px] border rounded-md focus:outline-none p-2' type="date" />
                        </Form.Item>
                        <Form.Item
                            name={'date_to'}
                            label={<span>TO</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'this field is required'
                                }
                            ]}
                        >
                            <input className='w-full h-[40px] border rounded-md focus:outline-none p-2' type="date" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name={'phone_number'}
                        label={<span>Phone</span>}

                        rules={[
                            {
                                required: true,
                                message: 'this field is required'
                            }
                        ]}
                    >
                        <input placeholder='Phone' className='w-full h-[40px] border rounded-md focus:outline-none p-2' type="text" />
                    </Form.Item>
                    <Form.Item className='col-span-3'
                        name={'reason'}
                        label={<span>Reason</span>}

                        rules={[
                            {
                                required: true,
                                message: 'this field is required'
                            }
                        ]}
                    >
                        <TextArea placeholder='Phone' className='w-full border rounded-md focus:outline-none p-2' type="text" />
                    </Form.Item>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    <button type='button' onClick={() => {
                        form.resetFields()
                    }} className='py-2 px-6 bg-[#E8E8E8] rounded-md'>
                        reset
                    </button>
                    <button className='py-2 px-6 text-white bg-blue-400 rounded-md'>
                        Apply
                    </button>
                </div>
            </Form>
            <div className='mt-8'>
                <Table
                    dataSource={data} columns={columns}
                />
            </div>
        </>
    )
}

export default ClassLeaveRequest
