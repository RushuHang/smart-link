"use client";

import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardOutlined, LinkOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const colors = {
  primary: "#0066B3",
  navy: "#003A66",
};

interface Props {
  collapsed: boolean;
}

export default function AppSidebar({ collapsed }: Props) {
  const pathname = usePathname();

  return (
    <Sider
      width={260}
      collapsed={collapsed}       // controlled collapse
      collapsedWidth={0}          // hide completely when collapsed
      breakpoint="lg"
      style={{ background: colors.navy, boxShadow: "4px 0 10px rgba(0,0,0,0.05)", zIndex: 10 }}
      trigger={null}              // <-- remove built-in button
    >
      <div
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: colors.primary,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          S
        </div>
        <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>
          Smart<span style={{ color: colors.primary }}>Link</span>
        </span>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[pathname.includes("payment") ? "2" : "1"]}
        style={{ background: "transparent", borderRight: 0, padding: "0 12px" }}
        theme="dark"
        items={[
          { key: "1", icon: <DashboardOutlined />, label: <Link href="/dashboard">Dashboard</Link> },
          { key: "2", icon: <LinkOutlined />, label: <Link href="/payment-link">Payment Link</Link> },
        ]}
      />
    </Sider>
  );
}
