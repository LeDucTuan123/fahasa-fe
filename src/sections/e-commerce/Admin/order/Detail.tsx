import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { ConvertToVietNamDong, formatDateTime } from 'src/util/SupportFnc';

interface DetailProps {
  changeToTable: () => void;
  order: any;
  products: any[];
  user: any;
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  voucher?: any;
  phone?: any;
}

function Detail(props: DetailProps) {
  const user: any = useSelector((state: RootState) => state.user.userData);
  const address: any =
    user.listAddress &&
    user.listAddress.find((item: any) => {
      return item.orders.some((item: any) => {
        return item.id === props.order.id;
      });
    });

  return (
    <>
      <div
        className="inline-flex items-center hover:cursor-pointer hover:font-bold rounded-lg"
        onClick={() => props.changeToTable()}
      >
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          className="text-[#2489F4]"
        />
        <span className="text-[#2489F4]  inline-block">Quay lại</span>
      </div>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="font-bold text-[#C92127] pb-4">Chi tiết đơn hàng</h1>
        <span className="uppercase font-bold mt-4">Đơn hàng: {props.order.codeorder}</span>
        <table className="table-auto border-collapse border-spacing-3 w-full mt-5">
          <thead>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </thead>
          <tbody className="divide-y">
            {props.products &&
              props.products.map((item: any) => {
                return (
                  <tr className="text-center">
                    <td className="flex">
                      <img
                        src={item[0].images}
                        className="h-[100px] m-auto"
                        alt={item[0].title}
                      />
                    </td>
                    <td>{item[0].title}</td>
                    <td>{ConvertToVietNamDong(item[0].price - (item[0].price * item[0].discount) / 100)}</td>
                    <td>{item[1]}</td>
                    <td>{ConvertToVietNamDong(item[2])}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-between mt-5">
          <div>
            <h1 className="font-bold text-[#C92127]">Thông tin người nhận</h1>
            <ul>
              <li className="mt-3">
                Người nhận: <span className="font-bold">{props.order.receiver}</span>
              </li>
              <li className="mt-3">
                Địa chỉ:{' '}
                <span className="font-bold">
                  {address && address.address + ', ' + address.ward + ', ' + address.district + ', ' + address.city}
                </span>
              </li>
              <li className="mt-3">
                Số điện thoại: <span className="font-bold">{props.user.phone}</span>
              </li>
              <li className="mt-3">
                Ngày mua: <span className="font-bold">{formatDateTime(props.order.orderdate)}</span>
              </li>
            </ul>
          </div>

          <ul className="text-end">
            <li>
              Thành tiền:{' '}
              <span className="font-bold">
                {ConvertToVietNamDong(
                  props.products.reduce((accum: number, item: any) => {
                    return accum + item[1] * (item[0].price - (item[0].price * item[0].discount) / 100);
                  }, 0),
                )}
              </span>
            </li>
            <li className="mt-3">
              Phí vận chuyển: <span className="font-bold">{ConvertToVietNamDong(props.order.ship)}</span>
            </li>
            {props.order.totalamount -
              props.order.ship -
              props.products.reduce((accum: number, item: any) => {
                return accum + item[1] * (item[0].price - (item[0].price * item[0].discount) / 100);
              }, 0) <
              0 && (
              <li className="mt-3">
                Voucher:{' '}
                <span className="font-bold">
                  {ConvertToVietNamDong(
                    props.order.totalamount -
                      props.order.ship -
                      props.products.reduce((accum: number, item: any) => {
                        return accum + item[1] * (item[0].price - (item[0].price * item[0].discount) / 100);
                      }, 0),
                  )}
                </span>
              </li>
            )}

            <li className="mt-3">
              Tổng tiền (gồm VAT): <span className="font-bold">{ConvertToVietNamDong(props.order.totalamount)}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Detail;
