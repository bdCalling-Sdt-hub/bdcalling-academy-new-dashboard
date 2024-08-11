import { Form, Modal, Pagination } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { FaEye, FaStar } from 'react-icons/fa6'
import useGetRequest from '../Hooks/useGetRequest'
import usePatchRequest from '../Hooks/usePatchRequest'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import toast from 'react-hot-toast'
const data = [
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
    {
        name: 'SAVANNAH NGUYEN',
        feedback: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        date: 'MAR 08, 2024',
        rating: 5
    },
]
const StudentsReviews = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(3);
    const [FilterData, setFilterData] = useState({})
    const [Rating, setRating] = useState(0)
    const [requestingReview, Review, ReviewError, refetch] = useGetRequest('Review', `/all-reviews`)
    const { mutate: updateFeedback, isLoading: updateLoading, data: updateData, } = usePatchRequest('reviews', `/reviews/${FilterData?.id}`);
    const { mutate: DeleteReview, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('reviews', `/reviews/${FilterData?.id}`);
    // console.log(Review)
    const onFinish = (values) => {
        const formData = new FormData()
        formData.append('message', values?.message)
        formData.append('_method', 'PUT')
        updateFeedback(formData)
    };
    useEffect(() => {
        if (FilterData) {
            setRating(FilterData?.rating)
            form.setFieldsValue(FilterData)
        }
    }, [FilterData])
    useEffect(() => {
        if ((!updateLoading && updateData) || (DeleteData && !DeleteLoading)) {
            refetch()
        }
    }, [updateLoading, updateData, DeleteData, DeleteLoading])
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete this routine</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteReview()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    return (
        <div className='mt-8'>
            <div className='grid grid-cols-3 gap-3'>
                {
                    Review?.data?.map((item, index) => {
                        console.log(item)
                        return (<div className='p-4 bg-[#EBF0F5] rounded-md' key={index}>
                            <div className='flex justify-start items-center gap-2'>
                                {[...Array(Number(item?.rating_value))].map((item2,i) => <FaStar key={i} className='text-2xl text-yellow-500' />)}
                                (<p>{item?.rating_value}</p>)
                            </div>
                            <div className='flex justify-between items-center gap-2 mt-3'>
                                <p className='font-bold'>{item?.student?.user?.name}</p>
                                <p>{item?.created_at?.split('T')[0]}</p>
                            </div>
                            <p className='py-3'>{item?.message}</p>
                            <div className='flex justify-between items-center'>
                                <button onClick={() => { setOpen(true); setFilterData({ rating: Number(item?.rating_value), message: item?.message, id: item?.id }) }} className='px-6 py-2 border rounded-md text-[#2492EB] border-[#2492EB]'>Edit</button>
                                <button onClick={() => { setFilterData({ rating: Number(item?.rating_value), message: item?.message, id: item?.id }); handleDelete() }} className='px-6 py-2 border rounded-md text-[#5C5C5C] border-[#5C5C5C] flex justify-center items-center w-fit gap-2'>Hide <FaEye /></button>
                                {/* <button className='px-6 py-2 border bg-[#2492EB] rounded-md text-white border-[#2492EB]'>Publish</button> */}
                            </div>
                        </div>)
                    })
                }
            </div>
            <Modal
                centered
                footer={false}
                onCancel={() => setOpen(false)}
                open={open}
            >
                <div className={``}>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p>Name</p>
                            <p className='my-1'>SAVANNAH NGUYEN</p>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <FaStar className='text-2xl text-yellow-500' />
                            (<p>{Rating}</p>)
                        </div>
                    </div>
                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                        form={form}
                    >
                        <Form.Item
                            name={`message`}
                            label={<p>Review Details</p>}
                        >
                            <TextArea style={{
                                resize: 'none',
                                height: '200px'
                            }} placeholder='write your review' className='h-[200px]' />
                        </Form.Item>
                        <div className='text-center'>
                            <button className='bg-blue-500 px-8 rounded-md py-2 text-white'>Update</button>
                        </div>
                    </Form>
                </div>
            </Modal>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={() => setCurrent(page)} showSizeChanger={false} pageSize={Review?.per_page} total={Review?.total} />
            </div>
        </div>
    )
}

export default StudentsReviews
