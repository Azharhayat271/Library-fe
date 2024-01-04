import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const FineChart = () => {
  const [fineData, setFineData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/return/summary');
        setFineData(response.data);
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
      categories: ['Total Fine'],
    },
    colors: ['#FF4560'], // Set color for the bar
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
      name: 'Total Fine',
      data: [fineData ? fineData.totalFine : 0],
    },
  ];

  return (
    <Card title="Fine Data Chart">
      {fineData ? (
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

export default FineChart;
