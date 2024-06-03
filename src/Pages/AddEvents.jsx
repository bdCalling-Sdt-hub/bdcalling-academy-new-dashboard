import React, { useState } from 'react'
import EventsCard from '../Components/Cards/EventsCard'
import PageHeading from '../Components/Shared/PageHeading'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
const EventData = [
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "28 July, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Mobile Application UI Design"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "29 July, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Web Development Fundamentals"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "30 July, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Data Science Basics"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "31 July, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Digital Marketing Strategies"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "1 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Cloud Computing Essentials"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "2 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Cybersecurity Basics"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "3 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Machine Learning Introduction"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "4 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Artificial Intelligence Overview"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "5 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Blockchain Technology"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "6 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Internet of Things (IoT)"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "7 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Big Data Analytics"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "8 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "DevOps Practices"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "9 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Mobile Game Development"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "10 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "UI/UX Design Principles"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "11 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Software Testing Methods"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "12 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Graphic Design Basics"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "13 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "IT Project Management"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "14 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Networking Fundamentals"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "15 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Agile Methodologies"
    },
    {
        "img": "https://i.ibb.co/z7f84SW/Rectangle-77.png",
        "date": "16 August, 2023",
        "time": "4:00 pm - 6:00 pm",
        "status": "Online",
        "location": "Daisy Garden, House 14 (Level-5), Block: A, Main Road, Banasree, Dhaka.",
        "courseName": "Business Intelligence"
    }
]

const AddEvents = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = EventData.length
    const [itemPerPage, setItemPerPage] = useState(9)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    return (
        <>
        <div className='between-center'>
            <PageHeading text={`All Events`} /> <Link to={`/add-new-event`} className='btn-primary max-w-44'><FaPlus /> Add Events</Link>
        </div>
            <div className='grid-3'>
                {
                    EventData.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map(item => <EventsCard item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/add-events?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/add-events?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/add-events?page=${Number(page) + 1}`)
                    setPage(Number(page) + 1)
                }} className={`rounded-sm m-1 h-10 w-16 block bg-[var(--primary-bg)] text-white`}>prev</button>
            </div>
        </>
    )
}

export default AddEvents
