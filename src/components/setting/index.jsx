import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  BellOutlined,
  ProfileOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const SettingPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-7">Settings and Quick Access</h1>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={10}>
          <Link to="/managefine">
            <Card hoverable>
              <SettingOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Manage Fine Value</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/users">
            <Card hoverable>
              <BellOutlined style={{ fontSize: "18px", marginRight: "8px" }} />
              <p style={{ display: "inline-block" }}>Account Setting</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/returninventory">
            <Card hoverable>
              <ProfileOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Fine Management</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/finemanagement">
            <Card hoverable>
              <DollarOutlined 
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Pending Payments</p>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default SettingPage;
