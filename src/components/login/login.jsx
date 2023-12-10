import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Background from './../../assets/background.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200) {
                message.success('Login successful');
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                navigate('/dashboard');
                // Simulate a loader for 2 seconds
                // setTimeout(() => {
                //     setLoading(false);
                //     navigate('/dashboard');
                // }, 2000);
            } else if (response.status === 402) {
                message.error('Your Account is not activated.');
                setLoading(false);
            } else {
                message.error('Login failed. Please check your credentials.');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            message.error('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100" style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="w-full sm:w-96 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl text-center mb-4">Library Management System</h1>
                <Form name="login-form">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]
                    }>
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            className="mb-4"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]
                    }>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" danger className="w-full" onClick={handleLogin}>
                            {loading ? <Spin /> : 'Log in'}
                        </Button>
                    </Form.Item>
                   
                </Form>
            </div>
        </div>
    );
};

export default Login;
