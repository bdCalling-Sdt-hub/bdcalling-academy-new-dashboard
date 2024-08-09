import { Form, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import useGetRequest from '../Hooks/useGetRequest'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import usePostRequest from '../Hooks/usePostRequest'
import usePatchRequest from '../Hooks/usePatchRequest'

const formatDate = (dateString) => {

    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
};

const SendStudentReview = () => {
    const [form] = Form.useForm()
    const [rating, setRating] = useState(5)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [loading, reviews, error , refetch] = useGetRequest('studentReview', '/reviews');

    const handleUpdateFeedbackId = (id) => {
        setId(id)
    }
    const { mutate: updateCourse, isLoading: updateLoading, data: updateData } = usePatchRequest('courses', `/reviews/${id}`);

    const [feedback, setFeedback] = useState({})
    const { useData, isLoading, isError } = useUserData();


    const initialValues = {
        feedback: feedback?.message,
        rating: feedback?.rating
    }

    useEffect(() => {
        form.setFieldsValue({ feedback: feedback?.message })
        setRating(feedback?.rating_value)
    }, [form, feedback])



    const handleUpdateTraineeFeedback = (value) => {

        const data = {
            rating_value: rating,
            batch_id: feedback?.batch_id,
            message: value.feedback,
        };

        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.append('_method', 'PUT')

        updateCourse(formData)

    }

    useEffect(() => {
        refetch()
    }, [updateData])





    return (
        <div>
            <div className='flex justify-between items-center gap-2'>
                <p className='text-2xl font-semibold my-6'>Trainer All Feedbacks</p>

            </div>
            <div className='grid grid-cols-2 gap-5'>
                {
                    reviews?.data?.map(item => {
                        return <div className='card-shadow p-4 rounded-md bg-[#EBF0F5]' key={item?.id}>
                            <div className='flex justify-start items-center gap-2 mb-2'>
                                {item?.rating_value} <FaStar className='text-yellow-500 text-2xl -mt-1' />
                            </div>
                            <p className='uppercase'>{ }</p>
                            <div className='flex justify-between items-center gap-2 mb-2'>
                                <p className='uppercase'>{useData?.name}</p> <p className='text-sm'>{formatDate(item?.created_at)}</p>
                            </div>
                            <p className='tracking-wide leading-7 mt-2 text-justify'>{item?.message}</p>
                            <div className='text-end'>
                                <button onClick={() => {

                                    setFeedback(item)
                                    setOpen(true)
                                    handleUpdateFeedbackId(item?.id)
                                }} className='capitalize px-8 py-3 text-blue-500 border border-blue-500'>
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

                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={handleUpdateTraineeFeedback}
                        initialValues={initialValues}
                    >


                        <Form.Item
                            name='rating'
                            label={<span className='text-base'>Course Rating:</span>}
                        >
                            <div className='start-center text-2xl gap-1 my-1'>
                                {
                                    [...Array(5).keys()].map(item => (
                                        <FaStar
                                            onClick={() => setRating(item + 1)}
                                            key={item}
                                            className={`${item < rating ? "text-yellow-500" : "text-gray-400"} cursor-pointer`}
                                        />
                                    ))
                                }
                            </div>
                            <input type='hidden' name='rating' value={rating} />
                        </Form.Item>
                        <Form.Item
                            name={`feedback`}
                            label={<span className='text-base'>Review Message</span>}
                        >
                            <TextArea style={{
                                height: '150px',
                                resize: 'none'
                            }} className='resize-none' />
                        </Form.Item>
                        <button onClick={() => setOpen(false)} className='px-8 py-2 bg-blue-500 text-white rounded-md mb-5'>
                            SUBMIT REVIEW
                        </button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default SendStudentReview
