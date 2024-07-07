import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'

const AddProvideClassVideo = () => {
    const onFinish = (value) => {

    }
    return (
        <>
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <PageHeading text={`Provide Class video `} />
                    <div className='start-center gap-2 text-[var(--primary-bg)]'>
                        <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Students Provide Class video </p>
                    </div>
                </div>
            </div>
            <Form
                layout='vertical'
                onFinish={onFinish}
                className='grid grid-cols-2 gap-4 w-full'
            >
                <Form.Item
                    name={'name'}
                    label="Trainer Name"
                    rules={[
                        {
                            required:true,
                            message:'please input trainer name'
                        }
                    ]}
                >
                    <Input className='py-2' placeholder='siyam' />
                </Form.Item>
                <Form.Item
                    name={'title'}
                    label="Video Name"
                    rules={[
                        {
                            required:true,
                            message:'please input Video name'
                        }
                    ]}
                >
                    <Input className='py-2' placeholder='MERN' />
                </Form.Item>
                <Form.Item
                    name={'duration'}
                    label="Video Time length"
                    rules={[
                        {
                            required:true,
                            message:'please input Video duration'
                        }
                    ]}
                >
                    <Input className='py-2' placeholder='02:30 Hours' />
                </Form.Item>
                <Form.Item
                    name={'batch'}
                    label="Batch No"
                    rules={[
                        {
                            required:true,
                            message:'please input Batch No'
                        }
                    ]}
                >
                    <Input className='py-2' placeholder='Batch No' />
                </Form.Item>
                <Form.Item
                    name={'cover'}
                    label="Cover Image"
                    rules={[
                        {
                            required:true,
                            message:'please input Cover Image'
                        }
                    ]}
                >
                    <Input className='py-2' placeholder='cover image' type='file' />
                </Form.Item>
                <Form.Item
                    name={'video'}
                    label="Upload Video"
                    rules={[
                        {
                            required:true,
                            message:'please input video'
                        }
                    ]}
                >
                    <Input className='py-2' accept='video/*' placeholder='cover image' type='file' />
                </Form.Item>
                <div className='flex justify-center items-center gap-4 col-span-2'>
                    <Link to={-1} className='px-14 py-2 border-red-500 border text-red-500 bg-[#F7D4D8] rounded-md'>cancel</Link>
                    <button className='px-14 py-2 border-blue-500 border text-white rounded-md bg-blue-500'>Submit</button>
                </div>
            </Form>
        </>
    )
}

export default AddProvideClassVideo
