import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import useGetRequest from '../../Hooks/useGetRequest'
import usePostRequest from '../../Hooks/usePostRequest';
import usePatchRequest from '../../Hooks/usePatchRequest';
import { useUserData } from '../../Providers/UserProviders/UserProvider';
const SalseStudentAddForm = ({ setOpenAdmitStudentModal, refetch, filteredData, image, setImage, formFor }) => {
    const { useData } = useUserData()
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `/phoenix-batches`)
    const BatchOptions = Batch?.data?.data?.map(item => {
        return { label: item?.batch_name, value: item?.id }
    }) || []
    const [requestingCategory, Category, CategoryError,] = useGetRequest('Category', `/categories`)
    const { mutate, isLoading, data, error } = usePostRequest('AdmitStudents', '/admit-phoenix-student');
    const { mutate: updateTeacher, isLoading: updateLoading, data: updateData, error: updateError } = usePatchRequest('updateStudent', `/update-phoenix-student/${filteredData?._id}`);
    const CourseOptions = Category?.data?.data?.map(item => {
        return { label: item?.category_name, value: item?.id }
    }) || []
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const {email,...otherValues}=values
        const data = {
            ...otherValues,
            add_by:useData?.id,
            student_type:'phoenix'
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        if (image) {
            formData.append('image', image)
        }

        if (formFor == 'add') {
            formData.append('email', email)
            console.log(email)
            mutate(formData)
        } else {
            // formData.append('_method', 'PUT')
            updateTeacher(formData)
        }
    };

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }


    useEffect(() => {
        console.log(filteredData)
        if (filteredData) {
            form.setFieldsValue({ ...filteredData, payment_type: filteredData?.item?.payment_type, payment_method: filteredData?.item?.payment_method, payment: Number(filteredData?.item?.payment), course_category_id: filteredData?.categorys });
        }
    }, [filteredData, form]);

    useEffect(() => {
        if (isLoading || updateLoading) return
        if ((data && !error) || (!updateError && updateData)) setOpenAdmitStudentModal(false); refetch()
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
                    label={<span className="text-lg font-bold text-[#333333]">Religion*</span>}
                    name="religion"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your password',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="Designation" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Date of Birth*</span>}
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Expert',
                        },
                    ]}>
                    <Input type='date' className='outline-none w-full border p-[10px] rounded-md' placeholder="Expert*" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Course Category*</span>}
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={CourseOptions} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Gender*</span>}
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={[{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">Batch*</span>}
                    name="batch_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Select className='h-[43px]' options={BatchOptions} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">blood group*</span>}
                    name="blood_group"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">address*</span>}
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Input className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
                </Form.Item>
                <Form.Item
                    label={<span className="text-lg font-bold text-[#333333]">registration date*</span>}
                    name="registration_date"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input trainer Type!',
                        },
                    ]}>
                    <Input type='date' className='outline-none w-full border p-[10px] rounded-md' placeholder="*Required Field" />
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


export default SalseStudentAddForm
