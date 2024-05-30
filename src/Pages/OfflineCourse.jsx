import { FaPlus } from "react-icons/fa"
import PageHeading from '../Components/Shared/PageHeading'
import CoursesCard from "../Components/Cards/CoursesCard"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const data = [
    {
        _id: '1',
        batch: '3',
        courseType: 'offline',
        availableSeat: '18',
        deadline: '12 days left',
        title: 'Certified UI/UX Designer Course',
        price: '15,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '2',
        batch: '2',
        courseType: 'online',
        availableSeat: '10',
        deadline: '7 days left',
        title: 'Full Stack Web Development',
        price: '20,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '3',
        batch: '1',
        courseType: 'offline',
        availableSeat: '25',
        deadline: '20 days left',
        title: 'Digital Marketing Mastery',
        price: '12,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '4',
        batch: '4',
        courseType: 'online',
        availableSeat: '8',
        deadline: '5 days left',
        title: 'Data Science Bootcamp',
        price: '30,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '5',
        batch: '3',
        courseType: 'offline',
        availableSeat: '15',
        deadline: '10 days left',
        title: 'Graphic Design Fundamentals',
        price: '10,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '6',
        batch: '5',
        courseType: 'online',
        availableSeat: '20',
        deadline: '15 days left',
        title: 'Cyber Security Essentials',
        price: '25,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '7',
        batch: '1',
        courseType: 'offline',
        availableSeat: '12',
        deadline: '18 days left',
        title: 'Mobile App Development with Flutter',
        price: '22,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '8',
        batch: '2',
        courseType: 'online',
        availableSeat: '5',
        deadline: '3 days left',
        title: 'Machine Learning with Python',
        price: '35,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '9',
        batch: '3',
        courseType: 'offline',
        availableSeat: '18',
        deadline: '11 days left',
        title: 'Blockchain and Cryptocurrency',
        price: '28,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '10',
        batch: '4',
        courseType: 'online',
        availableSeat: '30',
        deadline: '25 days left',
        title: 'Advanced Java Programming',
        price: '15,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '11',
        batch: '2',
        courseType: 'offline',
        availableSeat: '16',
        deadline: '14 days left',
        title: 'Cloud Computing with AWS',
        price: '27,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '12',
        batch: '3',
        courseType: 'online',
        availableSeat: '22',
        deadline: '8 days left',
        title: 'Artificial Intelligence for Beginners',
        price: '32,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '13',
        batch: '1',
        courseType: 'offline',
        availableSeat: '9',
        deadline: '6 days left',
        title: 'Big Data Analytics',
        price: '18,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '14',
        batch: '2',
        courseType: 'online',
        availableSeat: '12',
        deadline: '9 days left',
        title: 'Internet of Things (IoT) Development',
        price: '24,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '15',
        batch: '5',
        courseType: 'offline',
        availableSeat: '14',
        deadline: '13 days left',
        title: 'Robotics Engineering',
        price: '29,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '16',
        batch: '3',
        courseType: 'online',
        availableSeat: '7',
        deadline: '4 days left',
        title: 'Introduction to Quantum Computing',
        price: '40,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '17',
        batch: '1',
        courseType: 'offline',
        availableSeat: '20',
        deadline: '16 days left',
        title: 'Ethical Hacking and Penetration Testing',
        price: '26,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '18',
        batch: '4',
        courseType: 'online',
        availableSeat: '25',
        deadline: '19 days left',
        title: 'Software Project Management',
        price: '23,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '19',
        batch: '2',
        courseType: 'offline',
        availableSeat: '30',
        deadline: '21 days left',
        title: 'ITIL Foundation Certification',
        price: '14,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '20',
        batch: '3',
        courseType: 'online',
        availableSeat: '10',
        deadline: '7 days left',
        title: 'Advanced PHP and MySQL',
        price: '17,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    },
    {
        _id: '21',
        batch: '5',
        courseType: 'offline',
        availableSeat: '18',
        deadline: '10 days left',
        title: 'Python Programming for Beginners',
        price: '12,000 BDT',
        banner: 'https://i.ibb.co/17zDbvT/Rectangle-138.png'
    }
]


const OfflineCourse = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = data.length
    const [itemPerPage, setItemPerPage] = useState(8)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    return (
        <>
            <div className="between-center gap-2">
                <PageHeading text={`Overview`} />
                <div className="flex justify-end items-center">
                    <Link to={`/add-course`} onClick={() => {
                    }} className="btn-primary"><FaPlus /> Add Course</Link>
                </div>
            </div>
            <div className="grid-4">
                {
                    data?.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map(item => <CoursesCard key={item?._id} item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/offline-course?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/offline-course?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/offline-course?page=${Number(page) + 1}`)
                    setPage(Number(page) + 1)
                }} className={`rounded-sm m-1 h-10 w-16 block bg-[var(--primary-bg)] text-white`}>prev</button>
            </div>
        </>
    )
}

export default OfflineCourse
