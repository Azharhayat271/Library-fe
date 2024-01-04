import React, { useEffect, useState } from "react";
import { Table, Popconfirm, message, Button, Modal, Input, Space } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";

const BookIssueTable = () => {
  const [bookIssues, setBookIssues] = useState([]);
  const [filteredBookIssues, setFilteredBookIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [selectedBookIssue, setSelectedBookIssue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookissue/bookissues")
      .then((response) => {
        setBookIssues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredIssues = bookIssues.filter((issue) =>
      Object.values(issue).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredBookIssues(filteredIssues);
  }, [bookIssues, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const clearSearch = () => {
    setSearchText("");
  };


  const showDeleteConfirmation = (record) => {
    setDeleteConfirmationVisible(true);
    setSelectedBookIssue(record);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:5000/bookissue/remove/${selectedBookIssue.regNo}`
      )
      .then((response) => {
        message.success("Book issue deleted successfully");
        setBookIssues(
          bookIssues.filter(
            (bookIssue) => bookIssue.regNo !== selectedBookIssue.regNo
          )
        );
        setDeleteConfirmationVisible(false);
      })
      .catch((error) => {
        message.error("Error deleting book issue");
        setDeleteConfirmationVisible(false);
      });
  };

  const handleclick = () => {
    navigate("/issue");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Registration No",
      dataIndex: "regNo",
      key: "regNo",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "ISBN",
      dataIndex: "ISBN",
      key: "ISBN",
      align: "center",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      align: "center",
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/issuebookrecords/edit/${record.regNo}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const exportHeaders = [
    { label: "Name", key: "name" },
    { label: "Registration No", key: "regNo" },
    { label: "Title", key: "title" },
    { label: "ISBN", key: "ISBN" },
    { label: "Issue Date", key: "issueDate" },
    { label: "Return Date", key: "returnDate" },
  ];
  const csvData = (searchText ? filteredBookIssues : bookIssues).map(
    (issue) => ({
      name: issue.name,
      regNo: issue.regNo,
      title: issue.title,
      ISBN: issue.ISBN,
      issueDate: moment(issue.issueDate).format("YYYY-MM-DD"), // Change the format as needed
      returnDate: moment(issue.returnDate).format("YYYY-MM-DD"), // Change the format as needed
    })
  );
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books Issue Records</h1>
        <div>
          <Input.Search
            placeholder="Search by Registration No, Name, Title, or ISBN"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Space>
          <CSVLink
            data={csvData}
            headers={exportHeaders}
            filename={"book_issues.csv"}
            className="ant-btn ant-btn-primary"
          >
            <Button type="primary" danger>
              Export Records
            </Button>
          </CSVLink>

          <Button type="primary" danger onClick={handleclick}>
            Issue Book
          </Button>
        </Space>
      </div>
      <Table
        dataSource={searchText ? filteredBookIssues : bookIssues}
        columns={columns}
        loading={loading}
        rowKey="regNo"
      />
    </div>
  );
};

export default BookIssueTable;
