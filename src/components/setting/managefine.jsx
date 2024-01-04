import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Spin, Typography } from 'antd';

const { Text } = Typography;

const FineCard = () => {
  const [finePerDay, setFinePerDay] = useState(null);
  const [fineID, setFineID] = useState('');
  const [newFineValue, setNewFineValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/fine/get');
        const data = await response.json();
        setFinePerDay(data.finePerDay);
        setFineID(data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateFine = async () => {
    try {
      setIsLoading(true);

      // Make API request to update finePerDay
      const response = await fetch('http://localhost:5000/fine/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finePerDay: newFineValue, id: fineID }),
      });

      // Assume the API returns the updated data
      const data = await response.json();
      setFinePerDay(newFineValue);

      // Reset the input and loading state
      setNewFineValue('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating finePerDay:', error);
      setIsLoading(false);
    }
  };

  return (
    <Card title="Fine Per Day">
      {finePerDay !== null ? (
        <>
          <p>
            <strong>
              Value: <span style={{ fontSize: '1.5em' }}>{finePerDay}</span>
            </strong>
          </p>
          <Input
            placeholder="Update Fine Value"
            value={newFineValue}
            onChange={(e) => setNewFineValue(e.target.value)}
          />
          <div className='mt-3'>
          <Button
            type="primary"
            onClick={handleUpdateFine}
            loading={isLoading}
            danger
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Text strong>Instructions:</Text>
            <p>
              The Fine Per Day value represents the amount charged for each day
              a book is overdue. This value is used to calculate the fine when
              a student submits a book return after the due date.
            </p>
          </div>
        </>
      ) : (
        <Spin tip="Loading..." />
      )}
    </Card>
  );
};

export default FineCard;
