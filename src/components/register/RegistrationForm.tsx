"use client";

import React from "react";
import { Form, Input, Button, ConfigProvider } from "antd";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";

interface RegistrationFormProps {
  onNext: (formValues: { 
    name: string; 
    mobile: string; 
    email?: string; 
    password: string; 
    confirmPassword: string 
  }) => void;
}

export default function RegistrationForm({ onNext }: RegistrationFormProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onNext(values);
  };

  return (
    // ConfigProvider allows us to inject modern design tokens globally for this form
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0f172a", // Slate 900
          borderRadius: 8,
          controlHeightLG: 48,
          fontFamily: 'inherit',
        },
        components: {
          Input: {
            activeBorderColor: "#3b82f6", // Blue 500 focus
            hoverBorderColor: "#94a3b8", // Slate 400
          },
        },
      }}
    >
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col">
        <div className="mb-8">
          <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Create Account
          </h3>
          <p className="text-slate-500 mt-2 font-medium">
            Secure your merchant profile to get started
          </p>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
          className="space-y-1"
        >
          <Form.Item
            label={<span className="text-slate-600 font-semibold ml-1">Full Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input 
              size="large" 
              placeholder="John Doe" 
              prefix={<User size={18} className="text-slate-400 mr-2" />}
              className="rounded-lg border-slate-200"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-600 font-semibold ml-1">Mobile Number</span>}
            name="mobile"
            rules={[
              { required: true, message: "Mobile number is required" },
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
            label={<span className="text-slate-600 font-semibold ml-1">Business Email</span>} 
            name="email" 
            rules={[{ type: "email", message: "Enter a valid email" }]}
          >
            <Input 
              size="large" 
              placeholder="name@business.com" 
              prefix={<Mail size={18} className="text-slate-400 mr-2" />}
              className="rounded-lg border-slate-200"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item 
              label={<span className="text-slate-600 font-semibold ml-1">Password</span>} 
              name="password" 
              rules={[{ required: true, message: "Required" }]}
            >
              <Input.Password 
                size="large" 
                prefix={<Lock size={18} className="text-slate-400 mr-2" />}
                className="rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-600 font-semibold ml-1">Confirm</span>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) return Promise.resolve();
                    return Promise.reject("Mismatch");
                  },
                }),
              ]}
            >
              <Input.Password 
                size="large" 
                prefix={<Lock size={18} className="text-slate-400 mr-2" />}
                className="rounded-lg border-slate-200"
              />
            </Form.Item>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="h-12 mt-6 bg-slate-900 hover:bg-slate-800 border-none flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
          >
            Continue 
            <ArrowRight size={20} />
          </Button>
        </Form>
        
        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </ConfigProvider>
  );
}