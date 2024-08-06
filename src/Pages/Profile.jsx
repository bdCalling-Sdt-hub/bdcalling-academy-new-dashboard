import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
const Profile = () => {
    const [requestingProfile, Profile, ProfileError,] = useGetRequest('Profile', `/profile`)
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
                        <img className='w-full h-full object-cover' src={Profile?.user?.image ? `${imageUrl}/${Profile?.user?.image}` : "https://i.ibb.co/ZNYrb8Z/icegif-1010.gif"} alt="" />
                    </div>
                    <p className='text-xl font-semibold'>{Profile?.user?.role}</p>
                </div>
                <div style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }} className='col-span-5 p-4 rounded-md bg-white grid grid-cols-2 gap-4 items-center justify-start'>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Name:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.name}</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>User Name:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.name}</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Phone Number:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.phone_number || 'Not Added'}</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Email:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.email}</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Designation:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.designation || 'Not Added'}</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-base font-medium'>Expert:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.expertise || 'Not Added'}</p>
                    </div>
                    <div className='w-full h-full col-span-2'>
                        <p className='text-base font-medium'>Role:</p>
                        <p className='text-base border p-2 rounded-md'>{Profile?.user?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
