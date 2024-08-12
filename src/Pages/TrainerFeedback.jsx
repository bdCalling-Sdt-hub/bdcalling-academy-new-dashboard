import React from 'react'
import useGetRequest from '../Hooks/useGetRequest'

const TrainerFeedback = () => {

    const [Loading, reviews, error,] = useGetRequest('review', `/show-student-feedback`)
    return (
        <div>
            <p className='text-2xl font-semibold my-6'>Trainer All Feedback</p>
            <div className='grid grid-cols-3 gap-5'>
                {
                    reviews?.data?.data?.map(item => {
                        
                        return <div className='card-shadow p-4 rounded-md' key={item?.id}>
                            <div className='flex justify-start items-center gap-2'>
                                {
                                    item?.user?.image ? <img className='h-10 w-10 rounded-full' src={`${imageUrl}/${item?.user?.image}  `} alt="image" /> : <img className='h-10 w-10 rounded-full' src= "https://i.ibb.co/1GH871B/blank-profile-picture-973460-960-720.webp" alt="image" />
                                }
                                
                                <p>{item?.user?.name}</p>
                            </div>
                            <p className='tracking-wide leading-7 mt-2 '>{item?.feedback}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TrainerFeedback
