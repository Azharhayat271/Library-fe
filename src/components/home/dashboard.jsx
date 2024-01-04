import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { useSpring, animated } from "react-spring";
import {
  UserOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import Graph from "./graph";
import FineGraph from "./fineGraph";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const AnimatedCopyCard = ({ title, total, icon, onClick }) => {
  const cardProps = useSpring({
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { tension: 280, friction: 20 },
  });

  const textProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 20 },
  });

  return (
    <animated.div style={cardProps} className="flex">
      <Card
        title={
          <animated.span style={textProps} className="text-lg font-bold">
            {title}
          </animated.span>
        }
        hoverable
        style={{
          width: 300,
          margin: "10px",
          background: "#fff",
          color: "#000",
        }}
        onClick={onClick}
      >
        <animated.p style={textProps} className="text-3xl font-bold">
          {total}
        </animated.p>
        <div className="mt-3">
          <Button type="primary" icon={icon} onClick={onClick} danger>
            More
          </Button>
        </div>
      </Card>
    </animated.div>
  );
};

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalBooks, setTotalBooks] = useState(null);
  const [totalBookIssues, setTotalBookIssues] = useState(null);
  const [totalCopies, setTotalCopies] = useState(null);
  const naviagte= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/count/counts'); // Replace with your actual API endpoint
        const data = await response.json();

        setTotalStudents(data.totalStudents);
        setTotalBooks(data.totalBooks);
        setTotalBookIssues(data.totalIssuedBooks);
        setTotalCopies(data.totalBookCopies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateTo = (screen) => {
    naviagte(`/${screen}`);

    // Add logic to navigate to the specified screen
    console.log(`Navigate to ${screen}`);
  };

  return (
    <>
      <div className="flex justify-center">
        <AnimatedCopyCard
          title="Students"
          total={totalStudents}
          icon={<UserOutlined />}
          onClick={() => navigateTo("Students")}
        />
        <AnimatedCopyCard
          title="Books"
          total={totalBooks}
          icon={<BookOutlined />}
          onClick={() => navigateTo("Books")}
        />
        <AnimatedCopyCard
          title="Book Issues"
          total={totalBookIssues}
          icon={<ExclamationCircleOutlined />}
          onClick={() => navigateTo("issuebookrecords")}
        />
        <AnimatedCopyCard
          title="Total Copies"
          total={totalCopies}
          icon={<CopyOutlined />}
          onClick={() => navigateTo("books")}
        />
      </div>
      <div className="flex justify-center mb-3">
        <div className="flex justify-start mr-20">
          <Graph />
        </div>
        <div className="flex justify-end">
          <FineGraph />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
};

export default Dashboard;
