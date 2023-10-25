import { Icon } from '@iconify/react';

interface DetailProps {
  changeToTable: () => void;
}

function Detail(props: DetailProps) {
  return (
    <>
      <div
        className="inline-flex items-center hover:cursor-pointer hover:font-bold"
        onClick={() => props.changeToTable()}
      >
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          className="text-[#2489F4]"
        />
        <span className="text-[#2489F4]  inline-block">Quay lại</span>
      </div>
      <div className="p-5 shadow-lg w-full">
        <h1 className="font-bold text-[#C92127]">Chi tiết đơn hàng</h1>
        <table className="table-auto border-collapse border-spacing-3 w-full mt-5">
          <thead>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </thead>
          <tbody className="divide-y">
            <tr className="text-center">
              <td className="flex">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="h-[100px] m-auto"
                  alt="img"
                />
              </td>
              <td>Thẻ bài mèo cảm tử mở rộng</td>
              <td>124.700đ</td>
              <td>1</td>
              <td>124.700đ</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-5">
          <div>
            <h1 className="font-bold text-[#C92127]">Thông tin người nhận</h1>
            <ul>
              <li className="mt-3">
                Người nhận: <span className="font-bold">Phạm Duy Phương</span>
              </li>
              <li className="mt-3">
                Địa chỉ: <span className="font-bold">Địa chỉ</span>
              </li>
              <li className="mt-3">
                Số điện thoại: <span className="font-bold">09868798797</span>
              </li>
            </ul>
          </div>

          <ul className="text-end">
            <li>
              Thành tiền: <span className="font-bold">124.700đ</span>
            </li>
            <li className="mt-3">
              Phí vận chuyển: <span className="font-bold">25.000đ</span>
            </li>
            <li className="mt-3">
              Chiết khấu: <span className="font-bold">-20.000đ</span>
            </li>
            <li className="mt-3">
              Tổng tiền (gồm VAT): <span className="font-bold">129.700đ</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Detail;
