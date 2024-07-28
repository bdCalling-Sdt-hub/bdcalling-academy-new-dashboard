import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { DatePicker, Modal, Table } from 'antd'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { FiEdit } from 'react-icons/fi'
import LeaveForm from '../Components/Forms/LeaveForm'
import useGetRequest from '../Hooks/useGetRequest'
import usePostRequest from '../Hooks/usePostRequest'
// import SelectInput from '../Components/Input/SelectInput'


const RequestTrainer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const { mutate, isLoading, data, error } = usePostRequest('approve', '/approve-leave-application');
    const { mutate: Reject, isLoading: isLoadingReject, data: Rejectdata, error: Rejecterror } = usePostRequest('approve', '/reject-leave-application');
    const [requestingTrainerRequest, TrainerRequest, TrainerRequestError,] = useGetRequest('trainer', `/admin-show-leave-application`)
    const requestList = TrainerRequest?.data?.data?.map((item, i) => {
        return {
            "Name": item?.user?.name,
            "Leave": item?.leave_type,
            "Phone": item?.phone_number,
            "Email": item?.user?.email,
            "Designation": item?.user?.designation,
            "date_from": item?.date_from,
            "date_to": item?.date_to,
            "Status": item?.leave_status,
            "img": item?.user?.image || "https://i.ibb.co/YbZ93Zy/Ellipse-2.png",
            "Expert": item?.user?.expertise,
            "Reason": item?.reason,
            "Comments": item?.recommend_by,
            "id": item?.id,
            "key": i + 1
        }
    })
    console.log(requestList)
    const [filterdData, setFilterdData] = useState({})
    const handelEdit = (id) => {
        setImage(null)
        const newData = requestList.filter(item => item.id === id)
        setFilterdData(newData[0])
        setOpenLeaveModal(true)
    }
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    const [image, setImage] = useState(null);
    const onChange = (date, dateString) => {
    };
    const columns = [{
        title: '#Sl',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Full Name',
        dataIndex: 'name',
        render: (_, record) =>
            <div className='start-center gap-2'>
                <img src={record?.img} className='h-8 w-8 rounded-full' alt="" /> <p>{record?.Name}</p>
            </div>
        ,
        key: 'name',
    },
    {
        title: 'Leave Type',
        dataIndex: 'Leave',
        key: 'Leave',
    },
    {
        title: 'Phone Number',
        dataIndex: 'Phone',
        key: 'Phone',
    },
    {
        title: 'Designation',
        dataIndex: 'Designation',
        key: 'Designation',
    },
    {
        title: 'Date From',
        dataIndex: 'date_from',
        key: 'date_from',
    },
    {
        title: 'Date To',
        dataIndex: 'date_to',
        key: 'date_to',
    },
    {
        title: 'Status',
        dataIndex: '_id',
        render: (_, record) => {
            return <button className={`transition-all text-base font-medium px-6 py-[6px] ${record?.Status=='approved'?'bg-[#2BA24C]':record?.Status=='pending'? 'bg-yellow-500':'bg-red-500'}  rounded-md text-white center-center max-w-36`}> {record?.Status}</button>
        }
        ,
        key: '_id',
    },
    {
        title: 'Actions',
        render: (_, record) => (
            <div className="start-center gap-3 text-2xl">
                <FiEdit className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                    handelEdit(record.id)
                }} /> 
                {/* <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record._id)
                }} /> */}
            </div>
        ),
        key: '_id',
    },
    ];
    const handleRequest = (status) => {
        const data = {
            id: filterdData?.id,
            recommend_by: filterdData?.Comments
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        if (status === 'approve') mutate(formData)
        if (status === 'reject') Reject(formData)
        if (status === 'pending') setOpenLeaveModal(false)
    }
    return (
        <>
            <PageHeading text={`Trainer Request To class off`} />
            <div className='between-center gap-2 flex-wrap'>
                <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                    <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl' onChange={onChange} />
                    <div className='max-w-44 min-w-44'>
                        <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-[30px]`} placeholder={`+8801566026301`} />
                    </div>
                    <div className='max-w-44 min-w-44'>
                        <Input rules={{ ...register("designation", { required: false }) }} classNames={`rounded-[30px]`} placeholder={`designation`} />
                    </div>
                    <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                        <IoSearch />
                    </button>
                </form>
                {/* <div className='flex justify-end items-end gap-3'>
                    <button className='transition-all text-base font-medium px-6 py-2 bg-[#2BA24C] rounded-md text-white hover:scale-105 active:scale-95'>Approved</button>
                    <button className='transition-all text-base font-medium px-6 py-2 text-[#FFC60B] border border-[#FFC60B] rounded-md hover:scale-105 active:scale-95'>Pending</button>
                    <button className='transition-all text-base font-medium px-6 py-2 text-[#FA1131] border border-[#FA1131] rounded-md  hover:scale-105 active:scale-95'>Rejected</button>
                </div> */}
            </div>
            <div id='allStudent' className='my-8 rounded-md bg-white'>
                <p className='section-title px-2'>All List</p>
                <Table dataSource={requestList} columns={columns} />
            </div>
            <Modal
                centered
                footer={false}
                open={openLeaveModal}
                onCancel={() => setOpenLeaveModal(false)}
                width={700}
            >
                <LeaveForm image={image} setImage={setImage} filterdData={filterdData} inputHandeler={inputHandeler} register={register}
                    handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} handleRequest={handleRequest} />
            </Modal>
        </>
    )
}

export default RequestTrainer
