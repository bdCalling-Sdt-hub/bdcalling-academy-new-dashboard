import React from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ClassRoutineForm from '../Components/Forms/ClassRoutineForm'
import { DatePicker, Form, Table, TimePicker } from 'antd'
import { FaSearch } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'
const routineData = [
    {
        "examName": "Mobile Application UI Design",
        "trainer": "John Doe",
        "batchNo": "B123",
        "time": "10:00 AM - 1:00 PM",
        "days": "Saturday",
        "date": "2024-06-10"
    },
    {
        "examName": "Web Development Fundamentals",
        "trainer": "Jane Smith",
        "batchNo": "W101",
        "time": "2:00 PM - 5:00 PM",
        "days": "Sunday",
        "date": "2024-06-11"
    },
    {
        "examName": "Data Science Basics",
        "trainer": "Alice Johnson",
        "batchNo": "D456",
        "time": "9:00 AM - 12:00 PM",
        "days": "Monday",
        "date": "2024-06-12"
    },
    {
        "examName": "Digital Marketing Strategies",
        "trainer": "Bob Brown",
        "batchNo": "M789",
        "time": "3:00 PM - 6:00 PM",
        "days": "Tuesday",
        "date": "2024-06-13"
    },
    {
        "examName": "Cloud Computing Essentials",
        "trainer": "Charlie Davis",
        "batchNo": "C101",
        "time": "11:00 AM - 2:00 PM",
        "days": "Wednesday",
        "date": "2024-06-14"
    },
    {
        "examName": "Cybersecurity Basics",
        "trainer": "Diana Evans",
        "batchNo": "S102",
        "time": "1:00 PM - 4:00 PM",
        "days": "Thursday",
        "date": "2024-06-15"
    },
    {
        "examName": "Machine Learning Introduction",
        "trainer": "Ethan Green",
        "batchNo": "ML103",
        "time": "4:00 PM - 7:00 PM",
        "days": "Friday",
        "date": "2024-06-16"
    },
    {
        "examName": "Artificial Intelligence Overview",
        "trainer": "Fiona Harris",
        "batchNo": "AI104",
        "time": "10:00 AM - 1:00 PM",
        "days": "Saturday",
        "date": "2024-06-17"
    },
    {
        "examName": "Blockchain Technology",
        "trainer": "George Johnson",
        "batchNo": "BC105",
        "time": "2:00 PM - 5:00 PM",
        "days": "Sunday",
        "date": "2024-06-18"
    },
    {
        "examName": "Internet of Things (IoT)",
        "trainer": "Hannah King",
        "batchNo": "IOT106",
        "time": "9:00 AM - 12:00 PM",
        "days": "Monday",
        "date": "2024-06-19"
    },
    {
        "examName": "Big Data Analytics",
        "trainer": "Ian Lewis",
        "batchNo": "BD107",
        "time": "3:00 PM - 6:00 PM",
        "days": "Tuesday",
        "date": "2024-06-20"
    },
    {
        "examName": "DevOps Practices",
        "trainer": "Jack Martinez",
        "batchNo": "DO108",
        "time": "11:00 AM - 2:00 PM",
        "days": "Wednesday",
        "date": "2024-06-21"
    },
    {
        "examName": "Mobile Game Development",
        "trainer": "Karen Nelson",
        "batchNo": "MG109",
        "time": "1:00 PM - 4:00 PM",
        "days": "Thursday",
        "date": "2024-06-22"
    },
    {
        "examName": "UI/UX Design Principles",
        "trainer": "Leo Olson",
        "batchNo": "UX110",
        "time": "4:00 PM - 7:00 PM",
        "days": "Friday",
        "date": "2024-06-23"
    },
    {
        "examName": "Software Testing Methods",
        "trainer": "Mia Peterson",
        "batchNo": "ST111",
        "time": "10:00 AM - 1:00 PM",
        "days": "Saturday",
        "date": "2024-06-24"
    },
    {
        "examName": "Graphic Design Basics",
        "trainer": "Noah Quinn",
        "batchNo": "GD112",
        "time": "2:00 PM - 5:00 PM",
        "days": "Sunday",
        "date": "2024-06-25"
    },
    {
        "examName": "IT Project Management",
        "trainer": "Olivia Roberts",
        "batchNo": "PM113",
        "time": "9:00 AM - 12:00 PM",
        "days": "Monday",
        "date": "2024-06-26"
    },
    {
        "examName": "Networking Fundamentals",
        "trainer": "Paul Smith",
        "batchNo": "NW114",
        "time": "3:00 PM - 6:00 PM",
        "days": "Tuesday",
        "date": "2024-06-27"
    },
    {
        "examName": "Agile Methodologies",
        "trainer": "Quinn Taylor",
        "batchNo": "AM115",
        "time": "11:00 AM - 2:00 PM",
        "days": "Wednesday",
        "date": "2024-06-28"
    },
    {
        "examName": "Business Intelligence",
        "trainer": "Ryan Wilson",
        "batchNo": "BI116",
        "time": "1:00 PM - 4:00 PM",
        "days": "Thursday",
        "date": "2024-06-29"
    }
]

