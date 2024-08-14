
import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import loginImage from "../assets/loginImage.png";
import logo from "../assets/academyLogo.png";
import { Link ,useLocation} from "react-router-dom";
import useAxiosConfig from "../AxiosConfig/useAxiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { useUserData } from "../Providers/UserProviders/UserProvider";
const Login = () => {
    const { useData, setUserData,loading, setLoading } = useUserData()
    const location = useLocation()
    const navigate = useNavigate();
    if (useData?.email) {// || localStorage.getItem('token')
        return navigate(`${location?.state || '/'}`)
    }
    const AxiosConfig = useAxiosConfig()
    const onFinish = async (values) => {
        setLoading(true)
        // { email: 'asd@gm', password: 'dasdasd ad ', remember: false }
        try {
            const loginPromise = AxiosConfig.post('/login', { email: values?.email, password: values?.password }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.promise(
                loginPromise,
                {
                    loading: 'Logging in...',
                    success: (res) => {
                        setLoading(false)
                        if (res?.data?.access_token) {
                            localStorage.setItem('token', JSON.stringify(res.data.access_token));
                            setUserData(res?.data?.user);
                            return `Logged in as ${res?.data?.user?.name || res?.data?.user?.email || res?.data?.user?.role}`;
                        }
                    },
                    error: (error) => {
                        setUserData(false);
                        setLoading(false)
                        return error?.response?.data?.message || error.message || "Something went wrong."
                    }
                }
            );
        } catch (error) {
            setUserData(false);
            setLoading(false)
            toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
        }

    };
    return (
        <div
            className="grid grid-cols-2 gap-0"
            style={{
                width: "100%",
                background: "#F4EAD9",
                height: "100vh",
            }}
        >
            <div className="flex justify-center items-center bg-white ">
                <img src={loginImage} alt="" />
            </div>
            <div className="bg-white flex justify-center items-center">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: "630px",
                        background: "white",
                        borderRadius: "12px",
                        padding: "90px 57px",
                    }}
                    onFinish={onFinish}
                >
                    <img src={logo} alt="" />
                    <h1
                        style={{ fontSize: "32px", color: "#6A6D7C", textAlign: "left" }}
                    >
                        Hello,Welcome!
                    </h1>
                    <p className="my-2 text-base">Please Enter Your Details Below to Continue</p>
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            htmlFor="email"
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            {" "}
                            Email address:{" "}
                        </label>
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
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Enter your password"
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

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: "#6A6D7C" }}>Remember me</Checkbox>
                        </Form.Item>
                        <Link
                            className="login-form-forgot "
                            style={{ color: "#B47000" }}
                            to="/forgot-password"
                        >
                            Forgot password
                        </Link>
                    </div>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            style={{
                                height: "52px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                // background: "blue",
                                marginTop: "56px",
                            }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Login;
