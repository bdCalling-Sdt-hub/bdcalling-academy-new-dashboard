import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { Form, Input, Modal, Table } from 'antd'
import { RxCross1 } from 'react-icons/rx'
import { FaPlus } from 'react-icons/fa'
import usePostRequest from '../Hooks/usePostRequest'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import toast from 'react-hot-toast'
import usePatchRequest from '../Hooks/usePatchRequest'

const AssociateList = () => {
    const [form] = Form.useForm()
    const [formFor, setFormFor] = useState('Add')
    const [open, setOpen] = useState(false)
    const [Image, setImage] = useState(null)
    const [filterData, setFilterData] = useState({})
    const { mutate, isLoading, data, error } = usePostRequest('Assession', '/assession');
    const [requestingAssociate, Associate, AssociateError, refetch] = useGetRequest('assession', `/assession`)
    const { mutate: DeleteAssociate, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Students', `/assession/${filterData?.key}`);
    const { mutate: updateAssociate, isLoading: updateLoading, data: updateData, } = usePatchRequest('Students', `/students/${filterData?.key}`);

    const TableData = Associate?.data?.map((item) => {
        return {
            "key": item?.id,
            "logo": item?.image,
            "name": item?.title,
        }
    })
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {filterData?.name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteAssociate()
                        toast.dismiss(t.id)
                        setTimeout(() => {
                            refetch()
                        }, 1000);
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
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
            render: (_, record) => <img className='w-10 h-10 rounded-full' src={`${imageUrl}/${record?.logo}`} />
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
                <FiEdit className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                    setOpen(true)
                    setFilterData(record)
                }} /> <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record.key)
                    setFilterData(record)
                    handleDelete()
                }} />
            </div>,
            key: 'exam',
        },
    ];
    const onFinish = (value) => {
        const formData = new FormData()
        formData.append('title', value?.name)
        formData.append('image', Image)
        if (formFor === 'Add') {
            mutate(formData)
        } else {
            updateAssociate(formData)
        }
        setTimeout(() => {
            setOpen(false)
            refetch()
        }, 1000);
    }
    useEffect(() => {
        // form.setFieldsValue({name:filterData?.name,logo:filterData?.logo})
    }, [filterData])
    return (
        <div>
            <PageHeading text={`Associate List`} />
            <div className='flex justify-between items-center mb-2 -mt-4'>
                <div className='start-center gap-2 text-[var(--primary-bg)]'>
                    <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Routine Schedule</p>
                </div>
                <button onClick={() => setOpen(true)} className='flex w-fit items-center justify-center px-8 py-2 gap-2 bg-blue-400 text-white rounded-md'>
                    <FaPlus />
                    <p className='whitespace-nowrap'>All Associate List</p>
                </button>
            </div>
            <Table dataSource={TableData} columns={columns} />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
            >
                <Form
                    form={form}
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
                        <Input onChange={(e) => {
                            setImage(e.target.files[0])
                        }} accept='image/*' className='py-2' type='file' />
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
