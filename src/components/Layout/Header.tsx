"use client";

import React from "react";
import { Layout, Avatar, Space } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const colors = {
  primary: "#0066B3",
  navy: "#003A66",
};

interface Props {
  title: string;
}

export default function AppHeader({ title }: Props) {
  return (
    <Header
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        padding: "0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 600, color: colors.navy }}>{title}</span>
      <Space size={20}>
        <BellOutlined style={{ fontSize: 20, color: colors.navy, cursor: "pointer" }} />
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: colors.primary, cursor: "pointer" }} />
      </Space>
    </Header>
  );
}
