import React, { useEffect, useRef, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useForm } from 'react-hook-form';
import Input from '../Components/Input/Input';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePostRequest from '../Hooks/usePostRequest';
import VideoCourseExamQuestion from './VideoCourseExamQuestion';
import toast from 'react-hot-toast';
function generateRandomNumber() {
    const randomNumber = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
    return randomNumber;
}

const Addvideo = () => {
    const { id } = useParams()
    const [query, setQuery] = useState(new URLSearchParams(window.location.search));
    const { mutate: addModule, isLoading: moduleLoading, data: moduleData, error: moduleError } = usePostRequest('module', '/add-module');
    const [formFor, setFormFor] = useState('video')
    // const totalexam = [
    //     { id: '34562', },
    // ]
    const totalVideo = [
        { id: '34562', },
    ]
    const navigate = useNavigate()
    const [totalVideos, settotalVideos] = useState(totalVideo)
    // const [totalExams, settotalExams] = useState(totalexam)
    const [deleteID, setDeleteID] = useState([])
    const [ExamName, setExamName] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const videoNames = []
        const videoLinks = []
        Object.keys(data).map(key => {
            if (key.includes('videoName') && !deleteID.includes(key.split('-')[1])) {
                videoNames.push({ [key]: data[key] })
            }
        })
        Object.keys(data).map(key => {
            if (key.includes('videoLink') && !deleteID.includes(key.split('-')[1])) {
                videoLinks.push({ [key]: data[key] })
            }
        })
        const videos = []
        videoNames.map((name) => {
            Object.keys(name).map(nameKey => {
                videoLinks.map((links) => {
                    Object.keys(links).map(linkKey => {
                        if (nameKey.includes(linkKey.split('-')[1])) {
                            videos.push({ name: name[nameKey], video: links[linkKey] })
                        }
                    })
                })
            })
        })
        const module_class = videos.filter(item => (item.name !== '' && item.video !== ''))
        const moduleData = {
            course_id: id,
            module_class: JSON.stringify(module_class),
            module_title: data?.moduleName
        }
        const formData = new FormData()
        Object.keys(moduleData).map(key => {
            formData.append(key, moduleData[key])
        })
        addModule(formData)
    };
    useEffect(() => {
        if (moduleLoading) {
            return
        }
        if (moduleData && !moduleError) {
            return navigate(`/${query.get('redirect')}?type=${query.get('type')}&course=${query.get('course')}`)
        }
    }, [moduleLoading, moduleError, moduleData])
    const inputHandeler = (e, name) => {
        setExamName(e.target.value)
    }
    return (
        <>
            {
                formFor === 'video' ?
                    <>
                        <PageHeading text={`Provide Class video `} />
                        <div className='start-center gap-2 text-[var(--primary-bg)]'>
                            <p className='text-[#333333] font-medium '>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Students Provide Class video </p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-6 bg-white rounded-md my-3'>
                            <div className='grid-2'>
                                <Input status={errors} lebel={`Course Name`} classNames={`border pointer-events-none`} defaultValue={query.get('course')} placeholder={`Certified graphics designer`} rules={{ ...register("courseName", { required: true }) }} />
                                <Input status={errors} lebel={`Module Name`} classNames={`border`} placeholder={`introduction & design theory`} rules={{ ...register("moduleName", { required: true }) }} />
                                {
                                    totalVideos.map(item => <div className='col-span-2 grid-2' key={item?.id}>
                                        <Input status={errors} lebel={`Enter  Video name`} classNames={`border`} placeholder={`Introduction to Dart & Dart Cheatsheet`} rules={{ ...register(`videoName-${item?.id}`, { required: true }) }} />
                                        <div className='flex justify-end items-end gap-2'>
                                            <Input status={errors} lebel={`Enter video link`} classNames={`border`} type={`url`} placeholder={`N/A`} rules={{ ...register(`videoLink-${item?.id}`, { required: true }) }} />
                                            <button onClick={() => {
                                                const newNumbers = totalVideos.filter((filterItem) => filterItem?.id !== item?.id)
                                                settotalVideos(newNumbers)
                                                setDeleteID([...deleteID, item?.id])
                                            }} className="border border-[red] text-[red] text-xl p-[10px] px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                                                <RiDeleteBin5Line />
                                            </button>
                                        </div>

                                    </div>)
                                }
                                {/* {
                                    query.get('type') === '/video-course' && totalExams.map(item => <div className='col-span-2 grid-2' key={item?.id}>
                                        <Input status={errors} lebel={`Enter Exam Name`} classNames={`border`} placeholder={`Introduction to Dart & Dart Cheatsheet`} rules={{ ...register(`examName-${item?.id}`, { required: true }) }} />
                                        <div className='flex justify-end items-end gap-2'>
                                            <button onClick={()=>setFormFor('mcq')} type='button' className='w-full text-center bg-[var(--primary-bg)] py-2 rounded-md text-white mt-8 block' >
                                                MCQ Exam
                                            </button>
                                            <button onClick={() => {
                                                const newExams = totalExams.filter((filterItem) => filterItem?.id !== item?.id)
                                                settotalExams(newExams)
                                            }} className="border border-[red] text-[red] text-xl p-[10px] px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                                                <RiDeleteBin5Line />
                                            </button>
                                        </div>

                                    </div>)
                                } */}
                                {
                                    query.get('type') === '/video-course' && <div className='col-span-2 grid-2'>
                                        <Input handler={inputHandeler} status={errors} lebel={`Enter Exam Name`} classNames={`border`} placeholder={`Introduction to Dart & Dart Cheatsheet`} rules={{ ...register(`examName`, { required: true }) }} />
                                        <div className='flex justify-end items-end gap-2'>
                                            <button onClick={() => {
                                                if (!ExamName) {
                                                    return toast.error('please insert exam Name first')
                                                } else {
                                                    setFormFor('mcq')
                                                }
                                            }} type='button' className='w-full text-center bg-[var(--primary-bg)] py-2 rounded-md text-white mt-8 block' >
                                                MCQ Exam
                                            </button>
                                        </div>

                                    </div>
                                }

                            </div>
                            <div className='flex justify-end items-center gap-3'>
                                {/* {
                                    query.get('type') === '/video-course' && <button onClick={() => {
                                        settotalExams([...totalExams, { id: generateRandomNumber() }])
                                    }} className='text-[var(--primary-bg)] py-2 px-12 rounded-md bg-transparent border border-[var(--primary-bg)] mt-7 ' type='button'>Add Exam Field</button>
                                } */}

                                <button onClick={() => {
                                    settotalVideos([...totalVideos, { id: generateRandomNumber() }])
                                }} className='bg-[var(--primary-bg)] py-2 px-12 rounded-md text-white mt-7 ' type='button'>Add Another Field</button>
                            </div>
                            <div className='center-center mt-8 gap-4'>
                                <Link to={-1} type='button' className='border border-red-500 py-2 px-20 rounded-md text-[#FA1131] font-medium bg-[#F7D4D8] hover:scale-105 active:scale-95 transition-all'>
                                    Cancel
                                </Link>
                                <button className='border border-[#2492EB] py-2 px-20 rounded-md text-white font-medium bg-[#2492EB] hover:scale-105 active:scale-95 transition-all'>
                                    Sbumit
                                </button>
                            </div>
                        </form>
                    </> : <VideoCourseExamQuestion ExamName={ExamName} setFormFor={setFormFor} />
            }
        </>
    )
}

export default Addvideo
