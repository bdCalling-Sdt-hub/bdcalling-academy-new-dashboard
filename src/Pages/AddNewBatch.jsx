import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
import BatchForm from '../Components/Cards/BatchForm'

const AddNewBatch = () => {
    return (
        <>
            <div className='start-center gap-2 '>
                <Link to={-1} className='text-xl p-2 bg-white card-shadow rounded-md'>
                    <MdOutlineArrowBackIos />
                </Link>
                <PageHeading text={`Add Batch`} />
            </div>
            <BatchForm />
        </>
    )
}

export default AddNewBatch
