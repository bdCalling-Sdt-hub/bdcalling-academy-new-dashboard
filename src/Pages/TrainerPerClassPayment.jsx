import { Table } from "antd";
import PageHeading from "../Components/Shared/PageHeading";
import { FaPlus } from "react-icons/fa";

const paymentData = [
    {
        "_id": "1",
        "name": "John Doe",
        "phone": "555-1234",
        "class": "Math",
        "method": "bkash",
        "amount": 100,
        "date": "2024-01-15",
        "status": "completed"
    },
    {
        "_id": "2",
        "name": "Jane Smith",
        "phone": "555-5678",
        "class": "Science",
        "method": "handcash",
        "amount": 150,
        "date": "2024-02-20",
        "status": "pending"
    },
    {
        "_id": "3",
        "name": "Alice Johnson",
        "phone": "555-8765",
        "class": "History",
        "method": "bkash",
        "amount": 200,
        "date": "2024-03-10",
        "status": "completed"
    },
    {
        "_id": "4",
        "name": "Bob Brown",
        "phone": "555-4321",
        "class": "English",
        "method": "handcash",
        "amount": 120,
        "date": "2024-04-05",
        "status": "cancelled"
    }
]
const TrainerPerClassPayment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <>
            <div className='grid-2'>
                <div className='w-full'>
                    <PageHeading text={`All Students`} />
                </div>
                <div className="flex justify-end items-center w-full gap-3">
                    <button className="btn-secondary max-w-44"><FaPlus /> Send Message</button>
                    <button onClick={() => {
                        setImage(null)
                        setOpenStudentAddModal(true)
                    }} className="btn-primary max-w-44"><FaPlus /> Add Student</button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>
                <DatePicker className='max-w-44 min-w-44 py-2 border-none rounded-3xl' onChange={onChange} />
                <div className='max-w-44 min-w-44'>
                    <Input rules={{ ...register("name", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Full Name`} />
                </div>
                <div className='max-w-44 min-w-44'>
                    <Input type={`number`} rules={{ ...register("number", { required: false }) }} classNames={`rounded-3xl`} placeholder={`+8801566026301`} />
                </div>
                <select name='category' className='p-2 border-none outline-none rounded-3xl text-gray-400'>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                    <option value={`category`}>select a category</option>
                </select>
                <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                    <IoSearch />
                </button>
            </form>

            <Table dataSource={paymentData} columns={columns} />;
        </>
    )
}

export default TrainerPerClassPayment
