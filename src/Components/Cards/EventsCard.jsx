import React, { useEffect } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { Link } from 'react-router-dom';
import useDeleteRequest from '../../Hooks/useDeleteRequest';
import toast from 'react-hot-toast';

const EventsCard = ({ item, refetch }) => {
    const { id, img, date, time, status, location, courseName } = item;
    const { mutate: DeleteEvent, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('Events', `/event/${id}`);
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete this event</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteEvent()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    useEffect(() => {
        if (DeleteData) refetch()
    }, [DeleteData])
    return (
        <div className='p-4 bg-white rounded-md card-shadow'>
            <div className='w-full h-[250px] rounded-md overflow-hidden'>
                <img src={img} className='w-full h-full object-contain' alt="" />
            </div>
            <div className='between-center my-4'>
                <p className='start-center gap-2 text-sm'><CiCalendarDate className='text-xl text-[var(--primary-bg)]' /> {date}</p>
                <p className='start-center gap-2 text-sm'><IoMdTime className='text-xl text-[var(--primary-bg)]' /> {time}</p>
                <p className='p-[2px] px-2 rounded-md bg-[var(--primary-bg)] text-sm text-white'>{status}</p>
            </div>
            <p className='start-start gap-2 text-sm'><FaLocationCrosshairs className='text-xl text-[var(--primary-bg)]' /> {location}</p>
            <p className='text-[#333333] text-lg font-medium py-3' >{courseName}</p>
            <div className='between-center'>
                <button onClick={handleDelete} className='text-[var(--primary-bg)] border border-[var(--primary-bg)] rounded-md py-[6px] px-4 hover:scale-105 active:scale-95 transition-all'>Delete Events</button>
                <Link to={`/update-event/${id}`} className='max-w-36 btn-primary'>Edit Events</Link>
            </div>
        </div>
    )
}

export default EventsCard
