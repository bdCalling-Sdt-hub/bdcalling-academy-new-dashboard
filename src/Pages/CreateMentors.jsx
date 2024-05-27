import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6"
import PageHeading from "../Components/PageHeading"
import AdminCard from "../Components/AdminCard"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import UpdateInput from "../Components/UpdateInput"
const AdminData = [
    {
        _id: '1',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '2',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '3',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '4',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '5',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '6',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '7',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '8',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '9',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '10',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '11',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '12',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '13',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '14',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '15',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '16',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '19',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '20',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
    {
        _id: '21',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        dept: 'Department Head AGM',
        designation: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',
        designation: 'web dev',
        category: 'super admin',
    },
]

const CreateMentors = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = AdminData.length
    const [itemPerPage, setItemPerPage] = useState(8)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    const [OpenAddModal, setOpenAddModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const [inputType, setInputType] = useState('password')
    const [CinputType, setCInputType] = useState('password')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)
    const handelEdit = (id) => {
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenAddModal(true)
    }
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    return (
        <>
            <div className="between-center gap-2">
                <div className="start-center gap-4 cursor-pointer">
                    <PageHeading text={`Mentors List`} />
                    <select className="w-[200px] p-2 border outline-none" name="">
                        <option value="all mentors">All Mentors</option>
                        <option value="all mentors">All Mentors</option>
                        <option value="all mentors">All Mentors</option>
                        <option value="all mentors">All Mentors</option>
                    </select>
                </div>
                <div className="flex justify-end items-center w-fit">
                    <button onClick={() => {
                        setFilterdData({})
                        setOpenAddModal(true)
                    }} className="btn-primary min-w-[150px]"><FaPlus /> Add Admin</button>
                </div>
            </div>
            <div className="grid-4">
                {
                    AdminData?.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map((item, index) => <AdminCard key={index} item={item} handelEdit={handelEdit} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/create-super-admin?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/create-super-admin?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/create-super-admin?page=${Number(page) + 1}`)
                    setPage(Number(page) + 1)
                }} className={`rounded-sm m-1 h-10 w-16 block bg-[var(--primary-bg)] text-white`}>prev</button>
            </div>
            <Modal
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
                open={OpenAddModal}
                width={600}
            >
                <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid-2">
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...register("name", { required: true }) }} placeholder={`Full Name`} defaultValue={filterdData.name} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`User Name`} rules={{ ...register("userName", { required: true }) }} placeholder={`User Name`} defaultValue={filterdData.userName} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Phone Number`} type={'number'} rules={{ ...register("number", { required: true }) }} placeholder={`Phone Number`} defaultValue={filterdData.number} />
                        <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Email`} type={`email`} rules={{ ...register("email", { required: true }) }} placeholder={`email`} defaultValue={filterdData.email} />
                        <div className="relative mb-3">
                            <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Password`} type={inputType} rules={{ ...register("password", { required: true }) }} placeholder={`Password`} defaultValue={filterdData.password} />
                            {
                                inputType === 'password' ? <FaEyeSlash onClick={() => setInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500" /> : <FaEye onClick={() => setInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                            }
                        </div>
                        <div className="relative  mb-3">
                            <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Confirm Password`} type={CinputType} rules={{ ...register("Cpassword", { required: true }) }} placeholder={`Confirm Password`} defaultValue={filterdData.Cpassword ? filterdData.Cpassword : ''} />
                            {
                                CinputType === 'password' ? <FaEyeSlash onClick={() => setCInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500" /> : <FaEye onClick={() => setCInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                            }

                        </div>
                    </div>
                    <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Designation`} rules={{ ...register("designation", { required: true }) }} placeholder={`Designation`} defaultValue={filterdData.designation} />
                    <lebel className='mt-3 block '>
                        Please Select a Category
                        <select className="w-full outline-none border p-2 rounded-md" name="category" id="">
                            <option value="category">Please Select a Category</option>
                            <option value="category">category</option>
                            <option value="category">category</option>
                            <option value="category">category</option>
                        </select>
                    </lebel>
                    <div className="px-48 mt-8">
                        <input value={`Create`} className="btn-primary cursor-pointer" type="submit" />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default CreateMentors
