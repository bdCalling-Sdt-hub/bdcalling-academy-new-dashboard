import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import useGetRequest from '../../Hooks/useGetRequest'
import usePostRequest from '../../Hooks/usePostRequest';
import usePatchRequest from '../../Hooks/usePatchRequest';
const TrainerAddForm = ({ filteredData, image, setImage, setOpenAddModal, formFor, refetch }) => {
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories`)
    const { mutate, isLoading, data, error } = usePostRequest('TeacherAdd', '/teachers');
    const { mutate: updateTeacher, isLoading: updateLoading, data: updateData, error: updateError } = usePatchRequest('TeacherAdd', `/teachers/${filteredData?._id}`);
    const CourseOptions = Category?.data?.data?.map(item => {
        return { label: item?.category_name, value: item?.id }
    }) || []
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const { first_Name, email, payment, ...data } = values
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.append('payment', Number(payment))
        if (image) {
            formData.append('image', image)
        }
        if (formFor == 'add') {
            formData.append('email', email)
            mutate(formData)
        } else {
            formData.append('_method', 'PUT')
            updateTeacher(formData)
        }
    };

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }


    useEffect(() => {
        if (filteredData) {
            form.setFieldsValue({ ...filteredData });
        }
    }, [filteredData, form]);

    useEffect(() => {
        if (isLoading || updateLoading) return
        if ((data && !error) || (!updateError && updateData)) setOpenAddModal(false); refetch()
    }, [data, isLoading, error, updateData, updateLoading, updateError])
    return (
        <Form
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <div className='w-28 h-28 relative'>
                <img className='w-fuh-full h-full object-cover rounded-full' src={image && URL.createObjectURL(image) || "https://i.ibb.co/d4RSbKx/Ellipse-980.png"} alt="" />
                <label htmlFor='image' className='bg-[var(--primary-bg)] text-white p-2 rounded-full text-xl absolute right-0 bottom-0 cursor-pointer'><FaEdit /></label>
                <input onChange={handleChange} type="file" id='image' style={{
                    display: 'none'
                }} />
            </div>
            <div className='grid-3 w-full'>
                {
                    formFor == 'add' && <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">First Name*</span>}
                        name="first_Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input your First Name!',
                            },
                        ]}
                    >
                        <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                    </Form.Item>
                }
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">User Name*</span>}
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
                    label={<span className="text-lg font-bold text-[#333333]">Phone Number*</span>}
                    name="phone_number"
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
                    <Input type='email' className={`outline-none w-full border p-[10px] rounded-md ${formFor == 'add' ? '' : 'pointer-events-none'}`} placeholder="Phone Number" />
                </Form.Item>
                {
                    formFor == 'add' && <>

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
                            name="password_confirmation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input your password',
                                },
                            ]}>
                            <Input.Password type='password' className='outline-none w-full border p-[10px] rounded-md' placeholder="*******" />
                        </Form.Item>

                    </>
                }

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
                    label={<span className="text-lg font-bold text-[#333333]">Course Category*</span>}
                    name="course_category_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={CourseOptions} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Payment type*</span>}
                    name="payment_type"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Payment type!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={[
                        { value: 'Per class', label: <span>Per class</span> },
                        { value: 'monthly', label: <span>monthly</span> },
                    ]} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Payment method*</span>}
                    name="payment_method"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Payment method!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={[
                        { value: 'Bkash', label: <span>Bkash</span> },
                        { value: 'Nagad', label: <span>Nagad</span> },
                        { value: 'Cash', label: <span>Cash</span> },
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
                    <button onClick={() => {
                        // setOpenAddModal(false)
                    }} type="submit" className='btn-primary max-w-44 cursor-pointer hover:bg-[var(--primary-bg)]' >Save</button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default TrainerAddForm
