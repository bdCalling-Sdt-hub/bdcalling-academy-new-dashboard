import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ClassRoutineForm from '../Components/Forms/ClassRoutineForm'
import { DatePicker, Form } from 'antd'
import { FaSearch } from 'react-icons/fa'

const ClassRoutine = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };


    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
    };
    return (
        <>
            <PageHeading text={`Class Routine`} />
            <div className='start-center gap-2 text-[var(--primary-bg)]'>
                <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Routine Schedule</p>
            </div>
            <div className='start-start gap-6 my-8'>
                <div className='card-shadow p-4 rounded-md w-[500px]'>
                    <p className='text-2xl font-semibold mb-4'>Add New Class Routine</p>
                    <ClassRoutineForm />
                </div>
                <div className='card-shadow p-4 rounded-md w-full'>
                    <p className='text-2xl font-semibold mb-4'>All Class Routine</p>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                    >
                        <div className='flex justify-start items-center gap-4'>
                            <Form.Item
                                label={false}
                                name="CourseName">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="Search by Exam..." />
                            </Form.Item>
                            <Form.Item
                                label={false}
                                name="CourseName">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="Search by Batch..." />
                            </Form.Item>
                            <Form.Item
                                label={false}
                            >
                                <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                                    onChange('start', date, dateString)
                                }} />
                            </Form.Item>
                            <Form.Item >
                                <button className='text-white p-3 rounded-full text-xl bg-[var(--primary-bg)]' type="submit" >
                                    <FaSearch />
                                </button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ClassRoutine
