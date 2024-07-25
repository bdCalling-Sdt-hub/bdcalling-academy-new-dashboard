import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Modal } from 'antd'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import DuePayment from '../Components/Forms/DuePayment'

const StudentsInformation = () => {
    const { id, batch } = useParams()
    const [requestingPayment, Payment, PaymentError,] = useGetRequest('payment', `/show-student-payment?student_id=${id}&batch_id=${batch}`)
    const [AdmitValues, setAdmitValue] = useState({ _id: id, order: [{ batch_id: batch }] })
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    console.log(Payment?.data[2])
    return (
        <>
            <div className='start-center gap-2'>
                <Link to={-1} className='text-xl p-2 rounded-md bg-white'>
                    <IoIosArrowBack />
                </Link>
                <PageHeading text={`Students Information`} />
            </div>
            <img src={`${imageUrl}/${Payment?.data[0]?.student?.image}`} className='h-20 w-20 rounded-full my-2' alt="" />
            <div className='grid-2-start pb-12 gap-2'>
                <div className='w-full'>
                    <PageHeading text={`Student Personal Information`} />
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Full Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.user?.name}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Email:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.user?.email}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Students ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.id}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Category:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.batch?.course?.id}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Batch no:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.batch?.batch_id}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.batch?.course?.course_name}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Type:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.batch?.course?.course_type}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Blood Group:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.blood_group}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Phone Number:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.phone_number}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Date of Birth:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.dob}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Gender:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.gender}</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Religion:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.religion}</p>
                    </div>
                    {/* <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Admission Date:</p>
                        <p className='text-base text-[var(--primary-color)]'>03/12/2024</p>
                    </div> */}
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Address:</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.student?.address}</p>
                    </div>
                </div>
                <div className='w-full border-l-2 pl-3'>
                    <PageHeading text={`Payments Information`} />
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Course fee</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.course_fee}TK</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>After Discount</p>
                        <p className='text-base text-[var(--primary-color)]'>{Payment?.data[0]?.price}TK</p>
                    </div>
                    {
                        Payment?.data[0]?.due && <div className='grid-2 my-3'>
                            <p className='text-base font-medium text-[var(--primary-color)]'>Total Due</p>
                            <p className='text-base text-red-500'>{Payment?.data[Payment?.data.length - 1]?.due}TK</p>
                        </div>
                    }
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Paid</p>
                        <p className='text-base text-[#2BA24C]'>{Number(Payment?.data[0]?.amount) + Number(Payment?.data[1]?.amount || 0) + Number(Payment?.data[2]?.amount || 0)}Tk</p>
                    </div>
                    <hr className='w-[80%] my-5' />
                    <span className='-mt-7 block'>
                        <PageHeading text={`Instalment Update`} />
                    </span>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>1st Instalment <span className='text-[#2BA24C]'>(Complete)</span></p>
                        <p className='text-base text-[#2BA24C]'>{Payment?.data[0]?.amount}Tk <span className='text-sm ml-2'>({Payment?.data[0]?.installment_date[0]?.first_installment})</span></p>
                    </div>
                    {
                        Payment?.data.length === 1 && Payment?.data[0]?.due && <>
                            <div className='grid-2 my-3'>
                                <p className='text-base font-medium text-[var(--primary-color)]'>2nd Instalment <span className='text-[#FA1131]'>(Due)</span></p>
                                <p className='text-base text-[#FA1131]'>{Payment?.data[0]?.due / 2}Tk  <span className='text-sm ml-2'>({Payment?.data[0]?.installment_date[0]?.second_installment})</span></p>
                            </div>
                            <div className='grid-2 my-3'>
                                <p className='text-base font-medium text-[var(--primary-color)]'>3rd Instalment <span className='text-[#FA1131]'>(Due)</span></p>
                                <p className='text-base text-[#FA1131]'>{Payment?.data[0]?.due / 2}Tk  <span className='text-sm ml-2'>({Payment?.data[0]?.installment_date[2]?.second_installment})</span></p>
                            </div></>
                    }
                    {
                        Payment?.data.length === 2 && <> <div className='grid-2 my-3'>
                            <p className='text-base font-medium text-[var(--primary-color)]'>2nd Instalment <span className='text-green-500'>(Complete)</span></p>
                            <p className='text-base text-green-500'>{Payment?.data[1]?.amount}Tk  <span className='text-sm ml-2'>({Payment?.data[1]?.installment_date[0]?.first_installment})</span></p>
                        </div>
                            {
                                Payment?.data[1]?.due && <div className='grid-2 my-3'>
                                    <p className='text-base font-medium text-[var(--primary-color)]'>3rd Instalment <span className='text-[#FA1131]'>(Due)</span></p>
                                    <p className='text-base text-[#FA1131]'>{Payment?.data[1]?.due / 2}Tk  <span className='text-sm ml-2'>({Payment?.data[1]?.installment_date[2]?.third_installment})</span></p>
                                </div>
                            }

                        </>
                    }
                    {
                        Payment?.data.length === 3 && <>
                            <div className='grid-2 my-3'>
                                <p className='text-base font-medium text-[var(--primary-color)]'>2nd Instalment <span className='text-green-500'>(Complete)</span></p>
                                <p className='text-base text-green-500'>{Payment?.data[1]?.amount}Tk  <span className='text-sm ml-2'>({Payment?.data[1]?.installment_date[0]?.second_installment})</span></p>
                            </div>
                            <div className='grid-2 my-3'>
                                <p className='text-base font-medium text-[var(--primary-color)]'>3rd Instalment <span className='text-green-500'>(Complete)</span></p>
                                <p className='text-base text-green-500'>{Payment?.data[2]?.amount}Tk  <span className='text-sm ml-2'>({Payment?.data[1]?.installment_date[0]?.second_installment})</span></p>
                            </div>
                        </>

                    }
                    <hr className='w-[80%] my-5' />
                    <div className='flex justify-end items-center pr-[140px]'>
                        <button disabled={Payment?.data[Payment?.data.length - 1].status !== 'due'} onClick={() => {
                            setOpenPaymentModal(true)
                        }} className='p-2 py-1 bg-[#FFC60B] text-white font-semibold rounded disabled:bg-gray-500'>payment</button>
                    </div>
                </div>
            </div>
            <Modal
                centered
                footer={false}
                open={openPaymentModal}
                onCancel={() => setOpenPaymentModal(false)}
                width={700}
            >
                <DuePayment setOpenPaymentModal={setOpenPaymentModal} AdmitValues={AdmitValues} />
            </Modal>
        </>
    )
}

export default StudentsInformation
