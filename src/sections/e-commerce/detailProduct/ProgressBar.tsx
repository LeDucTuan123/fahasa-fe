import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percent: number;
}
const ProgressBar = ({ percent }: ProgressBarProps) => {
  const [progress, setProgress] = useState<number>(percent);
  useEffect(() => {
    setProgress(percent);
  }, [percent]);
  return (
    <div className="w-[224px] h-[5px] bg-gray-200">
      <div
        className="h-full bg-[#F6A500]"
        style={progress < 100 ? { width: `${progress}%` } : { width: '100%' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
