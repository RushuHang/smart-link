"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, ConfigProvider } from 'antd';
import { ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title, Paragraph, Text } = Typography;

export default function MerchantLogin() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Login Successful! Redirecting...", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      router.push('/dashboard');
    }, 1500);
  };

  const goToRegistration = () => {
    router.push('/register'); // Redirect to your registration page
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
            styles={{
              body: {
                padding: 0,
                backgroundColor: 'transparent',
              },
            }}
          >
          <div className="flex flex-col md:flex-row min-h-[500px]">

            {/* Left Column */}
            <div className="md:w-2/5 bg-[#001529] p-10 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white" size={24} />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    Smart <span className="text-[#0066B3]">Link</span>
                  </span>
                </div>
                <Title level={2} className="!text-white !mb-6 !font-bold">Welcome Back!</Title>
                <Paragraph className="text-slate-100 text-base leading-relaxed">
                  Log in to access your merchant dashboard and manage your business efficiently.
                </Paragraph>
              </div>
              <div className="mt-12 p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <Text className="text-blue-300 text-[10px] block mb-2 uppercase tracking-[0.2em] font-bold">Security Status</Text>
                <Text className="text-red-400 font-medium">Account: Secure</Text>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-3/5 p-8 md:p-14 bg-white flex flex-col justify-center">
              <div className="mb-8 text-center">
                <Title level={3} className="!text-[#001529] !mb-2">Login to your Account</Title>
                <Paragraph className="text-slate-500">Enter your mobile number and password to continue.</Paragraph>
              </div>

              <Form layout="vertical" form={form} onFinish={handleLogin} requiredMark={false}>
                {/* Mobile Number with 10-digit validation */}
                <Form.Item 
                  label={<span className="font-semibold text-slate-700">Mobile Number</span>}
                  name="mobile"
                  rules={[
                    { required: true, message: 'Mobile number is required' },
                    { pattern: /^[0-9]{10}$/, message: 'Mobile number must be exactly 10 digits' }
                  ]}
                >
                  <Input 
                    size="large" 
                    prefix={<span className="text-slate-400 mr-1 font-medium">+977</span>} 
                    placeholder="981014xxxx" 
                    className="h-12" 
                    maxLength={10} // Optional: limit typing to 10 digits
                  />
                </Form.Item>

                <Form.Item 
                  label={<span className="font-semibold text-slate-700">Password</span>} 
                  name="password" 
                  rules={[{ required: true, message: 'Please enter your password' }]}
                >
                  <Input.Password size="large" placeholder="••••••••" className="h-12" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block 
                  className="h-12 mt-6 font-bold flex items-center justify-center gap-2 transition-all hover:translate-x-1"
                  loading={loading}
                >
                  Login <ArrowRight size={18} />
                </Button>
              </Form>

              <div className="mt-6 text-center flex flex-col gap-2">
                {/* <Button 
                  type="link" 
                  className="text-[#0066B3] font-medium" 
                  onClick={() => toast.info("Redirecting to password recovery...")}
                >
                  Forgot Password?
                </Button> */}

                {/* New Registration Button */}
                <Button 
                  type="default" 
                  icon={<UserPlus size={16} />} 
                  onClick={goToRegistration} 
                  className="text-[#0066B3] font-medium border-[#0066B3] hover:bg-[#0066B3]/10"
                >
                  Create Account
                </Button>
              </div>
            </div>

          </div>
        </Card>
      </main>
    </ConfigProvider>
  );
}
