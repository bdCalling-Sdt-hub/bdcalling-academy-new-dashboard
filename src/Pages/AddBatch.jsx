import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { FaPlus } from 'react-icons/fa'
import Input from '../Components/Input/Input'
import { IoSearch } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import SelectInput from '../Components/Input/SelectInput'
import BatchCard from '../Components/Cards/BatchCard'
import { Link, useNavigate } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { Pagination } from 'antd'
import { RxCross2 } from 'react-icons/rx'
const AddBatch = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errorsFilter } } = useForm();
    const [filterBy, setFilterBy] = useState({})
    const onSubmit = data => console.log(data);
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [requestingBatch, Batch, BatchError,] = useGetRequest('batch', `/batches?page=${page}${filterBy?.batch && `&batch_name=${filterBy?.batch}`}`)
    console.log(`/batches?page=${page}${filterBy?.batch && `&batch_name=${filterBy?.batch}`}`)
    const [requestingCourse, Course, CourseError] = useGetRequest('course', `/courses`)
    const onSubmitFilter = data => { setFilterBy({ ...data, }) };
    const CourseOptions = Course?.data?.map(item => {
        return { name: item?.course_name, value: item?.id }
    }) || []
    const navigate = useNavigate()
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
                    <Link to={`/add-batch/add`} className="btn-primary max-w-40"><FaPlus />Add Batch</Link>
                </div>
            </div>
            <div className='grid-4 my-10'>
                {
                    Batch?.data?.data?.map((item, index) => <BatchCard key={index} item={item} />)
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

export default AddBatch
