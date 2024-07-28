import { DatePicker, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import PageHeading from '../Shared/PageHeading';
import { imageUrl } from '../../AxiosConfig/useAxiosConfig';
import usePostRequest from '../../Hooks/usePostRequest';
const TrainerPaymentForm = ({ filterdData, setopenPaymentModal, setopenPaymentHistoryModal }) => {
    const { mutate, isLoading, data, error } = usePostRequest('TeacherPayments', '/teacher-payments');
    const [date, setDate] = useState('')
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        const data = {
            teacher_id: filterdData?._id,
            amount: values?.total,
            payment_date: date,
            payment_type: filterdData?.item?.payment_method,
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        mutate(formData)
    };

    const onChange = (field, date, dateString) => {
        setDate(dateString);
    };
    useEffect(() => {

        if (filterdData) {
            form.setFieldValue({ category: filterdData?.item?.category?.category_name })
        }
    }, [filterdData, form])

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
