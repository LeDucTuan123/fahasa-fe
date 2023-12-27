import { Icon } from '@iconify/react';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import fetch from 'src/services/axios/Axios';
import Detail from './Detail';
import Table from './Table';

const u = localStorage.getItem('user');
const user = JSON.parse(u ? u : '');

export default function Feedback() {
  const [isChange, setIsChange] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [order, setOrder] = useState<any>();
  const [newStatusId, setNewStatusId] = useState<number>(/* giá trị khởi tạo */);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch
      .get(`/rest/order/ordersuccess`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleStatusChange = (orderId: number, statusId: number) => {
    // Make an API call to update the order status
    fetch(`/rest/order/updateStatus/${orderId}/${statusId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res: AxiosResponse) => res.data)
      .then((data) => {
        // Update the orders state or handle the response accordingly
        toast.success('Cập nhật trạng thái đơn hàng thành công');

        // Load updated data
        fetch
          .get(`/rest/order/ordersuccess`)
          .then((res) => {
            setOrders(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error('Cập nhật trạng thái thất bại');
      });
  };

  return (
    <>
      <p className="text-xl pb-5 flex items-center font-bold uppercase gap-3">Quản lí đơn hàng </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </>
  );
}
