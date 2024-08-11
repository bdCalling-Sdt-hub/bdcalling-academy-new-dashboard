import { DatePicker, Input, Select, Table } from "antd"
import { useState } from "react";
import useGetRequest from "../Hooks/useGetRequest";
import { useUserData } from "../Providers/UserProviders/UserProvider";
import { imageUrl } from "../AxiosConfig/useAxiosConfig";
const StudentsAttendance = () => {
    const [Page, setPage] = useState(1)
    const { useData, loading, isError } = useUserData();
    const [requestingBatch, Batch, BatchError,] = useGetRequest('Batch', `/batches`)
    const BatchOptions = Batch?.data?.data?.map(item => {
        return { label: item?.batch_name, value: item?.batch_id }
    }) || []
    const [batchId, setBatchId] = useState()
    const [date, setDate] = useState()
    const [phone_number, setPhone_number] = useState('')
    const [requestingStudent, Students, StudentError,] = useGetRequest('Teacher_Batch', `/attendances?page=${Page}${batchId && `&batch_id=${batchId}`}${date ? `&date=${date}`:""}${phone_number ? `&phone_number=${phone_number}`:''}`)
    const data = Students?.data?.map((item, i) => {
        return {
            "key": i + 1,
            "_id": item?.student_id,
            "name": item?.student?.user?.name,
            "Batch no": item?.batch?.batch_id,
            "phone": item?.student?.phone_number,
            "email": item?.student?.user?.email,
            "batch": item?.batch?.batch_name,
            "status": "Absent",
            "date": item?.date,
            "img": `${imageUrl}/${item?.student?.image}` || "https://i.ibb.co/7zZrVjJ/Ellipse-1-1.png",
            "status": item?.is_present
        }
    })
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => <div className='flex justify-start items-center gap-2'>
                {
                    record?.status == 1 ? <div className='flex justify-start items-center rounded-md gap-2  font-semibold px-3 py-1 text-green-600 bg-green-100 w-fit'>
                        <p className={``}>Present</p>
                    </div> : <div className='flex justify-start items-center rounded-md gap-2  font-semibold px-3 py-1 text-red-600 bg-red-100 w-fit'>
                        <p className={``}>Absent</p>
                    </div>
                }
            </div>,
            key: 'Payment status'
        },

    ];
    const handelFilterData = (id) => {
        const newData = data.filter(item => item._id === id)
        setFilterData(newData[0])
    }
    const [colorType, setColorType] = useState(['blue'])
    const colorHandeler = (color) => {
        if (colorType.find(item => item == color)) {
            const newColor = colorType.filter(item => item != color)
            setColorType([...newColor])
        } else {
            setColorType([...colorType, color])
        }
    }
    const inputHandeler = (e, name) => {
        setFilterData({ ...filterData, [name]: e.target.value })
    }
    return (
        <div>
            <p className='text-2xl font-semibold mt-6'>Students Attendance</p>
            <>
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
        </div>
    )
}

export default StudentsAttendance
