import { Form, Modal, Pagination } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { FaEye, FaStar } from 'react-icons/fa6'
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
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(3);

   
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onChange = (page) => {
        setCurrent(page);
    };
    const onShowSizeChange = (current, size) => {
        setCurrent(1)
        console.log(current, size)
    }
    return (
        <div className='mt-8'>
            <div className='grid grid-cols-3 gap-3'>
                {
                    data?.map((item, index) => {
                        return (<div className='p-4 bg-[#EBF0F5] rounded-md' key={index}>
                            <div className='flex justify-start items-center gap-2'>
                                {[...Array(item?.rating)].map(item2 => <FaStar key={item2} className='text-2xl text-yellow-500' />)}
                                (<p>{item?.rating}</p>)
                            </div>
                            <div className='flex justify-between items-center gap-2 mt-3'>
                                <p className='font-bold'>{item?.name}</p>
                                <p>{item?.date}</p>
                            </div>
                            <p className='py-3'>{item?.feedback}</p>
                            <div className='flex justify-between items-center'>
                                <button onClick={() => setOpen(true)} className='px-6 py-2 border rounded-md text-[#2492EB] border-[#2492EB]'>Edit</button>
                                <button className='px-6 py-2 border rounded-md text-[#5C5C5C] border-[#5C5C5C] flex justify-center items-center w-fit gap-2'>Hide <FaEye /></button>
                                <button className='px-6 py-2 border bg-[#2492EB] rounded-md text-white border-[#2492EB]'>Publish</button>
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
                            (<p>5</p>)
                        </div>
                    </div>
                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        <Form.Item
                            name={`feedback`}
                            label={<p>Review Details</p>}
                        >
                            <TextArea style={{
                                resize: 'none',
                                height: '200px'
                            }} placeholder='write your review' className='h-[200px]' />
                        </Form.Item>
                        <div className='text-center'>
                            <button onClick={() => setOpen(false)} className='bg-blue-500 px-8 rounded-md py-2 text-white'>Update</button>
                        </div>
                    </Form>
                </div>
            </Modal>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={onChange} onShowSizeChange={onShowSizeChange} total={500} />
            </div>
        </div>
    )
}

export default StudentsReviews
