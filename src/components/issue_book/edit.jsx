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
    <div className="flex flex-wrap mt-3">
      {/* heading */}
      <div className="w-full">
        <h1 className="text-2xl font-bold">Edit Book Issue Record</h1>
      </div>
      <div className="w-full sm:w-1/2 pr-4 mt-3">
        <Form>
          {/* First Column */}
          <Form.Item>
            <Input value={studentData.name} disabled />
          </Form.Item>
          <Form.Item>
            <Input value={studentData.regNo} disabled />
          </Form.Item>
          <Form.Item>
            <Input value={studentData.ISBN} disabled />
          </Form.Item>
        </Form>
      </div>

      <div className="w-full sm:w-1/2 pl-4 mt-3">
        <Form>
          {/* Second Column */}
          <Form.Item>
            <Input value={studentData.title} disabled />
          </Form.Item>
          <Form.Item>
            <Input value={studentData.issueDate} disabled />
          </Form.Item>
          <Form.Item>
            <Input
              value={studentData.returnDate}
              onChange={(e) =>
                setStudentData({ ...studentData, returnDate: e.target.value })
              }
              disabled={!editable}
            />
          </Form.Item>
        </Form>

        {/* Buttons */}
        <div className=" mt-4">
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
      </div>
    </div>
  );
};

export default DisplayRegNoFromURL;
