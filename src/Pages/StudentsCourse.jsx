import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { CgFileDocument } from 'react-icons/cg'
import useGetRequest from '../Hooks/useGetRequest'
import { useParams } from 'react-router-dom'
const StudentsCourse = () => {
    const { id } = useParams()
    const [rating, setRating] = useState(5)
    const [requestingModule, Module, ModuleError,] = useGetRequest('all-module', `/course-modul-video/${id}`)
    return (
        <div className='grid grid-cols-6 gap-4 justify-start items-start mt-4'>
            <div className='col-span-4'>
                <div className='card-shadow h-[500px] card-shadow rounded-md overflow-hidden mb-3'>
                </div>
                <div className='between-center gap-2'>
                    <div className='start-center gap-2'>
                        <img className='w-10 h-10 rounded-full' src={ProfileImage} alt="" />
                        <p><span className='text-gray-400'>Trainer:</span> Ashraful Islam</p>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                        <button className='flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500 '>
                            <FaArrowLeft />  Previous
                        </button>
                        <button className='flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500 '>
                            Next <FaArrowRight />
                        </button>
                    </div>
                </div>
                <div className=" w-full my-6 bg-white card-shadow rounded-md p-2">
                    <button className="capitalize py-2 px-6 bg-blue-500 rounded-md text-white">
                        Course Review
                    </button>
                </div>
                <p className="text-2xl font-medium my-6 uppercase">WRITE YOUR OWN REVIEW</p>
                <p>Course Rating:</p>
                <div className='start-center text-2xl  gap-1 my-1'>
                    {
                        [...Array(5).keys()].map(item => {
                            return <FaStar onClick={() => {
                                setRating(item + 1)
                            }} key={item} className={`${item < rating ? "text-yellow-500" : "text-gray-400"} cursor-pointer`} />
                        })
                    }
                </div>
                <Form
                    layout='vertical'
                    onFinish={(values) => {
                    }}
                >
                    <Form.Item
                        name={`feedback`}
                        label={<span className='text-base'>Review Message</span>}
                    >
                        <TextArea style={{
                            height: '150px',
                            resize: 'none'
                        }} className='resize-none' />
                    </Form.Item>
                    <button className='px-8 py-2 bg-blue-500 text-white rounded-md mb-5'>
                        SUBMIT REVIEW
                    </button>
                </Form>
            </div>
            <div className='col-span-2 card-shadow p-2 h-screen overflow-y-scroll'>
                <button className='px-8 py-2 border border-blue-500 rounded-md text-blue-500'>
                    back
                </button>
                <p className='text-lg font-medium capitalize my-4'>Key to a great Ul Dribbble shot</p>
                <div>
                    <div className='between-center'>
                        <p className='text-lg'>Ice Breaking Session</p>
                        <p className='text-base'>02:30 Hours</p>
                    </div>
                    {
                        [...Array(8).keys()].map((item, i) => {
                            return <div className='between-center cursor-pointer card-shadow rounded-md px-3 py-1 my-2' key={i}>
                                <div className='start-center gap-2'>
                                    <button className='text-blue-500 text-lg p-2 rounded-full bg-blue-100'>
                                        <FaPlay />
                                    </button>
                                    <p>Mentor Introducing</p>
                                </div>
                                <p>1:00</p>
                            </div>
                        })
                    }
                    <div className='between-center cursor-pointer card-shadow rounded-md px-3 py-1 my-2' >
                        <div className='start-center gap-2'>
                            <button className='text-blue-500 text-lg p-2 rounded-full bg-blue-100'>
                                <CgFileDocument />
                            </button>
                            <p>Mentor Introducing</p>
                        </div>
                        <p className='text-green-600'>6/10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsCourse
