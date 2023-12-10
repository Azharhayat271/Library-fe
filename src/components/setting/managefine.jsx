// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { Card, Spin, Alert } from "antd";
import axios from "axios";

// Define the component
const PerDayFineComponent = () => {
  // State to store the fetched data
  const [perdayfine, setPerDayFine] = useState(0);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error state
  const [error, setError] = useState(null);

  // Effect to make the API request on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API request here, replace 'your-api-endpoint' with your actual API endpoint
        const response = await axios.get("http://localhost:5000/fine/get");
        // Extract the 'perdayfine' value from the response
        const { perdayfine } = response.data;
        setPerDayFine(perdayfine);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Render loading state
  if (loading) {
    return <Spin tip="Loading..." />;
  }

  // Render error state
  if (error) {
    return <Alert message={error} type="error" />;
  }

  // Render the component with the fetched data
  return (
    <Card title="Per Day Fine">
      <p>Value: {perdayfine}</p>
    </Card>
  );
};

// Export the component
export default PerDayFineComponent;
