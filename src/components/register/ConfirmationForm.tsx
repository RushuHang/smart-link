"use client";

import React from "react";
import { Button, Typography, ConfigProvider } from "antd";
import { ShieldCheck, User, Phone, Mail, CheckCircle2 } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

interface ConfirmationFormProps {
  formData?: {
    name?: string;
    mobile?: string;
    email?: string;
    password?: string;
  };
  onConfirm: () => void;
}

export default function ConfirmationForm({ formData, onConfirm }: ConfirmationFormProps) {
  const { name = "", mobile = "", email = "" } = formData || {};

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0f172a", // Consistent Slate 900
          borderRadius: 12,
          fontFamily: 'inherit',
        },
      }}
    >
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col justify-between h-[600px]">
        
        {/* Header Section */}
        <div className="text-center">
          <div className="relative w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <ShieldCheck size={40} className="text-blue-600 -rotate-3" />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
          </div>
          
          <Title level={2} className="!text-2xl !font-extrabold !text-slate-900 !mb-2">
            Verify Details
          </Title>
          <Paragraph className="text-slate-500 font-medium">
            Double-check your information before we secure your account.
          </Paragraph>
        </div>

        {/* Data Display Area */}
        <div className="flex-1 mt-8 space-y-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <User size={18} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <Text className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Full Name</Text>
                <Text className="text-base font-semibold text-slate-800">{name || "—"}</Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Phone size={18} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <Text className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Mobile Number</Text>
                <Text className="text-base font-semibold text-slate-800">
                  {mobile ? `+977 ${mobile}` : "—"}
                </Text>
              </div>
            </div>

            {email && (
              <div className="flex items-start gap-4 pt-2 border-t border-slate-200/60">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <Text className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Business Email</Text>
                  <Text className="text-base font-semibold text-slate-800">{email}</Text>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-2">
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            <p className="text-xs text-slate-400 font-medium">An OTP will be sent to your mobile number</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="pt-6">
          <Button
            type="primary"
            size="large"
            block
            onClick={onConfirm}
            className="h-14 text-base font-bold bg-slate-900 hover:bg-slate-800 border-none shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
          >
            Confirm & Send OTP
          </Button>
        
        </div>
      </div>
    </ConfigProvider>
  );
}