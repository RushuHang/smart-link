"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Typography, Card, Input, Tooltip, message, ConfigProvider } from "antd";
import { CheckCircle, Copy, ArrowLeft, Share2 } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

export default function PaymentConfirmationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const amount = searchParams.get("amount") || "0.00";
  const currency = searchParams.get("currency") || "USD";
  const reference = searchParams.get("reference") || "#REF-0000";
  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");
  const expiryDate = searchParams.get("expiryDate");

  const paymentLink = `https://pay.fintech.com/checkout/${reference}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    message.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const goBack = () => router.push("/payment-link");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0066B3",
          colorInfo: "#0066B3",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-10">
        <Card
          className="max-w-5xl w-full overflow-hidden border-none shadow-2xl"
          bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
        >
          <div className="flex flex-col md:flex-row min-h-[500px]">

            {/* Left Column */}
            <div className="md:w-2/5 bg-[#001529] p-10 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-[#0066B3] rounded-lg flex items-center justify-center shadow-lg">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    Smart <span className="text-[#0066B3]">Link</span>
                  </span>
                </div>
                <Title level={2} className="!text-white !mb-6 !font-bold">
                  Link Ready!
                </Title>
                <Paragraph className="!text-slate-100 text-base leading-relaxed">
                  Your secure payment link for <strong>{customerName || "your customer"}</strong> has been generated. You can copy or share it safely.
                </Paragraph>
              </div>
              <div className="mt-12 p-5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <Text className="!text-blue-300 text-[10px] block mb-2 uppercase tracking-[0.2em] font-bold">
                  Status
                </Text>
                <Text className="!text-green-400 font-medium">Ready to Send</Text>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-3/5 p-8 md:p-14 bg-white flex flex-col justify-center">
              <div className="mb-8 text-center">
                <Title level={3} className="!text-[#001529] !mb-2">Payment Details</Title>
                <Paragraph className="text-slate-500">Review the details below and copy or share the payment link.</Paragraph>
              </div>

              <div className="mb-6">
                <Text strong className="block mb-2">Total Amount</Text>
                <div className="text-3xl font-bold text-[#1a1a1a]">
                  {currency} {parseFloat(amount).toFixed(2)}
                </div>
              </div>

              <div className="mb-6">
                <Text strong className="block mb-2">Payment Link</Text>
                <Input
                  readOnly
                  size="large"
                  value={paymentLink}
                  suffix={
                    <Tooltip title={copied ? "Copied!" : "Copy Link"}>
                      <Button type="text" icon={<Copy className="text-[#0066B3]" />} onClick={handleCopy} />
                    </Tooltip>
                  }
                  className="h-12 rounded-lg bg-slate-100 border border-slate-200 font-medium"
                />
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <div className="flex justify-between mb-2">
                  <Text type="secondary">Reference</Text>
                  <Text strong>{reference}</Text>
                </div>
                {customerEmail && (
                  <div className="flex justify-between mb-2">
                    <Text type="secondary">Customer Email</Text>
                    <Text strong>{customerEmail}</Text>
                  </div>
                )}
                {expiryDate && (
                  <div className="flex justify-between">
                    <Text type="secondary">Expires On</Text>
                    <Text strong>{new Date(expiryDate).toLocaleDateString()}</Text>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<Share2 size={18} />}
                  className="h-12 font-bold flex items-center justify-center gap-2"
                >
                  Share Link
                </Button>
                <Button
                  type="default"
                  size="large"
                  icon={<ArrowLeft size={18} />}
                  onClick={goBack}
                  className="h-12 font-medium text-[#0066B3] border-[#0066B3] hover:bg-[#0066B3]/10"
                >
                  Create Another Link
                </Button>
              </div>
            </div>

          </div>
        </Card>
      </main>
    </ConfigProvider>
  );
}
