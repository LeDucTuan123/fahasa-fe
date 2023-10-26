interface TableProps {
  changeToDetail: () => void;
}

function Table(props: TableProps) {
  return (
    <>
      <div className="p-5 shadow-lg w-full">
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
            <tr className="text-center py-3">
              <td>1</td>
              <td>26-10-2019</td>
              <td>Phạm Duy Phương</td>
              <td>129.000đ</td>
              <td>Hoàn tất</td>
              <td
                className="text-[#C92127] hover:cursor-pointer hover:font-semibold"
                onClick={() => props.changeToDetail()}
              >
                Xem chi tiết
              </td>
            </tr>
            <tr className="text-center">
              <td>1</td>
              <td>26-10-2019</td>
              <td>Phạm Duy Phương</td>
              <td>129.000đ</td>
              <td>Hoàn tất</td>
              <td className="text-[#C92127] hover:cursor-pointer">Xem chi tiết</td>
            </tr>
            <tr className="text-center">
              <td>1</td>
              <td>26-10-2019</td>
              <td>Phạm Duy Phương</td>
              <td>129.000đ</td>
              <td>Hoàn tất</td>
              <td className="text-[#C92127] hover:cursor-pointer">Xem chi tiết</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
