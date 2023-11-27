import React, {FC} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs, LineController, LinearScale, PointElement, LineElement } from 'chart.js/auto';

// Ensure the necessary controllers and elements are registered
Chartjs.register(LineController, LinearScale, PointElement, LineElement);

interface LineChartProps {
  chartData: any; // Replace 'any' with the actual type of your chart data
}

const LineChart: React.FC<LineChartProps> = ({ chartData }) => {
  return <Line data={chartData} />;
};

export default LineChart