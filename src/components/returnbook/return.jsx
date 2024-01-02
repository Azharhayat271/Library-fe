import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result, Space, Input, Button, Row, Col } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import axios from "axios";

const BookReturnDetails = () => {
  const { regNo } = useParams();
  const [bookIssue, setBookIssue] = useState(null);
  const [fine, setFine] = useState(null);
  const [additionalFine, setAdditionalFine] = useState(0);
  const [additionalFineInput, setAdditionalFineInput] = useState(0); // Define additionalFineInput
  const [reasonInput, setReasonInput] = useState("");

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
  const totalFineToBePaid =
    new Date() > new Date(bookIssue?.returnDate)
      ? fine *
          Math.max(
            0,
            Math.ceil(
              (new Date() -
                new Date(
                  new Date(bookIssue.returnDate).getTime() + 24 * 60 * 60 * 1000
                )) /
                (1000 * 3600 * 24)
            )
          ) +
        additionalFineInput // Use additionalFineInput here instead of additionalFine
      : additionalFineInput;

  const handleReturnBook = async () => {
    try {
      const response = await axios.post("http://localhost:5000/return-book", {
        regNo: bookIssue.regNo,
        additionalFine,
        reason: bookIssue.reason,
        // Include other necessary data
      });

      console.log(response.data);

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
                Total Fine:{" "}
                <Input
                  value={
                    new Date() > new Date(bookIssue.returnDate)
                      ? fine *
                        Math.max(
                          0,
                          Math.ceil(
                            (new Date() -
                              new Date(
                                new Date(bookIssue.returnDate).getTime() +
                                  24 * 60 * 60 * 1000
                              )) /
                              (1000 * 3600 * 24)
                          )
                        )
                      : 0
                  }
                  disabled
                />
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
