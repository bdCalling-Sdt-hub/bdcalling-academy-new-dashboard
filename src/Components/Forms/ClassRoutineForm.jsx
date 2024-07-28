import { DatePicker, Form, Input, Select, TimePicker } from 'antd';
import useGetRequest from '../../Hooks/useGetRequest';
import { useState } from 'react';
import usePostRequest from '../../Hooks/usePostRequest';
import { useLocation } from 'react-router-dom';
const ClassRoutineForm = () => {
    const location = useLocation()
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `${location?.pathname === '/create-routine'?'/phoenix-batches':'/batches'}`)
    const [batchID, setBatchID] = useState(undefined)
    const [requestingSingleBatch, SingleBatch, SingleBatchError,] = useGetRequest('singleBatch', `/batches/${batchID}`)
    const [requestingModule, Module, ModuleError,] = useGetRequest('module', `/show-module?course_id=${SingleBatch?.data?.course_id}`)
    const { mutate, isLoading, data, error } = usePostRequest('routines', '/routines');
    const [time, setTime] = useState([])
    const [date, setDate] = useState(undefined)
    const BatchOptions = Batch?.data?.data?.map(item => {
        return { label: item?.batch_name, value: item?.id }
    }) || []
    const ModulesOptions = Module?.data?.data?.[0]?.course_module?.map((item) => {
        return { value: item?.id, label: item?.module_title }
    })

    const [form] = Form.useForm();
    const onFinish = (values) => {
        const data = {
            course_id: SingleBatch?.data?.course_id,
            batch_id: values?.batch,
            course_module_id: values?.module,
            date: date,
            time: `${time[0]}-${time[1]}`
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
    const onTimeSelect = (time, timeString) => {
        setTime(timeString)
    }
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div id='addBatch'>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Batch NO</span>}
                    name="batch"
                    rules={[
                        {
                            required: true,
                            message: 'Please input batch No',
                        },
                    ]}>
                    <Select onChange={() => {
                        form.resetFields([`module`])
                    }} onSelect={(id, ...args) => {
                        setBatchID(id)
                    }} options={BatchOptions} className='outline-none w-full h-[43px]  rounded-md' placeholder='this field is required' />
                </Form.Item>
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Course name</span>}
                    name="CourseName"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your Course name!',
                        },
                    ]}>
                    <Input className='outline-none w-full h-[43px] pointer-events-none  rounded-md' placeholder={SingleBatch?.data?.course?.course_name || 'this field is required'} />
                </Form.Item>
                <Form.Item
                    label={<span className="text-base font-bold text-[#333333]">Module Name</span>}
                    name="module"
                    rules={[
                        {
                            required: true,
                            message: 'Please input module name',
                        },
                    ]}>
                    <Select options={ModulesOptions} className='outline-none w-full h-[43px]  rounded-md' placeholder='this field is required' />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Please input time',
                        },
                    ]}
                    label={<span className="text-base font-bold text-[#333333]">Select Time</span>}
                    name="time">
                    <TimePicker.RangePicker onChange={onTimeSelect} className='w-full h-[43px]' />
                </Form.Item>
                <Form.Item
                    name={`date`}
                    label={<span className="text-base font-bold text-[#333333]">Select Date</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input date',
                        },
                    ]}>
                    <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                        onChange('date', date, dateString)
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
