import React, { useEffect } from 'react'
import useDeleteRequest from '../../Hooks/useDeleteRequest';
import toast from 'react-hot-toast';
import { imageUrl } from '../../AxiosConfig/useAxiosConfig';

const TrainerCard = ({ item, handelEdit, handelPayment, setFormFor, refetch }) => {
    const { profile, name, expert, designation, _id } = item
    const { mutate: DeleteTeacher, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest(`teacher${_id}`, `/teachers/${_id}`);
    const handleDelete = () => {
        toast((t) => (
            <div>
                <p className="text-xs text-red-500 text-center">are you sure you want to delete {name}</p>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => toast.dismiss(t.id)}>
                        cancel
                    </button>
                    <button onClick={() => {
                        DeleteTeacher()
                        toast.dismiss(t.id)
                    }} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        sure
                    </button>
                </div>
            </div>
        ));
    }
    useEffect(() => {
        refetch()
    }, [DeleteData])
    return (
        <div className="w-full h-full p-6 bg-white card-shadow rounded center-center gap-2 flex-col px-8">
            <div className="h-24 w-24 rounded-full overflow-hidden">
                <img src={profile ? `${imageUrl}/${profile}` : "https://i.ibb.co/d4RSbKx/Ellipse-980.png"} className="w-full  h-full object-cover" alt="" />
            </div>
            <p>{name}</p>
            <p>{designation}</p>
            <p className="text-[#5C5C5C] font-light text-xs">{expert}</p>
            <div className="between-center gap-2 mt-5">
                <button onClick={() => { handelEdit(_id); setFormFor('update') }} className="btn-primary ">Edit</button>
                <button onClick={handleDelete} className="btn-secondary ">Delete</button>
                <button onClick={() => handelPayment(_id)} className="btn-primary ">payment</button>
            </div>
        </div>
    )
}

export default TrainerCard
