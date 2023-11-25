import { Link } from 'react-router-dom';
import Detail from './Detail';
import { useEffect, useState } from 'react';
import Table from './Table';
import fetch from 'src/services/axios/Axios';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

function Order() {
  const [isChange, setIsChange] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [order, setOrder] = useState<any>();
  const user: any = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    fetch
      .get(`/rest/order/ordersuccess/${user.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  // thay đổi giữa table và detail
  function changeToDetail(id: number) {
    fetch
      .get(`/rest/orderdetail/success/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOrder(() => {
      return orders.find((item: any) => {
        return item.id === id;
      });
    });
    setIsChange(true);
  }

  function changeToTable() {
    setIsChange(false);
  }

  return (
    <>
      <div className="p-3 mb-3 shadow-md w-full rounded-lg">
        Bạn vui lòng cập nhật thông tin tài khoản{' '}
        <Link
          to="/profile"
          className="text-[#dc3545] font-bold"
        >
          Cập nhật thông tin
        </Link>
      </div>
      {/* <div className="p-5 shadow-lg w-full">Bạn chưa có đơn hàng nào</div> */}
      {isChange ? (
        <Detail
          user={user}
          changeToTable={changeToTable}
          order={order}
          products={products}
          setOrders={setOrders}
        />
      ) : (
        <Table
          changeToDetail={changeToDetail}
          orders={orders}
        />
      )}
    </>
  );
}

export default Order;
