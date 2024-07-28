import { DatePicker, Form, Select } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetRequest from '../Hooks/useGetRequest';
import usePostRequest from '../Hooks/usePostRequest';

const AddSalesStudentBatch = () => {
    const [requestingCourse, Course, CourseError, refetch] = useGetRequest('course', `/courses`)
    const [requestingUser, Admins, adminError, isError] = useGetRequest('mentors', `/teachers`)
    const { mutate, isLoading, data, error } = usePostRequest('batch', '/phoenix-batches');
    const CourseOptions = Course?.data?.map((item) => {
        return { value: item?.id, label: item?.course_name }
    })
    const MentorsOptions = Admins?.teacher?.data?.map((item) => {
        return { value: item?.id, label: item?.user?.name }
    })
    const [form] = Form.useForm();
    const [Image, setImage] = useState()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const onFinish = (values) => {
        const data = {
            course_id: values?.CourseName,
            batch_name: values?.batch,
            start_date: startDate,
            end_date: endDate,
            seat_left: values?.seat,
            seat_limit: values?.seat,
            teacher_id: JSON.stringify(values.trainer),
            image: Image
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        // console.log(data)
        mutate(formData)
    };


    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
        if (field === 'start') {
            setStartDate(dateString)
        } else if (field === 'end') {
            setEndDate(dateString)
        }
    };
    const onCourseSelect = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div id='addBatch'>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
            >
                <div className='grid-2 w-[70%]'>
                    <div className='col-span-2'>
                        <Form.Item
                            label={<span className="text-lg font-bold text-[#333333] col-span-2">Batch Name</span>}
                            name="batch"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your batch!',
                                },
                            ]}>
                            <input className='outline-none w-full border p-[10px] rounded-md' placeholder="batch name" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label={<span className="text-lg font-bold text-[#333333]">Course</span>}
                        name="CourseName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Course!',
                            },
                        ]}>
                        <Select style={{
                            height: '40px'
                        }} onChange={onCourseSelect} placeholder={`please select course`} options={CourseOptions} />
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
                        label={<span className="text-lg font-bold text-[#333333]">Trainer</span>}
                        name="trainer"
                        rules={[
                            {
                                required: true,
                                message: 'Please input trainer name!',
                            },
                        ]}>
                        <Select style={{
                            minHeight: '43px'
                        }} mode="multiple" className='min-h-[43px]' defaultValue={`chooes a value`} options={MentorsOptions} />
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input course seat!',
                            },
                        ]}
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

export default AddSalesStudentBatch
