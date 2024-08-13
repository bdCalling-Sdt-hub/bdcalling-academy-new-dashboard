import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import toast from "react-hot-toast";


const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");


  const { mutate, isLoading, data, error } = usePostRequest('forgetPass', '/resend-otp');
  const { mutate: mutationOtp, isLoading: OtpIsLoading, data: OtpData, error: OtpError } = usePostRequest('email-verified', '/email-verified');
  const handleResendCode = () => {
    const formData = new FormData()
    formData.append("email", localStorage.getItem('email'))
    mutate(formData)
  }
  const handleVerifyOtp = () => {
    console.log(otp)
    if (!otp) {
      return toast.error('Please Input Your Verification Email')
    }

    const email = localStorage.getItem('email')
    console.log(email)

    const data = {
      email,otp
    }
    console.log(data)
    const formData = new FormData()
    formData.append('email', email) 
    formData.append('otp', otp)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
    mutationOtp(formData)
  }
  useEffect(() => {
    if (!OtpError && OtpData) {
      navigate('/update-password')
    }
  }, [OtpError, OtpData])
  return (
    <div className="bg-blue-100"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "630px", background: "white", padding: "90px 57px" }}>
        <h1 style={{ fontSize: "32px", color: "#6A6D7C", marginBottom: "13px", textAlign: "center" }}>Check your email</h1>
        <p style={{ width: "380px", color: "#B8B8B8", margin: "0 auto 0 auto" }}>
          We sent a reset link to <span style={{ color: "#545454" }}> contact@dscode...com </span>
          enter 6 digit code that mentioned in the email
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px", }} className="py-7">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: "44px",
              width: "44px",
              borderRadius: "8px",
              marginRight: "16px",
              fontSize: "20px",
              border: "1px solid #A9A9A9",
              color: "#2B2A2A",
              outline: "none"
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Button
          onClick={handleVerifyOtp}
          block
          htmlType="submit"
          style={{
            height: "52px",
            fontWeight: "400px",
            fontSize: "18px",
            color: "white",
            background: "#3C3C3C",
            marginTop: "30px",
            border: "none",
            outline: "none",
            marginBottom: "20px"
          }}
        >
          Verify
        </Button>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Didn’t receive code?
          <p onClick={handleResendCode} style={{ color: "#B47000", textDecoration: "underline", cursor: "pointer" }}>Resend </p>
        </p>
      </div>
    </div>
  );
};

export default Otp;
