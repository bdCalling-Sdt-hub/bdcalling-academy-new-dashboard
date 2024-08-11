import { useState } from 'react'
import StarRatings from 'react-star-ratings';
import UpdateInput from '../Input/UpdateInput';
import TextArea from '../Input/TextArea';
const TrainerFeedbackForm = ({ filterdData, inputHandeler, register,
    handleSubmit, errors, onSubmit, rating, setrating ,setOpenFeedbackModal }) => {
        console.log(rating)
    return (
        <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
            <div className='text-center pt-8 pb-3'>
                <p className='text-base '>Course Rating:</p>
                <StarRatings
                    rating={rating}
                    starRatedColor="orange"
                    starHoverColor="orange"
                    changeRating={(r) => setrating(r)}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="5px"
                    name='rating'
                />
            </div>
            {/* <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Student Name`} rules={{ ...register("name", { required: true }) }} placeholder={`name`} defaultValue={filterdData?.user?.name} /> */}

            <p className='py-2 border  rounded-md px-2 my-2'>{filterdData?.user?.name}</p>

            <TextArea status={errors} handler={inputHandeler} classNames={`w-full border h-32`} lebel={`Review`} rules={{ ...register("review", { required: true }) }} placeholder={`Review`} defaultValue={filterdData.review} />
            <UpdateInput status={errors} handler={inputHandeler} type={`date`} classNames={`w-full border`} lebel={`date`} rules={{ ...register("date", { required: true }) }} placeholder={`date`} defaultValue={filterdData.date} />
            <div className='text-center mt-4'>
                <button onClick={()=>{
                    setOpenFeedbackModal(false)
                }} className='transition-all text-base font-medium px-10 py-3 bg-[#2492EB] rounded-md text-white hover:scale-105 active:scale-95'>Save</button>
            </div>
        </form>
    )
}

export default TrainerFeedbackForm
