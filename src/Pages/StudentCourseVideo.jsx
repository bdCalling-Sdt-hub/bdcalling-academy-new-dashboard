import { FaPlay, FaStar } from "react-icons/fa"
import PageHeading from "../Components/Shared/PageHeading"
import { Link } from "react-router-dom"

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

const StudentCourseVideo = () => {
    return (
        <>
            <PageHeading text={`All Course Video`} />
            <div className=" w-full my-6 mt-0 bg-white card-shadow rounded-md grid grid-cols-4 justify-normal items-center gap-6 p-4 ">
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
                                <p>{item?.percentage}% complete</p>
                                <p className="flex justify-end items-center text-yellow-400 text-base gap-1"><FaStar className="-mt-1" /> {item?.rating} </p>
                            </div>
                            <div className="center-center mb-4 px-4">
                                <Link to={`/student/student-course`} className="capitalize w-full py-2 px-6 bg-blue-500 rounded-md text-white">
                                    Continue Course
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default StudentCourseVideo
