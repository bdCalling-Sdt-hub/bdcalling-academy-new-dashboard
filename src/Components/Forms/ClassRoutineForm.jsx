import { DatePicker, Form, Select, TimePicker } from 'antd';
import useGetRequest from '../../Hooks/useGetRequest';
const ClassRoutineForm = () => {
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `/batches`)
    const [requestingCourse, Course, CourseError] = useGetRequest('course', `/courses`)
    const [requestingUser, Admins, adminError, isError] = useGetRequest('mentors', `/teachers`)
    const CourseOptions = Course?.data?.map(item => {
        return { label: item?.course_name, value: item?.id }
    }) || []
    const BatchOptions = Batch?.data?.data?.map(item => {
        return { label: item?.batch_name, value: item?.id }
    }) || []
    const MentorsOptions = Admins?.teacher?.data?.map((item) => {
        return { value: item?.id, label: item?.user?.name }
    })
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div id='addBatch'>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Course name</span>}
                    name="CourseName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Course name!',
                        },
                    ]}>
                    <Select options={CourseOptions} defaultValue={CourseOptions[0]?.value} className='outline-none w-full h-[43px]  rounded-md' placeholder='this field is required' />
                </Form.Item>
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Trainer Name</span>}
                    name="trainer"
                    rules={[
                        {
                            required: true,
                            message: 'Please input trainer name',
                        },
                    ]}>
                    <Select defaultValue={MentorsOptions[0]?.value} options={MentorsOptions} className='outline-none w-full h-[43px]  rounded-md' placeholder='this field is required' />
                </Form.Item> 
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Batch NO</span>}
                    name="batch"
                    rules={[
                        {
                            required: true,
                            message: 'Please input batch No',
                        },
                    ]}>
                   <Select defaultValue={BatchOptions[0]?.value} options={BatchOptions} className='outline-none w-full h-[43px]  rounded-md' placeholder='this field is required' />
                </Form.Item>
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Select Time</span>}
                    name="time">
                    <TimePicker.RangePicker className='w-full h-[43px]' />
                </Form.Item>
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Select Date</span>}
                >
                    <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                        onChange('start', date, dateString)
                    }} />
                </Form.Item>
                <Form.Item >
                    <div className='start-center gap-4' >
                        <input type="submit" value={`Save`} className='btn-primary max-w-44 cursor-pointer' />
                        <button onClick={onReset} type='button' className='text-[var(--primary-bg)] border-[var(--primary-bg)] border py-[6px] px-6 w-full max-w-44 rounded-md text-center hover:scale-105 active:scale-95 transition-all '>Reset</button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}//onClick={onReset}

export default ClassRoutineForm
