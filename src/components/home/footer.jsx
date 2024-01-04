import React from "react";
import { useSpring, animated } from "react-spring";
import { Layout, Row, Col, Typography, Divider } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link } = Typography;

const Footer = () => {
  const footerProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 20 },
  });

  return (
    <animated.div style={footerProps} className="footer-container">
      <AntFooter className="footer-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#1890ff" }}>
              Developer Contact
            </Title>
            <Paragraph style={{ color: "#333" }}>
              Project By: Azhar Hayat and Ali Hassan
            </Paragraph>
            <Paragraph style={{ color: "#333" }}>
              Email: Azharhayat271@gmail.com
            </Paragraph>
            <Paragraph style={{ color: "#333" }}>
              Phone: +92 307 6696 182
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#1890ff" }}>
              Quick Access
            </Title>
            <Paragraph>
              <a
                href="/dashboard"
                className="text-blue-500 flex items-center space-x-2"
              >
                <DashboardOutlined style={{ fontSize: "18px" }} />
                Dashboard
              </a>
            </Paragraph>
            <Paragraph>
              <a
                href="/profile"
                className="text-green-500 flex items-center space-x-2"
              >
                <UserOutlined style={{ fontSize: "18px" }} />
                Profile
              </a>
            </Paragraph>
            <Paragraph>
              <a
                href="/settings"
                className="text-orange-500 flex items-center space-x-2"
              >
                <SettingOutlined style={{ fontSize: "18px" }} />
                Settings
              </a>
            </Paragraph>
            {/* Add more Quick Access items as needed */}
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#1890ff" }}>
              About the Software
            </Title>
            <Paragraph style={{ color: "#333" }}>
              This software is designed to manage the operation of library at
              the UET lahore Narowal Campus. It provides a user-friendly
              interface for to to perform all the operation smoothly if you have
              any query drop us email or contact us Now.
            </Paragraph>
          </Col>
        </Row>
        <Divider />
        <div className="footer-bottom">
          <div className="text-green-500 text-center text-sm font-bold">
            &copy; 2024 University of Engineering & Technology (UET), Lahore
            (Narowal Campus)
          </div>
        </div>
      </AntFooter>
    </animated.div>
  );
};

export default Footer;
