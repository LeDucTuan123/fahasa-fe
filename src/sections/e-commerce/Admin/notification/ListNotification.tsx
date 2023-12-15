import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import fetch from 'src/services/axios/Axios';
import { formatDateTime } from 'src/util/SupportFnc';

interface NotifyType {
  id: any;
  title: string;
  content: string;
  notificationDate: string;
  userEmail: string;
  idUsers: string;
  typeNotify?: [];
}

interface Props {
  onHandleEditNotification: (item: NotifyType) => void;
  fetchDataNotification: NotifyType[];
  setFetchDataNotification: React.Dispatch<React.SetStateAction<NotifyType[]>>;
}

export default function ListNotification({
  onHandleEditNotification,
  fetchDataNotification,
  setFetchDataNotification,
}: Props) {
  // Thêm state để lưu trạng thái sắp xếp

  const sortedData = [...fetchDataNotification].sort((a, b) => {
    // Sắp xếp theo trường notificationDate từ mới đến cũ
    return new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime();
  });

  const ITEMS_PER_PAGE = 5; // Số item/trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính số lượng trang
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  // Chia dữ liệu đã sắp xếp thành các trang
  const paginatedData = sortedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Hàm xử lý chuyển trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteNotification = async (item: NotifyType) => {
    try {
      await fetch.delete(`http://localhost:8080/api/v1/notifications/delete/${item.id}`);

      const filteredPosts = fetchDataNotification.filter((b: NotifyType) => b.id !== item.id);

      toast.success('Xóa thành công');
      return setFetchDataNotification(filteredPosts);
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <p className="text-2xl font-bold py-4">Danh sách </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-[1px] rounded-xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-[15px]">
              <th
                scope="col"
                className="px-6 py-3"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tiêu đề
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Nội dung
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Ngày
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 &&
              paginatedData.map((item: NotifyType) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 max-w-[170px]">{item.title}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.content}</td>
                  <td className="px-6 py-4 max-w-[170px] overflow-hidden text-ellipsis line-clamp-5">
                    {formatDateTime(item.notificationDate)}
                  </td>
                  <td className="px-6 py-4 max-w-[170px]">{item.userEmail}</td>
                  {/* <td className="px-6 py-4 max-w-[170px]">{item.active === true ? 'true' : 'false'}</td> */}

                  <td className="px-6 py-4 max-w-[170px] text-left ">
                    <div className="w-full flex gap-3">
                      <button
                        className="bg-orange-300 text-white hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => onHandleEditNotification(item)}
                      >
                        Sửa
                      </button>

                      <button
                        className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        onClick={() => handleDeleteNotification(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-500"
          >
            Prev
          </button>
          <p className="text-gray-700">
            {currentPage}/{totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
