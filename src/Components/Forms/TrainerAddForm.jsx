import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';

const TrainerAddForm = ({ filterdData, }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (filterdData) {
            form.setFieldValue(filterdData)
        }
    }, [filterdData, form])
    return (
        <Form
            layout={'vertical'}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div className='grid-3 w-full'>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">First Name*</span>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your First Name!',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">User Name*</span>}
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your First Name!',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Phone Number*</span>}
                    name="number"
                    // getValueFromEvent={(e)=>Number(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your Phone Number',
                        },
                    ]}>
                    <Input type='number' className='outline-none w-full border p-[10px] rounded-md' placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Email*</span>}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your email',
                        },
                    ]}>
                    <Input type='email' className='outline-none w-full border p-[10px] rounded-md' placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Password*</span>}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your password',
                        },
                    ]}>
                    <Input.Password type='password' className='outline-none w-full border p-[10px] rounded-md' placeholder="********" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Confirm Password*</span>}
                    name="cpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your password',
                        },
                    ]}>
                    <Input.Password type='password' className='outline-none w-full border p-[10px] rounded-md' placeholder="*******" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Designation*</span>}
                    name="designation"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your password',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="Designation" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Expert*</span>}
                    name="expert"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Expert',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="Expert*" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Please Select a Category*</span>}
                    name="trainerType"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Select className='h-[43px]' defaultValue={`part time`} options={[
                        { value: 'part time', label: <span>part time</span> },
                        { value: 'part time1', label: <span>part time1</span> },
                        { value: 'part time2', label: <span>part time2</span> },
                    ]} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Payment type*</span>}
                    name="paymentType"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Payment type!',
                        },
                    ]}>
                    <Select className='h-[43px]' defaultValue={`Per class`} options={[
                        { value: 'Per class', label: <span>Per class</span> },
                        { value: 'Per class1', label: <span>Per class1</span> },
                        { value: 'Per class2', label: <span>Per class2</span> },
                    ]} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Payment method*</span>}
                    name="paymentMethode"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Payment method!',
                        },
                    ]}>
                    <Select className='h-[43px]' defaultValue={`Bkash`} options={[
                        { value: 'Bkash', label: <span>Bkashs</span> },
                        { value: 'Bkash1', label: <span>Bkash1</span> },
                        { value: 'Bkash2', label: <span>Bkash2</span> },
                    ]} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Payment*</span>}
                    name="payment"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Payment method!',
                        },
                    ]}
                >
                    <Input type='number' className='outline-none w-full border p-[10px] rounded-md' placeholder="477" />
                </Form.Item>
            </div>
            <Form.Item >
                <div className='center-center gap-4' >
                    <button type="submit" className='btn-primary max-w-44 cursor-pointer hover:bg-[var(--primary-bg)]' >Save</button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default TrainerAddForm
