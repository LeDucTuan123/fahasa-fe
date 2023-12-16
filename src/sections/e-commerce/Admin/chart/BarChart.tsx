import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { Chart as Chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js/auto';

// Ensure the necessary controllers and elements are registered
Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  chartData: any; // Replace 'any' with the actual type of your chart data
  chartOptions: any;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, chartOptions }) => {
  return (
    <Bar
      data={chartData}
      options={chartOptions}
    />
  );
};

export default BarChart;
