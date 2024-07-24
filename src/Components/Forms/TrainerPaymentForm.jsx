import { DatePicker, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import PageHeading from '../Shared/PageHeading';
import { imageUrl } from '../../AxiosConfig/useAxiosConfig';
const TrainerPaymentForm = ({ filterdData, setopenPaymentModal, setopenPaymentHistoryModal }) => {
    const [date, setDate] = useState('')
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        const data = {
            teacher_id:filterdData?._id,
            // course_module_id:
        }
    };

    const onChange = (field, date, dateString) => {
        setDate(dateString);
    };
    useEffect(() => {

        if (filterdData) {
            form.setFieldValue({ category: filterdData?.item?.category?.category_name })
        }
    }, [filterdData, form])
    // {
    //     _id: 20,
    //     profile: 'adminAsset/image/1645853331.png',
    //     name: 'mentor test update',
    //     designation: 'Web Development trainer',
    //     expert: 'php expert',
    //     userName: 'mentor test update',
    //     email: 'teacher123@gmail.com',
    //     password: '',
    //     category: 1,
    //     item: {
    //       id: 20,
    //       user_id: 88,
    //       course_category_id: 1,
    //       phone_number: '65465465',
    //       designation: 'Web Development trainer',
    //       expert: 'php expert',
    //       image: 'adminAsset/image/1645853331.png',
    //       payment_type: 'daily',
    //       payment_method: 'bkash',
    //       payment: 100,
    //       created_by: 'super admin',
    //       status: 'active',
    //       created_at: '2024-07-18T05:07:32.000000Z',
    //       updated_at: '2024-07-18T06:32:57.000000Z',
    //       user: {
    //         id: 88,
    //         name: 'mentor test update',
    //         email: 'teacher123@gmail.com',
    //         email_verified_at: '2024-07-18T05:07:32.000000Z',
    //         role: 'MENTOR',
    //         otp: '0',
    //         image: null,
    //         user_status: '0',
    //         designation: null,
    //         expertise: null,
    //         phone_number: null,
    //         created_at: '2024-07-18T05:07:32.000000Z',
    //         updated_at: '2024-07-18T06:31:38.000000Z'
    //       },
    //       category: {
    //         id: 1,
    //         category_name: 'Web Development',
    //         created_at: '2024-06-10T06:36:11.000000Z',
    //         updated_at: '2024-06-10T06:36:11.000000Z'
    //       }
    //     },
    //     phone_number: '65465465'
    //   }
    return (
        <>
            <PageHeading text={`Trainers Payment`} />
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
            >
                <div className='between-center mb-6'>
                    <div className='start-center gap-2'>
                        <div className='w-28 h-28 relative'>
                            <img className='w-fuh-full h-full object-cover rounded-full' src={filterdData?.profile ? `${imageUrl}/${filterdData?.profile}` : "https://i.ibb.co/d4RSbKx/Ellipse-980.png"} alt="" />
                        </div>
                        <div>
                            <p className='text-2xl font-semibold text-[#333333] my-[2px]'>{filterdData?.name}</p>
                            <p className='text-base font-normal text-[#2BA24C] my-[2px]'>{filterdData?.expert}</p>
                            <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.number}</p>
                            <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.email}</p>
                        </div>
                    </div>
                    <button onClick={() => {
                        setopenPaymentModal(false)
                        setopenPaymentHistoryModal(true)
                    }} type='button' className='w-36 text-center py-2 px-2 bg-[#FFC60B] font-semibold rounded-md text-[#6B6B6B] hover:scale-105 active:scale-95 transition-all'>
                        Payment History
                    </button>
                </div>
                <div className='grid grid-cols-6 gap-2 w-full'>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Catagory</span>}
                        name="category">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder={filterdData?.item?.category?.category_name} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Payment type</span>}
                        name="paymentType">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder={filterdData?.item?.payment_type} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">method</span>}
                        name="methode">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder={filterdData?.item?.payment_method} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Payment</span>}
                        name="payment">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder={filterdData?.item?.payment} />
                    </Form.Item>
                    <Form.Item
                        name={`date`}
                        rules={[{
                            required: true,
                            message: 'date is required'
                        }]}
                        label={<span className="text-base font-bold text-[var(--primary-bg)]">Date</span>}
                    >
                        <DatePicker className='w-full h-[43px] text-[var(--primary-bg)]' onChange={(date, dateString) => {
                            onChange('start', date, dateString)
                        }} />
                    </Form.Item>
                    <Form.Item
                        rules={[{
                            required: true,
                            message: 'payment amount is required'
                        }]}
                        label={<span className="text-base font-bold text-[var(--primary-bg)]">Payment</span>}
                        name="total">
                        <Input type='number' className='outline-none w-full border p-[10px] rounded-md text-[var(--primary-bg)]' placeholder="4000" />
                    </Form.Item>
                </div>
                <Form.Item >
                    <div className='flex justify-end items-end gap-4' >
                        <button type="submit" className='btn-primary max-w-44 cursor-pointer hover:bg-[var(--primary-bg)]' >Confirm Payment
                        </button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}

export default TrainerPaymentForm
