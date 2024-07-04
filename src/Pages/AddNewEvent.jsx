import React from 'react'
import AddEventsFrom from '../Components/Forms/AddEventsFrom'
import PageHeading from '../Components/Shared/PageHeading'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

const AddNewEvent = () => {
    return (
        <>
            <div className='start-center gap-3'>
                <Link to={-1} className='text-3xl bg-white p-1 rounded-md'>
                    <MdOutlineKeyboardArrowLeft />
                </Link>
                <PageHeading text={`Add Events`} />
            </div>
            <AddEventsFrom/>
        </>
    )
}

export default AddNewEvent
