import { useForm } from "react-hook-form";
import Input from "./Input";
import { CiSearch } from "react-icons/ci";
import { MdOutlineNotificationsActive } from "react-icons/md";
import flag from '../assets/flag.png'
const Navber = () => {
    const { register } = useForm();
    const inputHandeler = (e) => {
        // console.log(e.target.value)
    }
    return (
        <div className="between-center w-full p-3 py-6 bg-white ">
            <div className="w-[460px] relative" >
                <Input classNames={`bg-[#F4F4F4] text-sm p-4 pl-10`} placeholder={`search`} handler={inputHandeler} rules={{ ...register("search", { required: false }) }} />
                <CiSearch className="text-2xl text-[#A7A7A7] absolute top-[50%] translate-y-[-50%] left-2" />
            </div>
            <div className="flex justify-end items-center w-full gap-5">
                <img src={flag} className="h-5 w-8 -mr-3" alt="" />
                <p className="text-lg">EN</p>
                <div className="relative cursor-pointer">
                    <MdOutlineNotificationsActive className="text-3xl" />
                    <span className="rounded-full bg-[#E91E63] p-[2px] px-[4px] text-white absolute top-0 right-0 text-[10px]" >
                        12
                    </span>
                </div>
                <div className="justify-end flex items-center w-fit gap-3">
                    <img className="h-10 w-10 rounded-full" src={`https://i.ibb.co/YW6R8wc/Ellipse-977.png`} alt="" />
                    <div>
                        <p className="font-medium">Mr. Admin John Doe</p>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navber
