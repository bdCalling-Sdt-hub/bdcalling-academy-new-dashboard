import { Link } from "react-router-dom";
import { imageUrl } from "../../AxiosConfig/useAxiosConfig";

const BatchCard = ({ item }) => {
    // console.log(item)
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
            </div>
        </div>
    )
}

export default BatchCard
