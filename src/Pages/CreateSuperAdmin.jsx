import { FaPlus } from "react-icons/fa6"
import PageHeading from "../Components/PageHeading"
import AdminCard from "../Components/AdminCard"
const AdminData = [
    {
        profile:'https://i.ibb.co/YW6R8wc/Ellipse-977.png',
        name:'Md. Shamim Miah'
    }
]
const CreateSuperAdmin = () => {
    return (
        <>
            <div className="between-center gap-2">
                <PageHeading text={`Super Admin`} />
                <div className="flex justify-end items-center">
                    <button className="btn-primary"><FaPlus /> Add Super Admin</button>
                </div>
            </div>
            <div className="grid-4">
                <AdminCard />
            </div>
        </>
    )
}

export default CreateSuperAdmin
