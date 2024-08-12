import OverviewCard from "../Components/Cards/OverviewCard"
import PageHeading from "../Components/Shared/PageHeading"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Table } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import useGetRequest from "../Hooks/useGetRequest";
import { imageUrl } from "../AxiosConfig/useAxiosConfig";

const chartData = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Mar',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Apr',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'May',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Jun',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'July',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Aug',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Sep',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

// const items = [
//     {
//         key: '1',
//         label: (
//             <button>
//                 2024
//             </button>
//         ),
//     },
//     {
//         key: '2',
//         label: (
//             <button>
//                 2023
//             </button>
//         ),
//     },
//     {
//         key: '3',
//         label: (
//             <button>
//                 2022
//             </button>
//         ),
//     },
//     {
//         key: '4',
//         label: (
//             <button>
//                 2021
//             </button>
//         ),
//     },
// ];
const Overview = () => {
    const [requestingDashboardOverview, DashboardOverview, DashboardOverviewError,] = useGetRequest('Dashboard', `/dashboard`)
    const [requestingStudents, Students, StudentsError, refetch, isError] = useGetRequest('Students', `/students?page=1`)
    const [requestingStudentRatio, StudentRatio, StudentRatioError] = useGetRequest('Ratio', `/student-ratio?year=${new Date().getFullYear()}`)
    console.log(StudentRatio)
    const dataSource = Students?.data?.map((item, i) => {
        return {
            key: i + 1,
            name:item?.user?.name,
            profile:item?.user?.image ?`${imageUrl}/${item?.user?.image}` : 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
            phone: item?.phone_number,
            address: item?.address,
            gender: item?.gender,
            registration_date: item?.registration_date,
        }
    })
    const overviewData = [
        {
            title: 'Total Earning',
            icon: 'https://i.ibb.co/dpsm0bv/Black.png',
            text: `10% Higher Then Last Years`,
            total: `${Number(DashboardOverview?.data?.total_income / 1000).toFixed(1)}K`,
        },
        {
            title: 'Daily Earning',
            icon: 'https://i.ibb.co/g3DH8Hw/image-2-traced.png',
            text: `10% Higher Then Last Years`,
            total: `${Number(DashboardOverview?.data?.daily_income / 1000).toFixed(1)}K`,
        },
        {
            title: 'Weekly Earning',
            icon: 'https://i.ibb.co/VYh2PT6/image-3-traced.png',
            text: `10% Higher Then Last Years`,
            total: `${Number(DashboardOverview?.data?.weekly_income / 1000).toFixed(1)}K`,
        },
        {
            title: 'Monthly Earning',
            icon: 'https://i.ibb.co/yQbns7G/image-4-traced.png',
            text: `10% Higher Then Last Years`,
            total: `${Number(DashboardOverview?.data?.monthly_income / 1000).toFixed(1)}K`,
        },
        {
            title: 'Total Students',
            icon: 'https://i.ibb.co/mNyQ7Rb/Black-1.png',
            text: `10% Higher Then Last Years`,
            total: DashboardOverview?.data?.total_student,
        },
        {
            title: 'Running Students',
            icon: 'https://i.ibb.co/cX87vQq/image-6-traced.png',
            text: `10% Higher Then Last Years`,
            total: DashboardOverview?.data?.running_student,
        },
        {
            title: 'Course Complete',
            icon: 'https://i.ibb.co/1QnHryG/image-7-traced.png',
            text: `10% Higher Then Last Years`,
            total: DashboardOverview?.data?.complete_course,
        },
        {
            title: 'Total Trainer',
            icon: 'https://i.ibb.co/ZMNgdfV/image-8-traced.png',
            text: `10% Higher Then Last Years`,
            total: DashboardOverview?.data?.total_trainer,
        },
    ]
    const columns = [
        {
            title: '#Sl',
            dataIndex: 'profile',
            render: (_, record) => (
                <img className="w-8 h-8 rounded-full" src={record.profile} alt="" />
            ),
            key: 'profile',
        },
        {
            title: 'Student Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registration_date',
            key: 'registration_date',
        },
    ];
    return (
        <>
            <PageHeading text={`Overview`} />
            <div className="grid-4">
                {overviewData?.map((item, index) => <OverviewCard key={index} icon={item?.icon} title={item?.title} text={item?.text} total={item?.total} />)}
            </div>
            <div className=" w-full my-6 bg-white card-shadow rounded-md">
                <div className="between-center gap-3 px-8">
                    <div className="start-center gap-16">
                        <p className="section-title">Students Ratio</p>
                        {/* <Link to={`#`}>
                            See All
                        </Link> */}
                        {/* <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <button onClick={(e) => e.preventDefault()}>
                                <Space>
                                    2024
                                    <DownOutlined />
                                </Space>
                            </button>
                        </Dropdown> */}
                    </div>
                    <div className="flex justify-end items-center gap-5 w-full">
                        <div className="flex justify-end items-center gap-3 w-fit">
                            <span className="w-3 h-3 bg-[#2492EB] rounded-full"></span>
                            <p className="text-[#979699] text-sm">new students</p>
                        </div>
                        <div className="flex justify-end items-center gap-3 w-fit">
                            <span className="w-3 h-3 bg-[#2BA24C] rounded-full"></span>
                            <p className="text-[#979699] text-sm">old students</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[400px] p-2">
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
                            <YAxis />
                            <Bar dataKey="pv" fill="#2492EB" />
                            <Bar dataKey="uv" fill="#2BA24C" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">Student List</p> <Link className="text-[#2492EB]" to={`/all-students`}>See All</Link>
                </div>
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
        </>
    )
}

export default Overview
