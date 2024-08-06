import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdArrowForwardIos } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const AdmittedStudentDetails = () => {
    const data = [
        {
            'Full Name': 'siyam',
            'Mobile': '+2148619056484',
            'Email': 'shaharulsiyam@gmail.com',
            'Batch ID': 'B32982',
            'Gender': 'male',
            'Date of Birth': '02/26/2002',
            'Department': 'Frontend ',
            'Blood Group': 'o+',
            'Address': 'Dhaka',
            'Religion': 'islam'
        }
    ];
    return (
        <>
            <div className='w-full  start-center gap-3'>
                <PageHeading text={`All Batch`} /> <MdArrowForwardIos className='text-2xl' />  <PageHeading text={`All Students`} /> <MdArrowForwardIos className='text-2xl text-[var(--primary-bg)]' /> <p className='text-lg text-[var(--primary-bg)]'>Students Information</p>
            </div>
            <div className='start-start gap-4'>
                <div className='flex justify-center items-center flex-col gap-3 w-[300px] card-shadow bg-white p-10 py-5 rounded-md'>
                    <img className='w-full' src="https://i.ibb.co/d4RSbKx/Ellipse-980.png" alt="" />
                    <p className='text-[#666666] font-semibold text-[22px]'>Students</p>
                </div>
                <div className='card-shadow bg-white p-4 rounded-md w-full'>
                    {data.map((item, index) => (
                        <div className='grid-2 w-full my-1' key={index} style={{ marginBottom: '10px' }}>
                            {Object.keys(item).map((key) => (
                                <div key={key}>
                                    <p className='pb-1'>{key}</p>
                                    <p className='p-2 bg-[#F6F6F6] rounded-md'>{item[key]}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default AdmittedStudentDetails
