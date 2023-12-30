import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Input, Button } from "antd";
import axios from "axios";

const PerDayFineComponent = () => {
  const [perdayfine, setPerDayFine] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch");
      try {
        const response = await axios.get("http://localhost:5000/fine/get");
        const { perdayfine } = response.data;
        setPerDayFine(perdayfine);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setPerDayFine(e.target.value);
  };

  const handleUpdateClick = async () => {
    console.log("update");
    try {
      // Make a PUT request to update the value in the database
      await axios.put("http://localhost:5000/fine/update", { perdayfine });
    } catch (error) {
      setError("Error updating data");
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Card title="Per Day Fine">
      <Input
        type="number"
        value={perdayfine}
        onChange={handleInputChange}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleUpdateClick}>
        Update Value
      </Button>
      <p>Value: {perdayfine}</p>
    </Card>
  );
};

export default PerDayFineComponent;

