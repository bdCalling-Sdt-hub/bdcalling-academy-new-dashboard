import { Table } from "antd"
import { useState } from "react";

const data = [
    {
        key: '1',
        id: '1',
        name: "Student Name",
        phone: '32548587',
        email: 'sdhfuys@gmai8osdf.com',
        courseName: 'Course Name',
        batchID: '36s5dftgsdfes',
        attendance: 1
    },
    {
        key: '2',
        id: '2',
        name: "Student Name",
        phone: '32548587',
        email: 'sdhfuys@gmai8osdf.com',
        courseName: 'Course Name',
        batchID: '36s5dftgsdfes',
        attendance: 0
    },
]

const TeacherStudentAttendance = () => {
    const [presentStudentIds, setPresentStudentIds] = useState([]);//data?.filter(item => item?.attendance === 1).map(item => item?.id) || 
    const columns = [
        {
            title: '#Sl',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Student Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Attendance',
            dataIndex: 'attendance',
            key: 'attendance',
            render: (attendance, record) => {
                return <div className="flex justify-start items-center gap-2">
                    <button onClick={() => {
                        const filter = presentStudentIds.filter(item => item != record?.id)
                        setPresentStudentIds(filter)
                    }} className={`px-4 py-[6px] ${presentStudentIds.includes(record?.id) ? ' bg-red-100 text-red-600' : ' bg-red-600 text-white'} capitalize`}>absent</button>
                    <button onClick={() => {
                        setPresentStudentIds([...presentStudentIds, record?.id])
                    }} className={`px-4 py-[6px] ${presentStudentIds.includes(record?.id) ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}  capitalize`}>present</button>
                </div>
            }
        },
    ]
    const onSubmit = () => {
        const absentStudentIds = data?.filter(item => !presentStudentIds.includes(item?.id)).map(item => item?.id)
        console.log(absentStudentIds, presentStudentIds)
    }
    return (
        <div>
            <p className='text-2xl font-semibold mt-6'>Students Attendance</p>
            {/* <div className='flex  justify-start items-center'>
            </div> */}
            <div className="flex justify-end items-center my-4">
                <button onClick={onSubmit} disabled={presentStudentIds?.length <= 0} className="px-8 py-2 rounded-md text-white bg-blue-400">
                    Submit
                </button>
            </div>
            <Table dataSource={data} columns={columns} />

        </div>
    )
}

export default TeacherStudentAttendance
