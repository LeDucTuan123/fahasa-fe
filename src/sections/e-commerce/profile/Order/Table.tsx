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
            {loading ? (
              <>
                {props.orders &&
                  props.orders.map((item: any) => {
                    return (
                      <tr
                        key={item.id}
                        className="text-center py-3"
                      >
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

                {props.orders && props.orders.length === 0 && (
                  <>
                    <tr className="text-center py-3 mt-4">
                      <td
                        colSpan={5}
                        className="mt-4 pt-14 pb-2"
                      >
                        Không có đơn hàng nào
                      </td>
                    </tr>
                    <tr className="text-center py-3 mt-4 border-none">
                      <td colSpan={5}>
                        <Link to="/">
                          <button className="bg-orange-400 text-xl w-fit h-8 outline-none rounded-lg px-3 hover:bg-red-500 active:bg-red-800">
                            Đặt hàng ngay
                          </button>
                        </Link>
                      </td>
                    </tr>
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
    </>
  );
}

export default Table;
