import { useState } from "react"
import { BsInfoCircle } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { IoMdBook, IoMdTime } from "react-icons/io"
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri"
import { Link } from "react-router-dom"


const CoursesCard = ({ item, deleteModal, setDeleteNodal }) => {
    return (
        <div style={{
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }} className="w-full h-full bg-white p-4 rounded-md">
            <div className="w-full h-[220px]">
                <img src={item?.banner} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="grid-2 my-4">
                <div className="start-center gap-2">
                    <IoMdBook className="text-[var(--primary-bg)] text-2xl" /> <p className="text-[#5C5C5C]">Batch {item?.batch}</p>
                </div>
                <div className="flex justify-end items-center ">
                    <p className="bg-[var(--primary-bg)] px-3 text-white">{item?.courseType}</p>
                </div>
            </div>
            <div className="grid-2 my-4">
                <div className="start-center gap-2">
                    <FaUsers className="text-[var(--primary-bg)] text-2xl" /> <p className="text-[#5C5C5C]">{item?.availableSeat} Seats Left</p>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <IoMdTime className="text-[var(--primary-bg)] text-2xl" />
                    <p className="text-[#5C5C5C]">{item?.deadline}</p>
                </div>
            </div>
            <hr />
            <h2 className="text-lg font-semibold text-[var(--primary-bg)] py-2">{item?.title}</h2>
            <p className="text-lg font-semibold text-[var(--primary-bg)] py-2">{item?.price}</p>
            <div className="between-center">
                <Link to={`/course-details/${item?._id}`} className="text-white bg-[var(--primary-bg)] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                    <BsInfoCircle />
                </Link>
                <Link to={`/update-course/${item?._id}`} className="border border-[var(--primary-bg)] text-[var(--primary-bg)] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                    <RiEditBoxLine />
                </Link>
                <div className="relative">
                    <button onClick={() => {
                        setDeleteNodal({ show: true, id: item._id })
                    }} className="border border-[red] text-[red] text-xl p-2 px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                        <RiDeleteBin5Line />
                    </button>
                    {
                        (deleteModal?.show && deleteModal.id == item?._id) && <>
                            <div div className="absolute -top-[140px] p-5 left-[50%] translate-x-[-50%] bg-white border rounded w-fit z-30">
                                <h3 className="text-sm text-[#000000] font-medium whitespace-nowrap">Are you sure ?</h3>
                                <p className="text-[#8C8C8C]  text-xs whitespace-nowrap py-2">This action cannot be undone !</p>
                                <div className="flex justify-end items-center gap-2">
                                    <button onClick={()=>{
                                        setDeleteNodal(false)
                                    }} className="py-1 px-3 border text-[#6B6B6B] text-sm rounded">
                                        No
                                    </button>
                                    <button onClick={()=>{
                                        setDeleteNodal(false)
                                    }} className="py-1 px-3 border text-white bg-[var(--primary-bg)] text-sm rounded">
                                        Yes
                                    </button>
                                </div>
                            </div>
                            <span className="w-8 h-8 bg-white border block absolute -top-10 rotate-45 left-[50%] translate-x-[-50%]"></span>
                        </>
                    }
                </div>
            </div>
        </div >
    )
}

export default CoursesCard
