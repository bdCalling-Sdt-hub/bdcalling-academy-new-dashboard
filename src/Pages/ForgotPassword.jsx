import { Button, Form, Input, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import forgatePass from "../assets/forgatePass.png";
import logo from "../assets/academyLogo.png";
import usePostRequest from "../Hooks/usePostRequest";
const ForgotPassword = () => {
    const { mutate, isLoading, data, error } = usePostRequest('forgetPass', '/forget-pass');
    const navigate = useNavigate();
    const onFinish = (values) => {
        // localStorage.setItem('email' , values?.email)
        const data = {
            email : values?.email
        }
        // console.log(data)
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        mutate(formData)
    };
    useEffect(()=>{
        if(!error && data){
            navigate('/otp')
        }
    },[error,data])
    return (
        <div className="grid grid-cols-2 gap-0 "
            style={{
                width: "100%",
                background: "#F4EAD9",
                height: "100vh",
            }}
        >
            <div className="flex justify-center bg-white items-center">
                <img src={forgatePass} alt="" />
            </div>
            <div className="w-full bg-white flex justify-center items-center">
                <Form
                    name="normal_login"
                    className="password-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{ width: "630px", background: "white", borderRadius: "12px", padding: "90px 57px" }}

                    onFinish={onFinish}
                >
                    <img src={logo} alt="" />
                    <h1 style={{ fontSize: "32px", marginBottom: "14px", color: "#494949", textAlign: "left" }}>Forgot Password</h1>
                    <p className="text-base pb-2">Enter the email address associated with your account. We'll send you an OTP in your email. </p>
                    <div style={{ marginBottom: "24px" }}>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}> Email Address</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="email"
                            id="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                style={{
                                    border: "1px solid #E0E4EC",
                                    height: "52px",
                                    background: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}

                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            style={{
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#555555",
                                color: "white",
                                alignSelf: "bottom",
                                marginTop: "30px",
                            }}
                        >
                            Send a Code
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
