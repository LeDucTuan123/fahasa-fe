import { Link } from 'react-router-dom';
import ListAddress from './ListAddress';
import { useState } from 'react';
import Form from './Form';

function Address() {
  const [isChange, setIsChange] = useState(false);

  // thay đổi giữa form và list địa chỉ
  function changeToForm() {
    setIsChange(true);
  }

  function changeToList() {
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
      {isChange ? <Form changeToList={changeToList} /> : <ListAddress changeToForm={changeToForm} />}
    </>
  );
}

export default Address;
