import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result, Space, Input, Button, Row, Col } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BookReturnDetails = () => {
  const { regNo } = useParams();
  const [bookIssue, setBookIssue] = useState(null);
  const [fine, setFine] = useState(null);
  const [additionalFine, setAdditionalFine] = useState(0);
  const [additionalFineInput, setAdditionalFineInput] = useState(0); // Define additionalFineInput
  const [reasonInput, setReasonInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/fine/get`)
      .then((response) => {
        setFine(response.data.finePerDay);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to calculate the total fine
  const totalFine = () => {
    if (bookIssue && bookIssue.issueDate && bookIssue.returnDate) {
      const date1 = new Date(bookIssue.issueDate);
      const date2 = new Date(bookIssue.returnDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalFine = diffDays * fine;
      return totalFine;
    } else {
      return 0; // Handle the case where bookIssue or its properties are null
    }
  };

  useEffect(() => {
    // Fetch book issue data based on the regNo from an API or any other data source
    // For demonstration purposes, I'm using a dummy data fetching function
    const fetchBookIssueData = async () => {
      try {
        // Replace the following line with your actual API endpoint for fetching book issue data
        const response = await fetch(
          `http://localhost:5000/bookissue/bookissue/${regNo}`
        );
        const data = await response.json();
        setBookIssue(data);
      } catch (error) {
        console.error("Error fetching book issue data:", error);
      }
    };

    fetchBookIssueData();
  }, [regNo]);
  const totalFineToBePaid = Number(additionalFineInput) + totalFine(); // Use additionalFineInput here instead of additionalFine

  const handleReturnBook = async () => {
    const subfine = totalFine();
    try {
      const response = await axios.post(
        "http://localhost:5000/return/return-book",
        {
          regNo: bookIssue.regNo,
          name: bookIssue.name,
          ISBN: bookIssue.ISBN,
          title: bookIssue.title,
          issueDate: bookIssue.issueDate,
          returnDate: bookIssue.returnDate,
          date: new Date(),
          fine: subfine,
          totalFine: totalFineToBePaid,
          additionalFine: additionalFineInput,
          reason: reasonInput,

          // Include other necessary data
        }
      );

      console.log(response.data);
      navigate("/returnbook");


      // You may want to perform additional actions after the book is returned successfully
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className="p-4">
      {bookIssue ? (
        <>
          <h1 className="text-2xl font-bold">Book Return Details</h1>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                Registration No: <Input value={bookIssue.regNo} disabled />
              </p>
            </Col>
            <Col span={12}>
              <p>
                Name: <Input value={bookIssue.name} disabled />
              </p>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                ISBN: <Input value={bookIssue.ISBN} disabled />
              </p>
            </Col>
            <Col span={12}>
              <p>
                Title: <Input value={bookIssue.title} disabled />
              </p>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                Issue Date: <Input value={bookIssue.issueDate} disabled />
              </p>
            </Col>
            <Col span={12}>
              <p>
                Return Date: <Input value={bookIssue.returnDate} disabled />
              </p>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                Fine per day: <Input value={fine} disabled />
              </p>
            </Col>
            <Col span={12}>
              <p>
                Total Fine: <Input value={totalFine()} disabled />
              </p>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                Additional Fine:{" "}
                <Input
                  value={additionalFineInput}
                  onChange={(e) => setAdditionalFineInput(e.target.value)}
                />
              </p>
            </Col>
            <Col span={12}>
              <p>
                Reason of Fine:{" "}
                <Input
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                />
              </p>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                Total Fine to be Paid:{" "}
                <Input value={totalFineToBePaid} disabled />
              </p>
            </Col>
          </Row>
          <div className="mt-3">
            <Button type="primary" danger onClick={handleReturnBook}>
              Return Book
            </Button>
          </div>
        </>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the book issue you requested does not exist."
          extra={<Button type="primary">Back Home</Button>}
        />
      )}
    </div>
  );
};

export default BookReturnDetails;
