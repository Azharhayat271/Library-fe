import React, { useState, useEffect } from "react";
import { Button, Input, Form, Select } from "antd"; // Add missing imports
import axios from "axios";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  ProfileOutlined,
  PhoneOutlined,
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
      .get(`http://localhost:5000/students/get/${id}`)
      .then((response) => {
        setUpdatedStudentData({ ...response.data });
        form.setFieldsValue({
          // Set form fields with student data
          name: response.data.name,
          regNo: response.data.regNo,
          email: response.data.email,
          semester: response.data.semester,
          department: response.data.department,
          contactNo: response.data.contactNo,
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
      .put(`http://localhost:5000/students/update/${id}`, values)
      .then((response) => {
        // Handle success, you can show a success message
        message.success("Student updated successfully");
        navigate("/students");
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
    navigate("/students");
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Update Student</h1>
      </div>

      <Form
        form={form}
        name="editStudentForm"
        onFinish={onFinish}
        initialValues={updatedStudentData}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter a name" },
                { min: 3, message: "Name must be at least 3 characters" },
                { max: 20, message: "Name must be at most 20 characters" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="regNo"
              rules={[
                {
                  required: true,
                  message: "Please enter a Registration number",
                },
                {
                  min: 3,
                  message: "Registration number must be at least 3 characters",
                },
                {
                  max: 15,
                  message: "Registration number must be at most 15 characters",
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder="Registration No"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter an email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="semester"
              rules={[
                { required: true, message: "Please enter a semester" },
                {
                  validator: (_, value) => {
                    if (value >= 1 && value <= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Semester must be between 1 and 8");
                  },
                },
              ]}
            >
              <Input
                prefix={<ProfileOutlined />}
                type="number"
                placeholder="Semester"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="department"
              rules={[
                { required: true, message: "Please select a department" },
              ]}
            >
              <Select
                placeholder="Select a department"
                prefix={<IdcardOutlined />}
              >
                {dummyDepartments.map((department) => (
                  <Option key={department} value={department}>
                    {department}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="contactNo"
              rules={[
                { required: true, message: "Please enter a contact number" },
                {
                  validator: (_, value) => {
                    if (/^\d{11,12}$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Phone number must be between 11 and 12 digits"
                    );
                  },
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Contact No"
                type="number"
              />
            </Form.Item>
          </div>
        </div>
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
