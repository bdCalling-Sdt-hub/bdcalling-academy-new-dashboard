import { Select } from 'antd'
import certificate from '../assets/certificate.png'
import useGetRequest from '../Hooks/useGetRequest'
import { useEffect, useState } from 'react'

const StudentCertificates = () => {

    const [loading, data, error] = useGetRequest('certificates', '/show-student-certificate')

    const studentBatch = data?.map(user => {
        return {
            label: user?.batch?.batch_name,
            value: user?.batch?.batch_id
        }
    })


    

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        console.log(data)
        const selectedCourse = data?.filter(course => course?.batch?.batch_id===value)
        console.log(selectedCourse)
    };
    return (
        <div className='flex justify-center items-center gap-6 h-screen flex-col relative'>
            <div className='flex justify-between items-center gap-2 w-full absolute left-0 top-4'>
                <div>

                    <p className='text-2xl font-semibold'>Your certificates</p>



                    <div className='mt-5'>
                        <Select
                            defaultValue="Select Course"
                            style={{
                                width: 200,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    label: <span>Course Name</span>,
                                    title: 'courseName',
                                    options: studentBatch ,
                                },

                            ]}
                        />
                    </div>
                </div>

                <button className='px-8 py-3 rounded-md text-blue-500 border border-blue-500'>
                    DownLoad
                </button>
            </div>

            <img src={certificate} alt="" />
            <p className='text-4xl font-medium'>You don't have a certificate</p>
            <p>You have no certificate. Browse the course again</p>
            <button className='px-8 py-3 rounded-md bg-blue-500 text-white'>
                Browse courses
            </button>
        </div>
    )
}

export default StudentCertificates




// [
//     {
//       id: 3,
//       batch_id: 1,
//       student_id: 8,
//       status: 'completed',
//       created_at: '2024-08-15T09:03:08.000000Z',
//       updated_at: '2024-08-15T09:03:57.000000Z',
//       batch: {
//         id: 1,
//         course_id: 1,
//         batch_id: 'BCA-DEA-2401',
//         batch_name: 'Cassandra Harmon',
//         start_date: '2024-08-15',
//         end_date: '2024-08-31',
//         seat_limit: 69,
//         seat_left: 69,
//         image: 'adminAsset/image/326727213.jpg',
//         discount_price: 884,
//         created_at: '2024-08-15T06:55:32.000000Z',
//         updated_at: '2024-08-15T06:55:32.000000Z',
//         course: {
//           id: 1,
//           course_category_id: 1,
//           course_name: 'Deanna Petty',
//           language: 'Magni accusantium ne',
//           course_details: 'Laboris quos in anim',
//           course_time_length: 'Molestiae eum sint v',
//           price: '842',
//           max_student_length: null,
//           skill_Level: 'Rerum quis Nam conse',
//           address: 'Id reiciendis incid',
//           thumbnail: 'adminAsset/image/1709764481.jpg',
//           career_opportunities: [ 'Quia quis voluptatem', 'asd ' ],
//           curriculum: [ 'Rerum ipsum explica' ],
//           tools: [ 'Est voluptatem duci' ],
//           job_position: [ 'Fugit sunt nihil ip', 'asd ' ],
//           popular_section: 1,
//           status: 'pending',
//           course_type: 'offline',
//           created_at: '2024-08-15T06:11:22.000000Z',
//           updated_at: '2024-08-15T06:11:22.000000Z'
//         }
//       },
//       student: {
//         id: 8,
//         category_id: 1,
//         user_id: 17,
//         status: 'enrolled',
//         phone_number: '562',
//         gender: 'female',
//         religion: 'islam',
//         registration_date: '2003-02-02',
//         dob: '1990-01-10',
//         blood_group: 'undefined',
//         address: 'Et totam amet volup',
//         add_by: 'SUPER ADMIN',
//         student_type: 'super admin',
//         messages: null,
//         event_name: null,
//         image: null,
//         created_at: '2024-08-15T09:02:34.000000Z',
//         updated_at: '2024-08-15T09:03:42.000000Z',
//         user: {
//           id: 17,
//           name: 'Madison Kane',
//           email: 'wumu@mailinator.com',
//           email_verified_at: '2024-08-15T09:02:34.000000Z',
//           role: 'STUDENT',
//           otp: '0',
//           designation: null,
//           expertise: null,
//           image: null,
//           user_status: '0',
//           phone_number: null,
//           created_at: '2024-08-15T09:02:34.000000Z',
//           updated_at: '2024-08-15T09:02:34.000000Z'
//         }
//       }
//     }
//   ]