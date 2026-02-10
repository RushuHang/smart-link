"use client";

import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Avatar, Space, ConfigProvider } from "antd";
import {
  DashboardOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BellOutlined,
  UserOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

// Refined Color Palette
const colors = {
  primary: "#0066B3",    // Pantone 285C
  navy: "#003A66",       // Deep Navy
  secondary: "#FF6B6B",  // Actual Coral accent for contrast
  lightBlue: "#F0F7FF",  // Softer background tint
  white: "#FFFFFF",
};

export default function ModernDashboard() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          borderRadius: 12,
          colorBgContainer: colors.white,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: colors.lightBlue }}>
        {/* Sidebar */}
        <Sider
          width={260}
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: colors.navy,
            boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
            zIndex: 10,
          }}
        >
          <div style={{ 
            height: 80, 
            display: "flex", 
            alignItems: "center", 
            padding: "0 24px",
            gap: "12px" 
          }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              background: colors.primary, 
              borderRadius: 8,
              display: 'grid',
              placeItems: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>F</div>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>
              FinTech<span style={{ color: colors.primary }}>Pro</span>
            </span>
          </div>
          
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ background: "transparent", borderRight: 0, padding: "0 12px" }}
            theme="dark"
            items={[
              { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
              { key: "2", icon: <LinkOutlined />, label: "Payment Link" },
            ]}
          />
        </Sider>

        <Layout style={{ background: "transparent" }}>
          {/* Header */}
          <Header
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              padding: "0 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 70,
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600, color: colors.navy }}>
              Dashboard Overview
            </span>
            <Space size={20}>
              <BellOutlined style={{ fontSize: 20, color: colors.navy, cursor: 'pointer' }} />
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: colors.primary, cursor: 'pointer' }} />
            </Space>
          </Header>

          <Content style={{ padding: "32px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
            {/* Stats Grid */}
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={8}>
                <Card bordered={false} hoverable style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <Statistic
                    title={<span style={{ color: "#8c8c8c", fontWeight: 500 }}>Total Balance</span>}
                    value={125430}
                    precision={2}
                    prefix={<span style={{ marginRight: 8 }}>$</span>}
                    valueStyle={{ color: colors.navy, fontWeight: 700, fontSize: 28 }}
                  />
                  <div style={{ marginTop: 12, color: "#52c41a", fontSize: 13, fontWeight: 600 }}>
                    <ArrowUpOutlined /> 12% <span style={{ color: "#bfbfbf", fontWeight: 400 }}>vs last month</span>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} lg={8}>
                <Card bordered={false} hoverable style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <Statistic
                    title={<span style={{ color: "#8c8c8c", fontWeight: 500 }}>Monthly Revenue</span>}
                    value={34210}
                    precision={2}
                    prefix={<span style={{ marginRight: 8 }}>$</span>}
                    valueStyle={{ color: colors.navy, fontWeight: 700, fontSize: 28 }}
                  />
                  <div style={{ marginTop: 12, color: "#52c41a", fontSize: 13, fontWeight: 600 }}>
                    <ArrowUpOutlined /> 8.4% <span style={{ color: "#bfbfbf", fontWeight: 400 }}>vs last month</span>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={8}>
                <Card bordered={false} hoverable style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <Statistic
                    title={<span style={{ color: "#8c8c8c", fontWeight: 500 }}>Active Users</span>}
                    value={4821}
                    valueStyle={{ color: colors.navy, fontWeight: 700, fontSize: 28 }}
                  />
                  <div style={{ marginTop: 12, color: colors.secondary, fontSize: 13, fontWeight: 600 }}>
                    <ArrowDownOutlined /> 2.1% <span style={{ color: "#bfbfbf", fontWeight: 400 }}>vs last week</span>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Table Section */}
            <Card
              title={<span style={{ color: colors.navy, fontSize: 18, fontWeight: 600 }}>Recent Transactions</span>}
              style={{ marginTop: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
              bordered={false}
              extra={<a href="#" style={{ color: colors.primary, fontWeight: 600 }}>View All</a>}
            >
              <Table
                pagination={false}
                dataSource={transactionData}
                columns={columns}
                rowKey="key"
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

// Table Data & Column Definitions
const transactionData = [
  { key: "1", name: "Stripe Payout", amount: 2400, status: "Completed", date: "Oct 24, 2025" },
  { key: "2", name: "Client Invoice #442", amount: 1200, status: "Pending", date: "Oct 23, 2025" },
  { key: "3", name: "AWS Cloud Billing", amount: 860, status: "Completed", date: "Oct 22, 2025" },
];

const columns = [
  {
    title: "Description",
    dataIndex: "name",
    render: (text: string) => (
      <Space>
        <Avatar size="small" style={{ backgroundColor: colors.lightBlue, color: colors.primary }}>{text[0]}</Avatar>
        <span style={{ fontWeight: 600, color: colors.navy }}>{text}</span>
      </Space>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    color: "#8c8c8c",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    align: 'right' as const,
    render: (amount: number) => (
      <span style={{ fontWeight: 700, color: colors.navy }}>
        ${amount.toLocaleString()}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    align: 'center' as const,
    render: (status: string) => {
      if (status === "Pending") return <Tag color="orange" style={{ borderRadius: 20, padding: "0 12px" }}>Pending</Tag>;
      return <Tag color="cyan" style={{ borderRadius: 20, padding: "0 12px" }}>{status}</Tag>;
    },
  },
];
