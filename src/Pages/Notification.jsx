import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import useGetRequest from '../Hooks/useGetRequest'
import toast from 'react-hot-toast'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Pagination } from 'antd'
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
    const [id, setStudent] = useState()
    const [page, setPage] = useState(0)
    const { useData, loading, isError } = useUserData();
    const [requestingNotification, Notification, NotificationError,] = useGetRequest('notification', `${(useData?.role === 'SUPER ADMIN' || useData?.role === 'ADMIN') ? '/admin-notification' : '/notification'}`)
    const { mutate: DeleteStudents, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Students', `/mark-as-read/${id}`);
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {filterData?.name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteStudents()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
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
            <div className='text-center'>
                <Pagination pageSize={Notification?.notifications?.per_page || 7} showSizeChanger={false} onChange={(page) => setPage(page)} total={Notification?.notifications?.total || 0} current={page} />
            </div>
        </div>
    )
}

export default Notification
