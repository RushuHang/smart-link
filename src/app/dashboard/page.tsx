"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table, Tag, Avatar, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { transactionData, columns } from "../../app/utils/data";
import AppLayout from "@/src/components/Layout/AppLayout";

const colors = {
  primary: "#0066B3",
  navy: "#003A66",
  secondary: "#FF6B6B",
  lightBlue: "#F0F7FF",
};

export default function DashboardPage() {
  // Customize the table columns
  const dashboardColumns = columns.map((col) => {
    if (col.dataIndex === "name") {
      return {
        ...col,
        render: (text: string) => (
          <Space>
            <Avatar size="small" style={{ backgroundColor: colors.lightBlue, color: colors.primary }}>
              {text[0]}
            </Avatar>
            <span style={{ fontWeight: 600, color: colors.navy }}>{text}</span>
          </Space>
        ),
      };
    }

    if (col.dataIndex === "status") {
      return {
        ...col,
        render: (status: string) =>
          status === "Pending" ? (
            <Tag color="orange" style={{ borderRadius: 20, padding: "0 12px" }}>
              Pending
            </Tag>
          ) : (
            <Tag color="cyan" style={{ borderRadius: 20, padding: "0 12px" }}>
              {status}
            </Tag>
          ),
      };
    }

    if (col.dataIndex === "amount") {
      return {
        ...col,
        render: (amount: number) => <span style={{ fontWeight: 700, color: colors.navy }}>${amount.toLocaleString()}</span>,
      };
    }

    return col;
  });

  return (
    <AppLayout title="Dashboard">
      {/* Stats Grid */}
      <Row gutter={[32, 32]}>
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

      {/* Transactions Table */}
      <Card
        title={<span style={{ color: colors.navy, fontSize: 18, fontWeight: 600 }}>Recent Transactions</span>}
        style={{ marginTop: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
        bordered={false}
        extra={<a href="#" style={{ color: colors.primary, fontWeight: 600 }}>View All</a>}
      >
        <Table pagination={false} dataSource={transactionData} columns={dashboardColumns} rowKey="key" />
      </Card>
    </AppLayout>
  );
}