const ClassRoutine = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    };


    const onChange = (field, date, dateString) => {
        // console.log(field, date, dateString);
    };
    const columns = [
        {
            title: 'Exam Name',
            dataIndex: 'examName',
            key: 'examName',
        },
        {
            title: 'Trainer Name',
            dataIndex: 'trainer',
            key: 'trainer',
        },
        {
            title: 'Batch No',
            dataIndex: 'batchNo',
            key: 'batchNo',
        },
        {
            title: 'Select Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Days',
            dataIndex: 'days',
            key: 'days',
        },
        {
            title: 'Select Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'examName',
            render: (_, record) => <div className='start-center gap-4 text-2xl'>
                <FiEdit className="text-[#2492EB] cursor-pointer hover:scale-105 active:scale-95 transition-all" onClick={() => {
                }} /> <RxCross1 className='text-red-600 cursor-pointer hover:scale-105 active:scale-95 transition-all' onClick={() => {
                    // console.log(record._id)
                }} />
            </div>,
            key: 'exam',
        },
    ];
    return (
        <>
            <PageHeading text={`Class Routine`} />
            <div className='start-center gap-2 text-[var(--primary-bg)]'>
                <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Class Routine Schedule</p>
            </div>
            <div className='start-start gap-6 my-8'>
                <div className='card-shadow p-4 rounded-md w-[500px]'>
                    <p className='text-2xl font-semibold mb-4'>Add New Class Routine</p>
                    <ClassRoutineForm />
                </div>
                <div id='allStudent' className='card-shadow p-4 rounded-md w-full'>
                    <p className='text-2xl font-semibold mb-4'>All Class Routine</p>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                    >
                        <div className='flex justify-start items-center gap-4'>
                            <Form.Item
                                label={false}
                                name="CourseName">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="Search by Exam..." />
                            </Form.Item>
                            <Form.Item
                                label={false}
                                name="trainer">
                                <input className='outline-none w-full border p-[10px] rounded-md' placeholder="Search by Batch..." />
                            </Form.Item>
                            <Form.Item
                                label={false}
                            >
                                <DatePicker className='w-full h-[43px]' onChange={(date, dateString) => {
                                    onChange('start', date, dateString)
                                }} />
                            </Form.Item>
                            <Form.Item >
                                <button className='text-white p-3 rounded-full text-xl bg-[var(--primary-bg)]' type="submit" >
                                    <FaSearch />
                                </button>
                            </Form.Item>
                        </div>
                    </Form>
                    <Table dataSource={routineData} columns={columns} />
                </div>
            </div>
        </>
    )
}

export default ClassRoutine
