import { useForm } from "react-hook-form";
import TrainerReviewCard from "../Components/Forms/TrainerReviewCard"
import { Modal } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrainerFeedbackForm from "../Components/Forms/TrainerFeedbackForm";

const reviewData = [
    {
        name: 'SAVANNAH NGUYENssssss',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
    {
        name: 'SAVANNAH NGUYEN',
        date: 'MAR 08, 2024',
        review: "I bought L'Eau d'Issey pour Homme Eau & Cedre Intense Eau De Toilette for my husband and he absolutely loves it! The scent is fresh and masculine, perfect for everyday wear. The cedar notes give it a nice woody undertone that lasts throughout the day. Highly recommend this perfume.",
        rating: '5'
    },
]
const TrainerReview = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const totalData = reviewData.length
    const [itemPerPage, setItemPerPage] = useState(8)
    const totalPage = Math.ceil(totalData / itemPerPage)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
    const [filterdData, setFilterdData] = useState({})
    const [rating, setrating] = useState(5)
    const inputHandeler = (e, name) => {
        setFilterdData({ ...filterdData, [name]: e.target.value })
    }
    return (
        <>
            <div className="grid-2 py-10">
                {
                    reviewData.slice(page * itemPerPage, (page * itemPerPage) + itemPerPage).map(item => <TrainerReviewCard setFilterdData={setFilterdData} setOpenFeedbackModal={setOpenFeedbackModal} key={item} item={item} />)
                }
            </div>
            <div className="center-center my-5 mt-8">
                <button onClick={() => {
                    navigate(`/trainer-review?page=${Number(page) - 1}`)
                    setPage(Number(page) - 1)
                }} disabled={page == '0'} className={`rounded-sm bg-[var(--primary-bg)] m-1 h-10 w-16 block text-white`}>prev</button>
                {
                    [...Array(totalPage).keys()].map(item => <Link key={item} onClick={() => setPage(item)} to={`/trainer-review?page=${item}`}>
                        <button className={`rounded-sm m-1 h-10 w-10 block ${page == item ? 'bg-[var(--primary-bg)] text-white' : 'bg-white'}`} key={item}>{item + 1}</button>
                    </Link>)
                }
                <button disabled={page == totalPage - 1} onClick={() => {
                    navigate(`/trainer-review?page=${Number(page) + 1}`)
                    setPage(Number(page) + 1)
                }} className={`rounded-sm m-1 h-10 w-16 block bg-[var(--primary-bg)] text-white`}>prev</button>
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
