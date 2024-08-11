import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import useGetRequest from '../../Hooks/useGetRequest'
import usePostRequest from '../../Hooks/usePostRequest'
import toast from 'react-hot-toast'
import useAxiosConfig from '../../AxiosConfig/useAxiosConfig'
// import useAxiosConfig from '../AxiosConfig/useAxiosConfig'
const TrainerReviewCard = ({ item, setOpenFeedbackModal, setFilterdData, }) => {

    const [status, setStatus] = useState('publish')
    const axoisCon = useAxiosConfig()
    const { name, date, review, rating_value } = item
    const handlePublishReview = async(id) => {
        const loadingToastId = toast.loading('Sending request...');

        try {
            const res = await axoisCon.get(`/publish-trainer-reviews/${id}`,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            toast.success('Request successful!', { id: loadingToastId });
            setStatus(res?.data?.review?.status)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || 'Something went wrong.', { id: loadingToastId });
        }
    }
    return (
        <div className='w-full bg-white rounded-md card-shadow p-4'>
            <span className='text-2xl text-[#FFC403] start-center'>
                {
                    [...Array(Number(rating_value)).keys()].map(ratings => <FaStar key={ratings} />)
                }
                <p className='text-xl text-[#5C5C5C] ml-5 mt-1'>{rating_value}.0</p>
            </span>
            <div className='between-center mt-4 mb-6'>
                <h4 className='text-[#333333] text-2xl font-medium'>{item?.user?.name}</h4>
                <p className='text-end text-base text-[#5C5C5C]'>{item?.created_at.split("T")[0]}</p>
            </div>
            <p className='text-[#333333] text-base pb-2'>{review}</p>
            <p>Teacher Name : {item?.teacher?.user?.name}</p>
            <div className='between-center mt-3 gap-[5%]'>
                <button onClick={() => {
                    setFilterdData(item)
                    setOpenFeedbackModal(true)
                }
                } className='border border-[#5C5C5C] rounded-md hover:scale-105 active:scale-95 px-12 py-2 w-[30%] transition-all'>Edit</button>
               
                <button onClick={() => handlePublishReview(item?.id)} className='bg-[#2492EB] border border-[#2492EB] text-white rounded-md hover:scale-105 active:scale-95 px-12 py-2 w-[30%] transition-all'>{status}</button>
            </div>
        </div>
    )
}

export default TrainerReviewCard
