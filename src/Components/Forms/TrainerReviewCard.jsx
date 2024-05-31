import React from 'react'
import { FaStar } from 'react-icons/fa'

const TrainerReviewCard = ({ item ,setOpenFeedbackModal ,setFilterdData}) => {
    const { name, date, review, rating } = item 
    return (
        <div className='w-full bg-white rounded-md card-shadow p-4'>
            <span className='text-2xl text-[#FFC403] start-center'>
                {
                    [...Array(Number(rating)).keys()].map(ratings => <FaStar key={ratings} />)
                }
                <p className='text-xl text-[#5C5C5C] ml-5 mt-1'>{rating}.0</p>
            </span>
            <div className='between-center mt-4 mb-6'>
                <h4 className='text-[#333333] text-2xl font-medium'>{name}</h4>
                <p className='text-end text-base text-[#5C5C5C]'>{date}</p>
            </div>
            <p className='text-[#333333] text-base'>{review}</p>
            <div className='between-center mt-3 gap-[5%]'>
                <button onClick={()=>{
                    setFilterdData(item)
                    setOpenFeedbackModal(true)}
                    } className='border border-[#5C5C5C] rounded-md hover:scale-105 active:scale-95 px-12 py-2 w-[30%] transition-all'>Edit</button>
                <button className='bg-[#2492EB] border border-[#2492EB] text-white rounded-md hover:scale-105 active:scale-95 px-12 py-2 w-[30%] transition-all'>Hide</button>
                <button className='border border-[#2492EB] text-[#2492EB] rounded-md hover:scale-105 active:scale-95 px-12 py-2 w-[30%] transition-all'>Publish</button>
            </div>
        </div>
    )
}

export default TrainerReviewCard
