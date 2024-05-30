import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { RiEditBoxLine } from 'react-icons/ri'
import { IoVideocamOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const CourseDetails = () => {
    return (
        <>
            <PageHeading text={`Add Module`} />
            <div className='start-start gap-4'>
                <img className='w-[600px]' src="https://i.ibb.co/R7b9Mc5/Rectangle-6469.png" alt="" />
                <div className='w-full'>
                    {
                        [...Array(6).keys()].map(item => <div key={item} className="collapse">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title font-medium ">
                                <div className='border rounded-none py-4 between-center'>
                                    <h3 className='start-center gap-2 text-[#6B6B6B] text-base '><MdKeyboardArrowRight className='text-2xl' /> 0. Introductioon</h3>
                                    <Link to={`/add-video/${item}`} className="text-white bg-[var(--primary-bg)] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 mr-2">
                                        <RiEditBoxLine />
                                    </Link>
                                </div>
                            </div>
                            <div className="collapse-content">
                                <button className='between-center gap-2 text-[var(--primary-bg)] p-2 z-50'>
                                    <span className='start-center gap-2'>
                                        <IoVideocamOutline className='text-xl' /> <p className='text-sm'>Introduction to Dart & Dart Cheatsheet</p>
                                    </span> <p className=' mr-8 underline text-[#2BA24C] text-sm whitespace-nowrap'>Free Class</p>
                                </button>
                                <button className='between-center gap-2 text-[var(--primary-bg)] p-2 z-50'>
                                    <span className='start-center gap-2'>
                                        <IoVideocamOutline className='text-xl' /> <p className='text-sm'>Introduction to Dart & Dart Cheatsheet</p>
                                    </span> <p className=' mr-8 underline text-[#FA1131] text-sm whitespace-nowrap'>Lock Class</p>
                                </button>
                                <button className='between-center gap-2 text-[var(--primary-bg)] p-2 z-50'>
                                    <span className='start-center gap-2'>
                                        <IoVideocamOutline className='text-xl' /> <p className='text-sm'>Introduction to Dart & Dart Cheatsheet</p>
                                    </span> <p className=' mr-8 underline text-[#FA1131] text-sm whitespace-nowrap'>Lock Class</p>
                                </button>
                                <button className='between-center gap-2 text-[var(--primary-bg)] p-2 z-50'>
                                    <span className='start-center gap-2'>
                                        <IoVideocamOutline className='text-xl' /> <p className='text-sm'>Introduction to Dart & Dart Cheatsheet</p> <span className='text-sm text-[#ADADAD]'>(Afran Kazi Rana)</span>
                                    </span> <p className=' mr-8 underline text-[#FA1131] text-sm whitespace-nowrap'>Lock Class</p>
                                </button>
                            </div>
                        </div>)
                    }
                    <div className="collapse">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-medium ">
                            <div className='border rounded-none py-4 between-center'>
                                <h3 className='start-center gap-2 text-[#6B6B6B] text-base '><MdKeyboardArrowRight className='text-2xl' /></h3>
                                <Link to={`/add-video/1`} className="text-white bg-[green] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 mr-2">
                                    <FaPlus />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetails
