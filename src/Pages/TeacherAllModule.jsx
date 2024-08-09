import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'

const TeacherAllModule = () => {
    const { useData, loading, isError } = useUserData();
    // console.log(useData.id)
    const [requestingAllModule, AllModule, AllModuleError,] = useGetRequest('AllModules', `/show-module`)//?teacher_id=${useData?.id}
    const data = []
    AllModule?.data?.data?.map((course, index) => {
        course?.course_module?.map((item, i) => {
            data.push({
                moduleName: item?.module_title,
                moduleNo: item?.module_no,
                course_id: item?.course_id,
                date: item?.created_at?.split('T')[0],
                image: course?.thumbnail
            })
        })
    })
    return (
        <div className='my-6'>
            <div className='flex  justify-between items-center gap-2'>
                <p className='text-2xl font-semibold'>All Module </p>
                <Link to={`/teacher/add-module`} className='flex justify-center items-center gap-2 px-6 py-2 text-white bg-blue-400 rounded-md'>
                    <FaPlus /> Add module
                </Link>
            </div>
            <div className='grid-4 mt-5'>
                {
                    data.map((item, i) => {
                        return <div key={i} className='card-shadow p-3 rounded-md box-border'>
                            {/* <div className='my-3 flex justify-between items-center gap-4'>
                                <div className='flex justify-start items-center gap-2 card-shadow p-2 rounded-md'>
                                    <IoMdTime className='text-blue-500 text-2xl' />
                                    <div className=''>
                                        <p className='text-base'>Start Time</p>
                                        <p className='text-base font-semibold'>12:00 AM</p>
                                    </div>
                                </div>
                                <div className='flex justify-start items-center gap-2 card-shadow p-2 rounded-md'>
                                    <IoMdTime className='text-blue-500 text-2xl' />
                                    <div className=''>
                                        <p className='text-base'>Start Time</p>
                                        <p className='text-base font-semibold'>12:00 AM</p>
                                    </div>
                                </div>
                            </div> */}
                            <img className='w-full h-[300px] object-cover mb-2' src={`${imageUrl}/${item?.image}`} alt="" />
                            <p className='text-sm'>class module {item?.moduleNo}</p>
                            <p className='text-sm font-medium'>Date: {item?.date}</p>
                            <p className='text-lg font-semibold my-1'>{item?.moduleName}</p>
                            {/* <p className='mt-2'>This module gives you an introduction to Development.</p> */}
                            <Link to={`/teacher/update-module/${item?.course_id}`} >
                                <button className='w-full py-2 bg-blue-400 font-semibold text-white mt-4 rounded-md'>
                                    Edit Module
                                </button>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TeacherAllModule
