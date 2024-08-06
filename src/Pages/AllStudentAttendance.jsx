import { Table } from "antd";
import { CiCircleInfo } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

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

const AllStudentAttendance = () => {
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
    
    return (
        <>
            <div className="bg-white Student-List my-6 rounded-md">
                <div className="between-center px-4">
                    <p className="section-title">Student List</p> <Link className="text-[#2492EB]" to={`/`}>See All</Link>
                </div>
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
        </>
    )
}

export default AllStudentAttendance
