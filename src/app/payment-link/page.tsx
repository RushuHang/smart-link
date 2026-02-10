"use client";

import React from "react";
import AppLayout from "@/src/components/Layout/AppLayout";
import {
  ConfigProvider,
  Button,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Space,
  Typography,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const colors = {
  primaryBlue: "#3395FF",
  borderBlue: "#3395FF",
  labelGray: "#515965",
  inputBorder: "#D9E2EE",
};

export default function PaymentLinkPage() {
  return (
    <AppLayout title="Payment Link">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.primaryBlue,
            borderRadius: 2,
            colorTextBase: "#2E3A59",
            fontFamily: "Inter, -apple-system, sans-serif",
          },
        }}
      >
        {/* Header Tabs */}
        <div
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <div
            style={{
              padding: "15px 5px",
              borderBottom: `2px solid ${colors.borderBlue}`,
              color: colors.primaryBlue,
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Payment Links
          </div>

          <Button type="primary" icon={<PlusOutlined />} style={{ height: 36, padding: "0 15px" }}>
            Create Payment Link
          </Button>
        </div>

        {/* Main Filter Content */}
        <div style={{ background: "#fff", padding: "24px" }}>
          {/* First Row of Filters */}
          <Row gutter={[12, 0]} align="bottom">
            <Col span={3}>
              <label style={labelStyle}>Payment Link Status</label>
              <Select defaultValue="all" style={{ width: "100%" }}>
                <Select.Option value="all">All</Select.Option>
              </Select>
            </Col>
            <Col span={3}>
              <label style={labelStyle}>Payment Link Id</label>
              <Input />
            </Col>
            <Col span={3}>
              <label style={labelStyle}>Batch Id</label>
              <Input />
            </Col>
            <Col span={3}>
              <label style={labelStyle}>Reference Id</label>
              <Input />
            </Col>
            <Col span={3}>
              <label style={labelStyle}>Customer Contact</label>
              <Input />
            </Col>
            <Col span={3}>
              <label style={labelStyle}>Customer Email</label>
              <Input />
            </Col>
            <Col span={4}>
              <label style={labelStyle}>Notes</label>
              <Input />
            </Col>
            <Col span={2}>
              <label style={labelStyle}>Count</label>
              <Input defaultValue="25" />
            </Col>
          </Row>

          {/* Second Row of Filters */}
          <Row gutter={[12, 0]} align="bottom" style={{ marginTop: 20 }}>
            <Col span={3}>
              <label style={labelStyle}>Payment Link Type</label>
              <Select defaultValue="all" style={{ width: "100%" }}>
                <Select.Option value="all">All Types</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <label style={labelStyle}>Duration</label>
              <div style={{ display: "flex" }}>
                <Select defaultValue="7d" style={{ width: 140 }}>
                  <Select.Option value="7d">Past 7 Days</Select.Option>
                </Select>
                <RangePicker
                  style={{ flex: 1, borderLeft: "none" }}
                  placeholder={["31 Jan 2026", "07 Feb 2026"]}
                  format="DD MMM YYYY"
                />
              </div>
            </Col>
            <Col span={4}>
              <Space size="small">
                <Button type="primary" style={{ padding: "0 20px" }}>
                  Search
                </Button>
                <Button style={{ color: "#8c8c8c" }}>Clear</Button>
              </Space>
            </Col>
          </Row>

          {/* Loading State */}
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
            <LoadingOutlined style={{ fontSize: 28, color: "#d9d9d9" }} spin />
          </div>
        </div>
      </ConfigProvider>
    </AppLayout>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: "12px",
  fontWeight: 600,
  color: colors.labelGray,
  whiteSpace: "nowrap",
};
