"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Space,
  InputNumber,
  Divider,
  Typography,
} from "antd";
import {
  DollarOutlined,
  UserOutlined,
  MailOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

interface CreatePaymentLinkDrawerProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreatePaymentLinkDrawer: React.FC<CreatePaymentLinkDrawerProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values); // parent callback
        form.resetFields();

        // Navigate to confirmation page with query params
        const query = new URLSearchParams({
          amount: values.amount.toString(),
          currency: values.currency,
          reference: values.reference,
          customerName: values.customerName || "",
          customerEmail: values.customerEmail || "",
          expiryDate: values.expiryDate ? values.expiryDate.toISOString() : "",
        }).toString();

        router.push(`/payment-link/confirmation?${query}`);
      })
      .catch((err) => console.log("Validation Failed:", err));
  };

  return (
    <Drawer
      title={
        <Space>
          <LinkOutlined style={{ color: "#1677ff" }} />
          <span>Create Payment Link</span>
        </Space>
      }
      width={440}
      placement="right"
      onClose={onClose}
      open={visible}
      styles={{
        footer: {
          textAlign: "right",
          padding: "16px 24px",
        },
      }}
      footer={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleCreate} style={{ minWidth: 120 }}>
            Generate Link
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} requiredMark="optional">
        {/* Payment Details Section */}
        <div style={{ marginBottom: 24 }}>
          <Text strong type="secondary" style={{ fontSize: 12, textTransform: "uppercase" }}>
            Payment Details
          </Text>
        </div>

        <Space.Compact block>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Enter amount" }]}
            style={{ width: "70%" }}
          >
            <InputNumber
              prefix={<DollarOutlined />}
              placeholder="0.00"
              style={{ width: "100%" }}
              min={0}
              precision={2}
            />
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Select" }]}
            style={{ width: "30%" }}
            initialValue="USD"
          >
            <Select>
              <Option value="USD">USD</Option>
              <Option value="INR">INR</Option>
              <Option value="EUR">EUR</Option>
              <Option value="NPR">NPR</Option>
            </Select>
          </Form.Item>
        </Space.Compact>

        <Form.Item
          label="Description / Reference"
          name="reference"
          rules={[{ required: true, message: "Please enter reference" }]}
        >
          <Input
            prefix={<InfoCircleOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="e.g. Invoice #1024"
          />
        </Form.Item>

        <Divider style={{ margin: "24px 0" }} />

        {/* Customer Section */}
        <div style={{ marginBottom: 24 }}>
          <Text strong type="secondary" style={{ fontSize: 12, textTransform: "uppercase" }}>
            Customer Information
          </Text>
        </div>

        <Form.Item label="Customer Name" name="customerName">
          <Input prefix={<UserOutlined />} placeholder="Full name" />
        </Form.Item>

        <Form.Item label="Customer Email" name="customerEmail">
          <Input prefix={<MailOutlined />} type="email" placeholder="email@example.com" />
        </Form.Item>

        <Divider style={{ margin: "24px 0" }} />

        {/* Settings Section */}
        <Form.Item label="Link Expiry" name="expiryDate">
          <DatePicker
            style={{ width: "100%" }}
            suffixIcon={<CalendarOutlined />}
            placeholder="Select expiration date"
          />
        </Form.Item>

        <Form.Item label="Notifications" style={{ marginBottom: 0 }}>
          <div style={{ padding: "12px", background: "#fafafa", borderRadius: "8px" }}>
            <Space direction="vertical">
              <Form.Item name="notifyEmail" valuePropName="checked" noStyle>
                <Checkbox>Send link via Email</Checkbox>
              </Form.Item>
              <Form.Item name="notifyPhone" valuePropName="checked" noStyle>
                <Checkbox>Send link via SMS / Phone</Checkbox>
              </Form.Item>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreatePaymentLinkDrawer;
