import { DatePicker, Form, Input } from 'antd';
import { useEffect } from 'react';
import PageHeading from '../Shared/PageHeading';
import { FaEdit } from 'react-icons/fa';

const TrainerPaymentForm = ({ image, setImage, filterdData, }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
    };
    useEffect(() => {
        if (filterdData) {
            form.setFieldValue(filterdData)
        }
    }, [filterdData, form])
    return (
        <>
            <PageHeading text={`Trainers Payment`} />
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='between-center mb-6'>
                    <div className='start-center gap-2'>
                        <div className='w-28 h-28 relative'>
                            <img className='w-fuh-full h-full object-cover rounded-full' src={image && URL.createObjectURL(image) || "https://i.ibb.co/d4RSbKx/Ellipse-980.png"} alt="" />
                            <label htmlFor='image' className='bg-[var(--primary-bg)] text-white p-2 rounded-full text-xl absolute right-0 bottom-0 cursor-pointer'><FaEdit /></label>
                            <input onChange={handleChange} type="file" id='image' style={{
                                display: 'none'
                            }} />
                        </div>
                        <div>
                            <p className='text-2xl font-semibold text-[#333333] my-[2px]'>{filterdData?.name}</p>
                            <p className='text-base font-normal text-[#2BA24C] my-[2px]'>{filterdData?.expert}</p>
                            <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.number}</p>
                            <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.email}</p>
                        </div>
                    </div>
                    <button type='button' className='w-36 text-center py-2 px-2 bg-[#FFC60B] font-semibold rounded-md text-[#6B6B6B] hover:scale-105 active:scale-95 transition-all'>
                        Payment History
                    </button>
                </div>
                <div className='grid grid-cols-6 gap-2 w-full'>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Catagory</span>}
                        name="name">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder="part time" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Payment type</span>}
                        name="paymentType">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder="per class" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">method</span>}
                        name="methode">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder="bkash" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[#333333]">Payment</span>}
                        name="payment">
                        <Input disabled className='outline-none w-full border p-[10px] rounded-md' placeholder="2000" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[var(--primary-bg)]">Date</span>}
                    >
                        <DatePicker className='w-full h-[43px] text-[var(--primary-bg)]' onChange={(date, dateString) => {
                            onChange('start', date, dateString)
                        }} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-base font-bold text-[var(--primary-bg)]">Payment</span>}
                        name="total">
                        <Input type='number' className='outline-none w-full border p-[10px] rounded-md text-[var(--primary-bg)]' placeholder="4000" />
                    </Form.Item>
                </div>
                <Form.Item >
                    <div className='flex justify-end items-end gap-4' >
                        <button type="submit" className='btn-primary max-w-44 cursor-pointer hover:bg-[var(--primary-bg)]' >Confirm Payment</button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}

export default TrainerPaymentForm
