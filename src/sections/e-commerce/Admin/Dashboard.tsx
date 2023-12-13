import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import LineChart from './chart/LineChart';
import BarChart from './chart/BarChart';
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
    datasets: [{ label: '', data: [] }],
  });
  const [orderData1, setOrderData1] = useState<OrderDataType | undefined>({
    labels: [],
    datasets: [{ label: '', data: [] }],
  });
  useEffect(() => {
    fetch
      .get(apiPaths.order)
      .then((res: any) => setFetchDataOrder(res.data))
      .catch((err: any) => console.log(err.message));
  }, []);
  useEffect(() => {
    fetch
      .get(apiPaths.book)
      .then((res: any) => setbooks(res.data))
      .catch((err: any) => console.log(err.message));
  }, []);
  useEffect(() => {
    fetch
      .get(apiPaths.school)
      .then((res: any) => settools(res.data))
      .catch((err: any) => console.log(err.message));
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8080/api/v1/admin/users', {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setUsers(result.data);
    }
  };
  useEffect(() => {
    if (fetchDataOrder.length > 0) {
      const filteredData = fetchDataOrder.filter((data) => data.statuss.id !== 1 && data.statuss.id !== 3);

      const mergedData = filteredData.reduce(
        (acc, data) => {
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
        },
        { labels: [], datasets: [{ label: 'doanh thu', data: [] }] },
      );
      const mergedData1 = filteredData.reduce(
        (acc, data) => {
          const existingIndex = acc.labels.indexOf(data.orderdate);

          if (existingIndex !== -1) {
            // If the date already exists, update the totalamount
            acc.datasets[0].data[existingIndex] += 1;
          } else {
            // If the date doesn't exist, add it to labels and add totalamount to data
            acc.labels.push(data.orderdate);
            acc.datasets[0].data.push(1);
          }

          return acc;
        },
        { labels: [], datasets: [{ label: 'đơn hàng', data: [] }] },
      );

      setOrderData(mergedData);
      setOrderData1(mergedData1);
      // Calculate total revenue
      const total = mergedData.datasets[0].data.reduce((sum: number, amount: number) => sum + amount, 0);
      setTotalRevenue(total);

      const totalOrderCount = filteredData.length;
      setTotalOrder(totalOrderCount);
    }
    
    const totalProductCount = books.length + tools.length;
    setTotalProducts(totalProductCount);
    // Calculate total number of users
    const totalUsersCount = users.filter((user) => user.role === 'USER').length; // Assuming you have the users data somewhere
    // Update the state
    setTotalUsers(totalUsersCount);
  }, [fetchDataOrder, users, books, tools]);
  console.log();
  return (
    <>
      <div className="h-screen">
        <div className="grid grid-cols-4 gap-8 h-24 mb-8">
          <div className="flex flex-row items-center gap-4 bg-white border-solid border-gray-300 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] capitalize">
            <span className="w-14 h-14 flex items-center justify-center bg-[#eae8fd] rounded-[50%] ml-4">
              <Icon
                icon="lucide:users"
                fontSize={32}
                className="text-[#786df1]" // #786df1 {totalUsers}
              />
            </span>
            <div>
              <p className="text-[#786df1] font-medium text-xl">tài khoản</p>
              <span className="font-semibold text-lg">{totalUsers}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4  bg-white border-solid border-gray-300 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] capitalize">
            <span className="w-14 h-14 flex items-center justify-center bg-[#ffe6ea] rounded-[50%] ml-4">
              <Icon
                icon="ph:books"
                fontSize={32}
                className="text-[#fd4085]"
              />
            </span>
            <div>
              <p className="text-[#fd4085] font-medium text-xl">sản phẩm</p>
              <span className="font-semibold text-lg">{totalProducts}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4  bg-white border-solid border-gray-300 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] capitalize">
            <span className="w-14 h-14 flex items-center justify-center bg-[#fff1e3] rounded-[50%] ml-4">
              <Icon
                icon="lucide:package"
                fontSize={32}
                className="text-[#ff9f43]" // #ff9f43
              />
              {/* <span className="absolute w-[12px] h-[12px] bg-green-300 border-[2px] border-solid border-amber-300 rounded-[50%] top-[53%] left-[60%]"></span> */}
            </span>
            <div>
              <p className="text-[#ff9f43] font-medium text-xl">đơn hàng</p>
              <span className="font-semibold text-lg">{totalOrder}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4  bg-white border-solid border-gray-300 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] capitalize">
            <span className="w-14 h-14 flex items-center justify-center bg-[#d6ffed] rounded-[50%] ml-4">
              <Icon
                icon="ic:round-attach-money"
                fontSize={32}
                className="text-[#0dbb9d]"
              />
            </span>
            <div className="relative">
              <p className="text-[#0dbb9d] font-medium text-xl">doanh thu</p>
              <span className="font-semibold text-lg">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
              </span>
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
        {orderData && (
          <div className="flex w-full gap-6">
            <div className="w-1/2 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
              <div className="px-3 py-3 font-semibold text-xl rounded-md flex items-center gap-3 bg-[#f8f9fc] border-b">
                <Icon
                  className="text-[#4e73df]"
                  icon="fa6-solid:chart-line"
                />
                <span className="text-[#4e73df]">Tổng Doanh Thu</span>
              </div>
              <div className="px-3 py-3">
                <LineChart chartData={orderData} />
              </div>
            </div>
            <div className="w-1/2 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white">
              <div className="px-3 py-3 font-semibold text-xl rounded-md flex items-center gap-3 bg-[#f8f9fc] border-b">
                <Icon
                  className="text-[#4e73df]"
                  icon="fa-solid:chart-bar"
                />
                <span className="text-[#4e73df]">Tổng Đơn Hàng</span>
              </div>
              <div className="px-3 py-3">
                <BarChart chartData={orderData1} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
