import { Link } from "react-router-dom";
import useAxiosConfig, { imageUrl } from "../../AxiosConfig/useAxiosConfig";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const BatchCard = ({ item }) => {
    const baseUrl = useAxiosConfig()
    // console.log(item)
    const handleDelete = (id) => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        baseUrl.delete(`batches/${id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                            },
                        }).then((res) => {
                            toast.success('batch delete successfully')
                            toast.dismiss(t.id)
                        }).catch((err) => {
                            toast.error('something went wrong')
                            toast.dismiss(t.id)
                        })
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    return (
        <div className="bg-white card-shadow p-3 rounded-md">
            <div className="w-full h-[240px] object-cover rounded-md overflow-hidden">
                <img className="w-full h-full object-cover" src={`${imageUrl}/${item?.image}`} alt="" />
            </div>
            <p className="text-sm text-[#333333] font-medium pt-4"> Course : {item?.course?.course_name}</p>
            <p className="text-lg text-[#333333] font-medium py-2"> Batch : {item?.batch_name}</p>
            <p><strong>Batch ID:</strong> {item?.batch_id}</p>
            <div className="between-center gap-4 mt-5">
                <Link to={`/all-admitted-student/${item?.id}`} className="btn-primary ">
                    All Students
                </Link>
                <Link to={`/update-batch/${item?.id}`} className="btn-secondary">
                    Edit Batch
                </Link>
                <button onClick={() => handleDelete(item?.id)} style={{
                    backgroundColor: 'red',
                }} className="text-2xl text-white rounded-full ">
                    <MdDelete />
                </button>
            </div>
        </div>
    )
}

export default BatchCard
