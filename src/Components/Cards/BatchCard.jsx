import { Link } from "react-router-dom";

const BatchCard = ({ item }) => {
    const { img, batchID, course } = item;
    return (
        <div className="bg-white card-shadow p-3 rounded-md">
            <div className="w-full h-[240px] object-cover rounded-md overflow-hidden">
                <img className="w-full h-full object-cover" src={img} alt="" />
            </div>
            <p className="text-lg text-[#333333] font-medium py-4">{course}</p>
            <p><strong>Batch ID:</strong> {batchID}</p>
            <div className="between-center gap-4 mt-5">
                <Link to={`/all-admitted-student/7832`}className="btn-primary ">
                    All Students
                </Link>
                <Link to={`/add-batch/update`} className="btn-secondary">
                Edit Batch
                </Link>
            </div>
        </div>
    )
}

export default BatchCard
