import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import StudentTable from "./StudentTable"; // Import your StudentTable component

const StudentIndex = () => {
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/students/getall");

        const data = await response.json();
        setStudentsData(data || "No data found");
      } catch (error) {
        console.error("Error fetching students data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);
  // Empty dependency array ensures that this effect runs only once when the component mounts

  const handleClick = () => {
    navigate("/students/add");
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Registration No", key: "regNo" },
    { label: "Email", key: "email" },
    { label: "Semester", key: "semester" },
    { label: "Department", key: "department" },
    { label: "Contact No", key: "contactNo" },

    // Add more headers as needed based on your student data structure
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <div className="flex gap-2">
          <CSVLink
            data={studentsData}
            headers={headers}
            filename={"students.csv"}
            className="ant-btn ant-btn-primary"
          >
            <Button type="primary" danger disabled={loading}>
              Export Students
            </Button>
          </CSVLink>
          <Button type="primary" danger onClick={handleClick}>
            Add Students
          </Button>
        </div>
      </div>
      <StudentTable />
    </div>
  );
};

export default StudentIndex;
