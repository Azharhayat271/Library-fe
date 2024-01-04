import React, { useEffect, useState } from "react";
import { Table, Space, Spin, Alert } from "antd";
import axios from "axios";

const BookReturnHistory = () => {
  const [returnHistory, setReturnHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/return/getallrecords"
        );
        setReturnHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching return history:", error);
        setError("Error fetching return history. Please try again later.");
        setLoading(false);
      }
    };

    fetchReturnHistory();
  }, []);

  const columns = [
    {
      title: "Registration No",
      dataIndex: "regNo",
      key: "regNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ISBN",
      dataIndex: "ISBN",
      key: "ISBN",
    },
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Fine",
      dataIndex: "fine",
      key: "fine",
    },
    {
      title: "Additional Fine",
      dataIndex: "additionalFine",
      key: "additionalFine",
    },
    {
      title: "Total Fine",
      dataIndex: "totalFine",
      key: "totalFine",
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status.toLowerCase() === "true") {
          return <span>Paid</span>;
        } else {
          return <span>Pending</span>;
        }
      },
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return <Table dataSource={returnHistory} columns={columns} rowKey="regNo" />;
};

export default BookReturnHistory;
