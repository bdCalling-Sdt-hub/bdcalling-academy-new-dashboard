import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaEye, FaPlay, FaPlus } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import toast from 'react-hot-toast'

const Studentsgallery = () => {
    const [current, setCurrent] = useState(1);
    const [id, setId] = useState(undefined)
    const [requestingGallery, Gallery, GalleryError, refetch] = useGetRequest('Gallery', `/gallery?page=${current}`)
    // console.log(Gallery)
    const { mutate: DeleteGallery, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('gallery', `/gallery/${id}`);
    useEffect(() => {
        if (DeleteData && !DeleteLoading) refetch()
    }, [DeleteData, DeleteLoading])
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete this Image</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteGallery()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    console.log(Gallery)
    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <p className='text-2xl text-[#333333] font-semibold'>Successful Students</p>
                    <div className='flex justify-start items-center gap-2 mt-2'>
                        <p>Home</p> <MdKeyboardArrowRight className='text-blue-400' /> <p className='text-blue-400'>Success Stories</p>
                    </div>
                </div>
                <Link to={`/upload-gallery`} className='w-fit flex justify-end items-center bg-blue-400 text-white gap-2 px-6 py-2 rounded-md'>
                    <FaPlus /> Add Stories
                </Link>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-4'>
                {
                    Gallery?.data?.data?.map((item) => <div key={item?.id} className='w-full p-3 h-[400px] bg-white relative rounded-md overflow-hidden'>
                        <div className='w-full h-full absolute left-0 top-0'>
                            <img src={item?.image ? `${imageUrl}/${item?.image}` : "https://i.ibb.co/M51Zmpf/Rectangle-87-1.png"} alt="" className='w-full h-full object-cover' />
                        </div>
                        {/* <button className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl bg-red-500 text-white animate-pulse p-3 rounded-full'>
                            <FaPlay />
                        </button> */}
                        <div className='flex justify-between items-center gap-2 absolute w-full h-auto bottom-0 left-0 p-2 py-6 pb-5 bg-black bg-opacity-60'>
                            {/* <button className='bg-white text-blue-400 p-3 py-2 rounded-md'>Edit Students Journey</button> */}
                            <button onClick={() => {
                                setId(item?.id)
                                handleDelete()
                            }} className='bg-white text-blue-400 p-3 py-2 rounded-md'>Delete</button>
                        </div>
                    </div>)
                }
            </div>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={(page) => setCurrent(page)} pageSize={Gallery?.data?.per_page} showSizeChanger={false} total={Gallery?.data?.total} />
            </div>
        </div>
    )
}
export default Studentsgallery
