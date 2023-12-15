import React from 'react';
import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { VoucherType } from 'src/types/voucher';

interface Props {
  onHandleEditVoucher: (item: VoucherType) => void;
  fetchDataVoucher: VoucherType[];
  setFetchDataVoucher: React.Dispatch<React.SetStateAction<VoucherType[]>>;
}

export default function ListVoucher({ onHandleEditVoucher, fetchDataVoucher, setFetchDataVoucher }: Props) {
  const handleDeleteVoucher = async (item: VoucherType) => {
    try {
      await fetch.delete(`${apiPaths.voucher}/${item.id}`);

      const filteredPosts = fetchDataVoucher.filter((b: VoucherType) => b.id !== item.id);

      toast.success('Xóa thành công');
      return setFetchDataVoucher(filteredPosts);
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };
  return (
    <>
      <p className="text-2xl font-bold py-4">Danh sách</p>
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
                Mã Voucher
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Ngày hết hạn
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Giá trị
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Số lượng
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Kích hoạt
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tình trạng
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
            {fetchDataVoucher.length > 0 &&
              fetchDataVoucher.map((item: VoucherType) => (
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
                  <td className="px-6 py-4 max-w-[170px]">{item.code}</td>
                  <td className="px-6 py-4 max-w-[170px] overflow-hidden text-ellipsis line-clamp-5">{item.expdate}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.valuev}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.quantity}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.active === true ? 'true' : 'false'}</td>
                  <td className="px-6 py-4 max-w-[170px] overflow-hidden text-ellipsis line-clamp-5">
                    {item.condition}
                  </td>
                  <td className="px-6 py-4 max-w-[170px] text-left ">
                    <div className="w-full flex gap-3">
                      <button
                        className="bg-orange-300 text-white hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => onHandleEditVoucher(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        onClick={() => handleDeleteVoucher(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
