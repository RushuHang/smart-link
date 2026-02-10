"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Layout, Avatar, Space, Popover, Typography, Divider, Button, Badge, Tooltip } from "antd";
import { 
  BellOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";

const { Header } = Layout;
const { Text, Title } = Typography;

const colors = {
  primary: "#0066B3",
  navy: "#003A66",
  danger: "#ff4d4f",
};

interface Props {
  title: string;
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function AppHeader({ title, collapsed, toggleSidebar }: Props) {
  const router = useRouter();

  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
  };

 const notifications = [
  { id: 1, title: "Payment of $120 received from Alice Johnson", time: "2m ago" },
  { id: 2, title: "Refund of $50 processed for Order #4532", time: "15m ago" },
  { id: 3, title: "New transaction: $200 sent to Bob Smith", time: "45m ago" },
  { id: 4, title: "Payment of $75 received from Charlie Lee", time: "1h ago" },
  { id: 5, title: "Failed transaction: $60 attempted by David Kim", time: "2h ago" },
];


  const handleLogout = () => {
    router.push("/");
  };

  const userContent = (
    <div style={{ width: 240, padding: "4px 0" }}>
      <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar size={48} icon={<UserOutlined />} style={{ backgroundColor: colors.primary, flexShrink: 0 }} />
        <div style={{ overflow: "hidden" }}>
          <Title level={5} style={{ margin: 0, fontSize: 15 }}>{userInfo.name}</Title>
          <Text type="secondary" style={{ fontSize: 12, display: "block" }} ellipsis>{userInfo.email}</Text>
        </div>
      </div>
      <div style={{ padding: "4px 16px" }}>
         <Text code style={{ fontSize: 11, color: colors.primary }}>{userInfo.role}</Text>
      </div>
      
      <Divider style={{ margin: "12px 0" }} />
      <Button type="text" danger block icon={<LogoutOutlined />} style={{ textAlign: "left", height: 40 }} onClick={handleLogout}>
        Sign Out
      </Button>
    </div>
  );

  const notificationContent = (
    <div style={{ width: 280, padding: "8px 0" }}>
      <Title level={5} style={{ margin: "0 16px 8px", fontSize: 16 }}>Notifications</Title>
      <Divider style={{ margin: "4px 0" }} />
      {notifications.length === 0 ? (
        <Text type="secondary" style={{ margin: "8px 16px", display: "block" }}>No new notifications</Text>
      ) : (
        notifications.map((notif) => (
          <div key={notif.id} style={{ padding: "8px 16px", borderBottom: "1px solid #f0f0f0" }}>
            <Text strong>{notif.title}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{notif.time}</Text>
          </div>
        ))
      )}
      <Divider style={{ margin: "8px 0" }} />
      <Button type="link" block style={{ textAlign: "center" }}>View All</Button>
    </div>
  );

  return (
    <Header
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        padding: "0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Space align="center" size={16}>
        <Button 
          type="text" 
          onClick={toggleSidebar} 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          style={{ fontSize: 20, color: colors.navy }}
        />
        <span style={{ fontSize: 20, fontWeight: 700, color: colors.navy, letterSpacing: "-0.5px" }}>
          {title}
        </span>
      </Space>

      <Space size={24}>
        <Tooltip title="Notifications">
          <Popover content={notificationContent} trigger="click" placement="bottomRight" overlayInnerStyle={{ padding: 0 }}>
            <Badge count={notifications.length} size="small" offset={[0, 0]}>
              <BellOutlined style={{ fontSize: 20, color: colors.navy, cursor: "pointer", opacity: 0.7 }} />
            </Badge>
          </Popover>
        </Tooltip>

        <Tooltip title="User Profile">
          <Popover content={userContent} trigger="click" placement="bottomRight" overlayInnerStyle={{ padding: 0 }}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ backgroundColor: colors.primary, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,102,179,0.2)" }}
            />
          </Popover>
        </Tooltip>
      </Space>
    </Header>
  );
}
