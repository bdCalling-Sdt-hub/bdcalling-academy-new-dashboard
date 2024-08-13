import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import SelectInput from '../Input/SelectInput';
import MultiSelectInput from '../Input/MultiSelectInput';
import TextArea from '../Input/TextArea';
import InputPlus from '../Input/InputPlus';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../Shared/PageHeading';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { addNewFields, removeNewFieldLastOne } from '../../Utils/InputPlusActions';
import useGetRequest from '../../Hooks/useGetRequest';
import usePatchRequest from '../../Hooks/usePatchRequest';
import usePostRequest from '../../Hooks/usePostRequest';
import useDeleteRequest from '../../Hooks/useDeleteRequest';
import toast from 'react-hot-toast';
import { imageUrl } from '../../AxiosConfig/useAxiosConfig';
const popularityOptions = [{ name: 'true', value: '1' }, { name: 'false', value: '0' }]
// const CategoryOptions = [{ name: 'App Development', value: 'App Development' }, { name: 'web Development', value: 'web Development' },]
const CourseTypeOptions = [{ name: 'online', value: 'online' }, { name: 'offline', value: 'offline' },{ name: 'video', value: 'video' }]
const  CourseUpdateForm = ({ formFor }) => {
    const { id } = useParams()
    const [requestingCourse, Course, CourseError, refetch] = useGetRequest('course', `/courses/${id}`)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [CarrierFields, setCarrierFields] = useState([])
    const [carriculumFields, setcarriculumFields] = useState([])
    const [jobPositionsFields, setjobPositionsFields] = useState([])
    const [softwaresFields, setsoftwaresFields] = useState([])
    const [filterData, setFilterData] = useState({})
    const [image, setImage] = useState(null);
    const [query, setQuery] = useState(new URLSearchParams(window.location.search));
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories`)
    const { mutate: updateCourse, isLoading: updateLoading, data: updateData, } = usePatchRequest('courses', `/courses/${id}`);
    const CategoryOptions = Category?.data?.data?.map(item => {
        return { name: item?.category_name, value: item?.id }
    })
    const navigate = useNavigate()
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log()
        if (file) {
            setImage(file);
        } else {
            setImage(null)
        }
    };
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    const onSubmit = data => {
        const carriculum = []
        const jobPositions = []
        const carrier = []
        const tools = []
        Object.keys(data).map(key => {
            if (key.includes('carriculum')) {
                carriculum.push(data[key])
            } else if (key.includes('jobPositions')) {
                jobPositions.push(data[key])
            } else if (key.includes('carrier')) {
                carrier.push(data[key])
            } else if (key.includes('tools')) {
                tools.push(data[key])
            }
        })
        const CourseData = {
            course_category_id: data?.category,
            course_name: data?.courseName,
            language: data?.language,
            course_details: data?.details,
            course_time_length: data?.courseLength,
            price: data?.coursePrice,
            skill_Level: data?.skildlevel,
            address: data?.address,
            max_student_lengt: data?.max_student_lengt,
            course_type: data?.courseType,
            popular_section: data?.popularity,
            career_opportunities: JSON.stringify(carrier),
            curriculum: JSON.stringify(carriculum),
            tools: JSON.stringify(tools),
            job_position: JSON.stringify(jobPositions)

        }
        const formData = new FormData()
        Object.keys(CourseData).map(key => {
            formData.append(key, CourseData[key])
        })
        formData.append('_method', 'PUT')
        if (image) {
            formData.append('image', image)
        }
        updateCourse(formData)
    };
    useEffect(() => {
        if (updateLoading) {
            return
        }
        if (updateData) {
            return navigate(`/${query.get('redirect')}`)
        }
    }, [updateData, updateLoading])
    // console.log(query.get('redirect'))
    useEffect(() => {
        const jobPositionsData = Course?.data?.job_position?.map((item, index) => {
            return { name: item, _id: `16521${index}` }
        })
        const softwaresData = Course?.data?.tools?.map((item, index) => {
            return { name: item, _id: `16521${index}` }
        })
        const CarrierFields = Course?.data?.career_opportunities?.map((item, index) => {
            return { name: item, _id: `16521${index}` }
        })
        const carriculumFields = Course?.data?.curriculum?.map((item, index) => {
            return { name: item, _id: `16521${index}` }
        })
        setsoftwaresFields(softwaresData)
        setjobPositionsFields(jobPositionsData)
        setCarrierFields(CarrierFields)
        setcarriculumFields(carriculumFields)
    }, [Course])
    return (
        <form className='py-8 pt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='start-center gap-2'>
                <PageHeading text={`All Course`} /> <MdOutlineKeyboardArrowRight className='text-2xl' /> <PageHeading text={`Add Course`} />
            </div>
            <div className='relative w-[500px] h-[260px] rounded-xl my-6 mt-0'>
                <img className='w-full h-full object-cover rounded-xl' src={image ? URL.createObjectURL(image) : `${imageUrl}/${Course?.data?.thumbnail}`} alt="" />
                <label htmlFor='upload' className='text-white bg-[var(--primary-bg)] text-2xl p-2 rounded-full absolute -bottom-3 -right-3 cursor-pointer'>
                    <FaEdit />
                </label>
            </div>
            <input onChange={handleFileChange} type="file" name="courseImage" className='hidden' id="upload" />
            <div className='grid-3 mb-4'>
                <Input lebel={`Enter course name`} defaultValue={Course?.data?.course_name} classNames={`border`} status={errors} placeholder={`certified app developer with flutter`} rules={{ ...register("courseName", { required: true }) }} />
                <Input lebel={`Enter language`} defaultValue={Course?.data?.language} classNames={`border`} status={errors} placeholder={`Bangla`} rules={{ ...register("language", { required: true }) }} />
                {/* {
                    formFor !== 'video' && <>
                        <Input lebel={`Enter batch no`} classNames={`border`} type={`text`} status={errors} placeholder={`Enter batch no`} rules={{ ...register("batch", { required: true }) }} />
                        <Input lebel={`Enter start date`} type={`date`} classNames={`border`} status={errors} rules={{ ...register("date", { required: true }) }} />
                    </>
                } */}
                <Input lebel={`Enter course price`} defaultValue={Course?.data?.price} classNames={`border`} status={errors} placeholder={`25000`} rules={{ ...register("coursePrice", { required: true }) }} />
                {/* <Input lebel={`Enter discount price`} defaultValue={course_name} classNames={`border`} status={errors} placeholder={`5000`} rules={{ ...register("discount", { required: true }) }} /> */}
                <Input lebel={`Enter course time length`} defaultValue={Course?.data?.course_time_length} classNames={`border`} status={errors} placeholder={`5`} rules={{ ...register("courseLength", { required: true }) }} />
                <Input lebel={`Enter skill level`} defaultValue={Course?.data?.skill_Level} classNames={`border`} status={errors} placeholder={`Basic To Advance`} rules={{ ...register("skildlevel", { required: true }) }} />
                {/* <Input lebel={`max seat`} classNames={`border`} status={errors} placeholder={`50`} rules={{ ...register("max_student_lengt", { required: true }) }} /> */}
                <SelectInput lebel={`Select Course Type`} defaultValue={Course?.data?.course_type} classNames={`border`} status={errors} options={CourseTypeOptions} rules={{ ...register("courseType", { required: true }) }} />
                <SelectInput lebel={`Select Category`} defaultValue={Course?.data?.course_category_id} classNames={`border`} status={errors} options={CategoryOptions} rules={{ ...register("category", { required: true }) }} />
                <SelectInput lebel={`Select Popularity`} defaultValue={Course?.data?.popular_section} classNames={`border`} status={errors} options={popularityOptions} rules={{ ...register("popularity", { required: true }) }} />
                {/* <MultiSelectInput setSelectedOption={setSelectedMentor} lebel={`Select Mentors`} data={MentorsOptions} />
                {
                    formFor === 'ofline' && < Input lebel={`Enter Seat Left`} type={`number`} classNames={`border`} status={errors} placeholder={`10`} rules={{ ...register("seatLeft", { required: false }) }} />
                } */}
                {
                    formFor === 'video' && <>
                        <Input lebel={`Enter Total Sections`} classNames={`border`} type={`number`} status={errors} placeholder={`12`} rules={{ ...register("sections", { required: true }) }} />
                        <Input lebel={`Enter Total Lectures`} classNames={`border`} type={`number`} status={errors} placeholder={`25`} rules={{ ...register("lectures", { required: true }) }} />
                    </>
                }
            </div>
            <div className='mt-4'>
                <TextArea defaultValue={Course?.data?.course_details} handler={inputHandeler} lebel={`Enter Course Details`} type={`text`} classNames={`border h-32`} status={errors} placeholder={`The bdCalling Academy's Flutter course focuses on creating apps from the ground up. The learner will receive step-by-step instruction on building an app from our Flutter expert. You will be able to develop deeply into the features of Flutter and dart with this training.`} rules={{ ...register("details", { required: true }) }} />
            </div>
            <div className='mt-4'>
                <TextArea defaultValue={Course?.data?.address} handler={inputHandeler} lebel={`Enter Address`} type={`text`} classNames={`border h-20`} status={errors} placeholder={`bdCalling IT Ltd - Corporate Office House - 14, Main Road, Block - A, Banasree, Rampura, Dhaka - 1219`} rules={{ ...register("address", { required: true }) }} />
            </div>
            <div className='md:grid md:grid-cols-2 flex flex-col justify-start items-start md:items-start lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                <div className='w-full flex justify-start items-start gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                        <p>Enter Carrier Opportunity</p>
                        <InputPlus actions={false} fieldFor='create' register={register} Fields={CarrierFields} valueName={'name'} classNames={`border `} status={errors} placeholder={`Training by Expert Trainers from bdCalling.`} inputFor={'carrier'} />
                    </div>
                    <div className='flex items-center justify-end w-fit gap-2'>
                        <button onClick={() => {
                            removeNewFieldLastOne(CarrierFields, setCarrierFields)
                        }} type='button' className={`bg-red-600 p-1 text-lg rounded-full text-white `}>
                            <FaXmark />
                        </button>
                        <button onClick={() => {
                            addNewFields(CarrierFields, setCarrierFields)
                        }} type='button' className={`bg-green-600 p-1 rounded-full text-white text-lg`} >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-start items-start gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                        <p>Enter carriculum</p>
                        <InputPlus register={register} actions={false} fieldFor='create' Fields={carriculumFields} valueName={'name'} classNames={`border `} status={errors} placeholder={`Introduction to Development with Flutter`} inputFor={'carriculum'} />
                    </div>
                    <div className='flex items-center justify-end w-fit gap-2'>
                        <button onClick={() => {
                            removeNewFieldLastOne(carriculumFields, setcarriculumFields)
                        }} type='button' className={`bg-red-600 p-1 text-lg rounded-full text-white `}>
                            <FaXmark />
                        </button>
                        <button onClick={() => {
                            addNewFields(carriculumFields, setcarriculumFields)
                        }} type='button' className={`bg-green-600 p-1 rounded-full text-white text-lg`} >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-start items-start gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                        <p>Enter job positions</p>
                        <InputPlus register={register} actions={false} fieldFor='create' Fields={jobPositionsFields} valueName={'name'} classNames={`border `} status={errors} placeholder={`App developer`} inputFor={'jobPositions'} />
                    </div>
                    <div className='flex items-center justify-end w-fit gap-2'>
                        <button onClick={() => {
                            removeNewFieldLastOne(jobPositionsFields, setjobPositionsFields)
                        }} type='button' className={`bg-red-600 p-1 text-lg rounded-full text-white `}>
                            <FaXmark />
                        </button>
                        <button onClick={() => {
                            addNewFields(jobPositionsFields, setjobPositionsFields)
                        }} type='button' className={`bg-green-600 p-1 rounded-full text-white text-lg`} >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-start items-start gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                        <p>Enter Softwares</p>
                        <InputPlus register={register} actions={false} fieldFor='create' Fields={softwaresFields} valueName={'name'} classNames={`border `} status={errors} placeholder={`vs Code`} inputFor={'tools'} />
                    </div>
                    <div className='flex items-center justify-end w-fit gap-2'>
                        <button onClick={() => {
                            removeNewFieldLastOne(softwaresFields, setsoftwaresFields)
                        }} type='button' className={`bg-red-600 p-1 text-lg rounded-full text-white `}>
                            <FaXmark />
                        </button>
                        <button onClick={() => {
                            addNewFields(softwaresFields, setsoftwaresFields)
                        }} type='button' className={`bg-green-600 p-1 rounded-full text-white text-lg`} >
                            <FaPlus />
                        </button>
                    </div>
                </div>

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

export default CourseUpdateForm
