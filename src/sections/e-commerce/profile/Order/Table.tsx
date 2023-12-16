import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link } from 'src/components/Link';
import { SkeletonOrder } from 'src/components/skeleton';
import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';

interface TableProps {
  orders: any[];
  changeToDetail: (id: number) => void;
}

// Tạo các hằng số cho các chuỗi cố định
const TAB_ALL = 'all';
const TAB_PAID = 'paid';
const TAB_UNPAID = 'unpaid';
const TAB_PROCESSING = 'processing';
const TAB_CANCELLED = 'cancelled';

function Table(props: TableProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TAB_ALL);
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [loading]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  // Tạo biến filteredOrders để lọc dữ liệu dựa trên TAB đã chọn
  const filteredOrders = props.orders.filter((item) => {
    switch (selectedTab) {
      case TAB_ALL:
        return true;
      case TAB_PAID:
        return item.statuss.statuss === 'Đã thanh toán';
      case TAB_UNPAID:
        return item.statuss.statuss === 'Chưa thanh toán';
      case TAB_PROCESSING:
        return item.statuss.statuss === 'Đang xử lý';
      case TAB_CANCELLED:
        return item.statuss.statuss === 'Đã hủy';
      default:
        return true;
    }
  });

  // Sắp xếp danh sách đơn hàng theo ngày mua trước khi hiển thị
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    // Đổi ngày thành dạng timestamp để so sánh
    const dateA = new Date(a.orderdate).getTime();
    const dateB = new Date(b.orderdate).getTime();

    // Sắp xếp theo thứ tự giảm dần (mới nhất lên đầu)
    return dateB - dateA;
  });

  const itemsPerPage = 8; // Số lượng mục trên mỗi trang

  // Function để tính toán vị trí của mục cuối cùng trên trang
  const getLastIndexForPage = (currentPage: any, itemsPerPage: any, totalItems: any) => {
    const lastIndex = currentPage * itemsPerPage;
    return Math.min(lastIndex, totalItems);
  };

  // Function để tính toán vị trí của mục đầu tiên trên trang
  const getFirstIndexForPage = (currentPage: any, itemsPerPage: any) => {
    return (currentPage - 1) * itemsPerPage;
  };

  // Tính toán số lượng trang dựa trên filteredOrders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Sử dụng filteredOrders để hiển thị dữ liệu trên từng trang
  const indexOfLastItem = getLastIndexForPage(currentPage, itemsPerPage, sortedOrders.length);
  const indexOfFirstItem = getFirstIndexForPage(currentPage, itemsPerPage);
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Nếu không có đơn hàng nào, hiển thị thông báo và ẩn pagination
  const noOrders = props.orders && props.orders.length === 0;

  return (
    <>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="uppercase text-lg font-bold">Đơn hàng của tôi</h1>
        <div className="flex justify-center space-x-4 gap-2 mt-3">
          <button
            className={
              selectedTab === TAB_ALL
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick(TAB_ALL)}
          >
            Tất cả
          </button>
          <button
            className={
              selectedTab === TAB_PAID
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick(TAB_PAID)}
          >
            Đã thanh toán
          </button>
          <button
            className={
              selectedTab === TAB_UNPAID
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick(TAB_UNPAID)}
          >
            Chưa thanh toán
          </button>
          <button
            className={
              selectedTab === TAB_PROCESSING
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick(TAB_PROCESSING)}
          >
            Đang xử lý
          </button>
          <button
            className={
              selectedTab === TAB_CANCELLED
                ? 'font-semibold bg-[#f9f9f9] px-3 py-2 rounded-md border-1 border text-[#143ec3]'
                : 'px-3 py-2 rounded-md border-1 border font-semibold text-slate-400 bg-[#f9f9f9]'
            }
            onClick={() => handleTabClick(TAB_CANCELLED)}
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
            {loading ? (
              <>
                <tbody className="">
                  {currentItems.map((item: any) => (
                    // Hiển thị thông tin cho mỗi mục trong trang hiện tại
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
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
                              : item.statuss.statuss === 'Đã hủy'
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
                  ))}
                </tbody>
                {noOrders ? (
                  // Hiển thị thông báo khi không có đơn hàng
                  <>
                    <tr>
                      <td colSpan={6}>
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
                      </td>
                    </tr>
                  </>
                ) : filteredOrders.length <= itemsPerPage ? (
                  <></>
                ) : (
                  // Hiển thị pagination khi có dữ liệu và không phải loading
                  <tr>
                    <td colSpan={6}>
                      <div className="pagination flex justify-end items-center gap-4 py-4">
                        <div
                          className={
                            currentPage === 1
                              ? 'border-2 text-sm font-medium border-slate-300 rounded-full'
                              : 'border-2 text-sm font-medium border-blue-600 rounded-full hover:bg-blue-600 hover:text-white'
                          }
                        >
                          <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center px-4 py-1 disabled:bg-slate-300 disabled:text-slate-500 rounded-full"
                          >
                            <Icon
                              icon="ic:round-navigate-before"
                              fontSize={18}
                            />
                            <span>Trang trước</span>
                          </button>
                        </div>
                        <div className="text-sm font-medium">
                          Trang {currentPage}/{totalPages}
                        </div>
                        <div
                          className={
                            indexOfLastItem >= filteredOrders.length
                              ? 'border-2 text-sm font-medium border-slate-300 rounded-full'
                              : 'border-2 text-sm font-medium border-blue-600 rounded-full hover:bg-blue-600 hover:text-white'
                          }
                        >
                          <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={indexOfLastItem >= filteredOrders.length}
                            className="flex items-center px-4 py-1 disabled:bg-slate-300 disabled:text-slate-500 rounded-full"
                          >
                            <span>Trang tiếp </span>
                            <Icon
                              icon="ic:round-navigate-next"
                              fontSize={18}
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ) : (
              // Hiển thị skeleton hoặc thông báo loading
              <>
                <SkeletonOrder />
                <SkeletonOrder />
                <SkeletonOrder />
                <SkeletonOrder />
                <SkeletonOrder />
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
