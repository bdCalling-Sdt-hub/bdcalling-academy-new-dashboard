import { Form, Input, Modal, Switch } from 'antd';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/academyLogo.png'
import usePostRequest from '../Hooks/usePostRequest';

const Settings = () => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();
    const [oldPasswordType, setoldPasswordType] = useState('password')
    const [newPasswordType, setnewPasswordType] = useState('password')
    const [confirmNewPasswordType, setconfirmNewPasswordType] = useState('password')
    const { mutate, isLoading, data, error } = usePostRequest('UpdatePassWord', '/update-pass');
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const onFinish = (values) => {
        const formData = new FormData()
        Object.keys(values).map(key => {
            formData.append(key, values[key])
        })
        mutate(formData)
        setOpen(false)
        form.resetFields()
    };



    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-start items-start gap-4 mt-6'>
            <p className='text-xl font-semibold'>Settings</p>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Personal Information</p> <Link to={`/profile`} className='text-2xl'><IoIosArrowForward /></Link>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Notification</p>  <Switch defaultChecked onChange={onChange} />
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Change Password</p> <button onClick={() => setOpen(true)} className='text-2xl'><IoIosArrowForward /></button>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Privacy Policy</p> <Link to={`/privacy-policy`} className='text-2xl'><IoIosArrowForward /></Link>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Terms and Condition</p> <Link to={`/terms`} className='text-2xl'><IoIosArrowForward /></Link>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>About us</p> <Link to={`/about-us`} className='text-2xl'><IoIosArrowForward /></Link>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Associates</p> <Link to={`/associate-list`} className='text-2xl'><IoIosArrowForward /></Link>
            </div>
            <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }} className='bg-[#F6F6F6] p-4 py-5 rounded-md w-full flex justify-between items-center gap-2'>
                <p className='text-lg font-medium'>Sign out</p> <button onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/login')
                }} className='text-2xl'><IoIosArrowForward /></button>
            </div>



            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
                form={form}
            >
                <div>
                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        <img src={logo} alt="" />
                        <p className='text-lg font-medium py-2'>Change password</p>
                        <p>Your password must be 8-10 character long.</p>
                        <Form.Item
                            name={`current_password`}
                            label={<p>Old password</p>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                        >
                            <Input className='py-2' type={oldPasswordType} prefix={<FaLock className='text-gray-500' />} suffix={oldPasswordType === 'password' ? <FaEyeSlash onClick={() => setoldPasswordType('text ')} className='cursor-pointer' /> : <FaEye onClick={() => setoldPasswordType('password')} className='cursor-pointer' />} />
                        </Form.Item>
                        <Form.Item

                            name={`new_password`}
                            label={<p>New password</p>}
                            rules={[
                                {
                                    min: 8,
                                    required: true,
                                    message: 'Please input your new password must be longer then 8 character!',
                                },
                            ]}
                        >
                            <Input className='py-2' type={newPasswordType} prefix={<FaLock className='text-gray-500' />} suffix={newPasswordType === 'password' ? <FaEyeSlash onClick={() => setnewPasswordType('text ')} className='cursor-pointer' /> : <FaEye onClick={() => setnewPasswordType('password')} className='cursor-pointer' />} />
                        </Form.Item>
                        <Form.Item

                            name={`confirm_password`}
                            label={<p>Confirm New password</p>}
                            rules={[
                                {
                                    min: 8,
                                    required: true,
                                    message: 'Please input your new password must be longer then 8 character!',
                                },
                            ]}
                        >
                            <Input className='py-2' type={confirmNewPasswordType} prefix={<FaLock className='text-gray-500' />} suffix={confirmNewPasswordType === 'password' ? <FaEyeSlash onClick={() => setconfirmNewPasswordType('text ')} className='cursor-pointer' /> : <FaEye onClick={() => setconfirmNewPasswordType('password')} className='cursor-pointer' />} />
                        </Form.Item>
                        <div className='text-center'>
                            <button className='px-6 py-2 bg-blue-400 text-white rounded-md'>Update</button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Settings
