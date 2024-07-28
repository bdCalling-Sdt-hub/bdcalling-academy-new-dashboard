import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import { CiSearch } from "react-icons/ci";
import { MdOutlineNotificationsActive } from "react-icons/md";
import flag from '../../assets/flag.png'
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../Providers/UserProviders/UserProvider";
import { imageUrl } from "../../AxiosConfig/useAxiosConfig";
const Navber = () => {
    const { useData , loading ,isError} = useUserData();
    console.log(useData)
    const { register } = useForm();
    const inputHandeler = (e) => {
        // console.log(e.target.value)
    }
    const navigate = useNavigate()
    return (
        <div className="between-center w-full p-3 py-6 bg-white ">
            <div className="w-[460px] relative" >
                {/* <Input classNames={`bg-[#F4F4F4] text-sm p-4 pl-10`} placeholder={`search`} handler={inputHandeler} rules={{ ...register("search", { required: false }) }} />
                <CiSearch className="text-2xl text-[#A7A7A7] absolute top-[50%] translate-y-[-50%] left-2" /> */}
            </div>
            <div className="flex justify-end items-center w-full gap-5 py-[6px]">
                <img src={flag} className="h-5 w-8 -mr-3" alt="" />
                <p className="text-lg">EN</p>
                <div onClick={()=>navigate('/notification')} className="relative cursor-pointer">
                    <MdOutlineNotificationsActive className="text-3xl" />
                    <span className="rounded-full bg-[#E91E63] p-[2px] px-[4px] text-white absolute top-0 right-0 text-[10px]" >
                        12
                    </span>
                </div>
                <div className="justify-end flex items-center w-fit gap-3">
                    <img className="h-10 w-10 rounded-full" src={useData?.image ?`${imageUrl}/${useData?.image}` :`https://i.ibb.co/YW6R8wc/Ellipse-977.png`} alt="" />
                    <div>
                        <p className="font-medium">{useData?.name}</p>
                        <p className="text-xs">{useData?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navber
