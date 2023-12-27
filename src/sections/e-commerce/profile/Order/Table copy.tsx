import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link } from 'src/components/Link';
import { SkeletonOrder } from 'src/components/skeleton';
import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';

interface TableProps {
  orders: any[];
  changeToDetail: (id: number) => void;
}

function Table(props: TableProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [loading]);

  const [selectedTab, setSelectedTab] = useState('all');

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
  const itemsPerPage = 8; // Số lượng mục trên mỗi trang

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.orders.slice(indexOfFirstItem, indexOfLastItem);

  // Nếu không có đơn hàng nào, hiển thị thông báo và ẩn pagination
  const noOrders = props.orders && props.orders.length === 0;

  return (
    <>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="uppercase text-lg font-bold">Đơn hàng của tôi</h1>
        <div className="flex justify-center space-x-4 gap-2 mt-3">
          <button
            className={
              selectedTab === 'all'
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick('all')}
          >
            Tất cả
          </button>
          <button
            className={
              selectedTab === 'paid'
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick('paid')}
          >
            Đã thanh toán
          </button>
          <button
            className={
              selectedTab === 'unpaid'
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick('unpaid')}
          >
            Chưa thanh toán
          </button>
          <button
            className={
              selectedTab === 'processing'
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick('processing')}
          >
            Đang xử lý
          </button>
          <button
            className={
              selectedTab === 'cancelled'
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick('cancelled')}
          >
            Đã hủy
          </button>
        </div>
        <hr className="my-4" />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-auto w-full text-sm text-left ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Mã đơn hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Ngày mua
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Người nhận
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Tổng tiền
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                ></th>
              </tr>
            </thead>
            <tbody className="">
              {loading ? (
                <>
                  {/* Hiển thị dữ liệu theo trang */}
                  {selectedTab === 'all' && (
                    // Hiển thị tất cả đơn hàng
                    <>
                      {currentItems.map((item: any) => {
                        // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                        return (
                          <tr
                            key={item.id}
                            className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3 tracking-widest">{formatDateToDDMMYYYY(item.orderdate)}</td>
                            <td className="px-6 py-3">{item.receiver}</td>
                            <td className="px-6 py-3 tracking-wide">{ConvertToVietNamDong(item.totalamount)}</td>
                            <td className="text-center">
                              <div
                                className={
                                  item.statuss.statuss === 'Đã thanh toán'
                                    ? 'bg-[#24a148] rounded-full py-1 px-1 text-white'
                                    : item.statuss.statuss === 'Chưa thanh toán'
                                    ? 'bg-[#ff832b]  rounded-full py-1 px-1 text-white'
                                    : item.statuss.statuss === 'Đang xử lý'
                                    ? 'bg-[#f1c21b]  rounded-full py-1 px-1 text-white'
                                    : item.statuss.statuss === 'Bị hủy'
                                    ? 'bg-[#da1e28]  rounded-full py-1 px-1 text-white'
                                    : ''
                                }
                              >
                                {item.statuss.statuss}
                              </div>
                            </td>
                            <td
                              className=" font-semibold text-red-500 px-6 py-4 text-center cursor-pointer hover:text-[#C92127]"
                              onClick={() => props.changeToDetail(item.id)}
                            >
                              Xem chi tiết
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}

                  {selectedTab === 'paid' && (
                    // Hiển thị tất cả đơn hàng
                    <>
                      {currentItems
                        .filter((item: any) => item.statuss.statuss === 'Đã thanh toán')
                        .map((item: any) => {
                          // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                          return (
                            <tr
                              key={item.id}
                              className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                              <td className="px-6 py-3">{item.id}</td>
                              <td className="px-6 py-3 tracking-widest">{formatDateToDDMMYYYY(item.orderdate)}</td>
                              <td className="px-6 py-3">{item.receiver}</td>
                              <td className="px-6 py-3 tracking-wide">{ConvertToVietNamDong(item.totalamount)}</td>
                              <td className="text-center">
                                <div
                                  className={
                                    item.statuss.statuss === 'Đã thanh toán'
                                      ? 'bg-[#24a148] rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Chưa thanh toán'
                                      ? 'bg-[#ff832b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Đang xử lý'
                                      ? 'bg-[#f1c21b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Bị hủy'
                                      ? 'bg-[#da1e28]  rounded-full py-1 px-1 text-white'
                                      : ''
                                  }
                                >
                                  {item.statuss.statuss}
                                </div>
                              </td>
                              <td
                                className=" font-semibold text-red-500 px-6 py-4 text-center cursor-pointer hover:text-[#C92127]"
                                onClick={() => props.changeToDetail(item.id)}
                              >
                                Xem chi tiết
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}

                  {selectedTab === 'unpaid' && (
                    // Hiển thị tất cả đơn hàng
                    <>
                      {currentItems
                        .filter((item: any) => item.statuss.statuss === 'Chưa thanh toán')
                        .map((item: any) => {
                          // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                          return (
                            <tr
                              key={item.id}
                              className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                              <td className="px-6 py-3">{item.id}</td>
                              <td className="px-6 py-3 tracking-widest">{formatDateToDDMMYYYY(item.orderdate)}</td>
                              <td className="px-6 py-3">{item.receiver}</td>
                              <td className="px-6 py-3 tracking-wide">{ConvertToVietNamDong(item.totalamount)}</td>
                              <td className="text-center">
                                <div
                                  className={
                                    item.statuss.statuss === 'Đã thanh toán'
                                      ? 'bg-[#24a148] rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Chưa thanh toán'
                                      ? 'bg-[#ff832b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Đang xử lý'
                                      ? 'bg-[#f1c21b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Bị hủy'
                                      ? 'bg-[#da1e28]  rounded-full py-1 px-1 text-white'
                                      : ''
                                  }
                                >
                                  {item.statuss.statuss}
                                </div>
                              </td>
                              <td
                                className=" font-semibold text-red-500 px-6 py-4 text-center cursor-pointer hover:text-[#C92127]"
                                onClick={() => props.changeToDetail(item.id)}
                              >
                                Xem chi tiết
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}

                  {selectedTab === 'processing' && (
                    // Hiển thị tất cả đơn hàng
                    <>
                      {currentItems
                        .filter((item: any) => item.statuss.statuss === 'Đang xử lý')
                        .map((item: any) => {
                          // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                          return (
                            <tr
                              key={item.id}
                              className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                              <td className="px-6 py-3">{item.id}</td>
                              <td className="px-6 py-3 tracking-widest">{formatDateToDDMMYYYY(item.orderdate)}</td>
                              <td className="px-6 py-3">{item.receiver}</td>
                              <td className="px-6 py-3 tracking-wide">{ConvertToVietNamDong(item.totalamount)}</td>
                              <td className="text-center">
                                <div
                                  className={
                                    item.statuss.statuss === 'Đã thanh toán'
                                      ? 'bg-[#24a148] rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Chưa thanh toán'
                                      ? 'bg-[#ff832b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Đang xử lý'
                                      ? 'bg-[#f1c21b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Bị hủy'
                                      ? 'bg-[#da1e28]  rounded-full py-1 px-1 text-white'
                                      : ''
                                  }
                                >
                                  {item.statuss.statuss}
                                </div>
                              </td>
                              <td
                                className=" font-semibold text-red-500 px-6 py-4 text-center cursor-pointer hover:text-[#C92127]"
                                onClick={() => props.changeToDetail(item.id)}
                              >
                                Xem chi tiết
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}

                  {selectedTab === 'cancelled' && (
                    // Hiển thị tất cả đơn hàng
                    <>
                      {currentItems
                        .filter((item: any) => item.statuss.statuss === 'Bị hủy')
                        .map((item: any) => {
                          // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                          return (
                            <tr
                              key={item.id}
                              className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                              <td className="px-6 py-3">{item.id}</td>
                              <td className="px-6 py-3 tracking-widest">{formatDateToDDMMYYYY(item.orderdate)}</td>
                              <td className="px-6 py-3">{item.receiver}</td>
                              <td className="px-6 py-3 tracking-wide">{ConvertToVietNamDong(item.totalamount)}</td>
                              <td className="text-center">
                                <div
                                  className={
                                    item.statuss.statuss === 'Đã thanh toán'
                                      ? 'bg-[#24a148] rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Chưa thanh toán'
                                      ? 'bg-[#ff832b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Đang xử lý'
                                      ? 'bg-[#f1c21b]  rounded-full py-1 px-1 text-white'
                                      : item.statuss.statuss === 'Bị hủy'
                                      ? 'bg-[#da1e28]  rounded-full py-1 px-1 text-white'
                                      : ''
                                  }
                                >
                                  {item.statuss.statuss}
                                </div>
                              </td>
                              <td
                                className=" font-semibold text-red-500 px-6 py-4 text-center cursor-pointer hover:text-[#C92127]"
                                onClick={() => props.changeToDetail(item.id)}
                              >
                                Xem chi tiết
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  )}
                </>
              ) : (
                <>
                  <SkeletonOrder />
                  <SkeletonOrder />
                  <SkeletonOrder />
                  <SkeletonOrder />
                  <SkeletonOrder />
                </>
              )}
            </tbody>
          </table>
        </div>

        {noOrders ? (
          // Hiển thị thông báo khi không có đơn hàng
          <>
            <div className="text-center py-3 mt-4">
              <div className="mt-4 pt-14 text-slate-500 pb-2">Không có đơn hàng nào</div>
            </div>
            <div className="text-center py-3 mt-4 border-none">
              <div>
                <Link to="/">
                  <button className="bg-orange-400 text-xl py-2 font-medium outline-none rounded-lg px-3 hover:bg-red-500 active:bg-red-800">
                    Đặt hàng ngay
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          // Hiển thị pagination khi có đơn hàng
          <div className="pagination flex justify-end items-center gap-4 pt-4">
            <div className="border-2 text-sm font-medium border-blue-600 rounded-full px-4 py-1 hover:bg-blue-600 hover:text-white">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <Icon
                  icon="ic:round-navigate-before"
                  fontSize={18}
                />
                <span>Trang trước</span>
              </button>
            </div>
            <div className="text-sm font-medium">
              Trang {currentPage}/{Math.ceil(props.orders.length / itemsPerPage)}
            </div>
            <div className="border-2 text-sm font-medium border-blue-600 rounded-full px-4 py-1 hover:bg-blue-600 hover:text-white">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastItem >= props.orders.length}
                className="flex items-center"
              >
                <span>Trang tiếp </span>
                <Icon
                  icon="ic:round-navigate-next"
                  fontSize={18}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
