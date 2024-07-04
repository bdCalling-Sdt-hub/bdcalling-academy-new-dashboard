import { Pagination } from 'antd'
import React, { useState } from 'react'
import { FaEye, FaPlay, FaPlus } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SuccessStories = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        setCurrent(page);
    };
    const onShowSizeChange = (current, size) => {
        setCurrent(1)
        console.log(current, size)
    }
    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <p className='text-2xl text-[#333333] font-semibold'>Successful Students</p>
                    <div className='flex justify-start items-center gap-2 mt-2'>
                        <p>Home</p> <MdKeyboardArrowRight className='text-blue-400' /> <p className='text-blue-400'>Success Stories</p>
                    </div>
                </div>
                <Link to={`/upload-success-stories`} className='w-fit flex justify-end items-center bg-blue-400 text-white gap-2 px-6 py-2 rounded-md'>
                    <FaPlus /> Add Stories
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4'>
                {
                    [...Array(7).keys()].map((item) => <div className='w-full p-3 h-[400px] bg-white relative rounded-md overflow-hidden'>
                        <div className='w-full h-full absolute left-0 top-0'>
                            <img src="https://i.ibb.co/M51Zmpf/Rectangle-87-1.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <button className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl bg-red-500 text-white animate-pulse p-3 rounded-full'>
                            <FaPlay />
                        </button>
                        <div className='flex justify-between items-center gap-2 absolute w-full h-auto bottom-0 left-0 p-2 py-6 pb-5 bg-black bg-opacity-60'>
                            <button className='bg-white text-blue-400 p-3 py-2 rounded-md'>Delete Students Journey</button>
                            <button className='bg-blue-400 text-white p-3 py-2 rounded-md'>Delete Students Journey</button>
                            <button className=' bg-white text-black p-3 rounded-md'><FaEye /></button>
                        </div>
                    </div>)
                }
            </div>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={onChange} onShowSizeChange={onShowSizeChange} total={500} />
            </div>
        </div>
    )
}

export default SuccessStories
