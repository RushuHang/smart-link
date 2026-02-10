"use client";

import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'; // 1. Added Router for navigation
import { Form, Input, Button, Card, Steps, Typography, Tag, ConfigProvider } from 'antd';
import { Smartphone, Monitor, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPInput = dynamic(() => import("react-otp-input"), { ssr: false });
const { Title, Text, Paragraph } = Typography;

export default function MerchantOnboarding() {
  const router = useRouter(); // 2. Initialize Router
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false); // 3. Added loading state for button

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 1 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSignup = () => setStep(1);

  const handleStepChange = (targetStep: number) => {
    if (targetStep === 0) {
      setStep(0);
    } else if (targetStep === 1) {
      form.validateFields()
        .then(() => setStep(1))
        .catch(() => console.log("Complete form first"));
    }
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setLoading(true);
      
      // 4. Success Logic & Redirection
      toast.success("OTP Verified! Redirecting to Dashboard...", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      
      // Brief delay to allow the toast to be seen before navigating
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);
      
    } else {
        toast.error("Please enter a valid 6-digit code.");
    }
  };

  const handleResend = () => {
    setTimer(45);
    setOtp('');
    toast.info("A new code has been sent to your mobile.");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0066B3',
          colorInfo: '#0066B3',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-10">
        <ToastContainer />
        
        <Card
          className="max-w-5xl w-full overflow-hidden border-none shadow-2xl"
          styles={{ body: { padding: 0 } }}
        >
          <div className="flex flex-col md:flex-row min-h-[600px]">

            {/* Left Column */}
            <div className="md:w-2/5 bg-[#001529] p-10 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white" size={24} />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    MERCHANT<span className="text-[#0066B3]">PRO</span>
                  </span>
                </div>
                <Title level={2} className="!text-white !mb-8 !font-bold">Scale your business faster.</Title>
                <div className="space-y-4">
                  <EntryPoint icon={<Monitor size={18} />} title="Web Portal" active />
                  <EntryPoint icon={<Smartphone size={18} />} title="Mobile Application" />
                  <EntryPoint icon={<UserCheck size={18} />} title="Agent Assisted" />
                </div>
              </div>
              <div className="mt-12 p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <Text className="text-blue-300 text-[10px] block mb-2 uppercase tracking-[0.2em] font-bold">Security Status</Text>
                <Tag color="error" className="animate-pulse m-0 px-3 py-1 rounded-full border-none font-medium">Account: Unverified</Tag>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-3/5 p-8 md:p-14 bg-white">
              <div className="mb-10">
                <Steps
                  current={step}
                  onChange={handleStepChange}
                  size="small"
                  className="cursor-pointer"
                  items={[{ title: 'Registration' }, { title: 'Verification', disabled: step === 0 }]}
                />
              </div>

              {step === 0 ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-8">
                    <Title level={3} className="!text-[#001529] !mb-2">Create Account</Title>
                    <Paragraph className="text-slate-500">Enter your credentials to secure your merchant profile.</Paragraph>
                  </div>
                  <Form layout="vertical" form={form} onFinish={handleSignup} requiredMark={false}>
                    <Form.Item 
                      label={<span className="font-semibold text-slate-700">Mobile Number</span>}
                      name="mobile"
                      rules={[{ required: true, message: 'Mobile number is required' }]}
                    >
                      <Input size="large" prefix={<span className="text-slate-400 mr-1 font-medium">+1</span>} placeholder="555-0123" className="h-12" />
                    </Form.Item>
                    <Form.Item label={<span className="font-semibold text-slate-700">Business Email</span>} name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
                      <Input size="large" placeholder="name@business.com" className="h-12" />
                    </Form.Item>
                    <Form.Item label={<span className="font-semibold text-slate-700">Password</span>} name="password" rules={[{ required: true, message: 'Please create a password' }]}>
                      <Input.Password size="large" placeholder="••••••••" className="h-12" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block className="h-12 mt-6 font-bold flex items-center justify-center gap-2 transition-all hover:translate-x-1">
                      Continue to Verification <ArrowRight size={18} />
                    </Button>
                  </Form>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-300 text-center py-4">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="text-[#0066B3]" size={36} />
                  </div>
                  <Title level={3} className="!text-[#001529] !mb-2">Verify Phone</Title>
                  <Paragraph className="mb-10 text-slate-500">
                    We've sent a 6-digit code to <br/>
                    <Text strong className="text-[#0066B3]">{form.getFieldValue('mobile') || '+1 555-0123'}</Text>
                  </Paragraph>

                  <div className="flex justify-center mb-10">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="!w-12 h-14 text-2xl font-bold border-2 rounded-lg transition-all 
                                     outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-100
                                     border-slate-200 text-[#001529] bg-slate-50"
                        />
                      )}
                      containerStyle="flex gap-3 justify-center"
                      inputType="tel"
                    />
                  </div>

                  <Button 
                    type="primary" 
                    size="large" 
                    block 
                    className="h-12 bg-[#001529] mb-4 font-bold disabled:opacity-50"
                    onClick={handleVerify}
                    disabled={otp.length < 6}
                    loading={loading} // 5. Added visual feedback for clicking
                  >
                    Verify & Access Dashboard
                  </Button>
                  
                  <div className="flex flex-col items-center">
                    <Button type="link" className="text-[#0066B3] font-medium" disabled={timer > 0 || loading} onClick={handleResend}>
                      {timer > 0 ? `Resend code in ${timer}s` : "Resend Verification Code"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>
    </ConfigProvider>
  );
}

function EntryPoint({ icon, title, active = false }: { icon: React.ReactNode, title: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-default ${active ? 'bg-[#0066B3]/20 border border-[#0066B3]/30' : 'opacity-50 hover:opacity-100'}`}>
      <div className={`${active ? 'text-[#0066B3]' : 'text-white'}`}>{icon}</div>
      <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{title}</span>
    </div>
  );
}