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
const overviewData = [
    {
        title: 'Total Amount',
        icon: 'https://i.ibb.co/dpsm0bv/Black.png',
        text: `10% Higher Then Last Years`,
        total: `100k`,
    },
    {
        title: 'Amount Per Class',
        icon: 'https://i.ibb.co/g3DH8Hw/image-2-traced.png',
        text: `10% Higher Then Last Years`,
        total: `15k`,
    },
    {
        title: 'Amount Per Batch',
        icon: 'https://i.ibb.co/VYh2PT6/image-3-traced.png',
        text: `10% Higher Then Last Years`,
        total: `25k`,
    },
    {
        title: 'All Students',
        icon: 'https://i.ibb.co/yQbns7G/image-4-traced.png',
        text: `10% Higher Then Last Years`,
        total: `45`,
    },
    {
        title: 'Withdrawal Amount',
        icon: 'https://i.ibb.co/mNyQ7Rb/Black-1.png',
        text: `10% Higher Then Last Years`,
        total: `500k`,
    },
    {
        title: 'Completed Class Amount',
        icon: 'https://i.ibb.co/cX87vQq/image-6-traced.png',
        text: `10% Higher Then Last Years`,
        total: `1200k`,
    },
]
const chartData = [
    {
        name: 'Sat',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'San',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Mon',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Tue',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Wen',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Thu',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Fry',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },

];
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        profile: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        phone: '(123)123456',
        address: '10 Downing Street',
        department: '10 Downing Street',
        admitionDate: '10 Downing Street',
    },
    {
        key: '1',
        name: 'Mike',
        profile: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        phone: '(123)123456',
        address: '10 Downing Street',
        department: '10 Downing Street',
        admitionDate: '10 Downing Street',
    },
    {
        key: '1',
        name: 'Mike',
        profile: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        phone: '(123)123456',
        address: '10 Downing Street',
        department: '10 Downing Street',
        admitionDate: '10 Downing Street',
    },
    {
        key: '1',
        name: 'Mike',
        profile: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        phone: '(123)123456',
        address: '10 Downing Street',
        department: '10 Downing Street',
        admitionDate: '10 Downing Street',
    },
    {
        key: '1',
        name: 'Mike',
        profile: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        phone: '(123)123456',
        address: '10 Downing Street',
        department: '10 Downing Street',
        admitionDate: '10 Downing Street',
    },
];


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
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: 'Date Of Admition',
        dataIndex: 'admitionDate',
        key: 'admitionDate',
    },
    {
        title: 'Attendance',
        dataIndex: 'Attendance',
        key: 'Attendance',
        render: (_, record) => (
            <>
                <button className="flex justify-center items-center gap-1 py-2 px-6 bg-green-100 text-green-600 rounded-md"> Present</button>
                {/* <button className="flex justify-center items-center gap-1 py-2 px-6 bg-yellow-100 text-yellow-600 rounded-md"> <FaArrowsRotate /> In Progress</button>
            <button className="flex justify-center items-center gap-1 py-2 px-6 bg-red-100 text-red-600 rounded-md"> <RxCross2 /> Not Started</button> */}
            </>
        ),
    },
    {
        title: 'Actions',
        render: (_, record) => (
            <div className="start-center gap-3">
                <CiCircleInfo className="text-[#2492EB]" onClick={() => {
                    console.log(record.key)
                }} /> <RxCross1 onClick={() => {
                    console.log(record.key)
                }} />
            </div>
        ),
        key: 'actions',
    },
];
const RoutineData = [
    {
        key: '1',
        Subject: 'Mike',
        ClassRoom: 'https://i.ibb.co/QKGfq6j/Ellipse-1.png',
        Date: '(123)123456',
        Day: '10 Downing Street',
        Time: '10 Downing Street',
        Status: '10 Downing Street',
        Attendance: '10 Downing Street',
    },

];
const RoutineColumns = [
    {
        title: '#Sl',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Subject',
        dataIndex: 'Subject',
        key: 'Subject',
    },
    {
        title: 'Class Room',
        dataIndex: 'ClassRoom',
        key: 'ClassRoom',
    },
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'Day',
        dataIndex: 'Day',
        key: 'Day',
    },
    {
        title: 'Time',
        dataIndex: 'Time',
        key: 'Time',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
        render: (_, record) => (
            <>
                <button className="flex justify-center items-center gap-1 py-2 px-6 bg-green-100 text-green-600 rounded-md"> <FaCheck /> Completed</button>
                {/* <button className="flex justify-center items-center gap-1 py-2 px-6 bg-yellow-100 text-yellow-600 rounded-md"> <FaArrowsRotate /> In Progress</button>
            <button className="flex justify-center items-center gap-1 py-2 px-6 bg-red-100 text-red-600 rounded-md"> <RxCross2 /> Not Started</button> */}
            </>
        ),
    },
    {
        title: 'Attendance',
        dataIndex: 'Attendance',
        key: 'Attendance',
        render: (_, record) => (
            <>
                <button className="flex justify-center items-center gap-1 py-2 px-6 bg-green-100 text-green-600 rounded-md"> Present</button>
                {/* <button className="flex justify-center items-center gap-1 py-2 px-6 bg-yellow-100 text-yellow-600 rounded-md"> <FaArrowsRotate /> In Progress</button>
            <button className="flex justify-center items-center gap-1 py-2 px-6 bg-red-100 text-red-600 rounded-md"> <RxCross2 /> Not Started</button> */}
            </>
        ),
    },

];


const TeacherDashBoard = () => {
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
                                <p className="text-[#979699] text-sm">new students</p>
                            </div>
                            <p className="text-base font-bold text-center">100 Students</p>
                        </div>
                        <div className="card-shadow px-4  py-1 mb-1 rounded-md">
                            <div className="flex justify-center items-center gap-3 w-fit">
                                <span className="w-3 h-3 bg-[#FA1131] rounded-full"></span>
                                <p className="text-[#979699] text-sm">old students</p>
                            </div>
                            <p className="text-base font-bold text-center">10 Students</p>
                        </div>
                    </div>
                </div>
                {overviewData?.map((item, index) => <OverviewCard key={index} icon={item?.icon} title={item?.title} text={item?.text} total={item?.total} />)}
            </div>

            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">My Classes Routing</p>
                </div>
                <Table pagination={false} dataSource={RoutineData} columns={RoutineColumns} />
            </div>
            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">Student List</p> <Link className="text-[#2492EB]" to={`/teacher/all-student-attendance`}>See All</Link>
                </div>
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
        </>
    )
}

export default TeacherDashBoard
