import { useState, useEffect } from 'react';

interface ProgressBarProps {
  totalMoney: number;
  currentMoney: number;
}
const ProgressBar = ({ totalMoney, currentMoney }: ProgressBarProps) => {
  const [progress, setProgress] = useState(Number(((currentMoney / totalMoney) * 100).toFixed(0)));

  return (
    <div className="w-[224px] h-[5px] bg-gray-200">
      <div
        className="h-full bg-[#2F80ED]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
