import { useState, useEffect } from 'react';

interface ProgressBarProps {
  totalMoney: number;
  currentMoney: number;
}
const ProgressBar = ({ totalMoney, currentMoney }: ProgressBarProps) => {
  const [progress, setProgress] = useState(Number(((currentMoney / totalMoney) * 100).toFixed(0)));
  useEffect(() => {
    setProgress(Number(((currentMoney / totalMoney) * 100).toFixed(0)));
  }, [currentMoney, totalMoney]);
  return (
    <div className="w-[224px] h-[5px] bg-gray-200">
      <div
        className="h-full bg-[#2F80ED]"
        style={progress < 100 ? { width: `${progress}%` } : { width: '100%' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
