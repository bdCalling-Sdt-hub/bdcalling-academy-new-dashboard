import React from 'react'
import PageHeading from '../Components/PageHeading'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

const StudentsInformation = () => {
    return (
        <>
            <div className='start-center gap-2'>
                <Link to={-1} className='text-xl p-2 rounded-md bg-white'>
                    <IoIosArrowBack />
                </Link>
                <PageHeading text={`Students Information`} />
            </div>
            <img src="https://i.ibb.co/NVrDY76/Ellipse-976-1.png" className='h-20 w-20 rounded-full my-2' alt="" />
            <div className='grid-2-start pb-12 gap-2'>
                <div className='w-full'>
                    <PageHeading text={`Student Personal Information`} />
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Full Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>Raju Ahmed</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Email:</p>
                        <p className='text-base text-[var(--primary-color)]'>info@bdcalling.com</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Students ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>BDA202415</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Category:</p>
                        <p className='text-base text-[var(--primary-color)]'>Graphics & Visualization</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Batch no:</p>
                        <p className='text-base text-[var(--primary-color)]'>BAC-WP2024</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>UX/UI Design</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>Off line</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Blood Group:</p>
                        <p className='text-base text-[var(--primary-color)]'>A+</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Phone Number:</p>
                        <p className='text-base text-[var(--primary-color)]'>+880 017 02154872</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Date of Birth:</p>
                        <p className='text-base text-[var(--primary-color)]'>12/12/2000</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Gender:</p>
                        <p className='text-base text-[var(--primary-color)]'>Male</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Religion:</p>
                        <p className='text-base text-[var(--primary-color)]'>Islam</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Admission Date:</p>
                        <p className='text-base text-[var(--primary-color)]'>03/12/2024</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Address:</p>
                        <p className='text-base text-[var(--primary-color)]'>Daisy Garden, House 14,Block A, Banasree, main road, Dhaka-1219</p>
                    </div>
                </div>
                <div className='w-full border-l-2 pl-3'>
                    <PageHeading text={`Payments Information`} />
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Course fee</p>
                        <p className='text-base text-[var(--primary-color)]'>15000Tk</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>After Discount</p>
                        <p className='text-base text-[var(--primary-color)]'>13000Tk</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Due</p>
                        <p className='text-base text-red-500'>6000Tk</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Paid</p>
                        <p className='text-base text-[#2BA24C]'>7000Tk</p>
                    </div>
                    <hr className='w-[80%] my-5' />
                    <span className='-mt-7 block'>
                        <PageHeading text={`Instalment Update`} />
                    </span>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>1st Instalment <span className='text-[#2BA24C]'>(Complete)</span></p>
                        <p className='text-base text-[#2BA24C]'>7000Tk <span className='text-sm ml-2'>(03/12/2024)</span></p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>2nd Instalment <span className='text-[#FA1131]'>(Due)</span></p>
                        <p className='text-base text-[#FA1131]'>3000Tk  <span className='text-sm ml-2'>(03/12/2024)</span></p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>3rd Instalment <span className='text-[#FA1131]'>(Due)</span></p>
                        <p className='text-base text-[#FA1131]'>3000Tk  <span className='text-sm ml-2'>(03/12/2024)</span></p>
                    </div>
                    <hr className='w-[80%] my-5' />
                    <div className='flex justify-end items-center pr-[140px]'>
                    <button  className='p-2 py-1 bg-[#FFC60B] text-white font-semibold rounded'>payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentsInformation
