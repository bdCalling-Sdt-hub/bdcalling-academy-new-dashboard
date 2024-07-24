import { FaPlus } from "react-icons/fa6"
import PageHeading from "../Components/Shared/PageHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Pagination, Table } from "antd"
import TrainerCard from "../Components/Cards/TrainerCard"
import TrainerAddForm from "../Components/Forms/TrainerAddForm"
import TrainerPaymentForm from "../Components/Forms/TrainerPaymentForm"
import { AiOutlinePrinter } from "react-icons/ai"
import useGetRequest from "../Hooks/useGetRequest"
import { imageUrl } from "../AxiosConfig/useAxiosConfig"

const paymentHistory = [
    {
        "_id": "1",
        "category": "part time",
        "paymentType": "per class",
        "method": "bkash",
        "amount": 500,
        "date": "2024-05-01",
        "totalPayment": 5000
    },
    {
        "_id": "2",
        "category": "part time",
        "paymentType": "per class",
        "method": "bkash",
        "amount": 700,
        "date": "2024-05-05",
        "totalPayment": 7000
    },
    {
        "_id": "3",
        "category": "part time",
        "paymentType": "per class",
        "method": "bkash",
        "amount": 600,
        "date": "2024-05-10",
        "totalPayment": 6000
    },
    {
        "_id": "4",
        "category": "part time",
        "paymentType": "per class",
        "method": "bkash",
        "amount": 650,
        "date": "2024-05-15",
        "totalPayment": 6500
    },
    {
        "_id": "5",
        "category": "part time",
        "paymentType": "per class",
        "method": "bkash",
        "amount": 550,
        "date": "2024-05-20",
        "totalPayment": 5500
    }
]
const AllTrainer = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const navigate = useNavigate()
    const [OpenAddModal, setOpenAddModal] = useState(false)
    const [openPaymentModal, setopenPaymentModal] = useState(false)
    const [openPaymentHistoryModal, setopenPaymentHistoryModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const [formFor, setFormFor] = useState('add')
    //query
    console.log(filterdData)
    const [requestingTeacher, Teacher, TeacherError,] = useGetRequest('teacher', `/teachers?page=${page}`)
    const AdminData = Teacher?.teacher?.data?.map(item => {
        return {
            _id: item?.id,
            profile: item?.image,
            name: item?.user?.name,
            designation: item?.designation,
            expert: item?.expert,
            userName: item?.user?.name,
            email: item?.user?.email,
            password: item?.user?.password || '',
            category: item?.course_category_id,
            item: item,
            phone_number: item?.phone_number
        }
    })
    const handelEdit = (id) => {
        setImage(null)
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenAddModal(true)
        setopenPaymentModal(false)
    }
    const handelPayment = (id) => {
        setImage(null)
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenAddModal(false)
        setopenPaymentModal(true)
    }
    const [image, setImage] = useState(null);
    const columns = [
        {
            title: 'S.no',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Payment',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Total Payment',
            dataIndex: 'totalPayment',
            key: 'totalPayment',
        },
    ];
    return (
        <>
            <div className="between-center gap-2">
                <div className="start-center gap-4 cursor-pointer">
                    <PageHeading text={`All Trainer List`} />
                    <select className="w-[200px] p-2 border outline-none" name="">
                        <option value="all Trainer">All Trainer</option>
                        <option value="all Trainer">All Trainer</option>
                        <option value="all Trainer">All Trainer</option>
                        <option value="all Trainer">All Trainer</option>
                    </select>
                </div>
                <div className="flex justify-end items-center w-fit">
                    <button onClick={() => {
                        setFilterdData({})
                        setOpenAddModal(true)
                    }} className="btn-primary min-w-[150px]"><FaPlus /> Add Trainer</button>
                </div>
            </div>
            <div className="grid-4">
                {
                    AdminData?.map((item, index) => <TrainerCard key={index} item={item} handelEdit={handelEdit} setFormFor={setFormFor} handelPayment={handelPayment} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <Pagination defaultCurrent={page} total={Teacher?.teacher?.total} pageSize={8} showSizeChanger={false} onChange={(page, pageSize) => {
                    setPage(page)
                }} />
            </div>
            <Modal
                centered
                footer={false}
                onCancel={() => setopenPaymentModal(false)}
                open={openPaymentModal}
                width={900}
            >
                <TrainerPaymentForm filterdData={filterdData} setopenPaymentModal={setopenPaymentModal} setopenPaymentHistoryModal={setopenPaymentHistoryModal} />
            </Modal>
            <Modal
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
                open={OpenAddModal}
                width={900}
            >
                <TrainerAddForm formFor={formFor} filteredData={filterdData} image={image} setImage={setImage} setOpenAddModal={setOpenAddModal} />
            </Modal>
            <Modal
                centered
                footer={false}
                onCancel={() => setopenPaymentHistoryModal(false)}
                open={openPaymentHistoryModal}
                width={900}
            >
                <div>
                    <div className='flex justify-between items-end mb-6'>
                        <div className='start-center gap-2'>
                            <div className='w-28 h-28 relative'>
                                <img className='w-fuh-full h-full object-cover rounded-full' src={filterdData?.profile ? `${imageUrl}/${filterdData?.profile}` : "https://i.ibb.co/d4RSbKx/Ellipse-980.png"} alt="" />
                            </div>
                            <div>
                                <p className='text-2xl font-semibold text-[#333333] my-[2px]'>{filterdData?.name}</p>
                                <p className='text-base font-normal text-[#2BA24C] my-[2px]'>{filterdData?.expert}</p>
                                <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.number}</p>
                                <p className='text-base font-normal text-[#333333] my-[2px]'>{filterdData?.email}</p>
                            </div>
                        </div>
                        <button type='button' className=' text-center text-[#2BA24C] text-2xl font-semibold rounded-md hover:scale-105 active:scale-95 transition-all'>
                            <AiOutlinePrinter />
                        </button>
                    </div>
                    <Table dataSource={paymentHistory} columns={columns} />
                </div>
            </Modal>
        </>
    )
}


export default AllTrainer
