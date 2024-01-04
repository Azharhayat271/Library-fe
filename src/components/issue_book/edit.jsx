import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input, Form, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayRegNoFromURL = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const regNo = pathParts[pathParts.length - 1];
  const navigation = useNavigate();


  const [editable, setEditable] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "",
    regNo: "",
    ISBN: "",
    title: "",
    issueDate: "",
    returnDate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bookissue/bookissue/${regNo}`)
      .then((response) => {
        const data = response.data;
        setStudentData({
          name: data.name,
          regNo: data.regNo,
          ISBN: data.ISBN,
          title: data.title,
          issueDate: data.issueDate,
          returnDate: data.returnDate,
        });
      })
      .catch((error) => {
        console.error(error);
        message.error("Error fetching student record");
      });
  }, [regNo]);

  const handleUpdateRecord = () => {
    axios
      .put(`http://localhost:5000/bookissue/bookissue/${regNo}`, {
        returnDate: studentData.returnDate,
      })
      .then((response) => {
        message.success("Record Updated!");
        navigation("/issuebookrecords");
      })
      .catch((error) => {
        console.error(error);
        message.error("Error updating record");
      });
  };

  return (
    <div>
      <Form>
        <Form.Item label="Name">
          <Input value={studentData.name} disabled />
        </Form.Item>
        <Form.Item label="Registration Number">
          <Input value={studentData.regNo} disabled />
        </Form.Item>
        <Form.Item label="ISBN">
          <Input value={studentData.ISBN} disabled />
        </Form.Item>
        <Form.Item label="Title">
          <Input value={studentData.title} disabled />
        </Form.Item>
        <Form.Item label="Issue Date">
          <Input value={studentData.issueDate} disabled />
        </Form.Item>
        <Form.Item label="Return Date">
          <Input
            value={studentData.returnDate}
            onChange={(e) => setStudentData({ ...studentData, returnDate: e.target.value })}
            disabled={!editable}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={handleUpdateRecord}
        danger
        disabled={!editable}
      >
        Update Record
      </Button>
      <Button type="default" onClick={() => setEditable(!editable)}>
        {editable ? "Cancel Edit" : "Edit"}
      </Button>
    </div>
  );
};

export default DisplayRegNoFromURL;
