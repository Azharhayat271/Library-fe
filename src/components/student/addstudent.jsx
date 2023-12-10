import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { UserOutlined, IdcardOutlined, CalendarOutlined, ProfileOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dummyDepartments = ['Computer Science', 'Bio Medical Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Architectural engineering', 'Other'];
  const navigate =useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    axios
      .post('http://localhost:5000/students/add', values)
      .then((response) => {
        message.success(response.data.message);
        navigate("/students");
        form.resetFields();

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
        <h1 className="text-2xl font-bold">Add Student</h1>
      </div>

      <Form form={form} name="addStudentForm" onFinish={onFinish}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please enter a name' },
                { min: 3, message: 'Name must be at least 3 characters' },
                { max: 20, message: 'Name must be at most 20 characters' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

          </div>
          <div>
            <Form.Item name="regNo" rules={[
              { required: true, message: 'Please enter a Registeration number' },
              { min: 3, message: 'Registeration number must be at least 3 characters' },
              { max: 15, message: 'Registeration number must be at most 20 characters' }
            ]}>
              <Input prefix={<IdcardOutlined />} placeholder="Registration No" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter an email' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
            </Form.Item>

          </div>
          <div>
            <Form.Item
              name="semester"
              rules={[
                { required: true, message: 'Please enter a semester' },
                {
                  validator: (_, value) => {
                    if (value >= 1 && value <= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Semester must be between 1 and 8');
                  },
                },
              ]}
            >
              <Input prefix={<ProfileOutlined />} type="number" placeholder="Semester" />
            </Form.Item>


          </div>
          <div>
            <Form.Item
              name="department"
              rules={[
                { required: true, message: 'Please select a department' },
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
                { required: true, message: 'Please enter a contact number' },
                {
                  validator: (_, value) => {
                    if (/^\d{11,12}$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Phone number must be between 11 and 12 digits');
                  },
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Contact No" type='number' />
            </Form.Item>

          </div>
        </div>
        <div className="text-center">
          <Form.Item>
            <Button type="primary" danger htmlType="submit" loading={loading}>
              Add Student
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddStudentForm;
