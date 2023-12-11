import { faker } from '@faker-js/faker';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'src/components/Link';
import { RootState } from 'src/redux/store';
import fetch from 'src/services/axios/Axios';
import CountdownTimer from './CountDownTimer';
import './style.css';
import { toast } from 'react-toastify';
import Spin from '../../../assets/image/spinlucky.jpg';

export default function SpinLuckyVoucher() {
  const [currentRotate, setCurrentRotate] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [showMsg, setShowMsg] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [getDate, setGetDate] = useState('');
  const [countSpin, setCountSpin] = useState(0);

  const user: any = useSelector((state: RootState) => state.user.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const listGift = [
    { id: 1, title: 'Chúc bạn may mắn lần sau', percent: 15 / 100 },
    {
      id: 2,
      title: 'Voucher giảm 8k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 8000.0,
      percent: 15 / 100,
    },
    {
      id: 3,
      title: 'Mã giảm giá 20k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 20000.0,
      percent: 15 / 100,
    },
    {
      id: 4,
      title: 'Mã giảm giá 30k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 30000.0,
      percent: 15 / 100,
    },
    {
      id: 5,
      title: 'Mã giảm giá 50k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 50000.0,
      percent: 10 / 100,
    },
    {
      id: 6,
      title: 'Mã giảm giá 10k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 10000.0,
      percent: 10 / 100,
    },
    {
      id: 7,
      title: 'Mã giảm giá 99k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 99000.0,
      percent: 10 / 100,
    },
    {
      id: 8,
      title: 'Mã siêu Voucher giảm 999k ',
      code: String(faker.random.alphaNumeric(15)),
      valuev: 999000.0,
      percent: 5 / 100,
    },
  ];

  const size = listGift.length;
  const rotate = 360 / size;
  const skewY = 90 - rotate;

  const start = () => {
    setShowMsg('');
    setIsRotating(true);
    const random = Math.random();
    const gift = getGift(random);
    setCurrentRotate(currentRotate + 360 * 10);
    rotateWheel(currentRotate, gift.index);
    showGift(gift);
    setCountSpin((prev) => prev - 1);

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 10));
    const formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
    setGetDate(String(formattedFutureDate));
    if (gift.id !== 1) {
      try {
        fetch({
          url: 'http://localhost:8080/rest/myvoucher',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            title: gift.title,
            code: gift.code,
            expdate: String(formattedFutureDate),
            valuev: gift.valuev,
            active: 1,
            quantity: 1,
            user: { id: user.id },
          }),
        }).then();
      } catch (error) {
        console.log('errorr ');
      }
    }

    console.log(formattedFutureDate);
  };

  const rotateWheel = (currentRotate: any, index: any) => {
    const wheelElement: any = document.querySelector('.wheel');
    if (wheelElement) {
      wheelElement.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    }
  };

  const getGift = (randomNumber: any) => {
    let currentPercent = 0;
    let list: any = [];

    listGift.forEach((item, index) => {
      currentPercent += item.percent;

      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    return list[0];
  };

  const showGift = (gift: any) => {
    let timer = setTimeout(() => {
      setIsRotating(false);
      setShowMsg(gift);
      clearTimeout(timer);
      setShowModal(true);
    }, 7000);
  };

  // Định nghĩa hàm onFinish
  const handleFinish = () => {
    setCountSpin((prev) => prev + 1);
    // Xử lý khi đếm ngược kết thúc
    console.log('Bạn có 1 lượt quay');
  };
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <main className="h-screen ">
      <div className="bg-lucky"></div>
      <section className="main  h-full items-center ">
        <span className="span">
          <ul className="wheel ul">
            {listGift.map((item, index) => (
              <li
                key={index}
                className="li-item"
                style={{ transform: `rotate(${rotate * index}deg) skewY(-${skewY}deg)` }}
              >
                <p
                  style={{ transform: `skewY(${skewY}deg) rotate(${rotate / 2}deg)` }}
                  className={`text ${index % 2 === 0 ? 'text-1' : 'text-2'}`}
                >
                  <b>{item.title}</b>
                </p>
              </li>
            ))}
          </ul>
        </span>
        {isLogin ? (
          <>
            <button
              className="btn--wheel button"
              onClick={() => !isRotating && start()}
              disabled={countSpin === 0 ? true : false}
            >
              Quay thưởng
            </button>
            <div className="flex flex-col">
              <p className="text-2xl text-white font-bold">Bạn có Lượt {countSpin} quay</p>
            </div>
            <CountdownTimer
              initialTime={10}
              onFinish={handleFinish}
              countSpin={countSpin}
            />
          </>
        ) : (
          <button
            className="btn--wheel button"
            disabled={false}
          >
            Vui lòng đăng nhập...
          </button>
        )}
        <Modal
          dismissible
          show={showModal}
          onClose={handleCloseModal}
        >
          <Modal.Header>
            <div
              key="uniqueKey"
              className="w-full justify-center"
            >
              {' '}
              <p className="text-2xl w-full msg">
                {showMsg.id === 1 ? 'Chúc bạn may mắn lần sau' : ' Chúc mừng bạn đã nhận được voucher'}
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            {showMsg.id === 1 ? (
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="huhu"
                  className="w-52 h-52 object-cover"
                />
                <div className="flex gap-4 py-4">
                  <Link to="/member/">
                    <button className="p-3 w-fit h-10 bg-red-400 rounded-lg text-slate-200 flex items-center">
                      Voucher của tôi
                    </button>
                  </Link>
                  <button
                    className="p-3 w-fit h-10 bg-gray-400 rounded-lg text-slate-200 flex items-center"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <ul>
                  <li>Tên mã: {showMsg.title}</li>
                  <li>Code: {showMsg.code}</li>
                  <li>ngày hết hạn: {getDate}</li>
                  <li>
                    Giảm giá:{' '}
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(showMsg.valuev)}
                  </li>
                  <li>Số lượng: 1</li>
                </ul>

                <div className="flex gap-4 py-4">
                  <Link to="/member/myvoucher">
                    <button className="p-3 w-fit h-10 bg-red-400 rounded-lg text-slate-200 flex items-center">
                      Voucher của tôi
                    </button>
                  </Link>
                  <button
                    className="p-3 w-fit h-10 bg-gray-400 rounded-lg text-slate-200 flex items-center"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </section>
    </main>
  );
}
