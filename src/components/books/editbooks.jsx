import React, { useState, useEffect } from "react";
import { Button, Input, Form, Select } from "antd"; // Add missing imports
import axios from "axios";
import { message, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  ProfileOutlined,
  PhoneOutlined,
  BookOutlined,
  BarcodeOutlined,
  CalendarOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  DatabaseOutlined,
  MoneyCollectOutlined,
  AuditOutlined,
  BookFilled,
  BookTwoTone,
} from "@ant-design/icons"; // Import icons if not already imported

const { Option } = Select;
const dummyDepartments = [
  "Computer Science",
  "Bio Medical Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Architectural engineering",
  "Other",
];

const EditStudentForm = ({ history }) => {
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Create a form instance

  const [updatedStudentData, setUpdatedStudentData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch student data based on the 'id' parameter from useParams
    axios
      .get(`http://localhost:5000/book/get/${id}`)
      .then((response) => {
        setUpdatedStudentData({ ...response.data });
        form.setFieldsValue({
          // Set form fields with student data
          title: response.data.title,
          ISBN: response.data.ISBN,
          DDC: response.data.DDC,
          copies: response.data.copies,
          author: response.data.author,
          publisher: response.data.publisher,
          edition: response.data.edition,
          rack: response.data.rack,
          year: response.data.year,
          callNo: response.data.phone,
          pages: response.data.pages,
          unitPrice: response.data.unitPrice,
          totalPrice: response.data.totalPrice,
          billNo: response.data.billNo,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, form]);

  const onFinish = (values) => {
    setLoading(true);
    // Call the API to update the student's data
    axios
      .put(`http://localhost:5000/book/update/${id}`, values)
      .then((response) => {
        // Handle success, you can show a success message
        message.success("Book updated successfully");
        navigate("/books");
      })
      .catch((error) => {
        // Handle error, show an error message
        message.error("Error updating student");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCancel = () => {
    // Navigate back to the book management page
    navigate("/books");
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Update Books</h1>
      </div>

      <Form
        form={form}
        name="editStudentForm"
        onFinish={onFinish}
        initialValues={updatedStudentData}
      >
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
              name="callNo"
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
            <Button type="primary" danger htmlType="submit" loading={loading}>
              Update
            </Button>
            <Button
              type="primary"
              danger
              htmlType="submit"
              onClick={handleCancel}
              loading={loading}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditStudentForm;
