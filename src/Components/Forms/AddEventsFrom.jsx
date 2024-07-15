import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import SelectInput from '../Input/SelectInput';
import MultiSelectInput from '../Input/MultiSelectInput';
import TextArea from '../Input/TextArea';
import InputPlus from '../Input/InputPlus';
import { Link } from 'react-router-dom';
import PageHeading from '../Shared/PageHeading';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { addNewFields, removeNewFieldLastOne } from '../../Utils/InputPlusActions';
const popularityOptions = ['good', 'very good']
const CategoryOptions = ['App Development', 'web Development']
const EventTypeOptions = [{ name: 'online', value: 'online' }, { name: 'offline', value: 'offline' }]
const MentorsOptions = [
    { value: 'Rakibul hasan', label: 'Rakibul hasan' },
    { value: 'Rakibul hasan1', label: 'Rakibul hasan1' },
    { value: 'Rakibul hasan2', label: 'Rakibul hasan2' }
];
const carrierData = [
    { name: 'Training by Expert Trainers from bdCalling.', _id: 'isuehy7' },
]
const carriculumData = [
    { name: 'Introduction to Development with Flutter', _id: 'isuehy7' },
]
const jobPositionsData = [
    { name: 'App developer', _id: 'isuehy7' },
]
const softwaresData = [
    { name: 'Vs code ', _id: 'isuehy7' },
]

const AddEventsFrom = ({ type }) => {
    const [selectedMentors, setSelectedMentor] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [CarrierFields, setCarrierFields] = useState(carrierData)
    const [carriculumFields, setcarriculumFields] = useState(carriculumData)
    const [jobPositionsFields, setjobPositionsFields] = useState(jobPositionsData)
    const [softwaresFields, setsoftwaresFields] = useState(softwaresData)
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
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
    const onSubmit = data => {
        console.log(data)
    };
    return (
        <form className='py-8 pt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='start-center gap-2 '>
                <PageHeading text={`All Events`} /> <MdOutlineKeyboardArrowRight className='text-2xl' /> <PageHeading text={`Add Event `} />
            </div>
            <div className='relative w-[500px] h-[260px] rounded-xl my-6 mt-0'>
                <img className='w-full h-full object-cover rounded-xl' src={image ? URL.createObjectURL(image) : "https://i.ibb.co/TmVrjpR/Rectangle-6469-1.png"} alt="" />
                <label htmlFor='upload' className='text-white bg-[var(--primary-bg)] text-2xl p-2 rounded-full absolute -bottom-3 -right-3 cursor-pointer'>
                    <FaEdit />
                </label>
            </div>
            <input onChange={handleFileChange} type="file" name="courseImage" className='hidden' id="upload" />
            <div className='grid-3 mb-4'>
                <Input lebel={`Enter course name`} classNames={`border`} status={errors} placeholder={`certified app developer with flutter`} rules={{ ...register("courseName", { required: true }) }} />
                <Input lebel={`Enter date`} type={`date`} classNames={`border`} status={errors} rules={{ ...register("date", { required: true }) }} />
                <Input lebel={`Start Time`} type={`time`} classNames={`border`} status={errors} rules={{ ...register("start_time", { required: true }) }} />
                <Input lebel={`End Time`} type={`time`} classNames={`border`} status={errors} rules={{ ...register("end_time", { required: true }) }} />
                <SelectInput lebel={`Status`} classNames={`border`} status={errors} options={EventTypeOptions} rules={{ ...register("status", { required: true }) }} />
                <Input lebel={`Offline Location`} classNames={`border`} status={errors} placeholder={`dhaka `} rules={{ ...register("location", { required: true }) }} />
            </div>
            <div className='mt-4'>
                <TextArea lebel={`Description`} handler={inputHandler} defaultValue={filterData?.description} type={`text`} classNames={`border h-32`} status={errors} placeholder={`The bdCalling Academy's Flutter course focuses on creating apps from the ground up. The learner will receive step-by-step instruction on building an app from our Flutter expert. You will be able to develop deeply into the features of Flutter and dart with this training.`} rules={{ ...register("description", { required: true }) }} />
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


export default AddEventsFrom
