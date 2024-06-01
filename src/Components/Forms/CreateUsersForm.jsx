import React, { useState } from 'react'
import UpdateInput from '../Input/UpdateInput'
import { FaEdit } from "react-icons/fa"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import SelectInput from '../Input/SelectInput'
const CreateUsersForm = ({ image, setImage, filterdData, inputHandeler, register,
    handleSubmit, errors, onSubmit ,CategoryOptions}) => {
    const [inputType, setInputType] = useState('password')
    const [CinputType, setCInputType] = useState('password')
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };
    return (
        <form className="text-base" onSubmit={handleSubmit(onSubmit)}>
            <div className="center-center">
                <div className={`h-28 w-28 rounded-full my-4  relative`}>
                    {
                        image ? <img className="h-full w-full rounded-full object-cover" src={image} alt="" /> : filterdData?.profile ? <img className="h-full w-full rounded-full object-cover" src={filterdData?.profile} alt="" /> : <img className="h-full w-full object-cover rounded-full" src={`https://i.ibb.co/6NTVcx7/default-user-icon.webp`} alt="" />
                    }

                    <label className="absolute right-1 bottom-1 z-30 bg-[var(--primary-bg)] p-2 rounded-full text-white cursor-pointer" htmlFor="profile">
                        <FaEdit />
                    </label>
                </div>
            </div>
            <input id="profile" onChange={handleFileChange} className="hidden" name="profile" type="file" />
            <div className="grid-2">
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Full Name`} rules={{ ...register("name", { required: true }) }} placeholder={`Full Name`} defaultValue={filterdData.name} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`User Name`} rules={{ ...register("userName", { required: true }) }} placeholder={`User Name`} defaultValue={filterdData.userName} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Phone Number`} type={'number'} rules={{ ...register("number", { required: true }) }} placeholder={`Phone Number`} defaultValue={filterdData.number} />
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Email`} type={`email`} rules={{ ...register("email", { required: true }) }} placeholder={`email`} defaultValue={filterdData.email} />
                <div className="relative mb-3">
                    <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Password`} type={inputType} rules={{ ...register("password", { required: true }) }} placeholder={`Password`} defaultValue={filterdData.password} />
                    {
                        inputType === 'password' ? <FaEyeSlash onClick={() => setInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500 cursor-pointer" /> : <FaEye onClick={() => setInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                    }
                </div>
                <div className="relative  mb-3">
                    <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Confirm Password`} type={CinputType} rules={{ ...register("Cpassword", { required: true }) }} placeholder={`Confirm Password`} defaultValue={filterdData.Cpassword ? filterdData.Cpassword : ''} />
                    {
                        CinputType === 'password' ? <FaEyeSlash onClick={() => setCInputType('text')} className="text-xl absolute top-[42px] right-2 text-gray-500 cursor-pointer" /> : <FaEye onClick={() => setCInputType('password')} className="text-xl absolute top-[42px] right-2 text-gray-500" />
                    }
                </div>
                <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Designation`} rules={{ ...register("designation", { required: true }) }} placeholder={`Designation`} defaultValue={filterdData.designation} />
            <UpdateInput status={errors} handler={inputHandeler} classNames={`w-full border`} lebel={`Expert`} rules={{ ...register("expert", { required: true }) }} placeholder={`Designation`} defaultValue={filterdData.expert} />
            </div>
            <SelectInput lebel={`Select Category`} classNames={`border`} status={errors} options={CategoryOptions} rules={{ ...register("category", { required: true }) }} />
            <div className="px-48 mt-8">
                <input value={`Create`} className="btn-primary cursor-pointer" type="submit" />
            </div>
        </form>
    )
}

export default CreateUsersForm
