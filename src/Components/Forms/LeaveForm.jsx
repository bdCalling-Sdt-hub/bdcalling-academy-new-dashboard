import React, { useState } from 'react'
import UpdateInput from '../Input/UpdateInput'
import { FaEdit } from "react-icons/fa"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import TextArea from '../Input/TextArea'

const LeaveForm = ({ image, setImage, filterdData, inputHandeler, register,
    handleSubmit, errors, onSubmit, CategoryOptions }) => {
    console.log(filterdData)
    const [inputType, setInputType] = useState('password')
    const [CinputType, setCInputType] = useState('password')
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
            <div className="center-center">
                <div className={`h-28 w-28 rounded-full my-4  relative`}>
                    {
                        image ? <img className="h-full w-full rounded-full object-cover" src={image} alt="" /> : filterdData?.img ? <img className="h-full w-full rounded-full object-cover" src={filterdData?.img} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={`https://i.ibb.co/6NTVcx7/default-user-icon.webp`} alt="" />
                    }
                    <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                        <FaEdit />
                    </label>
                </div>
            </div>
            <input id="profile" onChange={handleFileChange} className="hidden" name="img" type="file" />
            <div className="grid-2">
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...register("Name", { required: true }) }} placeholder={`Full Name`} defaultValue={filterdData.Name} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Leave Type*`} rules={{ ...register("Leave", { required: true }) }} placeholder={`User Name`} defaultValue={filterdData.Leave} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Phone Number`} type={'number'} rules={{ ...register("Phone", { required: true }) }} placeholder={`Phone Number`} defaultValue={filterdData.Phone} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Email`} type={`email`} rules={{ ...register("Email", { required: true }) }} placeholder={`email`} defaultValue={filterdData.Email} />

                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Designation`} rules={{ ...register("Designation", { required: true }) }} placeholder={`Designation`} defaultValue={filterdData.Designation} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Expert`} rules={{ ...register("Expert", { required: true }) }} placeholder={`Designation`} defaultValue={filterdData.Expert} />
            </div>

            <TextArea status={errors} handler={inputHandeler} classNames={`w-full border h-32`} lebel={`Reason`} rules={{ ...register("Reason", { required: true }) }} placeholder={`Reason`} defaultValue={filterdData.Reason} />
            <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Comments`} rules={{ ...register("Comments", { required: true }) }} placeholder={`Comments`} defaultValue={filterdData.Comments} />
            <div className='between-center gap-3 py-8 pb-0'>
                    <button className='transition-all text-base font-medium px-10 py-3 bg-[#2BA24C] rounded-md text-white hover:scale-105 active:scale-95'>Approved</button>
                    <button className='transition-all text-base font-medium px-10 py-3 text-[#FFC60B] border border-[#FFC60B] rounded-md hover:scale-105 active:scale-95'>Pending</button>
                    <button className='transition-all text-base font-medium px-10 py-3 text-[#FA1131] border border-[#FA1131] rounded-md  hover:scale-105 active:scale-95'>Rejected</button>
                </div>
        </form>
    )
}

export default LeaveForm
