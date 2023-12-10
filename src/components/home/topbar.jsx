import React from 'react';
import { Layout, Button, Space } from 'antd';
import { MenuOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Background from "./../../assets/background.png";
import UET from "/uet.png"
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;


const TopBar = ({ openDrawer }) => {
    const navigate = useNavigate();
    const handleuserclick = () => {
        navigate('/users')
    }
    const handlesettingclick = () => {
        navigate('/setting')
    }
    return (
        <Header className="bg-gray-100 p-0 flex items-center px-4">
            <Button icon={<MenuOutlined className="text-black text-2xl" />} onClick={openDrawer} />
            {/* heading for tor the project and logo */}
            <div className="ml-4">
                <img src={UET} alt="logo" className="h-10" />
            </div>
            <div>
                <h1 className="text-2xl font-semibold text-gray-700 ml-4">Libaray UET Narowal</h1>
            </div>
            

            <div className="ml-auto">
                <Space size="large">
                    <Button icon={<SettingOutlined className="text-black text-2xl" />} onClick={handlesettingclick} />
                    <Button icon={<UserOutlined className="text-black text-2xl" />} onClick={handleuserclick} />
                </Space>
            </div>
        </Header>
    );
};

export default TopBar;
