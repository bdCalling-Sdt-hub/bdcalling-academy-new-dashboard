import { FaPlay, FaStar } from "react-icons/fa"
import PageHeading from "../Components/Shared/PageHeading"
import { Link } from "react-router-dom"
import useGetRequest from "../Hooks/useGetRequest"
import { imageUrl } from "../AxiosConfig/useAxiosConfig"

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
    const [requestingCourse, Course, CourseError,] = useGetRequest('all-course', `/all-course`)
    const data = Course?.data?.map(item => {
        // {
        //     id: 95,
        //     course_id: 17,
        //     batch_id: 'BCA-ELI-2405',
        //     batch_name: 'Mufutau Rivera',
        //     start_date: '2024-07-31',
        //     end_date: '2024-07-31',
        //     seat_limit: 89,
        //     seat_left: 89,
        //     image: 'adminAsset/image/1203880586.gif',
        //     discount_price: 941,
        //     created_at: '2024-07-15T10:16:49.000000Z',
        //     updated_at: '2024-07-15T10:16:49.000000Z',
        //     course: {
        //       id: 17,
        //       course_category_id: 3,
        //       course_name: 'Elizabeth Hughes',
        //       language: 'Consectetur culpa qu',
        //       course_details: 'Est voluptate excep',
        //       course_time_length: 'Accusantium sit dol',
        //       price: '247',
        //       max_student_length: null,
        //       skill_Level: 'Asperiores nesciunt',
        //       address: 'Beatae aperiam ex al',
        //       thumbnail: 'adminAsset/image/358687653.png',
        //       career_opportunities: [ 'Quia quis quae labor' ],
        //       curriculum: [ 'Explicabo Aute est ' ],
        //       tools: [ 'Laborum Consequatur' ],
        //       job_position: [ 'Accusantium commodo ' ],
        //       popular_section: 0,
        //       status: 'pending',
        //       course_type: 'offline',
        //       created_at: '2024-07-10T06:13:27.000000Z',
        //       updated_at: '2024-07-10T06:13:27.000000Z'
        //     }
        //   }
        return {
            name: item?.course?.course_name,
            percentage: '30% complete',
            image: `${imageUrl}/${item?.image}`,
            rating: 5,
            id:item?.course_id
        }
    })

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
                                <p>{item?.percentage}</p>
                                <p className="flex justify-end items-center text-yellow-400 text-base gap-1"><FaStar className="-mt-1" /> {item?.rating} </p>
                            </div>
                            <div className="center-center mb-4 px-4">
                                <Link to={`/student/student-course/${item?.id}`} className="capitalize w-full py-2 px-6 bg-blue-500 text-center rounded-md text-white">
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
