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


const AllTrainer = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [page2, setPage2] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const navigate = useNavigate()
    const [OpenAddModal, setOpenAddModal] = useState(false)
    const [openPaymentModal, setopenPaymentModal] = useState(false)
    const [openPaymentHistoryModal, setopenPaymentHistoryModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const [formFor, setFormFor] = useState('add')
    //query
    const [requestingTeacher, Teacher, TeacherError,] = useGetRequest('teacher', `/teachers?page=${page}`)
    const [requestingPaymentHistory, PaymentHistory, PaymentHistoryError,] = useGetRequest('teacher', `/show-transactions?page=${page2}&teacher_id=${filterdData?._id}`)
    const data = PaymentHistory?.data?.map((item, i) => {
        return {
            "key": i + 1,
            "_id": item?.teacher_id,
            "paymentType": item?.teacher?.payment_type,
            "method": item?.payment_type,
            "amount": item?.teacher?.payment,
            "date": item?.payment_date,
            "totalPayment": item?.amount
        }
    })
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
            dataIndex: 'key',
            key: 'key',
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
                    <Table dataSource={data} pagination={{
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            setPage2(page);
                        },
                        total: PaymentHistory?.total || 0,
                        pageSize: 10
                    }} columns={columns} />
                </div>
            </Modal>
        </>
    )
}


export default AllTrainer
