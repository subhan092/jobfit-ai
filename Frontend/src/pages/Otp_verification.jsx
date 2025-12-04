import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import axios from "axios";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/key";
import { useNavigate } from "react-router-dom";
import {  Loader2 } from "lucide-react";

const Otp_verification = () => {
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    const registerd_email = localStorage.getItem('verify-email')
    const navigate = useNavigate()
  

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          const res = await axios.post(`${USER_API_END_POINT}/verify-email`, {email : registerd_email,
            code: value });
            setValue('')
          if (res.data.success) {
            toast.success(res.data.message || "Email verified");
            localStorage.removeItem('verify-email')
            navigate('/login')
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Verification failed");
          console.log("error in otp verify",error)
        }
        finally{
          setLoading(false)
        }
      };

  return (
    <div className="max-w-screen mx-auto flex flex-col justify-center h-dvh bg-purple-400 items-center">
      <div className="bg-[#ffff] text-center mx-auto font-serif w-[25rem] md:w-[30rem] space-y-6 rounded-md shadow-lg py-10 px-6 ">
        <div className="">
        <h2 className="text-xl  font-medium">We sent you a code</h2>
        <p className="text-purple-500 ">{registerd_email}</p>
        <h2>please enter it below to verfiy your email</h2>
        </div>
          <form onSubmit={handleVerify}>
          <div className="mx-16 w-full pb-4">
          <InputOTP value={value}
        onChange={(value) => setValue(value)}  maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          </div>
          <Button type="submit" className="bg-purple-500">{loading  ? <Loader2 className="animate-spin" /> : "verify"}</Button>
          </form>
       
      </div>
    </div>
  );
};

export default Otp_verification;
