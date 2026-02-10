"use client";

import React, { useState } from "react";
import { Card, Steps, ConfigProvider, Typography } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegistrationForm from "@/src/components/register/RegistrationForm";
import ConfirmationForm from "@/src/components/register/ConfirmationForm";
import VerificationForm from "@/src/components/register/VerificationForm";
import { ShieldCheck, Monitor } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

export default function MerchantOnboarding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<{
    name?: string;
    mobile?: string;
    email?: string;
    password?: string;
  }>({});

  // move forward from Registration to Confirmation
  const handleNext = (data: { name: string; mobile: string; email?: string; password: string; confirmPassword: string }) => {
    setFormData(data); // store entire registration data
    setStep(1); // go to confirmation step
  };

  // move forward from Confirmation to Verification
  const handleConfirm = () => {
    setStep(2);
  };

  // Allow clicking steps to go back (but prevent skipping forward)
  const handleStepClick = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
    }
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
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              <div className="w-11 h-11 bg-[#0066B3] rounded-lg flex items-center justify-center shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xl font-bold">
                Smart <span className="text-[#0066B3]">Link</span>
              </span>
            </div>

            {/* Headline & Paragraph */}
            <div>
              <Title level={2} className="!text-white !mb-4 !font-bold">
                Scale your business faster
              </Title>
              <Paragraph className="!text-slate-300">
                Get onboarded in minutes and start accepting payments securely.
              </Paragraph>
            </div>

            {/* Entry Points */}
            <div className="mt-10 space-y-4">
              <EntryPoint icon={<Monitor size={18} />} title="Web Portal" active />
            </div>
          </div>

          {/* Security Status Box */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10 mt-10">
            <Text className="!text-blue-300 text-xs uppercase tracking-widest font-bold">
              Security Status
            </Text>
            <Text className="!text-green-400 block mt-1">Account Unverified</Text>
          </div>
        </section>

        {/* RIGHT CONTENT */}
        <section className="flex-1 flex items-center justify-center px-4">
          <Card
            className="w-full max-w-lg shadow-2xl border-none"
            bodyStyle={{ padding: "2.5rem" }}
          >
            <div className="min-h-[650px] flex flex-col justify-between">
              {/* Steps */}
              <Steps
                current={step}
                size="small"
                className="mb-8 cursor-pointer"
                onChange={handleStepClick}
                items={[
                  { title: "Registration" },
                  { title: "Confirmation", disabled: step === 0 },
                  { title: "Verification", disabled: step < 2 },
                ]}
              />

              {/* Step Forms */}
              {step === 0 && <RegistrationForm onNext={handleNext} />}
              {step === 1 && <ConfirmationForm formData={formData} onConfirm={handleConfirm} />}
              {step === 2 && <VerificationForm mobile={formData.mobile || ""} />}
            </div>
          </Card>
        </section>
      </main>
    </ConfigProvider>
  );
}

// ENTRY POINT COMPONENT
function EntryPoint({ icon, title, active = false }: { icon: React.ReactNode; title: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl ${
        active ? "bg-[#0066B3]/20 border border-[#0066B3]/30" : "opacity-60"
      }`}
    >
      <div className={active ? "text-[#0066B3]" : "text-white"}>{icon}</div>
      <span className={active ? "font-bold" : "font-medium"}>{title}</span>
    </div>
  );
}
