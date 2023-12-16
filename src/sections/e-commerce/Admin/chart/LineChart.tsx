import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { Chart as Chartjs, LineController, LinearScale, PointElement, LineElement } from 'chart.js/auto';

// Ensure the necessary controllers and elements are registered
Chartjs.register(LineController, LinearScale, PointElement, LineElement);

interface LineChartProps {
  chartData: any; // Replace 'any' with the actual type of your chart data
  chartOptions: any;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, chartOptions }) => {
  return (
    <Line
      data={chartData}
      options={chartOptions}
    />
  );
};

export default LineChart;
