import { Link } from 'react-router-dom';

function Order() {
  return (
    <>
      <div className="p-3 mb-3 shadow-md w-full">
        Bạn vui lòng cập nhật thông tin tài khoản{' '}
        <Link
          to="/profile"
          className="text-[#dc3545] font-bold"
        >
          Cập nhật thông tin
        </Link>{' '}
      </div>
      <div className="p-5 shadow-lg w-full">Bạn chưa có đơn hàng nào</div>
    </>
  );
}

export default Order;
