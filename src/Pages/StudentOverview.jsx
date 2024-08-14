import OverviewCard from "../Components/Cards/OverviewCard"
import PageHeading from "../Components/Shared/PageHeading"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Table } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaPlay, FaStar } from "react-icons/fa";
import notenrolled from '../assets/notenrolled.png'
import useGetRequest from "../Hooks/useGetRequest";
const overviewData = [
    {
        title: 'Completed Classes',
        icon: 'https://i.ibb.co/dpsm0bv/Black.png',
        text: `10% Higher`,
        total: `14`,
    },
    {
        title: 'Completed Courses',
        icon: 'https://i.ibb.co/g3DH8Hw/image-2-traced.png',
        text: `10% Higher Then Last Years`,
        total: `15k`,
    },
    {
        title: 'Total Payment',
        icon: 'https://i.ibb.co/VYh2PT6/image-3-traced.png',
        text: `10% Higher Then Last Years`,
        total: `25k`,
    },
    {
        title: 'Due Payment',
        icon: 'https://i.ibb.co/yQbns7G/image-4-traced.png',
        text: `10% Higher Then Last Years`,
        total: `45k`,
    },
]
const data = [
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/g3Dhzz2/62b1de2e8e142538f54863b6-What-is-course-design.jpg',
        rating: 5
    },
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/drWwf2f/elearning-education-internet-lessons-online-600nw-2158034833.webp',
        rating: 5
    },
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/g3Dhzz2/62b1de2e8e142538f54863b6-What-is-course-design.jpg',
        rating: 5
    },
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/g3Dhzz2/62b1de2e8e142538f54863b6-What-is-course-design.jpg',
        rating: 5
    },
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/g3Dhzz2/62b1de2e8e142538f54863b6-What-is-course-design.jpg',
        rating: 5
    },
    {
        name: 'Certified UI/UX Designer Course',
        percentage: '30% complete',
        image: 'https://i.ibb.co/g3Dhzz2/62b1de2e8e142538f54863b6-What-is-course-design.jpg',
        rating: 5
    },

]



const StudentOverview = () => {

    const [requestingCourse, Course, CourseError,] = useGetRequest('all-course', `/enrolled-courses`)
    const data = Course?.map(item => {

        return {
            name: item?.batch?.course?.course_name,
            image: `${imageUrl}/${item?.batch?.image}`,
            rating: 5,
            id: item?.id
        }
    })


    return (
        <>
            <PageHeading text={`Overview`} />
            <div className="grid-4">
                {overviewData?.map((item, index) => <OverviewCard key={index} icon={item?.icon} title={item?.title} text={item?.text} total={item?.total} />)}
            </div>
            <div className=" w-full my-6 bg-white card-shadow rounded-md p-2">
                <button className="capitalize py-2 px-6 bg-blue-500 rounded-md text-white">
                    my course
                </button>
            </div>
            <p className="text-4xl font-medium my-6">States in which you are enrolling</p>
            {
                data?.length ?
                    <div className=" w-full my-6 bg-white card-shadow rounded-md grid grid-cols-4 justify-normal items-center gap-6 p-4 ">
                        {
                            data?.map((item, i) => {
                                return <div className="card-shadow w-full h-full" key={i}>
                                    <div className="w-full h-[230px] relative">
                                        <img src={item?.image} className="w-full h-full object-cover" alt="" />
                                        <button className="text-xl p-3 animate-pulse rounded-full bg-white text-blue-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                            <FaPlay />
                                        </button>
                                    </div>
                                    <p className="text-[#0596FF] my-3 px-2 font-semibold text-lg">{item?.name}</p>
                                    <div className="h-[3px] bg-blue-500 w-full"> </div>
                                    <div className="between-center py-3 px-2">
                                        {/* <p>{item?.percentage}% complete</p> */}
                                        <p className="flex justify-end items-center text-yellow-400 text-base gap-1"><FaStar className="-mt-1" /> {item?.rating} </p>
                                    </div>
                                    <div className="center-center mb-4 px-4">
                                        <button to={`/student/student-course/${item?.id}`} className="capitalize w-full py-2 px-6 bg-blue-500 rounded-md text-white">
                                            Continue Course
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div> :
                    <div>
                        <div className="center-center card-shadow flex-col mb-3 p-4">
                            <img className="" src={notenrolled} alt="" />
                            <p className="text-4xl font-medium my-6">You are not enrolled in any courses</p>
                            <p>You are not enrolled in any course. Browse the course again</p>
                            {/* <button className="capitalize py-2 px-6 bg-blue-500 rounded-md text-white mt-2">
                        Browse courses
                    </button> */}
                        </div>
                    </div>

            }

        </>
    )
}

export default StudentOverview
