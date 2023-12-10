import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  BellOutlined,
  ProfileOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const SettingPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-7">Settings</h1>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={10}>
          <Link to="/managefine">
            <Card hoverable>
              <SettingOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Manage Fine</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/empty">
            <Card hoverable>
              <BellOutlined style={{ fontSize: "18px", marginRight: "8px" }} />
              <p style={{ display: "inline-block" }}>Account Setting</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/empty">
            <Card hoverable>
              <ProfileOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Fine Collection</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/empty">
            <Card hoverable>
              <AppstoreOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Dummy</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/empty">
            <Card hoverable>
              <AppstoreOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Dummy</p>
            </Card>
          </Link>
        </Col>
        <Col span={10}>
          <Link to="/empty">
            <Card hoverable>
              <LogoutOutlined
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <p style={{ display: "inline-block" }}>Logout</p>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default SettingPage;
