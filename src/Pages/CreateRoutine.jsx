import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ClassRoutineForm from '../Components/Forms/ClassRoutineForm'
import { DatePicker, Form, Input, Modal, Select, Table, TimePicker } from 'antd'
import { FaSearch } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import useGetRequest from '../Hooks/useGetRequest'
import usePatchRequest from '../Hooks/usePatchRequest'
import toast from 'react-hot-toast'
import useDeleteRequest from '../Hooks/useDeleteRequest'



const CreateRoutine = () => {
    const [page, setPage] = useState(1)
    const [filterData, setFilterData] = useState({})
    const [filterBy, setFilterBy] = useState()
    const [requestingRoutine, Routine, routineError,refetch] = useGetRequest('routines', `/routines?page=${page}${filterBy?.moduleName && `&module_title=${filterBy?.moduleName}`}${filterBy?.batch_id && `&batch_id=${filterBy?.batch_id}`}`)
    const { mutate: updateRoutine, isLoading: updateLoading, data: updateData, } = usePatchRequest('routines', `/routines/${filterData?.key}`);
    const { mutate: DeleteRoutine, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('routines', `/routines/${filterData?.key}`);
    const routineData = Routine?.data?.data?.map(item => {
        return { key: item?.id, batch: item?.batch?.batch_name, batchID: item?.batch?.batch_id, time: item?.time, date: item?.date, moduleName: item?.course_module?.module_title }
    })
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
        setFilterBy({ ...values, });
    };
    const [openEditModal, setOpenEditModal] = useState(false)
    const [time, setTime] = useState([])
    const [date, setDate] = useState(undefined)
    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
    };
    const columns = [
        {
            title: 'Module Name',
            dataIndex: 'moduleName',
            key: 'moduleName',
        },
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
        },
        {
            title: 'Batch ID ',
            dataIndex: 'batchID',
            key: 'batchID',
        },
        {
            title: 'Select Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Select Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'examName',
            render: (_, record) => <div className='start-center gap-4 text-2xl'>
                <FiEdit className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                    setFilterData(record)
                    setOpenEditModal(true)
                }} /> <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record._id)
                    setFilterData(record)
                    handleDelete()
                }} />
            </div>,
            key: 'exam',
        },
    ];
    const onDateSelect = (field, date, dateString) => {
        setDate(dateString);
    };
    const onTimeSelect = (time, timeString) => {
        setTime(timeString)
    }
    const onUpdateRoutine = (values) => {
        const data = {
            date: date,
            time: `${time[0]}-${time[1]}`
        }

        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.append('_method', 'PUT')
        updateRoutine(formData)
    };
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete this routine</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteRoutine()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    return (
        <>
            <PageHeading text={`Class Routine`} />
            <div className='start-center gap-2 text-[var(--primary-bg)]'>
                <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Routine Schedule</p>
            </div>
            <div className='start-start gap-6 my-8'>
                <div className='card-shadow p-4 rounded-md w-[500px]'>
                    <p className='text-2xl font-semibold mb-4'>Add New Class Routine</p>
                    <ClassRoutineForm refetch={refetch} />
                </div>
                <div id='allStudent' className='card-shadow p-4 rounded-md w-full'>
                    <p className='text-2xl font-semibold mb-4'>All Class Routine</p>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                    >
                        <div className='flex justify-start items-center gap-4'>
                            <Form.Item
                                label={false}
                                name="moduleName">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="Search by Exam..." />
                            </Form.Item>
                            <Form.Item
                                label={false}
                                name="batch_id">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="create-routine" />
                            </Form.Item>
                            {/* <Form.Item
                                label={false}
                            >
                                <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                                    onChange('start', date, dateString)
                                }} />
                            </Form.Item> */}
                            <Form.Item >
                                <button className='text-white p-3 rounded-full text-xl bg-[var(--primary-bg)]' type="submit" >
                                    <FaSearch />
                                </button>
                                <button type='button' onClick={() => {
                                    setFilterBy({})
                                    form.resetFields()
                                }} className='text-2xl p-[10px] bg-[red] ml-2 text-white rounded-full'>
                                    <RxCross2 />
                                </button>
                            </Form.Item>
                        </div>
                    </Form>
                    <Table dataSource={routineData} pagination={{
                        total: Routine?.data?.total || 0,
                        pageSize: 10,
                        onChange: (page, pageSize) => setPage(page)
                    }} columns={columns} />
                </div>
            </div>
            <Modal
                onCancel={() => setOpenEditModal(false)}
                open={openEditModal}
                centered
                footer={false}
            >
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={onUpdateRoutine}
                >

                    <div>
                        <span className="text-base font-bold text-[#333333]">Course name</span>
                        <p className='mb-2 text-base p-2 border rounded-md text-gray-400 select-none cursor-not-allowed'>{filterData?.moduleName}</p>
                    </div>
                    <div>
                        <span className="text-base font-bold text-[#333333]">batch</span>
                        <p className='mb-2 text-base p-2 border rounded-md text-gray-400 select-none cursor-not-allowed'>{filterData?.batch}</p>
                    </div>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input time',
                            },
                        ]}
                        label={<span className="text-base font-bold text-[#333333]">Select Time</span>}
                        name="time">
                        <TimePicker.RangePicker onChange={onTimeSelect} className='w-full h-[43px]' />
                    </Form.Item>
                    <Form.Item
                        name={`date`}
                        label={<span className="text-base font-bold text-[#333333]">Select Date</span>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input date',
                            },
                        ]}>
                        <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                            onDateSelect('date', date, dateString)
                        }} />
                    </Form.Item>
                    <Form.Item >
                        <div className='start-center gap-4' >
                            <input type="submit" value={`Save`} className='btn-primary max-w-44 cursor-pointer' />

                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default CreateRoutine
