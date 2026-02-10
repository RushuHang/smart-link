"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, ConfigProvider } from "antd";
import { ShieldCheck, ArrowRight, UserPlus,Headphones,Zap,Phone,CheckCircle2,Lock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Paragraph, Text } = Typography;

export default function MerchantLogin() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Login Successful! Redirecting...");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0066B3",
          borderRadius: 10,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <main className="h-screen w-screen flex bg-slate-100">
        <ToastContainer />

        {/* LEFT BRAND PANEL */}
        <section className="hidden md:flex w-2/5 bg-[#001529] p-12 text-white flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-11 h-11 bg-[#0066B3] rounded-lg flex items-center justify-center shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xl font-bold">
                Smart <span className="text-[#0066B3]">Link</span>
              </span>
            </div>

            <Title level={2} className="!text-white !font-bold !mb-4">
              Welcome Back!
            </Title>
            <Paragraph className="!text-slate-300 text-base">
              Access your merchant dashboard and manage payments, settlements,
              and reports in one place.
            </Paragraph>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="!bg-white/5 rounded-xl p-4">
                <Text className="!text-2xl !font-bold !text-white">10K+</Text>
                <Text className="!block !text-xs !text-slate-300">
                  Active Merchants
                </Text>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <Text className="!text-2xl !font-bold !text-white">₹5M+</Text>
                <Text className="!block !text-xs !text-slate-300">
                  Monthly Volume
                </Text>
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <Text className="!text-blue-300 text-xs uppercase tracking-widest font-bold">
              Security Status
            </Text>
            <Text className="!text-red-500 block mt-1">
              Account Secure
            </Text>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-slate-200">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <Title level={2} className="!text-2xl !font-extrabold !text-slate-900 !mb-2">
              Welcome Back
            </Title>
            <Paragraph className="text-slate-500 font-medium">
              Enter your credentials to access your dashboard
            </Paragraph>
          </div>

          {/* TRUST METRICS - Modernized into "Pill" stats */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
              <div className="flex justify-center mb-1 text-indigo-500"><Headphones size={14} /></div>
              <Text className="block text-xs font-bold text-slate-800">24/7</Text>
              <Text className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Support</Text>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
              <div className="flex justify-center mb-1 text-green-500"><Zap size={14} /></div>
              <Text className="block text-xs font-bold text-slate-800">99.9%</Text>
              <Text className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Uptime</Text>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
              <div className="flex justify-center mb-1 text-blue-500"><ShieldCheck size={14} /></div>
              <Text className="block text-xs font-bold text-slate-800">Secure</Text>
              <Text className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Encrypted</Text>
            </div>
          </div>

          {/* FORM */}
          <Form
            layout="vertical"
            form={form}
            onFinish={handleLogin}
            requiredMark={false}
            className="space-y-1"
          >
            <Form.Item
              label={<span className="text-slate-600 font-semibold ml-1">Mobile Number</span>}
              name="mobile"
              rules={[
                { required: true, message: "Required" },
                { pattern: /^[0-9]{10}$/, message: "10 digits required" },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <div className="flex items-center gap-2 pr-2 border-r border-slate-200 mr-2">
                    <Phone size={18} className="text-slate-400" />
                    <span className="text-slate-500 font-medium">+977</span>
                  </div>
                }
                placeholder="981014xxxx"
                maxLength={10}
                className="rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-600 font-semibold ml-1">Password</span>}
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password 
                size="large" 
                placeholder="••••••••" 
                prefix={<Lock size={18} className="text-slate-400 mr-2" />}
                className="rounded-lg border-slate-200"
              />
            </Form.Item>

            <div className="flex justify-end mb-4">
              <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                Forgot Password?
              </button>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="h-12 bg-slate-900 hover:bg-slate-800 border-none flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
            >
              Login to Dashboard <ArrowRight size={18} />
            </Button>
          </Form>

          {/* FEATURES - Styled as verified list */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <ul className="space-y-3">
              {[
                "Manage payments & settlements",
                "Real-time transaction tracking",
                "Secure merchant dashboard"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* REGISTER */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/register")}
              className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <UserPlus size={18} className="text-slate-400 group-hover:text-slate-900" />
              <span>Create Merchant Account</span>
            </button>
          </div>
        </div>
      </section>
      </main>
    </ConfigProvider>
  );
}
