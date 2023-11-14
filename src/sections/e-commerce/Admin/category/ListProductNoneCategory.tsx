import React from 'react';
import { BookType } from 'src/types/book';

interface Props {
  dataBook: BookType[];
  onHandleEditing: (item: any) => void;
}

export default function ListProductNoneCategory({ dataBook, onHandleEditing }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Họ
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Tên
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Mật khẩu
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
              Số điện thoại
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Địa chỉ
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
          {dataBook
            .filter((item) => item.cats?.length === 0)
            .map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4 max-w-[170px]">
                  <img
                    src={item.images}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="px-6 py-4 max-w-[170px]">{item.title}</td>
                <td className="px-6 py-4 max-w-[170px]">{item.author}</td>
                <td className="px-6 py-4 max-w-[170px]">{item.price}</td>
                <td className="px-6 py-4 max-w-[170px]">{item.discount}</td>
                <td className="px-6 py-4 max-w-[170px]">{item.description}</td>
                <td className="px-6 py-4 max-w-[170px] text-left">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => onHandleEditing(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
