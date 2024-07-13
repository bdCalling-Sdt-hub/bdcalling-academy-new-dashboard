

import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Input from '../Input/Input';
import toast from 'react-hot-toast';
import UpdateInput from '../Input/UpdateInput';

const AdmitPaymentModal = ({ setOpenPaymentModal, setOpenAdmitModal, course, AdmitValues }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: FullPaymentRegister, handleSubmit: HandleFullPaymentSubmit, formState: { errors: FullPaymentError } } = useForm();
    const [fullpaymentType, setFullPaymentType] = useState(true)
    const [totalPayment, setTotalPayment] = useState(course?.price || 0)
    const [firstInstallment, setFirstInstallment] = useState(totalPayment)
    const onSubmit = data => {
        // {
        //     discount: '',
        //     reference: '',
        //     amount: '247',
        //     date: '2024-07-24',
        //     '2ndInstallment': '0',
        //     '3ndInstallment': '0',
        //     enddate: '2024-07-26',
        //     '2nddate': '2024-07-26',
        //     '2ndDate': '2024-07-24',
        //     '3rdDate': '2024-07-31'
        //   }
    };
    const onFullPaymentSubmit = data => {
        console.log(data)
        // setFullPaymentType(false)
    };
    const inputHandler = (e, name) => {
        if (Number(course?.price) < Number(e.target.value)) {
            toast.error("discount price can't be larger then course price")
        } else {
            setTotalPayment(Number(course?.price) - Number(e.target.value))
            setFirstInstallment(Number(course?.price) - Number(e.target.value))
        }
    }
    return (
        <div>
            <div className='start-center gap-4'>
                <MdOutlineArrowBackIosNew className='cursor-pointer' onClick={() => {
                    setOpenPaymentModal(false)
                    setOpenAdmitModal(true)
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
                    <form onSubmit={HandleFullPaymentSubmit(onFullPaymentSubmit)}>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input handler={inputHandler} label={`Discount`} classNames={`border rounded`} type='number' rules={{ ...FullPaymentRegister('discount', { required: false }) }} status={FullPaymentError} placeholder={`discount`} />
                            <Input label={`Reference`} classNames={`border rounded`} rules={{ ...FullPaymentRegister('reference', { required: false }) }} status={FullPaymentError} placeholder={`CEO, Monir sir`} />
                        </div>
                        {/* <div className='grid-2 gap-2 my-4'>
                        <p className=' text-sm'>Payable Amount Date:</p>
                        <p className='text-end text-sm'>04/05/2024</p>
                    </div> */}
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course Name:</p>
                            <p className='text-end text-sm'>{course?.course_name}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course ID:</p>
                            <p className='text-end text-sm'>{course?.id}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Student ID:</p>
                            <p className='text-end text-sm'>{AdmitValues?.studentID}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course Fee:</p>
                            <p className='text-end text-sm'>{course?.price}TK</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Due Amount:</p>
                            <p className='text-end text-sm'>0</p>
                        </div>
                        <hr className='w-full my-2 block' />
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm font-semibold'>Total Payment :</p>
                            <p className='text-end text-sm font-semibold'>{totalPayment}Tk</p>
                        </div>
                        <button type='submit' className='btn-primary max-w-32 mx-auto mt-7'>
                            Confirm
                        </button>
                    </form>
                </> : <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid-2 gap-2 mb-2'>
                            <Input handler={inputHandler} lebel={`Discount`} classNames={`border rounded`} type='number' rules={{ ...register('discount', { required: false }) }} status={errors} placeholder={`discount`} />
                            <Input classNames={`border rounded`} rules={{ ...register('reference', { required: false }) }} lebel={`Reference`} status={errors} placeholder={`CEO, Monir sir`} />
                        </div>
                        <div className='border p-2 rounded'>
                            {/* <div className='grid-2 gap-2 mb-2'>
                                <div className='w-full relative'>
                                    <p className="pb-2">Installment Type</p>
                                    <select defaultValue={`3 installment`} className='w-full p-2 outline-none border rounded-md' {...register('installmentType', { required: false })}>
                                        <option value="3 installment">3 installment</option>
                                        <option value="3 installment">3 installment</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                <div className='col-span-2'>
                                    <p className='text-[var(--primary-bg)] -mt-8'>1st installment</p>
                                </div>
                                <div className='col-span-4 w-full'>
                                    <UpdateInput handler={(e, name) => {
                                        if (Number(course?.price) < Number(e.target.value)) {
                                            toast.error("discount price can't be larger then course price")
                                        } else {
                                            setFirstInstallment(Number(e.target.value))
                                        }
                                    }} defaultValue={Number(firstInstallment)} classNames={`border rounded`} rules={{ ...register('amount', { required: false }) }} lebel={`Amount`} status={errors} />
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
                                    <p className='text-[var(--primary-bg)] -mt-8'>2st installment</p>
                                </div>
                                <div className='col-span-4 w-full pointer-events-none'>
                                    <UpdateInput defaultValue={(Number(totalPayment) - Number(firstInstallment)) / 2 || `0`} classNames={`border rounded`} rules={{ ...register('2ndInstallment', { required: false }) }} lebel={`Amount`} status={errors} />
                                </div>
                                <div className='col-span-4 w-full'>
                                    <Input type={`date`} classNames={`border rounded`} rules={{ ...register('2ndDate', { required: true }) }} lebel={`date`} status={errors} />
                                </div>
                                <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                </div>
                            </div>
                            <div className='grid grid-cols-11 gap-2 items-end justify-start my-4'>
                                <div className='col-span-2'>
                                    <p className='text-[var(--primary-bg)] -mt-8'>2st installment</p>
                                </div>
                                <div className='col-span-4 w-full pointer-events-none'>
                                    <UpdateInput defaultValue={(Number(totalPayment) - Number(firstInstallment)) / 2 || `0`} classNames={`border rounded`} rules={{ ...register('3ndInstallment', { required: false }) }} lebel={`Amount`} status={errors} />
                                </div>
                                <div className='col-span-4 w-full'>
                                    <Input type={`date`} classNames={`border rounded`} rules={{ ...register('3rdDate', { required: true }) }} lebel={`date`} status={errors} />
                                </div>
                                <div className='w-10 h-10 border rounded ml-auto border-red-500'>

                                </div>
                            </div>
                        </div>

                        {/* <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Payable Amount Date:</p>
                            <p className='text-end text-sm'>04/05/2024</p>
                        </div> */}
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course Name:</p>
                            <p className='text-end text-sm'>{course?.course_name}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course ID:</p>
                            <p className='text-end text-sm'>{course?.id}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Student ID:</p>
                            <p className='text-end text-sm'>BDA202415</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Course Fee:</p>
                            <p className='text-end text-sm'>{course?.price}</p>
                        </div>
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm'>Due Amount:</p>
                            <p className='text-end text-sm text-red-600'>{Number(totalPayment) - Number(firstInstallment)}</p>
                        </div>
                        <hr className='w-full my-2 block' />
                        <div className='grid-2 gap-2 my-4'>
                            <p className=' text-sm font-semibold'>Total Payment :</p>
                            <p className='text-end text-sm font-semibold'>{firstInstallment}Tk</p>
                        </div>
                        <button type='submit' className='btn-primary max-w-32 mx-auto mt-7'>
                            Confirm
                        </button>
                    </form>
                </>
            }

        </div>
    )
}

export default AdmitPaymentModal
