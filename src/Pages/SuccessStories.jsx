import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdDelete, MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useGetRequest from '../Hooks/useGetRequest'
import { imageUrl } from '../AxiosConfig/useAxiosConfig'
import toast from 'react-hot-toast'
import useDeleteRequest from '../Hooks/useDeleteRequest'
import DynamicVideo from '../Components/DynamicVideo/DynamicVideo'

const SuccessStories = () => {
    const [id, setId] = useState('')
    const [current, setCurrent] = useState(1);
    const [requestingStory, Story, StoryError, refetch] = useGetRequest('successStory', `/success/story?type=story&page=${current}`)
    const { mutate, isLoading, data, error } = useDeleteRequest('successStory', `/success/story/${id}`);
    const onChange = (page) => {
        setCurrent(page);
    };
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete this gallery</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        mutate()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    useEffect(() => {
        if (data && !error) refetch()
    }, [data, error])
    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <p className='text-2xl text-[#333333] font-semibold'>Successful Students</p>
                    <div className='flex justify-start items-center gap-2 mt-2'>
                        <p>Home</p> <MdKeyboardArrowRight className='text-blue-400' /> <p className='text-blue-400'>Success Stories</p>
                    </div>
                </div>
                <Link to={`/upload-success-stories?for=story`} className='w-fit flex justify-end items-center bg-blue-400 text-white gap-2 px-6 py-2 rounded-md'>
                    <FaPlus /> Add Stories
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4'>
                {
                    Story?.data?.map((item, i) => {
                        return <div key={item?.id} className='w-full h-[400px] bg-white relative rounded-md overflow-hidden'>
                            <DynamicVideo key={item?.id} file={`${imageUrl}/${item?.file}`} />
                            {/* <video autoPlay controls className='w-full h-full object-cover'>
                                <source src={`${imageUrl}/${item?.file}?t=${new Date().getTime()}`} />
                            </video> */}
                            <button onClick={() => { setId(item?.id); handleDelete() }} className='absolute top-2 right-2  text-xl bg-red-500 text-white p-1 rounded-full'>
                                <MdDelete />
                            </button>
                            {/* <div className='flex justify-between items-center gap-2 absolute w-full h-auto bottom-0 left-0 p-2 py-6 pb-5 bg-black bg-opacity-60'>
                                <button className='bg-white text-blue-400 p-3 py-2 rounded-md'>Delete Students Journey</button>
                                <button className='bg-blue-400 text-white p-3 py-2 rounded-md'>Delete Students Journey</button>
                                <button className=' bg-white text-black p-3 rounded-md'><FaEye /></button>top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                            </div> */}
                        </div>
                    })
                }
            </div>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={onChange} pageSize={Story?.per_page} showSizeChanger={false} total={Story?.total || 0} />
            </div>
        </div>
    )
}

export default SuccessStories
