"use client";

import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Button, Typography, ConfigProvider } from "antd";
import { Smartphone, RefreshCcw, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

interface VerificationFormProps {
  mobile: string;
}

export default function VerificationForm({ mobile }: VerificationFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    setLoading(true);
    toast.success("OTP Verified! Redirecting...");
    setTimeout(() => router.push("/dashboard"), 1800);
  };

  const handleResend = () => {
    setOtp("");
    setTimer(45);
    toast.info("A new code has been sent");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0f172a", // Slate 900
          borderRadius: 12,
          fontFamily: 'inherit',
        },
      }}
    >
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col justify-between h-[600px]">
        
        {/* Header Section */}
        <div className="text-center">
          <div className="relative w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Smartphone size={40} className="text-indigo-600 -rotate-3" />
          </div>
          
          <Title level={2} className="!text-2xl !font-extrabold !text-slate-900 !mb-2">
            Verify Phone
          </Title>
          <Paragraph className="text-slate-500 font-medium px-4">
            We've sent a 6-digit verification code to
            <br />
            <Text className="text-slate-900 font-bold tracking-tight">+977 {mobile}</Text>
          </Paragraph>
        </div>

        {/* OTP Input Section */}
        <div className="flex flex-col items-center">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(inputProps, index) => (
              <input
                {...inputProps}
                key={index}
                type="tel"
                inputMode="numeric"
                className="
                  !w-12 h-16 
                  text-2xl font-bold text-center 
                  bg-slate-50 border-2 border-slate-100 
                  rounded-xl 
                  transition-all duration-200
                  focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-100
                  outline-none 
                  shadow-sm
                  text-slate-800
                "
              />
            )}
            containerStyle="flex gap-2 sm:gap-3 justify-center"
          />
          
          <div className="mt-8 flex items-center gap-2">
            {timer > 0 ? (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                </span>
                <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Resend in {timer}s
                </Text>
              </div>
            ) : (
              <button 
                onClick={handleResend}
                className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <RefreshCcw size={16} />
                Resend Code
              </button>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="pt-6">
          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={otp.length < 6}
            onClick={handleVerify}
            className={`h-14 text-base font-bold flex items-center justify-center gap-2 border-none shadow-lg transition-all active:scale-[0.98] ${
              otp.length === 6 ? 'bg-slate-900 shadow-slate-200' : 'bg-slate-200'
            }`}
          >
            {loading ? "Verifying..." : "Verify & Access Dashboard"}
            {!loading && <CheckCircle2 size={18} />}
          </Button>
          
          <button 
            onClick={() => router.back()}
            className="w-full mt-4 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Change phone number
          </button>
        </div>
      </div>
    </ConfigProvider>
  );
}