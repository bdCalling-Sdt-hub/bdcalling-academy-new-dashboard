import { FaPlus } from "react-icons/fa6"
import PageHeading from "../Components/Shared/PageHeading"
import AdminCard from "../Components/Cards/AdminCard"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Pagination } from "antd"
import { useForm } from "react-hook-form"
import CreateUsersForm from "../Components/Forms/CreateUsersForm"
import usePostRequest from "../Hooks/usePostRequest"
import useGetRequest from "../Hooks/useGetRequest"
import ProfileImage from '../assets/corporate-user-icon.webp'
import { imageUrl } from "../AxiosConfig/useAxiosConfig"
import usePatchRequest from "../Hooks/usePatchRequest"
import useDeleteRequest from "../Hooks/useDeleteRequest"
import toast from "react-hot-toast"
const CategoryOptions = ['ADMIN', 'SUPER ADMIN',]
const CreateAdmin = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const navigate = useNavigate()
    const [OpenAddModal, setOpenAddModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [creatingUser, setCreatingUser] = useState(true)
    const { mutate, isLoading, data, error } = usePostRequest('admin', '/admins');
    const { mutate: updateAdmin, isLoading: updateLoading, data: updateData, } = usePatchRequest('admin', `/admins/${filterdData?._id}`);
    const { mutate: DeleteAdmin, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('admin', `/admins/${filterdData?._id}`);
    const [requestingUser, Admins, adminError, refetch, isError] = useGetRequest('superAdmin', `/admins?page=${page}`)
    const AdminData = Admins?.data?.data?.map((item) => {
        return {
            _id: item?.id,
            profile: item?.image ? `${imageUrl}/${item?.image}` : ProfileImage,
            name: item?.name,
            designation: item?.designation,
            expert: item?.expertise,
            userName: item?.name,
            number: item?.phone_number,
            email: item?.email,
        }
    },)
    // add and update user 
    const onSubmit = (value) => {
        if (creatingUser) {
            const AdminData = {
                name: value?.name,
                role: 'ADMIN',
                password_confirmation: value?.Cpassword,
                password: value?.password,
                email: value?.email,
                designation: value?.designation,
                expertise: value?.expert,
                phone_number: value?.number
            }
            const formData = new FormData()
            Object.keys(AdminData).map(key => {
                formData.append(key, AdminData[key])
            })
            if (image) {
                formData.append('image', image)
            }
            mutate(formData)
        } else {
            const AdminData = {
                name: value?.name,
                role: 'ADMIN',
                email: value?.email,
                designation: value?.designation,
                expertise: value?.expert,
                _method: 'PUT',
                phone_number: value?.number
            }
            const formData = new FormData()
            Object.keys(AdminData).map(key => {
                formData.append(key, AdminData[key])
            })
            if (image) {
                formData.append('image', image)
            }
            updateAdmin(formData)
        }
    }

    // reset form 
    useEffect(() => {
        if (isLoading || updateLoading || DeleteLoading) return
        if (data || updateData || DeleteData) {
            setFilterdData({})
            setOpenAddModal(false)
            refetch()
        }
    }, [data, isLoading, updateData, updateLoading, DeleteData, DeleteLoading])

    // filter targeted element
    const handelEdit = (id) => {
        setCreatingUser(false)
        setImage(null)
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        setOpenAddModal(true)
    }
    const handleDelete = (id) => {
        const newData = AdminData.filter(item => item._id === id)
        setFilterdData(newData[0])
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {filterdData?.name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteAdmin()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    // update form inputs 
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    const [image, setImage] = useState(null);
  
    return (
        <>
            <div className="between-center gap-2">
                <PageHeading text={`Admin List`} />
                <div className="flex justify-end items-center">
                    <button onClick={() => {
                        setFilterdData({})
                        setOpenAddModal(true)
                        setCreatingUser(true)
                    }} className="btn-primary"><FaPlus /> Add Admin</button>
                </div>
            </div>
            <div className="grid-4">
                {
                    AdminData?.map((item, index) => <AdminCard handleDelete={handleDelete} key={index} item={item} handelEdit={handelEdit} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <Pagination defaultCurrent={page} total={Admins?.data?.total} pageSize={8} showSizeChanger={false} onChange={(page, pageSize) => {
                    setPage(page)
                }} />
            </div>
            <Modal
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
                open={OpenAddModal}
                width={600}
            >
                <CreateUsersForm creatingUser={creatingUser} setOpenAddModal={setOpenAddModal} image={image} setImage={setImage} filterdData={filterdData} inputHandeler={inputHandeler} register={register}
                    handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} CategoryOptions={CategoryOptions} />
            </Modal>
        </>
    )
}

export default CreateAdmin
