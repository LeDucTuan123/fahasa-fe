import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';

interface TableProps {
  orders: any[];
  changeToDetail: (id: number) => void;
  onStatusChange: (orderId: number, statusId: number) => void;
  showPhone?: boolean; // Thêm dòng này
  user?: {
    phone: string; // assuming phone is a string, update the type accordingly
    // other user properties...
  }


}

interface DetailProps {
  changeToTable: () => void;
  order: any;
  products: any[];
  user: any;
  voucher?: any;
  phone?: any;
}

function Table(props: TableProps, details: DetailProps) {

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                Tổng tiền
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
                Ngày mua
              </th>


              <th
                scope="col"
                className="px-6 py-3"
              >
                Chi tiết
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
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {props.orders &&
              props.orders.map((item: any) => {

                return (
                  <tr key={item.id} className="bg-white text-sm border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 max-w-[40px] overflow-hidden overflow-ellipsis">{item.id}</td>
                    <td className="px-6 py-4 max-w-[120px] overflow-hidden overflow-ellipsis">{ConvertToVietNamDong(item.totalamount)}</td>
                    <td className="px-6 py-4 max-w-[140px] overflow-hidden overflow-ellipsis">{item.receiver}</td>
                    <td className="px-6 py-4 max-w-[120px] overflow-hidden overflow-ellipsis">{formatDateToDDMMYYYY(item.orderdate)}</td>

                    <td
                      className="text-[#C92127] hover:cursor-pointer hover:font-semibold text-left px-6 py-4 max-w-[140px]"
                      onClick={() => props.changeToDetail(item.id)}
                    >
                      Xem chi tiết
                    </td>
                    <td className="px-6 py-4 max-w-[100px] overflow-hidden overflow-ellipsis">{item.statuss.statuss}</td>
                    <td className="px-6 py-4 w-28 text-left overflow-hidden overflow-ellipsis ">
                      <select className='text-sm'
                        value={item.statuss.id}
                        onChange={(e) => props.onStatusChange(item.id, parseInt(e.target.value))}
                      >
                        <option value={1}>Đang xử lý</option>
                        <option value={3}>Chưa thanh toán</option>
                        <option value={2}>Đã thanh toán</option>
                        {/* Add more options for other status values */}
                      </select>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
