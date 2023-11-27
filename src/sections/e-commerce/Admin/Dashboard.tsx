import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import LineChart from './chart/LineChart';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { number } from 'yup';
import axios from 'axios';
import { BookType } from 'src/types/book';
import { ToolType } from 'src/types/tool';

type OrderDataType = {
  labels: any[];
  datasets: { label: string; data: any[] }[];
};
interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}
export default function Dashboard() {
  const [fetchDataOrder, setFetchDataOrder] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setbooks] = useState<BookType[]>([]);
  const [tools, settools] = useState<ToolType[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [orderData, setOrderData] = useState<OrderDataType | undefined>({
    labels: [],
    datasets: [{ label: "", data: [] }],
  })
  useEffect(() => {
    fetch
      .get(apiPaths.order)
      .then((res) => setFetchDataOrder(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    fetch
      .get(apiPaths.book)
      .then((res) => setbooks(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    fetch
      .get(apiPaths.school)
      .then((res) => settools(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/admin/users",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    if (result.status === 302) {
      setUsers(result.data)
    }
  };
  useEffect(() => {
    if (fetchDataOrder.length > 0) {
      const mergedData = fetchDataOrder.reduce((acc, data) => {
        const existingIndex = acc.labels.indexOf(data.orderdate);

        if (existingIndex !== -1) {
          // If the date already exists, update the totalamount
          acc.datasets[0].data[existingIndex] += data.totalamount;
        } else {
          // If the date doesn't exist, add it to labels and add totalamount to data
          acc.labels.push(data.orderdate);
          acc.datasets[0].data.push(data.totalamount);
        }

        return acc;
      }, { labels: [], datasets: [{ label: "doanh thu", data: [] }] });

      setOrderData(mergedData);

      // Calculate total revenue
      const total = mergedData.datasets[0].data.reduce((sum: number, amount: number) => sum + amount, 0);
      setTotalRevenue(total);
    }
    const totalOrderCount = fetchDataOrder.length;
    setTotalOrder(totalOrderCount);
    const totalProductCount = books.length + tools.length;
    setTotalProducts(totalProductCount);
    // Calculate total number of users
    const totalUsersCount = users.filter(user => user.role === 'USER').length; // Assuming you have the users data somewhere
    // Update the state
    setTotalUsers(totalUsersCount);
  }, [fetchDataOrder, users, books, tools]);
  console.log()
  return (
    <>
      <div className="space-y-4 h-screen">
        <div className="grid grid-cols-4 gap-4 h-24">
          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-orange-300 rounded-[50%] ml-4">
              <Icon
                icon="mdi:user"
                fontSize={32}
              />
            </span>
            <div>
              <p className="text-gray-500 text-xl">Tổng tài khoản</p>
              <span>{totalUsers}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-[50%] ml-4">
              <Icon
                icon="noto-v1:books"
                fontSize={32}
              />
            </span>
            <div>
              <p className="text-gray-500 text-xl">Tổng sản phẩm</p>
              <span>{totalProducts}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="relative w-14 h-14 flex items-center justify-center bg-rose-300 rounded-[50%] ml-4">
              <Icon
                icon="clarity:user-line"
                fontSize={32}
              />
              <span className="absolute w-[12px] h-[12px] bg-green-300 border-[2px] border-solid border-amber-300 rounded-[50%] top-[53%] left-[60%]"></span>
            </span>
            <div>
              <p className="text-gray-500 text-xl">Tổng đơn hàng</p>
              <span>{totalOrder}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>{totalRevenue}đ</span>
              {/* <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span> */}
            </div>
          </div>
        </div>

        {/* //////////////////////////// */}
        {/* <div className="min-h-[400px] grid grid-rows-10 grid-cols-3 gap-4">
          <div className="row-span-5 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
          <div className="row-span-3 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
          <div className="row-span-5 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
        </div> */}
        {/* {fetchDataOrder.length > 0 && <LineChart chartData={orderData}/>} */}
        {orderData && <LineChart chartData={orderData} />}
      </div>
    </>
  );
}
