import React, { useEffect, useState } from "react";
import { Table, Space, Spin, Alert, Button , message } from "antd";
import axios from "axios";

const BookReturnHistory = () => {
  const [returnHistory, setReturnHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/return/getall");
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

  const handlePayNow = async (id) => {
    try {
      // Make the API request to update the payment status and reset fine-related fields
      await axios.post("http://localhost:5000/return/paynow", { id });
      console.log(`Payment for record with id ${id} completed.`);
      message.success("Payment Completed Successfully");
      window.location.reload(); // Reload the page to fetch the updated return history data

      // Optionally, you can fetch the updated return history data after payment is completed
      // and update the component state if needed.
    } catch (error) {
      console.error("Error updating payment status:", error);
      // Handle errors as needed
    }
  };

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
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handlePayNow(record._id)}
            danger
          >
            Pay Now
          </Button>
        </Space>
      ),
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
