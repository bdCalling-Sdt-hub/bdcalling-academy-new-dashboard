import { Form, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import useGetRequest from '../Hooks/useGetRequest'

const SendStudentReview = () => {
    const [rating, setRating] = useState(5)
    const [open, setOpen] = useState(false)

    const [loading, data , error] = useGetRequest('studentReview','/show-student-feedback');
    console.log(data)

    return (
        <div>
            <div className='flex justify-between items-center gap-2'>
                <p className='text-2xl font-semibold my-6'>Trainer All Feedback</p>
                <button onClick={()=>{
                    setOpen(true)
                }} className='px-8 py-3 text-white bg-blue-500 rounded-md'>
                    Add review
                </button>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {
                    [...Array(6).keys()].map(item => {
                        return <div className='card-shadow p-4 rounded-md bg-[#EBF0F5]' key={item}>
                            <div className='flex justify-start items-center gap-2 mb-2'>
                                5.0 <FaStar className='text-yellow-500 text-2xl -mt-1' />
                            </div>
                            <p className='uppercase'>shaharul siyam</p>
                            <div className='flex justify-between items-center gap-2 mb-2'>
                                <p className='uppercase'>shaharul siyam</p> <p className='text-sm'>MAR 08, 2024</p>
                            </div>=
                            <p className='tracking-wide leading-7 mt-2 text-justify'>Lorem ipsum dolor sit amet consectetur. Ut facilisis facilisi elit tellus. Lobortis massa eu parturient nunc sapien nunc. Eget leo nulla suspendisse leo ipsum molestie metus luctus. Porttitor nascetur massa ornare metus felis nunc magna tempus morbi.
                                Nulla egestas leo diam mauris a donec praesent nisl enim. Placerat turpis in etiam duis. Cras eget suspendisse ut lectus mattis ultrices odio urna. In turpis id elit vulputate amet amet leo. Et aliquet orci porttitor in.</p>
                            <div className='text-end'>
                                <button className='capitalize px-8 py-3 text-blue-500 border border-blue-500'>
                                    edit
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
                centered
            >
                <div>
                    <p className="text-2xl font-medium my-6 uppercase">WRITE YOUR OWN REVIEW</p>
                    <p>Course Rating:</p>
                    <div className='start-center text-2xl  gap-1 my-1'>
                        {
                            [...Array(5).keys()].map(item => {
                                return <FaStar onClick={() => {
                                    setRating(item + 1)
                                }} key={item} className={`${item < rating ? "text-yellow-500" : "text-gray-400"} cursor-pointer`} />
                            })
                        }
                    </div>
                    <Form
                        layout='vertical'
                        onFinish={(values) => {
                        }}
                    >
                        <Form.Item
                            name={`feedback`}
                            label={<span className='text-base'>Review Message</span>}
                        >
                            <TextArea style={{
                                height: '150px',
                                resize: 'none'
                            }} className='resize-none' />
                        </Form.Item>
                        <button className='px-8 py-2 bg-blue-500 text-white rounded-md mb-5'>
                            SUBMIT REVIEW
                        </button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default SendStudentReview
