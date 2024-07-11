import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { RiEditBoxLine } from 'react-icons/ri'
import { IoVideocamOutline } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import { Modal } from 'antd'

const CourseDetails = () => {
    const [query, setQuery] = useState(new URLSearchParams(window.location.search));
    const { id } = useParams()
    const [openVideo, setOpenVideo] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const [playingVideo, setPlayingVideo] = useState('')
    const [requestingCourse, Course, CourseError, refetch] = useGetRequest('module', `/show-module?course_id=${id}`)

    // {
    //     id: 3,
    //     course_id: 19,
    //     module_title: 'sdfsdf',
    //     created_by: null,
    //     module_no: '1',
    //     created_at: '2024-07-10T10:37:10.000000Z',
    //     updated_at: '2024-07-10T10:37:10.000000Z'
    //   }
    // "videos": [
    //     {
    //         "id": 11,
    //         "course_module_id": 7,
    //         "name": "Ian Christian",
    //         "video_url": "https://www.tywuw.us",
    //         "order": "1",
    //         "created_at": "2024-07-10T11:16:11.000000Z",
    //         "updated_at": "2024-07-10T11:16:11.000000Z"
    //     },
    // console.log(Course?.data?.data[0]?.course_module[0])
    return (
        <>
            <PageHeading text={`Add Module`} />
            <div className='start-start gap-4'>
                <div className='w-[600px]'>
                    <img className='w-full object-contain' src={`${imageUrl}/${Course?.data?.data[0]?.thumbnail}`} alt="" />
                </div>
                <div className='w-full'>
                    {
                        Course?.data?.data[0]?.course_module.map((item, index) => <div key={index} className="collapse">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title font-medium p-1">
                                <div className='border rounded-none py-4 between-center'>
                                    <h3 className='start-center gap-2 text-[#6B6B6B] text-base '><MdKeyboardArrowRight className='text-2xl' /> {item?.module_no}. {item?.module_title}</h3>
                                    <Link to={`/update-video/${item?.id}?course=${query.get('course')}&type=${query.get('type')}&redirect=course-details/${id}`} className="text-white bg-[var(--primary-bg)] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 mr-2">
                                        <RiEditBoxLine />
                                    </Link>
                                </div>
                            </div>
                            <div className="collapse-content">
                                {
                                    item?.videos?.map((video, i) => <button onClick={() => {
                                        setOpenVideo(true)
                                        setVideoUrl(video?.video_url)
                                        setPlayingVideo(video?.name)
                                    }} key={i + item?.id} className='between-center gap-2 text-[var(--primary-bg)] p-2 z-50'>
                                        <span className='start-center gap-2'>
                                            <IoVideocamOutline className='text-xl' /> <p className='text-sm'>{video?.name}</p>
                                        </span> <p className={`mr-8 underline ${index <= 0 ? 'text-[#2BA24C]' : 'text-red-500'} text-sm whitespace-nowrap`}>{index <= 0 ? 'Free Class' : 'paid'}</p>
                                    </button>)
                                }
                            </div>
                        </div>)
                    }
                    <div className="collapse">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-medium p-1">
                            <div className='border rounded-none py-4 between-center'>
                                <h3 className='start-center gap-2 text-[#6B6B6B] text-base '><MdKeyboardArrowRight className='text-2xl' /></h3>
                                <Link to={`/add-video/${id}?course=${query.get('course')}&type=${query.get('type')}&redirect=course-details/${id}`} className="text-white bg-[green] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 mr-2">
                                    <FaPlus />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                centered
                footer={false}
                open={openVideo}
                onCancel={() => setOpenVideo(false)}
                width={700}
            >
                <div className='w-full h-full'>
                    <p className='text-xl font-semibold mb-2'>{playingVideo}</p>
                    <iframe className='w-full h-[400px]' src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </Modal>
        </>
    )
}

export default CourseDetails
