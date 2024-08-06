import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import usePostRequest from '../Hooks/usePostRequest'

const EditProfile = () => {
    const [requestingProfile, Profile, ProfileError,] = useGetRequest('Profile', `/profile`)
    const { mutate, isLoading, data, error } = usePostRequest('Profile', '/profile/edit');
    const [image, setImage] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (value) => {
        const data = {
            name: value?.name || Profile?.user?.name,
            phone_number: value?.phone || Profile?.user?.phone_number,
            email: value?.email || Profile?.user?.email,
            designation: value?.designation || Profile?.user?.designation,
            expertise: value?.expert || Profile?.user?.expertise,
        }
        formData.append('_method', 'PUT')
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })

    }

    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-start items-center gap-2'>
                    <Link to={-1} className='text-2xl p-2 rounded-md bg-white'>
                        <MdOutlineKeyboardArrowLeft />
                    </Link>
                    <p className='text-lg font-semibold'>Edit Profile</p>
                </div>
                {/* <Link to={`/edit-profile`} className='flex justify-center items-center w-fit gap-3 px-8 py-2 bg-blue-400 text-white rounded-md'>
                    <FaEdit />
                    Edit Profile
                </Link> */}
            </div>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-6 gap-6 mt-3 justify-start items-start'>
                    <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='col-span-1 p-4 rounded-md flex flex-col justify-center items-center gap-2 bg-white'>
                        <p>profile</p>
                        <div className='w-[140px] h-[140px] relative'>
                            <img className='w-full h-full object-cover rounded-full' src={image ? URL.createObjectURL(image) : Profile?.user?.image ? `${imageUrl}/${Profile?.user?.image}` : "https://i.ibb.co/ZNYrb8Z/icegif-1010.gif"} alt="" />
                            <label className='text-2xl absolute right-1 bottom-1 bg-white p-2 rounded-full cursor-pointer' htmlFor="profile">
                                <FaEdit />
                            </label>
                            <input onChange={(e) => {
                                setImage(e.target.files[0])
                            }} accept='image/*' className='hidden' type="file" id='profile' />
                        </div>
                        <p className='text-xl font-semibold'>{Profile?.user?.role}</p>
                    </div>
                    <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='col-span-5 p-4 rounded-md bg-white grid grid-cols-2 gap-4 items-center justify-start'>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>First Name:</p>
                            <input defaultValue={Profile?.user?.name} className='border w-full outline-none p-2 rounded-md' placeholder='First Name' {...register("name", { required: false })} />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>User Name:</p>
                            <input defaultValue={Profile?.user?.name} className='border w-full outline-none p-2 rounded-md' placeholder='User Name' {...register("username", { required: false })} />
                            {errors.username && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Phone Number:</p>
                            <input defaultValue={Profile?.user?.phone_number} className='border w-full outline-none p-2 rounded-md' placeholder='phone Number' {...register("phone", { required: false })} />
                            {errors.phone && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Email:</p>
                            <input defaultValue={Profile?.user?.email} className='border w-full outline-none p-2 rounded-md' placeholder='email' type='email'{...register("email", { required: false })} />
                            {errors.email && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Designation:</p>
                            <input defaultValue={Profile?.user?.designation} className='border w-full outline-none p-2 rounded-md' placeholder='Designation' {...register("designation", { required: false })} />
                            {errors.designation && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Expert:</p>
                            <input defaultValue={Profile?.user?.expertise} className='border w-full outline-none p-2 rounded-md' placeholder='expert' {...register("expert", { required: false })} />
                            {errors.expert && <span className='text-red-500'>This field is required</span>}
                        </div>
                        {/* <div className='w-full h-full col-span-2'>
                            <p className='text-base font-medium'>Category:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='category' {...register("category", { required: false })} />
                            {errors.category && <span className='text-red-500'>This field is required</span>}
                        </div> */}
                        <div className='text-center col-span-2'>
                            <button className='text-white bg-blue-500 rounded-md px-6 py-2 '>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
