import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import './style.css';

export default function SpinLuckyVoucher() {
  const [currentRotate, setCurrentRotate] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const listGift = [
    { text: 'Voucher freeship ', percent: 10 / 100 },
    { text: 'Voucher -5%', percent: 10 / 100 },
    { text: 'Voucher -10%', percent: 5 / 100 },
    { text: 'Voucher -20%', percent: 5 / 100 },
    { text: 'Voucher -30k', percent: 5 / 100 },
    { text: 'Chúc bạn may mắn lần sau', percent: 40 / 100 },
    { text: 'Voucher -10%', percent: 10 / 100 },
    { text: 'Voucher -10%', percent: 10 / 100 },
    { text: 'Voucher -10%', percent: 10 / 100 },
    { text: 'Voucher -10%', percent: 10 / 100 },
  ];

  const size = listGift.length;
  const rotate = 360 / size;
  const skewY = 90 - rotate;

  //   useEffect(() => {
  //     const fetchApiVoucher = async () => {
  //       const res = await fetch.get(apiPaths.voucher);
  //       setGetVoucher(res.data);
  //     };

  //     fetchApiVoucher();
  //   }, []);

  useEffect(() => {
    const wheel = document.querySelector('.wheel');
    const btnWheel = document.querySelector('.btn--wheel');
    const showMsgElement = document.querySelector('.msg');

    if (wheel && btnWheel) {
      listGift.map((item, index) => (
        <li
          key={index}
          className="lili"
          style={{ transform: `rotate(${rotate * index}deg) skewY(-${skewY}deg)` }}
        >
          <p
            style={{ transform: `skewY(${skewY}deg) rotate(${rotate / 2}deg)` }}
            className={`text ${index % 2 === 0 ? 'text-1' : 'text-2'}`}
          >
            <b>{item.text}</b>
          </p>
        </li>
      ));
    }
  }, [rotate, skewY]);

  const start = () => {
    setShowMsg('');
    setIsRotating(true);
    const random = Math.random();
    const gift = getGift(random);
    setCurrentRotate(currentRotate + 360 * 10);
    rotateWheel(currentRotate, gift.index);
    showGift(gift);
    console.log(gift);
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
      setShowMsg(`"${gift.text}"`);
      clearTimeout(timer);
      setShowModal(true);
    }, 7000);
  };

  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <main>
      <section className="main">
        <span className="span">
          <ul className="wheel ul"></ul>
        </span>
        <button
          className="btn--wheel button"
          onClick={() => !isRotating && start()}
        >
          Quay thưởng
        </button>
        <Modal
          dismissible
          show={showModal}
          onClose={handleCloseModal}
        >
          <Modal.Header>
            <div
              key="uniqueKey"
              className="w-full"
            >
              {' '}
              <p className="text-2xl msg">Chúc mừng bạn đã nhận được </p>
            </div>
          </Modal.Header>
          <Modal.Body>{showMsg}</Modal.Body>
        </Modal>
      </section>
    </main>
  );
}
