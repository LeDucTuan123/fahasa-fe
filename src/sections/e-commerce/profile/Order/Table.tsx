import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';

interface TableProps {
  orders: any[];
  changeToDetail: (id: number) => void;
}

function Table(props: TableProps) {
  return (
    <>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="uppercase font-bold text-[#C92127]">Đơn hàng của tôi</h1>
        <table className="table-auto border-collapse border-spacing-3 w-full mt-5">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Người nhận</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {props.orders &&
              props.orders.map((item: any) => {
                return (
                  <tr className="text-center py-3">
                    <td>{item.id}</td>
                    <td>{formatDateToDDMMYYYY(item.orderdate)}</td>
                    <td>{item.receiver}</td>
                    <td>{ConvertToVietNamDong(item.totalamount)}</td>
                    <td>{item.statuss.statuss}</td>
                    <td
                      className="text-[#C92127] hover:cursor-pointer hover:font-semibold"
                      onClick={() => props.changeToDetail(item.id)}
                    >
                      Xem chi tiết
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
