import { FaPlus } from "react-icons/fa"
import PageHeading from '../Components/Shared/PageHeading'
import CoursesCard from "../Components/Cards/CoursesCard"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGetRequest from "../Hooks/useGetRequest"
import useDeleteRequest from "../Hooks/useDeleteRequest"
import { Pagination } from "antd"


const VideoCourse = () => {
    const [deleteModal, setDeleteNodal] = useState({ show: false, id: false })
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 0);
    const [requestingCourse, Course, CourseError, refetch] = useGetRequest('course', `/courses?course_type=video`)
    const { mutate: DeleteCourse, isLoading: DeleteLoading, data: DeleteData, } = useDeleteRequest('course', `/courses/${deleteModal?.id}`);
    const navigate = useNavigate()
    useEffect(() => {
        if (DeleteLoading) return
        if (DeleteData) refetch()
    }, [DeleteData, DeleteLoading])
    return (
        <>
            <div className="between-center gap-2">
                <PageHeading text={`Overview`} />
                <div className="flex justify-end items-center">
                    <Link to={`/add-course?redirect=video-course&type=add`} onClick={() => {
                    }} className="btn-primary"><FaPlus /> Add Course</Link>
                </div>
            </div>
            <div className="grid-4">
                {
                    Course?.data?.map(item => <CoursesCard key={item?._id} item={item} deleteModal={deleteModal} setDeleteNodal={setDeleteNodal} handleDeleteCourse={DeleteCourse} />)
                }
            </div>
            <div className="center-center my-5 mt-8">

                <Pagination defaultCurrent={page} total={Course?.total} pageSize={8} showSizeChanger={false} onChange={(page, pageSize) => {
                    setPage(page)
                }} />
            </div>
        </>
    )
}

export default VideoCourse
