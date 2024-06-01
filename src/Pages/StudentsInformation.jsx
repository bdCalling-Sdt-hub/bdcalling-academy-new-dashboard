import React, { useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Modal } from 'antd'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import Input from '../Components/Input/Input'

const StudentsInformation = () => {
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
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
                        <button onClick={()=>{
                            setOpenPaymentModal(true)
                        }} className='p-2 py-1 bg-[#FFC60B] text-white font-semibold rounded'>payment</button>
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
                <div>
                    <div className='start-center gap-4'>
                        <MdOutlineArrowBackIosNew className='cursor-pointer' onClick={() => {
                            setOpenPaymentModal(false)
                        }} /> <h4>Payment</h4>
                    </div>
                    <div className='start-center gap-2 my-2'>
                        <input onClick={() => {
                            setFullPaymentType(true)
                        }} defaultChecked={fullpaymentType} className='cursor-pointer' type="radio" value="paymentType" name="paymentOption" id="fullPayment" />
                        <label for="fullPayment">Full Payment</label>

                        <input onClick={() => {
                            setFullPaymentType(false)
                        }} defaultChecked={!fullpaymentType} className='cursor-pointer' type="radio" value="instalmentpayment" name="paymentOption" id="instalmentPayment" />
                        <label for="instalmentPayment">Instalment Payment</label>
                    </div>
                    {
                        fullpaymentType ? <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid-2 gap-2 mb-2'>
                                    <div className='w-full relative'>
                                        <p className="pb-2">Discount</p>
                                        <select defaultValue={`*Required Field`} className='w-full p-2 outline-none border rounded-md' {...register('discount', { required: false })}>
                                            <option value="tk 2000">tk 2000</option>
                                            <option value="tk 2000">tk 2000</option>
                                        </select>

                                    </div>
                                    <Input classNames={`border rounded`} rules={{ ...register('reference', { required: false }) }} lebel={`Reference`} status={errors} placeholder={`CEO, Monir sir`} />
                                </div>
                            </form>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Payable Amount Date:</p>
                                <p className='text-end text-sm'>04/05/2024</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Name:</p>
                                <p className='text-end text-sm'>UX/UI Design</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course ID:</p>
                                <p className='text-end text-sm'>202402</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Student ID:</p>
                                <p className='text-end text-sm'>BDA202415</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Fee:</p>
                                <p className='text-end text-sm'>15000Tk</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Due Amount:</p>
                                <p className='text-end text-sm'>0</p>
                            </div>
                            <hr className='w-full my-2 block' />
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm font-semibold'>Total Paymet :</p>
                                <p className='text-end text-sm font-semibold'>13000Tk</p>
                            </div>
                            <button onClick={() => {
                                setOpenPaymentModal(false)
                            }} className='btn-primary max-w-32 mx-auto mt-7'>
                                Confirm
                            </button>
                        </> : <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid-2 gap-2 mb-2'>
                                    <div className='w-full relative'>
                                        <p className="pb-2">Discount</p>
                                        <select defaultValue={`tk 2000`} className='w-full p-2 outline-none border rounded-md' {...register('discount', { required: false })}>
                                            <option value="tk 2000">tk 2000</option>
                                            <option value="tk 2000">tk 2000</option>
                                        </select>

                                    </div>
                                    <Input classNames={`border rounded`} rules={{ ...register('reference', { required: false }) }} lebel={`Reference`} status={errors} placeholder={`CEO, Monir sir`} />
                                </div>
                                <div className='border p-2 rounded'>
                                    <div className='grid-2 gap-2 mb-2'>
                                        <div className='w-full relative'>
                                            <p className="pb-2">Installment Type</p>
                                            <select defaultValue={`3 installment`} className='w-full p-2 outline-none border rounded-md' {...register('installmentType', { required: false })}>
                                                <option value="3 installment">3 installment</option>
                                                <option value="3 installment">3 installment</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`7000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded text-gray-300`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-green-500'>
                                            <img className='w-10 h-10' src='https://i.ibb.co/4Zff45B/check-mark-1-1.png' alt="" />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`3000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                        </div>
                                    </div>
                                    <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                        <div className='col-span-2'>
                                            <p className='text-[var(--primary-bg)] -mt-8'>1st instilment</p>
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} placeholder={`3000`} />
                                        </div>
                                        <div className='col-span-4 w-full'>
                                            <Input type={`date`} classNames={`border rounded`} rules={{ ...register('date', { required: false }) }} lebel={`date`} status={errors} />
                                        </div>
                                        <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Payable Amount Date:</p>
                                <p className='text-end text-sm'>04/05/2024</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Name:</p>
                                <p className='text-end text-sm'>UX/UI Design</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course ID:</p>
                                <p className='text-end text-sm'>202402</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Student ID:</p>
                                <p className='text-end text-sm'>BDA202415</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Course Fee:</p>
                                <p className='text-end text-sm'>15000Tk</p>
                            </div>
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm'>Due Amount:</p>
                                <p className='text-end text-sm text-red-600'>6000</p>
                            </div>
                            <hr className='w-full my-2 block' />
                            <div className='grid-2 gap-2 my-4'>
                                <p className=' text-sm font-semibold'>Total Paymet :</p>
                                <p className='text-end text-sm font-semibold'>13000Tk</p>
                            </div>
                            <button onClick={() => {
                                setOpenPaymentModal(false)
                            }} className='btn-primary max-w-32 mx-auto mt-7'>
                                Confirm
                            </button>
                        </>
                    }

                </div>
            </Modal>
        </>
    )
}

export default StudentsInformation
