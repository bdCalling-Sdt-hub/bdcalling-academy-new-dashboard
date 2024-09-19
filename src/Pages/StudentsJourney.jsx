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
import ReactPlayer from 'react-player'

const StudentsJourney = () => {
    const [id, setId] = useState('')
    const [current, setCurrent] = useState(1);
    const [requestingStory, Story, StoryError, refetch] = useGetRequest('Story', `/success/story?type=journey&page=${current}`)
    const { mutate, isLoading, data, error } = useDeleteRequest('success', `/success/story/${id}`);
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
                <Link to={`/upload-success-stories?for=journey`} className='w-fit flex justify-end items-center bg-blue-400 text-white gap-2 px-6 py-2 rounded-md'>
                    <FaPlus /> Add Stories
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4'>
                {
                    Story?.data?.map((item, i) => {
                        return (
                            <div key={item?.id} className='w-full h-[360px] bg-white rounded-md overflow-hidden relative'>
                                <div className='w-full h-full'>
                                    <ReactPlayer
                                        url={item?.file}
                                        playing={false}
                                        controls
                                        width='100%'
                                        height='100%'
                                        className='react-player'
                                    />
                                </div>
                                <button
                                    onClick={() => { setId(item?.id); handleDelete(); }}
                                    className='absolute top-2 right-2 text-xl bg-red-500 text-white p-1 rounded-full'
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <div className='text-center my-5'>
                <Pagination current={current} onChange={onChange} pageSize={Story?.per_page} showSizeChanger={false} total={Story?.total || 0} />
            </div>
        </div>
    )
}


export default StudentsJourney
