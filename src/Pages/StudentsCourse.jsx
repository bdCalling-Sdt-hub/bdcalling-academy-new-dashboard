import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { CgFileDocument } from 'react-icons/cg'
import useGetRequest from '../Hooks/useGetRequest'
import { useParams } from 'react-router-dom'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import usePostRequest from '../Hooks/usePostRequest'



const StudentsCourse = () => {
    const { id } = useParams()
    const [rating, setRating] = useState(0)
    const [form] = Form.useForm();
    const [formData, setData] = useState(null);

    const [requestingCourse, Course, CourseError, refetch] = useGetRequest('module', `/enrolled-courses?id=${id}`)
    const { mutate, isLoading, data, error } = usePostRequest('review', '/reviews');
    const { useData, loading, isError } = useUserData();
    const [currentIndex, setCurrentIndex] = useState(0);

    const videoUrl = Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.[currentIndex]?.video_url;
    const handleNextVideoButton = () => {
        if (currentIndex < Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePreviousButton = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }
    const handleUserReviewFormValue = (values) => {
        const data = {
            rating_value: rating,
            course_id: Course?.[0]?.batch?.course_id,
            student_id: Course?.[0]?.student_id,
            batch_id: Course?.[0]?.batch_id,
            message: values.message,
        };

        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        mutate(formData)
    }

    

    useEffect(() => {
        if (formData) {
            form.resetFields();
            setRating(0); 
        }
    }, [data])
    return (
        <div className='grid grid-cols-6 gap-4 justify-start items-start mt-4'>
            <div className='col-span-4'>
                <div className='card-shadow h-[500px] card-shadow rounded-md overflow-hidden mb-3'>

                    {videoUrl && (
                        <iframe
                            className="w-full object-contain h-full"
                            src={videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}


                </div>
                <div className='between-center gap-2'>
                    <div className='start-center gap-2'>
                        <p><span className='text-gray-400'>Trainer:</span> Ashraful Islam</p>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                        <button onClick={() => handlePreviousButton()} disabled={currentIndex === 0} className={` flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500  ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <FaArrowLeft />  Previous
                        </button>
                        <button onClick={() => handleNextVideoButton()} disabled={currentIndex === Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.length - 1} className={`flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500  ${currentIndex === Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                <Form
                    layout='vertical'
                    onFinish={handleUserReviewFormValue}
                >


                    <Form.Item
                        name='rating' // Add rating to form fields
                        label={<span className='text-base'>Course Rating:</span>}
                    >
                        <div className='start-center text-2xl gap-1 my-1'>
                            {
                                [...Array(5).keys()].map(item => (
                                    <FaStar
                                        onClick={() => setRating(item + 1)}
                                        key={item}
                                        className={`${item < rating ? "text-yellow-500" : "text-gray-400"} cursor-pointer`}
                                    />
                                ))
                            }
                        </div>
                        {/* Use a hidden input to pass rating value */}
                        <input type='hidden' name='rating' value={rating} />
                    </Form.Item>
                    <Form.Item
                        name={`message`}
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
                        Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.map((item, i) => {
                            return <div className={`between-center cursor-pointer card-shadow rounded-md px-3 py-1 my-2   ${currentIndex === i ? "bg-blue-500 text-white" : ""} `} onClick={() => setCurrentIndex(i)} key={i}>
                                <div className='start-center gap-2 '>
                                    <button className={` text-blue-500 text-lg p-2 rounded-full bg-blue-100`}>
                                        <FaPlay />
                                    </button>
                                    <p>{item?.name}</p>
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
                        <p className='text-green-600'>{currentIndex + 1}/{Course?.[0]?.batch?.course?.course_module?.[0]?.videos?.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsCourse
