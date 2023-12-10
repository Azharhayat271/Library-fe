import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  ProfileOutlined,
  PhoneOutlined,
  BookOutlined, // New icons added
  AuditOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  DatabaseOutlined,
  MoneyCollectOutlined,
  BarcodeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const naivgate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    axios
      .post("http://localhost:5000/book/add", values)
      .then((response) => {
        message.success(response.data.message);
        form.resetFields();
        naivgate("/books")

      })
      .catch((error) => {
        message.error(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Add Books</h1>
      </div>

      <Form form={form} name="addStudentForm" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="ISBN"
              rules={[
                { required: true, message: "Please enter an ISBN number" },
                { min: 3, message: "ISBN must have at least 3 characters" },
                { max: 20, message: "ISBN cannot exceed 20 characters" },
              ]}
            >
              <Input prefix={<BookOutlined />} placeholder="ISBN number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="DDC"
              rules={[
                { required: true, message: "Please enter a DDC number" },
                { min: 3, message: "DDC must have at least 3 characters" },
                { max: 20, message: "DDC cannot exceed 20 characters" },
              ]}
            >
              <Input prefix={<AuditOutlined />} placeholder="DDC number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="title"
              rules={[
                { required: true, message: "Please enter book title" },
                {
                  min: 3,
                  message: "book title must have at least 3 characters",
                },
                { max: 20, message: "book title cannot exceed 20 characters" },
              ]}
            >
              <Input prefix={<BookOutlined />} placeholder="Book title" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="copies"
              rules={[{ required: true, message: "Please enter copies" }]}
            >
              <Input
                prefix={<ProfileOutlined />}
                placeholder="Copies"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="author"
              rules={[
                { required: true, message: "Please enter auther" },
                {
                  min: 3,
                  message: "auther must have at least 3 characters",
                },
                { max: 20, message: "auther cannot exceed 20 characters" },
              ]}
            >
              <Input prefix={<BookOutlined />} placeholder="Auther" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="publisher"
              rules={[
                { required: true, message: "Please enter publisher" },
                {
                  min: 3,
                  message: "publisher must have at least 3 characters",
                },
                { max: 20, message: "publisher cannot exceed 20 characters" },
              ]}
            >
              <Input prefix={<BookOutlined />} placeholder="publisher" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="edition"
              rules={[{ required: true, message: "Please enter an edition" }]}
            >
              <Input
                prefix={<BarcodeOutlined />}
                placeholder="Edition"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="rack"
              rules={[{ required: true, message: "Please enter a rack" }]}
            >
              <Input
                prefix={<CalendarOutlined />}
                placeholder="Rack"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="year"
              rules={[{ required: true, message: "Please enter a year" }]}
            >
              <Input
                prefix={<FieldTimeOutlined />}
                placeholder="Year"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please enter a call number" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Call Number"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="pages"
              rules={[
                { required: true, message: "Please enter the number of pages" },
              ]}
            >
              <Input
                prefix={<MoneyCollectOutlined />}
                placeholder="Pages"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="unitPrice"
              rules={[
                { required: true, message: "Please enter the unit price" },
              ]}
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder="Unit Price"
                type="number"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="totalPrice"
              rules={[{ required: true, message: "Please enter the total" }]}
            >
              <Input
                prefix={<DollarOutlined />}
                placeholder="Total"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="billNo"
              rules={[
                { required: true, message: "Please enter a bill number" },
              ]}
            >
              <Input prefix={<DollarOutlined />} placeholder="Bill Number" />
            </Form.Item>
          </Col>
        </Row>
        <div className="text-center">
          <Form.Item>
            <Button type="default" htmlType="submit" loading={loading}>
              Add Book
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddBooks;
