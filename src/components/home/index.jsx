import React, { useState } from 'react';
import { Layout, Drawer, Menu } from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  PlusSquareOutlined,
  RollbackOutlined,
  DollarOutlined,
  DatabaseOutlined,
  WindowsOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import TopBar from './topbar';

const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate("/");
  };

  return (
    <Layout>
      <TopBar openDrawer={openDrawer} />
      <Drawer
        title="UET Lahore Narowal Campus"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Menu theme="light" mode="vertical">
        <Menu.Item key="dash oard" icon={<WindowsOutlined />} onClick={closeDrawer}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="books" icon={<BookOutlined />} onClick={closeDrawer}>
            <Link to="/books">Books Management</Link>
          </Menu.Item>
          <Menu.Item key="students" icon={<TeamOutlined />} onClick={closeDrawer}>
            <Link to="/students">Student Management</Link>
          </Menu.Item>
          <Menu.Item key="issue" icon={<PlusSquareOutlined />} onClick={closeDrawer}>
            <Link to="/issuebookrecords">Issue a Book</Link>
          </Menu.Item>
          <Menu.Item key="return" icon={<RollbackOutlined />} onClick={closeDrawer}>
            <Link to="/returnbook">Return Book</Link>
          </Menu.Item>
          <Menu.Item key="fine" icon={<DollarOutlined />} onClick={closeDrawer}>
            <Link to="/finemanagement">Fine Management</Link>
          </Menu.Item>
          <Menu.Item key="inventory" icon={<DatabaseOutlined />} onClick={closeDrawer}>
            <Link to="/returninventory">Inventory Management</Link>
          </Menu.Item>
          <Menu.Item key="Logout" icon={<LoginOutlined  />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
      {/* The rest of your application */}
    </Layout>
  );
};

export default App;
