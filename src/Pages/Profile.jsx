import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-start items-center gap-2'>
                    <Link to={-1} className='text-2xl p-2 rounded-md bg-white'>
                        <MdOutlineKeyboardArrowLeft />
                    </Link>
                    <p className='text-lg font-semibold'>Personal Information</p>
                </div>
                <Link to={`/edit-profile`} className='flex justify-center items-center w-fit gap-3 px-8 py-2 bg-blue-400 text-white rounded-md'>
                    <FaEdit />
                    Edit Profile
                </Link>
            </div>
            <div className='grid grid-cols-6 gap-6 mt-3 justify-start items-start'>
                <div style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }} className='col-span-1 p-4 rounded-md flex flex-col justify-center items-center gap-2 bg-white'>
                    <p>profile</p>
                    <div className='w-[140px] h-[140px] rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src="https://i.ibb.co/ZNYrb8Z/icegif-1010.gif" alt="" />
                    </div>
                    <p className='text-xl font-semibold'>Super Admin</p>
                </div>
                <div style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }} className='col-span-5 p-4 rounded-md bg-white grid grid-cols-2 gap-4 items-center justify-start'>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>First Name:</p>
                        <p  className='text-base border p-2 rounded-md'>First Name</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>User Name:</p>
                        <p  className='text-base border p-2 rounded-md'>user Name</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Phone Number:</p>
                        <p  className='text-base border p-2 rounded-md'>Phone Number</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Email:</p>
                        <p  className='text-base border p-2 rounded-md'>Phone Number</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Designation:</p>
                        <p  className='text-base border p-2 rounded-md'>designation</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Expert:</p>
                        <p  className='text-base border p-2 rounded-md'>export</p>
                    </div>
                    <div className='w-full h-full col-span-2'>
                        <p className='text-base font-medium'>Category:</p>
                        <p  className='text-base border p-2 rounded-md'>category</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
