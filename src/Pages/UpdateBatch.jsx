import React from 'react'
import BatchForm from '../Components/Cards/BatchForm'
import { Link } from 'react-router-dom'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineArrowBackIos } from 'react-icons/md'

const UpdateBatch = () => {
    return (
        <>
        <div className='start-center gap-2 '>
                <Link to={-1} className='text-xl p-2 bg-white card-shadow rounded-md'>
                    <MdOutlineArrowBackIos />
                </Link>
                <PageHeading text={`Update Batch`} />
            </div>
            <BatchForm />
        </>
    )
}

export default UpdateBatch
