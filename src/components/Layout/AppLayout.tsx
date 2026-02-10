"use client";

import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import AppHeader from "./Header";
import AppSidebar from "./Sidebar";

const { Content } = Layout;

interface Props {
  children: ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar collapsed={collapsed} />
      <Layout>
        <AppHeader title={title} collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Content style={{ padding: 32, maxWidth: 1600, margin: "0 auto", width: "100%" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
