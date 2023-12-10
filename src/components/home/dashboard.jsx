import React, { useState } from 'react';
import { Layout, Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Header, Content, Footer } = Layout;

const cardVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const items = [
  { id: 1, title: 'Total Books', subtitle: 'Subtitle 1' },
  { id: 2, title: 'Available Books', subtitle: 'Subtitle 2' },
  { id: 3, title: 'Total Members', subtitle: 'Subtitle 3' },
  { id: 4, title: 'Borrowed Books', subtitle: 'Subtitle 4' },
];

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {items.map((item) => (
              <Col span={6} key={item.id}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={cardVariants}
                  layoutId={item.id}
                  onClick={() => setSelectedId(item.id)}
                >
                  <Card title={item.title} bordered={false}>
                    <Statistic value={1250} suffix={<ArrowUpOutlined />} />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Library Dashboard ©2023</Footer>
    </Layout>
  );
};

export default Dashboard;
