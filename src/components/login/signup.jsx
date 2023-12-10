import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.status === 201) {
                message.success('Your Account has Created Successfully');
                navigate('/users'); // Redirect to login page after successful signup
            } else if (response.status === 400) {
                message.error('Username Already Exists! Please try with a different Username');
            } else {
                message.error('Sign up failed. Please try again.');
            }
        } catch (error) {
            message.error('Sign up failed. Please try again.');
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full sm:w-96 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl text-center mb-4">Add Users</h1>
                <Form
                    name="signup-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                            {
                                validator: async (_, value) => {
                                    if (/^[a-zA-Z0-9]+$/.test(value) && value.length > 5) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Username must be greater than 5 characters and contain only alphabets and numbers.');
                                },
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            className="mb-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address' },
                            {
                                validator: async (_, value) => {
                                    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Please enter a valid email address.');
                                },
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            className="mb-4"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            {
                                validator: async (_, value) => {
                                    if (value && value.length >= 8) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Password must be at least 8 characters long.');
                                },
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" danger className="w-full" htmlType="submit">
                            {loading ? <Spin /> : 'Sign Up'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
