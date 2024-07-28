import React from 'react'
import { RxCross2 } from 'react-icons/rx'
const data = [
    {
        img: 'https://i.ibb.co/xhxFyry/images-19.jpg',
        name: 'Rahman Abir',
        notification: 'Rahman abir has purchased Ui/UX Course . Payment Code: 210629-105148',
        time: '2 min ago'
    },
    {
        img: 'https://i.ibb.co/xhxFyry/images-19.jpg',
        name: 'Rahman Abir',
        notification: 'Rahman abir has purchased Ui/UX Course . Payment Code: 210629-105148',
        time: '2 min ago'
    },
    {
        img: 'https://i.ibb.co/xhxFyry/images-19.jpg',
        name: 'Rahman Abir',
        notification: 'Rahman abir has purchased Ui/UX Course . Payment Code: 210629-105148',
        time: '2 min ago'
    },
    {
        img: 'https://i.ibb.co/xhxFyry/images-19.jpg',
        name: 'Rahman Abir',
        notification: 'Rahman abir has purchased Ui/UX Course . Payment Code: 210629-105148',
        time: '2 min ago'
    },
    {
        img: 'https://i.ibb.co/xhxFyry/images-19.jpg',
        name: 'Rahman Abir',
        notification: 'Rahman abir has purchased Ui/UX Course . Payment Code: 210629-105148',
        time: '2 min ago'
    },
]
const Notification = () => {
    return (
        <div>
            <p className='text-xl font-semibold my-4'>Notification </p>
            {
                data?.map((item, index) => <div key={index} className='p-3 my-4 flex justify-start items-center gap-2 rounded-md card-shadow'>
                    <img src={item?.img} className='w-10 h-10 rounded-full' alt="" />
                    <div className='flex justify-between items-start gap-2 w-full mx-3'>
                        <div className=''>
                            <p className='text-base font-semibold'>{item?.name}</p>
                            <p className='text-sm'>{item?.notification}</p>
                            <p className='text-sm'>{item?.time}</p>
                        </div>
                        <button className='text-xl p-1 rounded-md text-white bg-blue-500'>
                            <RxCross2 />
                        </button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Notification
