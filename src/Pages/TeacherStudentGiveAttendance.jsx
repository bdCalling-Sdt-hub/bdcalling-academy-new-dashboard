import { Input, Modal, Select, Table } from "antd"
import { useEffect, useState } from "react";
import useGetRequest from "../Hooks/useGetRequest";
import { useUserData } from "../Providers/UserProviders/UserProvider";
import usePostRequestJson from "../Hooks/usePostRequestJson";
import { useForm } from "react-hook-form";
import usePostRequest from "../Hooks/usePostRequest";
import { imageUrl } from "../AxiosConfig/useAxiosConfig";
const TeacherStudentGiveAttendance = () => {
    const [openFollowUpModal, setOpenFollowUpModal] = useState(false)
    const { register: registerMassage, handleSubmit: handleMassage, formState: { errors: MassageError } } = useForm();
    const { useData, loading, isError } = useUserData();
    const { mutate, isLoading, data: postData, error } = usePostRequestJson('attendances', '/attendances');
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Teacher_Batch', `/teacher-batch`)
    const [presentStudentIds, setPresentStudentIds] = useState([]);//data?.filter(item => item?.attendance === 1).map(item => item?.id) || 
    const [filterData, setFilterData] = useState({})
    const { mutate: followUpMessage, isLoading: messageLoading, data: MessageData, error: MessageError } = usePostRequest('follow', '/feedbacks');
    const BatchOptions = Batch?.map(item => {
        return { label: item?.batch_name, value: item?.batch_id }
    }) || []
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
        {
            title: 'Auctions',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => {
                return <div className="flex justify-start items-center gap-2">
                    <button onClick={() => {
                        setFilterData(record)
                        setOpenFollowUpModal(true)
                    }} className={`px-4 py-[6px] bg-yellow-600 text-white  capitalize rounded-md`}>Feedback</button>
                </div>
            }
        },
    ]
    const [batchId, setBatchId] = useState(BatchOptions[0]?.value)
    const [phone_number, setPhone_number] = useState('')
    const [name, setName] = useState('')
    const [requestingStudents, Students, StudentsError,] = useGetRequest('showAdmitStudent', `/show-admit-student?batch_id=${batchId}${phone_number && `&phone_number=${phone_number}`}${name && `&name=${name}`}`)
    const data = Students?.data?.[0]?.students?.map((item, i) => {
        return {
            key: i + 1,
            id: item?.id,
            name: item?.user?.name,
            phone: item?.phone_number,
            email: item?.user?.email,
            courseName: Students?.data?.[0]?.course?.course_name,
            batchID: Students?.data?.[0]?.id,
            attendance: 0,
            studentID: item?.user?.id,
            image:item?.user?.image
        }
    })
    const onSubmit = () => {
        const absentStudentIds = data?.filter(item => !presentStudentIds.includes(item?.id)).map(item => item?.id)
        const presents = presentStudentIds.map(item => {
            return {
                "student_id": item,
                "is_present": true
            }
        })
        const absents = absentStudentIds.map(item => {
            return {
                "student_id": item,
                "is_present": false
            }
        })
        const date = new Date();

        const AttendanceData = {
            batch_id: Students?.data?.[0]?.id,
            date: date.toISOString().split('T')[0],
            attendance_by: useData?.id,
            attendances: [...presents, ...absents]
        }
        console.log(postData)
        mutate(AttendanceData)
    }
    const HandleSendMassage = (value) => {
        const data = {
            user_id: filterData.studentID,
            feedback: value.comment
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        followUpMessage(formData)
    }
    useEffect(() => {
        if (messageLoading) return
        if (MessageData) setOpenFollowUpModal(false)
    }, [messageLoading, MessageData])
    return (
        <div>
            <p className='text-2xl font-semibold mt-6'>Students Attendance</p>
            <div className="flex justify-between items-center my-4">
                <div className="flex justify-start items-center gap-2">
                    <Select placeholder='please select a batch ' className="min-w-44" defaultValue={BatchOptions[0]?.value}
                        options={BatchOptions}
                        onChange={(batch) => setBatchId(batch)}
                    />
                    <Input placeholder="phone number" type="number" onChange={(e) => setPhone_number(e.target.value)} className="max-w-44" />
                    <Input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} className="max-w-44" />
                </div>
                <button onClick={onSubmit} disabled={presentStudentIds?.length <= 0} className="px-4 py-2 rounded-md text-white bg-blue-400 hover:bg-blue-700 transition-all whitespace-nowrap">
                    Submit Attendance
                </button>
            </div>
            <Table dataSource={data} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openFollowUpModal}
                onCancel={() => setOpenFollowUpModal(false)}
            >
                <div className=''>
                    <h3 className='section-title -mt-7'>Follow Up Comments</h3>
                    <form onSubmit={handleMassage(HandleSendMassage)} className='border border-[var(--primary-bg)] rounded-md p-2'>
                        <div className='start-center gap-3'>
                            send message to  <img src={`${imageUrl}/${filterData?.image}`} className='h-8 w-8 rounded-full' alt="" /> <p className='text-base font-semibold'>{filterData?.name}</p>
                        </div>
                        <textarea className='resize-none w-full border rounded-md outline-none mt-5 min-h-32 p-2' {...registerMassage('comment', { required: true })} />
                        {MassageError.comment && <p className='text-red-500'>comment is required <sup className=''>*</sup></p>}
                        <div className='between-center mt-2'>
                            <div className='start-center gap-2'>
                                <span className={`cursor-pointer w-5 h-5  bg-[#2492EB] border-[#2492EB] border rounded-full`}></span>
                                <span className={`cursor-pointer w-5 h-5 bg-[#2BA24C] border-[#2BA24C] border rounded-full`}></span>
                                <span className={`cursor-pointer w-5 h-5 bg-[#FFC60B] border-[#FFC60B] border rounded-full`}></span>
                            </div>
                            {/* <div className='start-center gap-2'>
                                <span onClick={() => colorHandeler('blue')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'blue') ? 'bg-[#2492EB]' : 'bg-transparent')} border-[#2492EB] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('green')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'green') ? 'bg-[#2BA24C]' : 'bg-transparent')} border-[#2BA24C] border rounded-full`}></span>
                                <span onClick={() => colorHandeler('yellow')} className={`cursor-pointer w-5 h-5 ${(colorType.find(item => item == 'yellow') ? 'bg-[#FFC60B]' : 'bg-transparent')} border-[#FFC60B] border rounded-full`}></span>
                            </div> */}
                            <button className='btn-primary max-w-32'>Send Comment</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}


export default TeacherStudentGiveAttendance
