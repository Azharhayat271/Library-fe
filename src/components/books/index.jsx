import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import Table from "./bookstable";

const Index = () => {
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch books data from your API
    const fetchBooksData = async () => {
      try {
        const response = await fetch("http://localhost:5000/book/getall");
        const data = await response.json();
        setBooksData(data);
      } catch (error) {
        console.error("Error fetching books data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchBooksData();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  const handleClick = () => {
    navigate("/books/add");
  };

  const headers = [
    { label: "ISBN", key: "ISBN" },
    { label: "Title", key: "title" },
    { label: "DDC", key: "DDC" },
    { label: "Author", key: "author" },
    { label: "Edition", key: "edition" },
    { label: "Year", key: "year" },
    { label: "Pages", key: "pages" },
    { label: "Copies", key: "copies" },
    { label: "Publisher", key: "publisher" },
    { label: "Rack", key: "rack" },
    { label: "Phone", key: "phone" },
    { label: "Unit Price", key: "unitPrice" },
    { label: "Total Price", key: "totalPrice" },
    { label: "Bill No", key: "billNo" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <div className="flex gap-2">
          <CSVLink
            data={booksData}
            headers={headers}
            filename={"books.csv"}
            className="ant-btn ant-btn-primary"
          >
            <Button type="primary" danger disabled={loading}>
              Export Books
            </Button>
          </CSVLink>
          <Button type="primary" danger onClick={handleClick}>
            Add Books
          </Button>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Index;
