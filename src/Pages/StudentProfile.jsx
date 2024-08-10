import React, { useState } from 'react'
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import { Modal } from 'antd'
import UpdateInput from '../Components/Input/UpdateInput'
import SelectInput from '../Components/Input/SelectInput'
import { useForm } from 'react-hook-form'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { useUserData } from '../Providers/UserProviders/UserProvider'
const StudentProfile = () => {
    const [filterData, setFilterData] = useState({})
    const { register: registerStudent, handleSubmit: handleStudent, formState: { errors: StudentError } } = useForm();
    const [openStudentAddModal, setOpenStudentAddModal] = useState(false)
    const [text, setText] = useState(true)
    const [image, setImage] = useState(null);
    const [inputType, setInputType] = useState('password')

    const { useData, loading, isError } = useUserData()
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        } else {
            setImage(null)
        }
    };
    const onSubmitStudent = (values) => {
        const data = {
            name: filterData?.name,
            email: filterData?.email,
            password: filterData?.password,
            phone_number: filterData?.phone_number,
            gender: filterData?.gender,
            religion: filterData?.religion,
            dob: filterData?.dob,
            blood_group: filterData?.blood_group,
            registration_date: filterData.registration_date,
            address: filterData?.address,
            category_id: values?.category
            // add_by:'super admin'
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        if (image) {
            formData.append('image', image)
        }
        if (text) {
            mutate(formData)
        } else {
            formData.append('_method', 'PUT')
            updateStudents(formData)
        }
    }

    console.log(useData)


    return (
        <>
            <div className='mt-4'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex justify-start items-center gap-2'>
                        <Link to={-1} className='text-2xl p-2 rounded-md bg-white'>
                            <MdOutlineKeyboardArrowLeft />
                        </Link>
                        <p className='text-lg font-semibold'>Personal Information</p>
                    </div>
                    <button onClick={() => setOpenStudentAddModal(true)} className='flex justify-center items-center w-fit gap-3 px-8 py-2 bg-blue-400 text-white rounded-md'>
                        <FaEdit />
                        Edit Profile
                    </button>
                </div>
                <div className='grid grid-cols-6 gap-6 mt-3 justify-start items-start p-4'>
                    <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='col-span-1 p-4 rounded-md flex flex-col justify-center items-center gap-2 bg-white'>
                        <p>profile</p>
                        <div className='w-[140px] h-[140px] rounded-full overflow-hidden'>
                            <img className='w-full h-full object-cover' src="https://i.ibb.co/ZNYrb8Z/icegif-1010.gif" alt="" />
                        </div>
                        <p className='text-xl font-semibold'>{useData?.role}</p>
                    </div>
                    <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='col-span-5 p-8 rounded-md bg-white grid grid-cols-2 gap-4 items-center justify-start '>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Full Name</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.name}</p>
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Mobile Number</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.student?.phone_number}</p>
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Email</p>
                            <p className='text-base border p-2 rounded-md'>P{useData?.email}</p>
                        </div>
                      
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Gender:</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.student?.gender ?  useData?.student?.gender : "N/A"}</p>
                        </div>
                        {/* <div className='w-full h-full'>
                            <p className='text-base font-medium'>Date Of Birth:</p>
                            <p className='text-base border p-2 rounded-md'>{}</p>
                        </div> */}
                        {/* <div className='w-full h-full'>
                            <p className='text-base font-medium'>Department:</p>
                            <p className='text-base border p-2 rounded-md'>Profile?.user?.expertise</p>
                        </div> */}
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Blood Group:</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.student?.blood_group ? useData?.student?.blood_group : 'N/A'}</p>
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Address:</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.student?.address ? useData?.student?.address : "N/A"}</p>
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Religion:</p>
                            <p className='text-base border p-2 rounded-md'>{useData?.student?.religion ? useData?.student?.religion  : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                centered
                footer={false}
                onCancel={() => setOpenStudentAddModal(false)}
                open={openStudentAddModal}
                width={600}
            >
                <form className="text-base" onSubmit={handleStudent(onSubmitStudent)}>
                    <div className="center-center">
                        <div className={`h-28 w-28 rounded-full my-4  relative`}>
                            {
                                image ? <img className="h-full w-full rounded-full object-cover" src={URL.createObjectURL(image)} alt="" /> : filterData?.img ? <img className="h-full w-full rounded-full object-cover" src={filterData?.img} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={ProfileImage} alt="" />
                            }
                            <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                                <FaEdit />
                            </label>
                        </div>
                    </div>
                    <input id="profile" onChange={handleFileChange} className="hidden" name="profile" type="file" />
                    <div className="grid-2">
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...registerStudent("name", { required: true }) }} placeholder={`Full Name*`} defaultValue={filterData.name} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Mobile*`} rules={{ ...registerStudent("phone_number", { required: true }) }} placeholder={`Phone Number*`} defaultValue={filterData.phone_number} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full ${text ? "" : "pointer-events-none"} border`} lebel={`Email*`} type={'email'} rules={{ ...registerStudent("email", { required: true }) }} placeholder={`Email*`} defaultValue={filterData.email} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full ${text ? "" : "pointer-events-none"} border`} lebel={`Batch ID*`} type={'batchId'} rules={{ ...registerStudent("batchId", { required: true }) }} placeholder={`Batch Id*`} defaultValue={filterData.batchId} />
                        <SelectInput lebel={`Gender`} handler={inputHandeler} defaultValue={filterData.gender} classNames={`border`} status={StudentError} options={[
                            { name: 'Female', value: 'female' },
                            { name: 'Male', value: 'male' },
                        ]} rules={{ ...registerStudent("gender", { required: true }) }} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Date of Birth*`} type={`date`} rules={{ ...registerStudent("dob", { required: true }) }} placeholder={`Date of Birth*`} defaultValue={filterData.dob} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Department`} type={`date`} rules={{ ...registerStudent("department", { required: true }) }} placeholder={`Department`} defaultValue={filterData.registration_date} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Blood Group`} type={`date`} rules={{ ...registerStudent("registration_date", { required: true }) }} placeholder={`Blood Group   `} defaultValue={filterData.registration_date} />
                        {
                            text && <div className="relative mb-3">
                                <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Password`} type={inputType} rules={{ ...registerStudent("password", { required: false }) }} placeholder={`Password`} defaultValue={filterData?.password} />
                                {
                                    inputType === 'password' ? <FaEyeSlash onClick={() => setInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500 cursor-pointer" /> : <FaEye onClick={() => setInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                                }
                            </div>
                        }


                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Blood Group*`} type={`text`} rules={{ ...registerStudent("blood_group", { required: true }) }} placeholder={`Blood Group*`} defaultValue={filterData?.blood_group} />
                        <SelectInput defaultValue={filterData?.religion} lebel={`Religion`} handler={inputHandeler} classNames={`border`} status={StudentError} options={[
                            { name: 'Islam', value: 'islam' },
                            { name: 'Buddhism', value: 'buddhism' },
                            { name: 'Hinduism', value: 'hinduism' },
                            { name: 'Christianity', value: 'christianity' },
                            { name: 'Other', value: 'other' },
                        ]} rules={{ ...registerStudent("religion", { required: true }) }} />
                        <UpdateInput status={StudentError} handler={inputHandeler} classNames={`w-full border`} lebel={`Address*`} type={`text`} rules={{ ...registerStudent("address", { required: true }) }} placeholder={`*Required Field`} defaultValue={filterData?.address} />
                    </div>
                    <div className="px-48 mt-8">
                        <input value={'update'} className="btn-primary cursor-pointer capitalize" type="submit" />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default StudentProfile
