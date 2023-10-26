import { Link } from 'react-router-dom';
import Detail from './Detail';
import { useState } from 'react';
import Table from './Table';

function Order() {
  const [isChange, setIsChange] = useState(false);

  // thay đổi giữa table và detail
  function changeToDetail() {
    setIsChange(true);
  }

  function changeToTable() {
    setIsChange(false);
  }

  return (
    <>
      <div className="p-3 mb-3 shadow-md w-full">
        Bạn vui lòng cập nhật thông tin tài khoản{' '}
        <Link
          to="/profile"
          className="text-[#dc3545] font-bold"
        >
          Cập nhật thông tin
        </Link>
      </div>
      {/* <div className="p-5 shadow-lg w-full">Bạn chưa có đơn hàng nào</div> */}
      {isChange ? <Detail changeToTable={changeToTable} /> : <Table changeToDetail={changeToDetail} />}
    </>
  );
}

export default Order;
