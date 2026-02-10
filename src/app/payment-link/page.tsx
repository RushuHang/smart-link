"use client";

import React, { useState } from "react";
import AppLayout from "@/src/components/Layout/AppLayout";
import {
  ConfigProvider,
  Button,
  Input,
  Select,
  Row,
  Col,
  Space,
  Typography,
  Card,
} from "antd";
import { PlusOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";

import PaymentLinksTable, { PaymentData } from "@/src/components/PaymentLinksTable";
import CreatePaymentLinkDrawer from "@/src/components/CreatePaymentLinkDrawer";
const { Text } = Typography;
const { Option } = Select;

const colors = {
  primary: "#3395FF",
  bgLight: "#F8FAFC",
  textMain: "#1E293B",
  textSecondary: "#64748B",
  border: "#E2E8F0",
};

// Dummy data
const dummyData: PaymentData[] = [
  {
    key: "1",
    linkId: "PL_001",
    batchId: "BATCH_001",
    referenceId: "REF_001",
    contact: "9876543210",
    email: "john.doe@example.com",
    status: "Paid",
    amount: "$100.00",
    createdAt: "01 Feb 2026",
  },
  {
    key: "2",
    linkId: "PL_002",
    batchId: "BATCH_002",
    referenceId: "REF_002",
    contact: "9876543211",
    email: "jane.smith@example.com",
    status: "Pending",
    amount: "$250.00",
    createdAt: "03 Feb 2026",
  },
  {
    key: "3",
    linkId: "PL_003",
    batchId: "BATCH_003",
    referenceId: "REF_003",
    contact: "9876543212",
    email: "alice.w@example.com",
    status: "Failed",
    amount: "$75.00",
    createdAt: "05 Feb 2026",
  },
];

export default function PaymentLinkPage() {
  // Filter state
  const [status, setStatus] = useState("all");
  const [linkId, setLinkId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [refId, setRefId] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [filteredData, setFilteredData] = useState<PaymentData[]>(dummyData);

  // Drawer state
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleSearch = () => {
    let data = [...dummyData];
    if (status !== "all") data = data.filter((item) => item.status.toLowerCase() === status.toLowerCase());
    if (linkId) data = data.filter((item) => item.linkId.includes(linkId));
    if (batchId) data = data.filter((item) => item.batchId.includes(batchId));
    if (refId) data = data.filter((item) => item.referenceId.includes(refId));
    if (contact) data = data.filter((item) => item.contact.includes(contact));
    if (email) data = data.filter((item) => item.email.includes(email));

    setFilteredData(data);
  };

  const handleClear = () => {
    setStatus("all");
    setLinkId("");
    setBatchId("");
    setRefId("");
    setContact("");
    setEmail("");
    setFilteredData(dummyData);
  };

  const handleCreatePaymentLink = (values: any) => {
    console.log("New Payment Link:", values);
    // TODO: Call your API to create payment link
    setDrawerVisible(false);
  };

  return (
    <AppLayout title="Payment Link">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.primary,
            borderRadius: 6,
            colorTextBase: colors.textMain,
            fontFamily: "'Inter', -apple-system, sans-serif",
            controlHeight: 38,
          },
          components: {
            Button: { fontWeight: 600, boxShadow: "none" },
            Input: { colorBgContainer: "#ffffff", colorBorder: colors.border },
          },
        }}
      >
        <div style={{ background: colors.bgLight, paddingBottom: "40px" }}>
          {/* Header */}
          <div
            style={{
              background: "#fff",
              padding: "16px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 0",
                  borderBottom: `3px solid ${colors.primary}`,
                  color: colors.primary,
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                }}
              >
                Payment Links
              </div>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                height: "36px",
                padding: "0 16px",
                borderRadius: "6px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setDrawerVisible(true)}
            >
              Create Payment Link
            </Button>
          </div>

          {/* Filters & Table */}
          <div style={{ padding: "24px 32px" }}>
            <Card bordered={false} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)" }}>
              <Row gutter={[16, 20]} align="bottom">
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>
                    Status
                  </Text>
                  <Select value={status} onChange={setStatus} style={{ width: "100%" }}>
                    <Option value="all">All Status</Option>
                    <Option value="created">Created</Option>
                    <Option value="active">Active</Option>
                    <Option value="paid">Paid</Option>
                    <Option value="expired">Expired</Option>
                    <Option value="canceled">Canceled</Option>
                    <Option value="failed">Failed</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>Payment Link ID</Text>
                  <Input placeholder="PL_..." value={linkId} onChange={(e) => setLinkId(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>Batch ID</Text>
                  <Input placeholder="Batch..." value={batchId} onChange={(e) => setBatchId(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>Reference ID</Text>
                  <Input placeholder="Ref..." value={refId} onChange={(e) => setRefId(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>Contact</Text>
                  <Input placeholder="98765..." value={contact} onChange={(e) => setContact(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} lg={3}>
                  <Text strong style={labelStyle}>Customer Email</Text>
                  <Input placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} lg={4}>
                  <Text strong style={labelStyle}>Notes</Text>
                  <Input placeholder="Search notes..." />
                </Col>
              </Row>

              <Row gutter={[16, 20]} align="bottom" style={{ marginTop: 24 }}>
                <Col xs={24} lg={6}>
                  <Space size="middle">
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      style={{ height: "36px", padding: "0 20px", borderRadius: "6px", fontSize: "14px" }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                    <Button
                      icon={<ClearOutlined />}
                      style={{ color: colors.textSecondary, border: "none", background: "transparent" }}
                      onClick={handleClear}
                    >
                      Clear Filters
                    </Button>
                  </Space>
                </Col>
              </Row>

              <div style={{ marginTop: 40 }}>
                <PaymentLinksTable data={filteredData} />
              </div>
            </Card>
          </div>

          {/* Drawer Component */}
          <CreatePaymentLinkDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            onCreate={handleCreatePaymentLink}
          />
        </div>
      </ConfigProvider>
    </AppLayout>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: "13px",
  color: colors.textSecondary,
  letterSpacing: "0.02em",
};
