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
import { FaEdit } from 'react-icons/fa';
const popularityOptions = ['good', 'very good']
const CategoryOptions = ['App Development', 'web Development']
const CourseTypeOptions = ['on Line', 'off Line']
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
const CourseAddForm = ({ formFor }) => {
    const [selectedMentors, setSelectedMentor] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [CarrierFields, setCarrierFields] = useState(carrierData)
    const [carriculumFields, setcarriculumFields] = useState(carriculumData)
    const [jobPositionsFields, setjobPositionsFields] = useState(jobPositionsData)
    const [softwaresFields, setsoftwaresFields] = useState(softwaresData)
    const [image, setImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log()
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <form className='py-8 pt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='start-center gap-2 '>
                <PageHeading text={`All Course`} /> <MdOutlineKeyboardArrowRight className='text-2xl' /> <PageHeading text={`Add Course`} />
            </div>
            <div className='relative w-[500px] h-[260px] rounded-xl my-6 mt-0'>
                <img className='w-full h-full object-cover rounded-xl' src={image || "https://i.ibb.co/TmVrjpR/Rectangle-6469-1.png"} alt="" />
                <label htmlFor='upload' className='text-white bg-[var(--primary-bg)] text-2xl p-2 rounded-full absolute -bottom-3 -right-3 cursor-pointer'>
                    <FaEdit />
                </label>
            </div>
            <input onChange={handleFileChange} type="file" name="courseImage" className='hidden' id="upload" />
            <div className='grid-3 mb-4'>
                <Input lebel={`Enter course name`} classNames={`border`} status={errors} placeholder={`certified app developer with flutter`} rules={{ ...register("courseName", { required: true }) }} />
                <Input lebel={`Enter language`} classNames={`border`} status={errors} placeholder={`Bangla`} rules={{ ...register("language", { required: true }) }} />
                {
                    formFor !== 'video' && <>
                        <Input lebel={`Enter batch no`} classNames={`border`} type={`number`} status={errors} placeholder={`Enter batch no`} rules={{ ...register("batch", { required: true }) }} />
                        <Input lebel={`Enter start date`} type={`date`} classNames={`border`} status={errors} rules={{ ...register("date", { required: true }) }} />
                    </>
                }
                <Input lebel={`Enter course price`} classNames={`border`} status={errors} placeholder={`25000`} rules={{ ...register("coursePrice", { required: true }) }} />
                <Input lebel={`Enter discount price`} classNames={`border`} status={errors} placeholder={`5000`} rules={{ ...register("discount", { required: true }) }} />
                <Input lebel={`Enter course time length`} classNames={`border`} status={errors} placeholder={`5`} rules={{ ...register("courseLength", { required: true }) }} />
                <Input lebel={`Enter skill level`} classNames={`border`} status={errors} placeholder={`Basic To Advance`} rules={{ ...register("skildlevel", { required: true }) }} />
                <SelectInput lebel={`Select Course Type`} classNames={`border`} status={errors} options={CourseTypeOptions} rules={{ ...register("courseType", { required: true }) }} />
                <SelectInput lebel={`Select Category`} classNames={`border`} status={errors} options={CategoryOptions} rules={{ ...register("category", { required: true }) }} />
                <SelectInput lebel={`Select Popularity`} classNames={`border`} status={errors} options={popularityOptions} rules={{ ...register("popularity", { required: true }) }} />
                <MultiSelectInput setSelectedOption={setSelectedMentor} lebel={`Select Mentors`} data={MentorsOptions} />
                {
                    formFor === 'ofline' && < Input lebel={`Enter Seat Left`} type={`number`} classNames={`border`} status={errors} placeholder={`10`} rules={{ ...register("seatLeft", { required: false }) }} />
                }
                {
                    formFor === 'video' && <>
                        <Input lebel={`Enter Total Sections`} classNames={`border`} type={`number`} status={errors} placeholder={`12`} rules={{ ...register("sections", { required: true }) }} />
                        <Input lebel={`Enter Total Lectures`} classNames={`border`} type={`number`} status={errors} placeholder={`25`} rules={{ ...register("lectures", { required: true }) }} />
                    </>
                }
            </div>
            <div className='mt-4'>
                <TextArea lebel={`Enter Course Details`} type={`text`} classNames={`border h-32`} status={errors} placeholder={`The bdCalling Academy's Flutter course focuses on creating apps from the ground up. The learner will receive step-by-step instruction on building an app from our Flutter expert. You will be able to develop deeply into the features of Flutter and dart with this training.`} rules={{ ...register("details", { required: true }) }} />
            </div>
            <div className='mt-4'>
                <TextArea lebel={`Enter Address`} type={`text`} classNames={`border h-20`} status={errors} placeholder={`bdCalling IT Ltd - Corporate Office House - 14, Main Road, Block - A, Banasree, Rampura, Dhaka - 1219`} rules={{ ...register("address", { required: true }) }} />
            </div>
            <div className='grid-4 mt-4'>
                <InputPlus setFields={setCarrierFields} actions={{ plus: true, cross: true }} fieldFor='create' Fields={CarrierFields} valueName={'name'} lebel={`Enter Carrier Opportunity`} classNames={`border `} status={errors} placeholder={`Training by Expert Trainers from bdCalling.`} inputFor={'carrier'} />
                <InputPlus setFields={setcarriculumFields} actions={{ plus: true, cross: true }} fieldFor='create' Fields={carriculumFields} valueName={'name'} lebel={`Enter carriculum`} classNames={`border `} status={errors} placeholder={`Introduction to Development with Flutter`} inputFor={'carriculum'} />
                <InputPlus setFields={setjobPositionsFields} actions={{ plus: true, cross: true }} fieldFor='create' Fields={jobPositionsFields} valueName={'name'} lebel={`Enter job positions`} classNames={`border `} status={errors} placeholder={`App developer`} inputFor={'jobPositions'} />
                <InputPlus setFields={setsoftwaresFields} actions={{ plus: true, cross: true }} fieldFor='create' Fields={softwaresFields} valueName={'name'} lebel={`Enter Softwares`} classNames={`border `} status={errors} placeholder={`vs Code`} inputFor={'jobPositions'} />
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

export default CourseAddForm
