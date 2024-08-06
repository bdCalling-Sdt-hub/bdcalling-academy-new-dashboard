import React, { useState } from 'react'
import EventsCard from '../Components/Cards/EventsCard'
import PageHeading from '../Components/Shared/PageHeading'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import useGetRequest from '../Hooks/useGetRequest'
import { Pagination } from 'antd'


const AddEvents = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const navigate = useNavigate()
    const [requestingEvents, Events, EventsError, refetch, isError] = useGetRequest('Events', `/event?page=${page}`)
    console.log(Events)
    const EventData = Events?.data?.data?.map(item => {
        return {
            "id": item?.id,
            "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
            "date": item?.date,
            "time": item?.time,
            "end_time": item?.end_time,
            "status": item?.status == 1 ? "Online" : "Offline",
            "location": item?.locations,
            "courseName": item?.course_name
        }
    })
    return (
        <>
            <div className='between-center'>
                <PageHeading text={`All Events`} /> <Link to={`/add-new-event`} className='btn-primary max-w-44'><FaPlus /> Add Events</Link>
            </div>
            <div className='grid-3'>
                {
                    EventData?.map(item => <EventsCard refetch={refetch} item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">

                <Pagination defaultCurrent={page} pageSize={9} total={Events?.data?.total} showSizeChanger={false} onChange={(page, pageSize) => {
                    setPage(page)
                }} />
            </div>
        </>
    )
}

export default AddEvents
