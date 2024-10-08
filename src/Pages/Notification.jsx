import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import useGetRequest from '../Hooks/useGetRequest'
import toast from 'react-hot-toast'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Pagination } from 'antd'
import usePostRequest from '../Hooks/usePostRequest'
import ProfileImage from '../assets/corporate-user-icon.webp'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import { FaCheck } from 'react-icons/fa6'

const Notification = () => {
    const [id, setID] = useState()
    const [page, setPage] = useState(0)
    const { useData, loading, isError } = useUserData();
    const [requestingNotification, Notification, NotificationError,] = useGetRequest('notification', `${(useData?.role === 'SUPER ADMIN' || useData?.role === 'ADMIN') ? '/admin-notification' : '/notification'}?page=${page}`)
    const { mutate: PostStudents, isLoading: PostLoading, data: PostData, } = usePostRequest('Students', `/mark-as-read/${id}`);
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to mark as read</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        PostStudents()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    console.log(Notification?.notifications)
    return (
        <div>
            <p className='text-xl font-semibold my-4'>Notification </p>
            {// Notification?.notifications?
                Notification?.notifications?.data?.map((item, index) => <div key={index} className='p-3 my-4 flex justify-start items-center gap-2 rounded-md card-shadow'>
                    <img src={item?.user?.image ? `${imageUrl}/${item?.user?.image}` : ProfileImage} className='w-10 h-10 rounded-full' alt="" />
                    <div className='flex justify-between items-start gap-2 w-full mx-3'>
                        <div className=''>
                            <p className='text-base font-semibold'>{item?.user?.name}</p>
                            <p className='text-sm'>{item?.data?.message}</p>
                            <p className='text-sm'>{item?.data?.time?.split('T')[0]}</p>
                        </div>
                        <button onClick={() => {
                            toast.dismiss()
                            setID(item?.id)
                            handleDelete()
                        }} className='text-xl p-1 rounded-md text-white bg-blue-500'>
                            <FaCheck />
                        </button>
                    </div>
                </div>)
            }
            <div className='text-center'>
                <Pagination pageSize={Notification?.notifications?.per_page || 7} showSizeChanger={false} onChange={(page) => setPage(page)} total={Notification?.notifications?.total || 0} current={page} />
            </div>
        </div >
    )
}

export default Notification
