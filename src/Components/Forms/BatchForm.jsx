import {  DatePicker, Form, Select } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const BatchForm = () => {
    const [form] = Form.useForm();
    const [Image, setImage] = useState()
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
    return (
        <div id='addBatch'>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='grid-2 w-[70%]'>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Username</span>}
                        name="CourseName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Upload Image*</span>}
                        name="image"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <label htmlFor='batchImage' className='start-center gap-2 w-full border rounded-md p-[6px]'>
                            <span className='p-[3px] px-2 bg-[#D6D6D6] text-[#6B6B6B] rounded'>Choose file</span> <span>{Image?.name || 'Upload your image'} </span>
                        </label>
                        <input style={{
                            display: 'none'
                        }} id='batchImage' onChange={handleChange} type='file' placeholder="*Required Field" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Enter Coupon Code</span>}
                        name="coupon"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <input className='outline-none w-full border p-[10px] rounded-md' placeholder="N/A" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Trainer</span>}
                        name="trainer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input trainer name!',
                            },
                        ]}>
                        <Select className='h-[43px]' defaultValue={`chooes a value`} options={[
                            { value: 'Asad', label: <span>Asad</span> },
                            { value: 'Asad1', label: <span>Asad1</span> },
                            { value: 'Asad2', label: <span>Asad2</span> },
                        ]} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Enter discount price</span>}
                        name="discountPrice"
                    >
                        <input type='number' className='outline-none w-full border p-[10px] rounded-md' placeholder="477" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Enter Start Date</span>}
                    >
                        <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                            onChange('start', date, dateString)
                        }} />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Enter max Student Length</span>}
                        name='seat'
                    >
                        <input type='number' className='outline-none w-full border p-[10px] rounded-md' placeholder="20" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Enter end Date</span>}
                    >
                        <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                            onChange('end', date, dateString)
                        }} />
                    </Form.Item>
                </div>
                <Form.Item >
                    <div className='start-center gap-4' >
                        <Link to={-1} className='text-[#FA1131] hover:text-[#FA1131] bg-[#F7D4D8] border-[#FA1131] border py-[6px] px-6 w-full max-w-44 rounded-md text-center hover:scale-105 active:scale-95 transition-all '>Cancel</Link>
                        <input type="submit" value={`Save`} className='btn-primary max-w-44 cursor-pointer' />
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
export default BatchForm
