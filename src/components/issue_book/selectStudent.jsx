import React, { useState, useEffect } from "react";
import { Input, Form, Button, Card, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const IssueBook = () => {
  const [searchValue, setSearchValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [bookSearchValue, setBookSearchValue] = useState("");
  const [foundStudents, setFoundStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [foundBooks, setFoundBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [form] = Form.useForm();
  const [issueDate, setIssueDate] = useState(moment()); // Default to today's date
  const returnDateDefault = moment().add(21, "days");
  const [returnDate, setReturnDate] = useState(returnDateDefault);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      axios
        .get(`http://localhost:5000/students/search?query=${searchValue}`)
        .then((response) => {
          setFoundStudents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFoundStudents([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (bookSearchValue) {
      axios
        .get(`http://localhost:5000/book/search?query=${bookSearchValue}`)
        .then((response) => {
          setFoundBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFoundBooks([]);
    }
  }, [bookSearchValue]);

  const handleStudentSelect = (selectedStudent) => {
    setSelectedStudent(selectedStudent);
    setSearchValue("");
    form.setFieldsValue({
      name: selectedStudent.name,
      regNo: selectedStudent.regNo,
    });
  };

  const handleBookSelect = (selectedBook) => {
    if (selectedBook.copies === 0) {
      message.error("Book is out of stock.");
    } else {
      setSelectedBook(selectedBook);
      setBookSearchValue("");
      form.setFieldsValue({
        title: selectedBook.title,
        ISBN: selectedBook.ISBN,
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };
  const handleConfirm = () => {
    if (selectedStudent && selectedBook) {
      const requestData = {
        name: selectedStudent.name,
        regNo: selectedStudent.regNo,
        title: selectedBook.title,
        ISBN: selectedBook.ISBN,
        issueDate: issueDate.format("YYYY-MM-DD"),
        returnDate: returnDate.format("YYYY-MM-DD"),
      };

      axios
        .post("http://localhost:5000/bookissue/bookissue", requestData)
        .then((response) => {
          // console.log('Book issued successfully', response);
          message.success(response.data.message);
          form.resetFields();
          // an other api call to update the book status
          axios
            .put(`http://localhost:5000/book/decrease/${selectedBook.ISBN}`)
            .then((response) => {
              // console.log('Book status updated successfully', response);
            })

            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // Display the error message from the server
                // console.error('Error updating book status:', error.response.data.message);
              } else {
                // Handle other types of errors
                console.error("Error updating book status:", error);
              }
            });

          navigate("/issuebookrecords");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Display the error message from the server
            // console.error('Error issuing book:', error.response.data.message);
            message.error("Student Has already issue the Book");
          } else {
            // Handle other types of errors
            console.error("Error issuing book", error);
          }
        });
    } else {
      console.error(
        "Please select both a student and a book before confirming."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold">Issue Book</h1>
      <Card title="Student Information" className="mt-4">
        <Input
          placeholder="Search for a student by name or regNo"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {foundStudents.length > 0 && (
          <ul className="space-y-2">
            {foundStudents.map((student) => (
              <li
                key={student.id}
                className="bg-white p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleStudentSelect(student)}
              >
                <span>{student.name}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({student.regNo})
                </span>
              </li>
            ))}
          </ul>
        )}

        {selectedStudent && (
          <Card title="Student Details" className="mt-4">
            <Form form={form} name="issueBookForm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Form.Item name="name">
                    <Input readOnly />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="regNo">
                    <Input readOnly />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Card>
        )}
      </Card>
      <Card title="Book Information" className="mt-4">
        <Input
          placeholder="Search for a book by ISBN or title"
          value={bookSearchValue}
          onChange={(e) => setBookSearchValue(e.target.value)}
        />
        {foundBooks.length > 0 && (
          <ul className="space-y-2">
            {foundBooks.map((book) => (
              <li
                key={book.ISBN}
                className="bg-white p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleBookSelect(book)}
              >
                <span>{book.title}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({book.ISBN})
                </span>
              </li>
            ))}
          </ul>
        )}

        {selectedBook && (
          <Card title="Book Details" className="mt-4">
            <Form name="issueBookForm" initialValues={selectedBook}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Form.Item name="title">
                    <Input readOnly />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="ISBN">
                    <Input readOnly />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Card>
        )}
      </Card>

      <Card title="General Information" className="mt-4">
        <Form name="issueBookForm" initialValues={{ issueDate, returnDate }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Form.Item name="issueDate" label="Issue Date">
                <DatePicker
                  style={{ width: "100%" }}
                  initialValues={issueDate}
                  onChange={(date) => setIssueDate(date)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="returnDate" label="Return Date">
                <DatePicker
                  style={{ width: "100%" }}
                  initialValues={returnDate}
                  onChange={(date) => setReturnDate(date)}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
      <div className="text-center">
        <Button type="primary" danger htmlType="submit" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleCancel}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default IssueBook;
