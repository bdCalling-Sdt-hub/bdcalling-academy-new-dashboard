import { FaPlus } from "react-icons/fa6"
import PageHeading from "../Components/Shared/PageHeading"
import AdminCard from "../Components/Cards/AdminCard"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import CreateUsersForm from "../Components/Forms/CreateUsersForm"
const AdminData = [
    {
        _id: '1',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '2',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '3',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '4',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '5',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '6',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '7',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '8',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '9',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '10',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '11',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '12',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '13',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '14',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '15',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '16',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '19',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '20',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
    {
        _id: '21',
        profile: 'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name: 'Md. Shamim Miah',
        designation: 'Department Head AGM',
        expert: 'Certified Lead Generation-Data Entry Expert',
        userName: 'john doe',
        number: +898236092374,
        email: 'bgcalling@gmail.com',
        password: '204iwef',

        category: 'super admin',
    },
]
const CategoryOptions = ['Admin', 'Super Admin','Mentor']
const CreateAdmin = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = AdminData.length
    const [itemPerPage, setItemPerPage] = useState(8)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    const [OpenAddModal, setOpenAddModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const handelEdit = (id) => {
        setImage(null)
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenAddModal(true)
    }
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    const [image, setImage] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <>
            <div className="between-center gap-2">
                <PageHeading text={`Admin List`} />
                <div className="flex justify-end items-center">
                    <button onClick={() => {
                        setFilterdData({})
                        setOpenAddModal(true)
                    }} className="btn-primary"><FaPlus /> Add Admin</button>
                </div>
            </div>
            <div className="grid-4">
                {
                    AdminData?.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map((item, index) => <AdminCard key={index} item={item} handelEdit={handelEdit} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/create-admin?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/create-admin?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/create-admin?page=${Number(page) + 1}`)
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
                <CreateUsersForm image={image} setImage={setImage} filterdData={filterdData} inputHandeler={inputHandeler} register={register}
                    handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} CategoryOptions={CategoryOptions} />
            </Modal>
        </>
    )
}

export default CreateAdmin
