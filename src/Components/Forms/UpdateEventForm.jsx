import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import SelectInput from '../Input/SelectInput';
import TextArea from '../Input/TextArea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../Shared/PageHeading';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaEdit, FaPlus } from 'react-icons/fa';
import useGetRequest from '../../Hooks/useGetRequest';
import usePostRequest from '../../Hooks/usePostRequest';
import usePatchRequest from '../../Hooks/usePatchRequest';
const EventTypeOptions = [{ name: 'online', value: 'online' }, { name: 'offline', value: 'offline' }]

const UpdateEventForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [requestingEvents, Events, EventsError, refetch, isError] = useGetRequest('Events', `/event/${id}`)
    const { mutate, isLoading, data, error } = usePatchRequest('event', `/event/${id}`);
    const [requestingCourse, Course, CourseError] = useGetRequest('course', `/courses`)
    const CourseOptions = Course?.data?.map(item => {
        return { name: item?.course_name, value: item?.course_name }
    }) || []
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        } else {
            setImage(null)
        }
    };
    const inputHandler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    const onSubmit = values => {
        const data = {
            course_name: values?.courseName || Events?.data?.course_name,
            date: values?.date,
            time: values?.start_time,
            end_time: values?.end_time,
            locations: values?.location,
            descriptions: values?.description,
            status: values?.status || Events?.data?.status,
            _method: 'PUT'
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.append('image', image)
        mutate(formData)
    };
    useEffect(() => {
        if (data) navigate(-1)
    }, [data])
    return (
        <form className='py-8 pt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='start-center gap-2 '>
                <PageHeading text={`All Events`} /> <MdOutlineKeyboardArrowRight className='text-2xl' /> <PageHeading text={`Update Event `} />
            </div>
            <div className='relative w-[500px] h-[260px] rounded-xl my-6 mt-0'>
                <img className='w-full h-full object-cover rounded-xl' src={image ? URL.createObjectURL(image) : "https://i.ibb.co/TmVrjpR/Rectangle-6469-1.png"} alt="" />
                <label htmlFor='upload' className='text-white bg-[var(--primary-bg)] text-2xl p-2 rounded-full absolute -bottom-3 -right-3 cursor-pointer'>
                    <FaEdit />
                </label>
            </div>
            <input onChange={handleFileChange} type="file" name="courseImage" className='hidden' id="upload" />
            <div className='grid-3 mb-4'>
                <SelectInput lebel={`Course Name`} classNames={`border`} status={errors} defaultValue={Events?.data?.course_name} options={CourseOptions} rules={{ ...register("courseName", { required: false }) }} />
                <Input lebel={`Enter date`} defaultValue={Events?.data?.date} type={`date`} classNames={`border`} status={errors} rules={{ ...register("date", { required: false }) }} />
                <Input lebel={`Start Time`} defaultValue={Events?.data?.time} type={`time`} classNames={`border`} status={errors} rules={{ ...register("start_time", { required: false }) }} />
                <Input lebel={`End Time`} defaultValue={Events?.data?.end_time} type={`time`} classNames={`border`} status={errors} rules={{ ...register("end_time", { required: false }) }} />
                <SelectInput lebel={`Status`} defaultValue={Events?.data?.status} classNames={`border`} status={errors} options={EventTypeOptions} rules={{ ...register("status", { required: false }) }} />
                <Input lebel={`Offline Location`} defaultValue={Events?.data?.locations} classNames={`border`} status={errors} placeholder={`dhaka `} rules={{ ...register("location", { required: false }) }} />
            </div>
            <div className='mt-4'>
                <TextArea lebel={`Description`} handler={inputHandler} defaultValue={filterData?.description || Events?.data?.descriptions} type={`text`} classNames={`border h-32`} status={errors} placeholder={`The bdCalling Academy's Flutter course focuses on creating apps from the ground up. The learner will receive step-by-step instruction on building an app from our Flutter expert. You will be able to develop deeply into the features of Flutter and dart with this training.`} rules={{ ...register("description", { required: false }) }} />
            </div>
            <div className='flex justify-end items-center gap-4 my-8'>
                <Link to={-1}>
                    <button className='py-2 w-32 text-[#FA1131] border border-[#FA1131] rounded' type='button'>
                        Cancel
                    </button>
                </Link>
                <input className='btn-primary max-w-32 cursor-pointer' type="submit" />
            </div>
        </form>
    )
}


export default UpdateEventForm
