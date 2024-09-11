import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaPlus } from 'react-icons/fa'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { Pagination } from 'antd'
import { RxCross2 } from 'react-icons/rx'
import useAxiosConfig, { imageUrl } from '../AxiosConfig/useAxiosConfig'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'

const SalseStudentBatch = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errorsFilter } } = useForm();
    const [filterBy, setFilterBy] = useState({})
    const onSubmit = data => console.log(data);
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [requestingBatch, Batch, BatchError,] = useGetRequest('batch', `/phoenix-batches?page=${page}${filterBy?.batch && `&batch_name=${filterBy?.batch}`}`)

    const [requestingCourse, Course, CourseError] = useGetRequest('course', `/courses?no_pagination=1`)
    const onSubmitFilter = data => { setFilterBy({ ...data, }) };
    const CourseOptions = Course?.map(item => {
        return { name: item?.course_name, value: item?.id }
    }) || []
    const baseUrl = useAxiosConfig()
    const navigate = useNavigate()
    const handleDelete = (id) => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        baseUrl.delete(`batches/${id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                            },
                        }).then((res) => {
                            toast.success('batch delete successfully')
                            toast.dismiss(t.id)
                        }).catch((err) => {
                            toast.error('something went wrong')
                            toast.dismiss(t.id)
                        })
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
            <PageHeading text={`All Batch`} />
            <div className='between-center gap-2'>
                <form onSubmit={handleSubmitFilter(onSubmitFilter)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                    {/* <div className='max-w-44 min-w-44'>
                        <SelectInput options={CourseOptions} rules={{ ...register('course', { required: false }) }} />
                    </div> */}
                    <div className='max-w-44 min-w-44'>
                        <Input rules={{ ...registerFilter("batch", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch Name`} />
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
                <div className="flex justify-end items-center w-full gap-3">
                    <Link to={`/add-sales-student-batch/add`} className="btn-primary max-w-40"><FaPlus />Add Batch</Link>
                </div>
            </div>
            <div className='grid-4 my-10'>
                {
                    Batch?.data?.data?.map((item, index) => {
                        return <div key={index} className="bg-white card-shadow p-3 w-full h-full rounded-md">
                            <div className="w-full h-[240px] object-cover rounded-md overflow-hidden">
                                <img className="w-full h-full object-cover" src={`${imageUrl}/${item?.image}`} alt="" />
                            </div>
                            <p className="text-sm text-[#333333] font-medium pt-4"> Course : {item?.course?.course_name}</p>
                            <p className="text-lg text-[#333333] font-medium py-2"> Batch : {item?.batch_name}</p>
                            <p><strong>Batch ID:</strong> {item?.batch_id}</p>
                            <div className="between-center gap-4 mt-5">
                                <Link to={`/all-admitted-student/${item?.id}`} className="btn-primary ">
                                    All Students
                                </Link>
                                <Link to={`/add-sales-student-batch/update/${item?.id}`} className="btn-secondary">
                                    Edit Batch
                                </Link>
                                <button onClick={() => handleDelete(item?.id)} style={{
                                    backgroundColor: 'red',
                                }} className="text-2xl text-white rounded-full ">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="center-center my-5 mt-8">

                <Pagination defaultCurrent={page} total={Batch?.data?.total} pageSize={8} showSizeChanger={false} onChange={(page, pageSize) => {
                    setPage(page)
                }} />
            </div>
        </>
    )
}

export default SalseStudentBatch
