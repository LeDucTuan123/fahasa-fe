import React, { useState, useEffect } from 'react';

interface Props {
  initialTime: any;
  onFinish: () => void;
  countSpin: number;
}

const CountdownTimer = ({ initialTime, onFinish, countSpin }: Props) => {
  const local: any = localStorage.getItem('countdownTimer');
  const [timeLeft, setTimeLeft] = useState(local ? parseInt(local, 10) : initialTime);

  useEffect(() => {
    // Lưu trữ thời gian còn lại vào localStorage
    localStorage.setItem('countdownTimer', timeLeft.toString());

    // Đếm ngược thời gian
    const intervalId = setInterval(() => {
      // Giảm thời gian còn lại mỗi giây
      setTimeLeft((prevTime: any) => prevTime - 1);
    }, 1000);
    if (countSpin !== 0) {
      clearInterval(intervalId);
      localStorage.removeItem('countdownTimer');
    }

    // Xử lý khi thời gian kết thúc
    if (timeLeft === 0) {
      clearInterval(intervalId); // Dừng đếm ngược
      onFinish(); // Gọi hàm khi kết thúc đếm ngược
      if (countSpin === 0) {
        const resetTimer = () => {
          // Reset thời gian về giá trị ban đầu
          setTimeLeft(initialTime);

          // Lưu thời gian ban đầu vào localStorage
          localStorage.setItem('countdownTimer', initialTime.toString());
        };
        resetTimer();
      }
    }

    // Cleanup effect khi component unmount hoặc khi thời gian kết thúc
    return () => clearInterval(intervalId);
  }, [countSpin, initialTime, onFinish, timeLeft]);

  // Format thời gian hiển thị
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <div>{countSpin === 0 && <p className="text-2xl">Thời gian còn lại: {formatTime(timeLeft)}</p>}</div>;
};

export default CountdownTimer;
