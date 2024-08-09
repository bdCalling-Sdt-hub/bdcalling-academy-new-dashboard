import { DatePicker, Input, Select, Table } from "antd"
import { useState } from "react";
import useGetRequest from "../Hooks/useGetRequest";
import { useUserData } from "../Providers/UserProviders/UserProvider";
import TeacherStudentGiveAttendance from "./TeacherStudentGiveAttendance";
const TeacherStudentAttendance = () => {
    const [open, setOpen] = useState('student')
    const { useData, loading, isError } = useUserData();
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Teacher_Batch', `/teacher-batch`)
    const BatchOptions = Batch?.map(item => {
        return { label: item?.batch_name, value: item?.batch_id }
    }) || []
    const [batchId, setBatchId] = useState()
    const [date, setDate] = useState()
    const [phone_number, setPhone_number] = useState('')
    const [requestingStudent, Students, StudentError,] = useGetRequest('Teacher_Batch', `/attendances?auth_user=${useData?.id}${batchId && `&batch_id=${batchId}`}${date && `&date=${date}`}${phone_number && `&phone_number=${phone_number}`}`)
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
            title: 'Attendance',
            dataIndex: 'attendance',
            key: 'attendance',
            render: (attendance, record) => {
                return <div className="flex justify-start items-center gap-2">
                    {
                        attendance === 1 ? <button className={`px-4 py-[6px] bg-green-600 text-white  capitalize`}>present</button> : <button className={`px-4 py-[6px] bg-red-600 text-white capitalize`}>absent</button>
                    }



                </div>
            }
        },
    ]
    const data = Students?.data?.map((item, i) => {
        return {
            key: i + 1,
            id: item?.id,
            name: item?.student?.user?.name,
            phone: item?.student?.phone_number,
            email: item?.student?.user?.email,
            batchID: item?.batch?.batch_id,
            attendance: item?.is_present
        }
    })

    return (
        <div>
            <p className='text-2xl font-semibold mt-6'>Students Attendance</p>
            <div className='flex  justify-start items-center gap-3 mt-3'>
                <button onClick={() => setOpen('student')} className={`capitalize px-6 py-2 border rounded-md transition-all hover:bg-blue-700 hover:text-white ${open == 'student' ? 'bg-blue-400 text-white' : ''}`}>
                    all student
                </button>
                <button onClick={() => setOpen('attendance')} className={`capitalize px-6 py-2 border rounded-md transition-all hover:bg-blue-700 hover:text-white ${open == 'student' ? '' : 'bg-blue-400 text-white'}`}>
                    Show Attendance
                </button>
            </div>
            {
                open == 'student' ? <TeacherStudentGiveAttendance /> : <>
                    <div className="flex justify-start items-center gap-2 my-4">
                        <Select placeholder='please select a batch ' className="min-w-44" defaultValue={BatchOptions[0]?.value}
                            options={BatchOptions}
                            onChange={(batch) => setBatchId(batch)}
                        />
                        <DatePicker onChange={(date, dateString) => {
                            setDate(dateString)
                        }} />
                        <Input placeholder="phone number" type="number" onChange={(e) => setPhone_number(e.target.value)} className="max-w-44" />
                    </div>
                    <Table dataSource={data} columns={columns} />
                </>
            }


        </div>
    )
}

export default TeacherStudentAttendance
