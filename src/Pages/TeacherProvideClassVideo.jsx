import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { IoMdPlay } from 'react-icons/io'
import { Link } from 'react-router-dom'
const data = [
    {
        img: 'https://i.ibb.co/L1cVG7C/Picture.png',
        time: '02:30 Hours',
        name: 'Afran Kazi',
        title: 'Mobile Application Design',
        batch: 'Batch No: 202402',
    },
    {
        img: 'https://i.ibb.co/L1cVG7C/Picture.png',
        time: '02:30 Hours',
        name: 'Afran Kazi',
        title: 'Mobile Application Design',
        batch: 'Batch No: 202402',
    },
    {
        img: 'https://i.ibb.co/L1cVG7C/Picture.png',
        time: '02:30 Hours',
        name: 'Afran Kazi',
        title: 'Mobile Application Design',
        batch: 'Batch No: 202402',
    },
    {
        img: 'https://i.ibb.co/L1cVG7C/Picture.png',
        time: '02:30 Hours',
        name: 'Afran Kazi',
        title: 'Mobile Application Design',
        batch: 'Batch No: 202402',
    },
    {
        img: 'https://i.ibb.co/L1cVG7C/Picture.png',
        time: '02:30 Hours',
        name: 'Afran Kazi',
        title: 'Mobile Application Design',
        batch: 'Batch No: 202402',
    },
]

const TeacherProvideClassVideo = () => {
    return (
        <>
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <PageHeading text={`Provide Class video `} />
                    <div className='start-center gap-2 text-[var(--primary-bg)]'>
                        <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Students Provide Class video </p>
                    </div>
                </div>
                <Link to={`/teacher/add-provided-class-video`} className='flex justify-center items-center bg-blue-500 px-8 py-2 w-fit gap-2 rounded-md text-white'>
                    <FaPlus /> Add Video
                </Link>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 gap-4 bg-white rounded-md p-4 mt-4'>
                {
                    data.map((item, index) => <div style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='w-full h-full rounded-md overflow-hidden' key={index}>
                        <div className='w-full h-[250px]'>
                            <img src={item?.img} className='w-full h-full object-cover' alt="" />
                        </div>
                        <div className='p-4 relative'>
                            <p className='text-lg font-semibold capitalize'>{item?.name}</p>
                            <p className=' my-1 text-sm'>{item?.title}</p>
                            <div className='flex justify-between items-center gap-2'>
                                <p className='text-[#595959] text-xs opacity-85'>{item?.batch}</p>
                                <p className='text-blue-500 text-xs '>{item?.time}</p>
                            </div>
                            <button  style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }} className='text-2xl text-blue-500 bg-white p-2 rounded-full absolute right-10 -top-4'>
                                <IoMdPlay />
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default TeacherProvideClassVideo
