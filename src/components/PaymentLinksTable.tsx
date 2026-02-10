"use client";

import React from "react";
import { Table, Typography, Tag, Space, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

export interface PaymentData {
  key: string;
  linkId: string;
  batchId: string;
  referenceId: string;
  contact: string;
  email: string;
  status: string;
  amount: string;
  createdAt: string;
}

interface Props {
  data: PaymentData[];
}

const PaymentLinksTable: React.FC<Props> = ({ data }) => {
  const columns: ColumnsType<PaymentData> = [
    {
      title: "Link Details",
      dataIndex: "linkId",
      key: "linkId",
      render: (id, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: "#1890ff" }}>{id}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>Ref: {record.referenceId}</Text>
        </Space>
      ),
    },
    {
      title: "Customer",
      dataIndex: "email",
      key: "email",
      render: (email, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: "#f56a00" }} />
          <Space direction="vertical" size={0}>
            <Text style={{ fontSize: "14px", fontWeight: 500 }}>{email}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>{record.contact}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Batch",
      dataIndex: "batchId",
      key: "batchId",
      render: (batch) => <Tag color="default">{batch}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        switch (status.toLowerCase()) {
          case "paid":
            color = "success";
            break;
          case "pending":
            color = "warning";
            break;
          case "failed":
            color = "error";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} style={{ borderRadius: "12px", padding: "0 12px", fontWeight: 600 }}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => <Text strong>{amount}</Text>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <Text type="secondary">{date}</Text>,
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <Card
        title="Recent Payment Links"
        bordered={false}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: "8px" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          size="middle"
          rowClassName="modern-table-row"
        />
      </Card>

      <style jsx global>{`
        .modern-table-row:hover {
          cursor: pointer;
        }
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
};

export default PaymentLinksTable;
