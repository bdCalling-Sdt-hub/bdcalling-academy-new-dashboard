import OverviewCard from "../Components/Cards/OverviewCard"
import PageHeading from "../Components/Shared/PageHeading"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Table } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import useGetRequest from "../Hooks/useGetRequest";
import { imageUrl } from "../AxiosConfig/useAxiosConfig";
// const chartData = [
//     {
//         name: 'Sat',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'San',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Mon',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Tue',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Wen',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Thu',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Fry',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },

// ];

const TeacherDashBoard = () => {
    const [requestingRoutine, Routine, routineError, refetch] = useGetRequest('routines', `/routines`)
    const [requestingStudents, Students, StudentsError, isError] = useGetRequest('AuthStudents', `/students`);
    const [requestingOverview, Overview, OverviewError] = useGetRequest('teacher-dashboard', `/teacher-dashboard`);
    console.log('Overview', Overview)
    const TableData = Students?.data?.map((item, index) => {
        return {
            key: index + 1,
            name: item?.user?.name,
            email: item?.user?.email,
            phone_number: item?.phone_number,
            img: `${imageUrl}/${item?.image}` || ProfileImage,
            course: item?.category?.category_name,
            _id: item?.id,
            gender: item?.gender,
            religion: item?.religion,
            registration_date: item?.registration_date,
            category_id: item?.category_id,
            blood_group: item?.blood_group,
            dob: item?.dob,
            address: item?.address,
            messages: item?.messages
        }
    })
    // 'Overview'
    //  Overview:

    //   {
    //     total_batch: 0,
    //     total_amount: 0,
    //     total_class: 0,
    //     total_student: 0,
    //     amount_per_class_or_per_month: {
    //       id: 25,
    //       user_id: 102,
    //       course_category_id: 6,
    //       phone_number: '411',
    //       designation: 'Provident expedita',
    //       expert: 'Quidem culpa cillum',
    //       image: null,
    //       created_by: null,
    //       status: 'active',
    //       payment_type: 'monthly',
    //       payment_method: 'Nagad',
    //       payment: '63',
    //       created_at: '2024-08-14T09:58:18.000000Z',
    //       updated_at: '2024-08-14T09:58:18.000000Z'
    //     },
    //     total_attendance: 3,
    //     attendance_comparison: {
    //       Saturday: { this_week: 0, last_week: 0 },
    //       Sunday: { this_week: 0, last_week: 0 },
    //       Monday: { this_week: 0, last_week: 0 },
    //       Tuesday: { this_week: 0, last_week: 0 },
    //       Wednesday: { this_week: 0, last_week: 0 },
    //       Thursday: { this_week: 0, last_week: 0 },
    //       Friday: { this_week: 0, last_week: 0 }
    //     }
    //   }
    const chartData = [
        {
            name: 'Sat',
            uv:  Overview?.attendance_comparison?.Saturday?.last_week,
            pv: Overview?.attendance_comparison?.Saturday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'San',
            uv:  Overview?.attendance_comparison?.Sunday?.last_week,
            pv: Overview?.attendance_comparison?.Sunday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'Mon',
            uv:  Overview?.attendance_comparison?.Monday?.last_week,
            pv: Overview?.attendance_comparison?.Monday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'Tue',
            uv:  Overview?.attendance_comparison?.Tuesday?.last_week,
            pv: Overview?.attendance_comparison?.Tuesday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'Wen',
            uv:  Overview?.attendance_comparison?.Wednesday?.last_week,
            pv: Overview?.attendance_comparison?.Wednesday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'Thu',
            uv:  Overview?.attendance_comparison?.Thursday?.last_week,
            pv: Overview?.attendance_comparison?.Thursday?.this_week,
            amt: Overview?.total_student,
        },
        {
            name: 'Fry',
            uv:  Overview?.attendance_comparison?.Friday?.last_week,
            pv: Overview?.attendance_comparison?.Friday?.this_week,
            amt: Overview?.total_student,
        },

    ];

    const overviewData = [
        {
            title: 'Total Amount',
            icon: 'https://i.ibb.co/dpsm0bv/Black.png',
            // text: `10% Higher Then Last Years`,
            total: `${Overview?.total_amount}`,
        },
        {
            title: 'Amount Per Class',
            icon: 'https://i.ibb.co/g3DH8Hw/image-2-traced.png',
            // text: `10% Higher Then Last Years`,
            total: `${Overview?.amount_per_class_or_per_month?.payment}TK`,
        },
        {
            title: 'Total Attendance',
            icon: 'https://i.ibb.co/VYh2PT6/image-3-traced.png',
            // text: `10% Higher Then Last Years`,
            total: `${Overview?.total_attendance}`,
        },
        {
            title: 'All Students',
            icon: 'https://i.ibb.co/yQbns7G/image-4-traced.png',
            text: `10% Higher Then Last Years`,
            total: `${Overview?.total_student}`,
        },
        {
            title: 'Total Batch',
            icon: 'https://i.ibb.co/mNyQ7Rb/Black-1.png',
            // text: `10% Higher Then Last Years`,
            total: `${Overview?.total_batch}`,
        },
        {
            title: 'Total Class',
            icon: 'https://i.ibb.co/cX87vQq/image-6-traced.png',
            // text: `10% Higher Then Last Years`,
            total: `${Overview?.total_class}`,
        },
    ]
    const routineData = Routine?.data?.data?.map(item => {
        return { key: item?.id, batch: item?.batch?.batch_name, batchID: item?.batch?.batch_id, time: item?.time, date: item?.date, moduleName: item?.course_module?.module_title }
    })

    const studentColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registration_date',
            key: 'registration_date',
        },

    ];

    const columns = [
        {
            title: 'Module Name',
            dataIndex: 'moduleName',
            key: 'moduleName',
        },
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
        },
        {
            title: 'Batch ID ',
            dataIndex: 'batchID',
            key: 'batchID',
        },
        {
            title: 'Select Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Select Date',
            dataIndex: 'date',
            key: 'date',
        },

    ];


    return (
        <>
            <PageHeading text={`Overview`} />
            <div className="grid-4">
                <div className="row-span-2 w-full h-full card-shadow bg-white rounded-md">
                    <div className="between-center gap-3 px-8">
                        <div className="start-center gap-16 mt-2">
                            <p className="text-base whitespace-nowrap">Students Ratio</p>
                            <p className="text-sm text-end w-full">this week</p>
                        </div>
                    </div>
                    <div className="w-full h-[250px] p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                {/* <YAxis /> */}
                                <Bar dataKey="pv" fill="#2492EB" />
                                <Bar dataKey="uv" fill="#FA1131" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center items-center gap-5 w-full">
                        <div className="card-shadow px-4  py-1 mb-1 rounded-md">
                            <div className="flex justify-center items-center gap-3 w-fit">
                                <span className="w-3 h-3 bg-[#2492EB] rounded-full"></span>
                                <p className="text-[#979699] text-sm">Absent students</p>
                            </div>
                            {/* <p className="text-base font-bold text-center">100 Students</p> */}
                        </div>
                        <div className="card-shadow px-4  py-1 mb-1 rounded-md">
                            <div className="flex justify-center items-center gap-3 w-fit">
                                <span className="w-3 h-3 bg-[#FA1131] rounded-full"></span>
                                <p className="text-[#979699] text-sm">present students</p>
                            </div>
                            {/* <p className="text-base font-bold text-center">10 Students</p> */}
                        </div>
                    </div>
                </div>
                {overviewData?.map((item, index) => <OverviewCard key={index} icon={item?.icon} title={item?.title} text={item?.text} total={item?.total} />)}
            </div>

            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">My Classes Routing</p>
                    <Link className="text-[#2492EB]" to={`/teacher/class-routine`}>See All</Link>
                </div>
                <Table dataSource={routineData?.slice(0, 5)} pagination={false} columns={columns} />
            </div>
            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">Student List</p> <Link className="text-[#2492EB]" to={`/teacher/all-student`}>See All</Link>
                </div>
                <Table
                    columns={studentColumns}
                    dataSource={TableData?.slice[0, 5] || []}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default TeacherDashBoard
