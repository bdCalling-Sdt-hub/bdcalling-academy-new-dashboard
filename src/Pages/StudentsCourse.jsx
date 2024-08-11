
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
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
    const [video, setVideo] = useState('')
    const [videoIndex, setVideoIndex] = useState({ module: 0, video: 0, length: 0 })
    const [allCourse, setAllCourse] = useState([])
    useEffect(() => {
        const formatData = () => {
            return Course?.flatMap(item =>
                item?.batch?.course?.course_module?.map(module => ({
                    module_title: module?.module_title,
                    date: module?.created_at?.split('T')[0],
                    module_id: module?.id,
                    courseName: item?.batch?.course?.course_name,
                    course_id: item?.batch?.course?.id,
                    video: module?.videos?.map(video => ({
                        video_id: video?.id,
                        video_url: video?.video_url,
                        Video_name: video?.name
                    }))
                }))
            );
        };
        const data = formatData()
        setVideoIndex({ module: 0, video: 0, length: data?.[0]?.video.length })
        setVideo(data?.[0]?.video?.[0]?.video_url)
        setAllCourse(data)
    }, [Course])
    const handleNextVideoButton = () => {
        if (videoIndex?.video === videoIndex?.length - 1) {
            setVideo(allCourse?.[videoIndex?.module + 1]?.video?.[0]?.video_url)
            setVideoIndex({ module: videoIndex?.module + 1, video: 0, length: allCourse?.[videoIndex?.module + 1]?.video.length })
        } else {
            setVideo(allCourse?.[videoIndex?.module]?.video?.[videoIndex?.video + 1]?.video_url)
            setVideoIndex({ module: videoIndex?.module, video: videoIndex?.video + 1, length: allCourse?.[videoIndex?.module]?.video.length })
        }
    }
    const handlePreviousButton = () => {
        if (videoIndex?.video === 0) {
            setVideo(allCourse?.[videoIndex?.module - 1]?.video?.[allCourse?.[videoIndex?.module - 1]?.video.length - 1]?.video_url)
            setVideoIndex({ module: videoIndex?.module - 1, video: allCourse?.[videoIndex?.module - 1]?.video.length - 1, length: allCourse?.[videoIndex?.module - 1]?.video.length })
        } else {
            setVideo(allCourse?.[videoIndex?.module]?.video?.[videoIndex?.video - 1]?.video_url)
            setVideoIndex({ module: videoIndex?.module, video: videoIndex?.video - 1, length: allCourse?.[videoIndex?.module]?.video.length })
        }
    }
    const handleUserReviewFormValue = (values) => {
        const data = {
            rating_value: rating,
            course_id: Course?.[0]?.batch?.course_id,
            // student_id: Course?.[0]?.student_id,
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
                    <iframe
                        className="w-full object-contain h-full"
                        src={video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    {/* <div className='start-center gap-2'>
                        <p><span className='text-gray-400'>Trainer:</span> Ashraful Islam</p>
                    </div> */}
                    <div className='flex justify-end items-center gap-2'>
                        <button onClick={() => handlePreviousButton()} disabled={videoIndex?.module === 0 && videoIndex?.video === 0} className={` flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500 disabled:text-black disabled:border-gray-300 disabled:bg-slate-300 disabled:cursor-not-allowed `}>
                            <FaArrowLeft />  Previous
                        </button>
                        <button onClick={() => handleNextVideoButton()} disabled={videoIndex?.module === allCourse?.length - 1 && videoIndex?.video === allCourse?.[allCourse?.length - 1]?.video?.length - 1} className={`flex justify-center items-center gap-3 w-44 rounded-md disabled:cursor-not-allowed disabled:text-black disabled:border-gray-300 disabled:bg-slate-300 border border-blue-500 py-2 text-blue-500  `}>
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
                <p className='text-lg font-medium capitalize my-4'>{allCourse?.[0]?.courseName}</p>

                {
                    allCourse?.map((item, index) => {
                        return <div key={index}>
                            <div className='between-center mb-2 mt-5'>
                                <p className='text-lg uppercase'>{item?.module_title}</p>
                                <p className='text-sm'>{item?.date}</p>
                            </div>
                            {
                                item?.video?.map((video, i) => {//${currentIndex?.id === item?.id ? "bg-blue-500 text-white" : ""}
                                    return <div onClick={() => {
                                        setVideoIndex({ module: index, video: i, length: item?.video?.length })
                                        setVideo(video?.video_url)
                                    }} className={`between-center cursor-pointer card-shadow rounded-md px-3 py-1 my-2 hover:bg-blue-500 hover:text-white transition-all`} key={i}>
                                        <div className='start-center gap-2 '>
                                            <button className={` text-blue-500 text-lg p-2 rounded-full bg-blue-100`}>
                                                <FaPlay />
                                            </button>
                                            <p>{video?.Video_name}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default StudentsCourse





