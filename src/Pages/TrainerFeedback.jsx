import React from 'react'

const TrainerFeedback = () => {
    return (
        <div>
            <p className='text-2xl font-semibold my-6'>Trainer All Feedback</p>
            <div className='grid grid-cols-3 gap-5'>
                {
                    [...Array(6).keys()].map(item => {
                        return <div className='card-shadow p-4 rounded-md' key={item}>
                            <div className='flex justify-start items-center gap-2'>
                                <img className='h-10 w-10 rounded-full' src="https://i.ibb.co/1GH871B/blank-profile-picture-973460-960-720.webp" alt="" />
                                <p>shaharul siyam</p>
                            </div>
                            <p className='tracking-wide leading-7 mt-2 text-justify'>Lorem ipsum dolor sit amet consectetur. Ut facilisis facilisi elit tellus. Lobortis massa eu parturient nunc sapien nunc. Eget leo nulla suspendisse leo ipsum molestie metus luctus. Porttitor nascetur massa ornare metus felis nunc magna tempus morbi.
                            Nulla egestas leo diam mauris a donec praesent nisl enim. Placerat turpis in etiam duis. Cras eget suspendisse ut lectus mattis ultrices odio urna. In turpis id elit vulputate amet amet leo. Et aliquet orci porttitor in.</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TrainerFeedback
