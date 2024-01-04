import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const BookChart = () => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/book/total');
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    xaxis: {
      categories: ['Total Books', 'Total Copies'],
    },
    colors: ['#008FFB', '#00E396'], // Set separate colors for each bar
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Total Books',
      data: [bookData ? bookData.totalBooks : 0],
    },
    {
      name: 'Total Copies',
      data: [bookData ? bookData.totalCopies : 0],
    },
  ];

  return (
    <Card title="Book Data Chart">
      {bookData ? (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
          width={500}
        />
      ) : (
        'Loading...'
      )}
    </Card>
  );
};

export default BookChart;
