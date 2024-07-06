import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const [image, setImage] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)

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
                            <img className='w-full h-full object-cover rounded-full' src={image ? URL.createObjectURL(image) : "https://i.ibb.co/ZNYrb8Z/icegif-1010.gif"} alt="" />
                            <label className='text-2xl absolute right-1 bottom-1 bg-white p-2 rounded-full cursor-pointer' htmlFor="profile">
                                <FaEdit />
                            </label>
                            <input onChange={(e) => {
                                setImage(e.target.files[0])
                            }} accept='image/*' className='hidden' type="file" id='profile' />
                        </div>
                        <p className='text-xl font-semibold'>Super Admin</p>
                    </div>
                    <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='col-span-5 p-4 rounded-md bg-white grid grid-cols-2 gap-4 items-center justify-start'>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>First Name:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='First Name' {...register("name", { required: true })} />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>User Name:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='User Name' {...register("username", { required: true })} />
                            {errors.username && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Phone Number:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='phone Number' {...register("phone", { required: true })} />
                            {errors.phone && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Email:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='email' type='email'{...register("email", { required: true })} />
                            {errors.email && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Designation:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='Designation' {...register("designation", { required: true })} />
                            {errors.designation && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full'>
                            <p className='text-base font-medium'>Expert:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='expert' {...register("expert", { required: true })} />
                            {errors.expert && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className='w-full h-full col-span-2'>
                            <p className='text-base font-medium'>Category:</p>
                            <input className='border w-full outline-none p-2 rounded-md' placeholder='category' {...register("category", { required: true })} />
                            {errors.category && <span className='text-red-500'>This field is required</span>}
                        </div>
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
