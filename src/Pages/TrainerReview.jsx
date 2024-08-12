import { useForm } from "react-hook-form";
import TrainerReviewCard from "../Components/Forms/TrainerReviewCard"
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrainerFeedbackForm from "../Components/Forms/TrainerFeedbackForm";
import useGetRequest from "../Hooks/useGetRequest";
import usePatchRequest from "../Hooks/usePatchRequest";

const TrainerReview = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const [rating, setrating] = useState(0)
    const [requestingReview, Review, ReviewError, refetch] = useGetRequest('trainerReview', `/trainer-reviews`)
    const { mutate: updateCourse, isLoading: updateLoading, data: updateData, } = usePatchRequest('Review', `/trainer-reviews/${filterdData?.id}?page=${page}`);
    useEffect(() => {
        if (filterdData?.rating_value) {
            setrating(Number(filterdData?.rating_value))
        }
    }, [filterdData?.rating_value])
    const onSubmit = data => {
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        formData.append('_method', 'PUT')
        formData.append('rating_value', rating)
        console.log(formData.get('rating_value'))
        // if (image) {
        //     formData.append('image', image)
        // }
        updateCourse(formData)
    };

    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }

    useEffect(() => {
        if (updateLoading) return
        if (updateData) refetch(); setOpenFeedbackModal(false)
    }, [updateData, updateLoading])
    return (
        <>
            <div className="grid-2 py-10">
                {
                    Review?.data?.map(item => <TrainerReviewCard setFilterdData={setFilterdData} setOpenFeedbackModal={setOpenFeedbackModal} key={item} item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">

                <Pagination showSizeChanger={false} pageSize={Review?.per_page} total={Review?.total} onChange={(page) => setPage(page)} />
            </div>
            <Modal
                centered
                open={openFeedbackModal}
                onCancel={() => setOpenFeedbackModal(false)}
                footer={false}
            >
                <TrainerFeedbackForm setOpenFeedbackModal={setOpenFeedbackModal} filterdData={filterdData} inputHandeler={inputHandeler} register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} setrating={setrating} rating={rating} />
            </Modal>
        </>
    )
}

export default TrainerReview
