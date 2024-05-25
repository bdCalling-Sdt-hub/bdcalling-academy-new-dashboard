import { Outlet } from "react-router-dom"
import Navber from "../Components/Navber"
import Sideber from "../Components/Sideber"

const Dashboard = () => {

    return (
        <div className="start-start">
            {/* sideber  */}
            <div className="max-w-[400px] min-w-[260px] primary-bg third-color h-screen overflow-y-scroll card-shadow">
                <Sideber />
            </div>
            <div className="w-full relative pt-[100px]">
                <div className="w-full absolute top-0 left-0">
                    <Navber />
                </div>
                <div className="px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
