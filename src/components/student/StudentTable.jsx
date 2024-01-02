import React, { useEffect, useState } from "react";
import { Table, Popconfirm, message, Button, Modal, Input } from "antd"; // Import Popconfirm, Button, and Modal for delete confirmation
import axios from "axios";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate , Link } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Fetch student data from your API
    axios
      .get("http://localhost:5000/students/getall")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [updatedStudentData, setUpdatedStudentData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  // State to hold edited student data
  const navigate = useNavigate();

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditedStudent(record);
    setUpdatedStudentData({ ...record }); // Initialize the data to edit
  };
const cancelDelete=()=>{
  setDeleteConfirmationVisible(false);
}
  const showDeleteConfirmation = (record) => {
    setDeleteConfirmationVisible(true);
    setSelectedStudent(record);
  };

  const handleDelete = () => {
    // Call the API to delete the student
    axios
      .delete(`http://localhost:5000/students/remove/${selectedStudent.regNo}`)
      .then((response) => {
        // Handle success, you can show a success message
        message.success("Student deleted successfully");
        // You may also update the student list after deletion if needed
        setStudents(
          students.filter((student) => student.regNo !== selectedStudent.regNo)
        );
        setDeleteConfirmationVisible(false);
      })
      .catch((error) => {
        // Handle error, show an error message
        message.error("Error deleting student");
        setDeleteConfirmationVisible(false);
      });
  };

  const handleUpdate = () => {
    // Call the API to update the student's data
    axios
      .put(
        `http://localhost:5000/students/update/${editedStudent.regNo}`,
        updatedStudentData
      )
      .then((response) => {
        // Handle success, you can show a success message
        message.success("Student updated successfully");
        setEditModalVisible(false);
        navigate("/students");

        // You may also update the student list after editing if needed
        // Note: Make sure to handle potential errors as well
      })
      .catch((error) => {
        // Handle error, show an error message
        message.error("Error updating student");
      });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    // You may want to reset the updated student data to its original values here
    setUpdatedStudentData({});
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
      align: "center", // Center align the data in this column
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      align: "center", // Center align the data in this column
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center", // Center align the data in this column
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      align: "center", // Center align the data in this column
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center", // Center align the data in this column
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <DeleteOutlined onClick={() => showDeleteConfirmation(record)} />
          <span> | </span>
          {/* <EditOutlined onClick={() => handleEdit(record)} /> */}
          <Link to={`/students/edit/${record.regNo}`}><EditOutlined/></Link>
        </span>
      ),
    },
  ];


  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredStudents = students
  ? students.filter(
      (student) =>
        (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.regNo && student.regNo.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : [];


  return (
    <div>
         <Input.Search
        placeholder="Search by Name or Registration Number"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={filteredStudents}
        columns={columns}
        loading={loading}
        rowKey="regNo"
      />
      <Modal
        title="Confirm Delete"
        visible={deleteConfirmationVisible}
        onOk={handleDelete}
        onCancel={cancelDelete}
        footer={[
          <Button key="cancel" onClick={cancelDelete}>
            Cancel
          </Button>,
          <Button key="action" type="default" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this student?</p>
      </Modal>
      <Modal
        title="Edit Student"
        visible={editModalVisible}
        onOk={handleUpdate}
        onCancel={cancelEdit}
        footer={[
          <Button key="cancel" onClick={cancelEdit}>
            Cancel
          </Button>,
          <Button key="action" type="default" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <Input
          placeholder="Name"
          value={updatedStudentData.name}
          onChange={(e) =>
            setUpdatedStudentData({
              ...updatedStudentData,
              name: e.target.value,
            })
          }
        />
        {/* Repeat similar Input components for other fields (registration number, semester, etc.) */}
      </Modal>
    </div>
  );
};

export default StudentTable;
