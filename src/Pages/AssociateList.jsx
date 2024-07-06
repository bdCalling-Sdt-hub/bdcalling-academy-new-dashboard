import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { Form, Input, Modal, Table } from 'antd'
import { RxCross1 } from 'react-icons/rx'
import { FaPlus } from 'react-icons/fa'
const data = [
    {
        "key": '1',
        "logo": <img className='w-10 h-10 rounded-full' src="https://i.ibb.co/G0LXNHt/apple-logo-icon-bf9728.webp" alt="" srcset="" />,
        "name": "John Doe",
    },
    {
        "key": '2',
        "logo": <img className='w-10 h-10 rounded-full' src="https://i.ibb.co/G0LXNHt/apple-logo-icon-bf9728.webp" alt="" srcset="" />,
        "name": "John Doe",
    },
    {
        "key": '3',
        "logo": <img className='w-10 h-10 rounded-full' src="https://i.ibb.co/G0LXNHt/apple-logo-icon-bf9728.webp" alt="" srcset="" />,
        "name": "John Doe",
    },
]
const AssociateList = () => {
    const [open, setOpen] = useState(false)
    const columns = [
        {
            title: '#Sl',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Company Logo',
            dataIndex: 'logo',
            key: 'logo',
        },
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'examName',
            render: (_, record) => <div className='start-center gap-4 text-2xl'>
                <FiEdit  className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                    setOpen(true)
                }} /> <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record._id)
                }} />
            </div>,
            key: 'exam',
        },
    ];
    const onFinish = (value) => {

    }
    return (
        <div>
            <PageHeading text={`Class Routine`} />
            <div className='flex justify-between items-center mb-2 -mt-4'>
                <div className='start-center gap-2 text-[var(--primary-bg)]'>
                    <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Routine Schedule</p>
                </div>
                <button onClick={() => setOpen(true)} className='flex w-fit items-center justify-center px-8 py-2 gap-2 bg-blue-400 text-white rounded-md'>
                    <FaPlus />
                    <p className='whitespace-nowrap'>Add Associate</p>
                </button>
            </div>
            <Table dataSource={data} columns={columns} />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
            >
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={`name`}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'please input Name'
                            }
                        ]}
                    >
                        <Input className='py-2' placeholder='write your name' />
                    </Form.Item>
                    <Form.Item
                        name={`logo`}
                        label="Logo"
                        rules={[
                            {
                                required: true,
                                message: 'please input logo'
                            }
                        ]}
                    >
                        <Input accept='image/*' className='py-2' type='file' />
                    </Form.Item>
                    <div className='text-center'>
                        <button className='px-8 py-2 bg-blue-400 text-white rounded-md'>
                            Create
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AssociateList
