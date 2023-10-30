import React from 'react';

export default function ListTools() {
  return (
    <>
      <p className="text-2xl">Danh sách dụng cụ</p>
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
                Tên dụng cụ
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Thương hiệu
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Hình ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Giá
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Giảm giá
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Loại dụng cụ
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                123abc
              </th>
              <td className="px-6 py-4 max-w-[170px]">Nguyen Van</td>
              <td className="px-6 py-4 max-w-[170px]">An</td>
              <td className="px-6 py-4 max-w-[170px]">123456</td>
              <td className="px-6 py-4 max-w-[170px]">klkklkl@gmail.com</td>
              <td className="px-6 py-4 max-w-[170px]">klkklkl@gmail.com</td>
              <td className="px-6 py-4 max-w-[170px]">01234567890</td>
              <td className="px-6 py-4 max-w-[170px] text-left">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                123abc
              </th>
              <td className="px-6 max-w-[170px] py-4">Nguyen Van</td>
              <td className="px-6 max-w-[170px] py-4">An</td>
              <td className="px-6 max-w-[170px] py-4">123456</td>
              <td className="px-6 py-4 max-w-[170px]">klkklkl@gmail.com</td>
              <td className="px-6 max-w-[170px] py-4">klkklkl@gmail.com</td>
              <td className="px-6 max-w-[170px] py-4">01234567890</td>
              <td className="px-6 max-w-[170px] py-4 text-left">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                123abc
              </th>
              <td className="px-6 py-4 max-w-[170px]">Nguyen Van</td>
              <td className="px-6 py-4 max-w-[170px]">An</td>
              <td className="px-6 py-4 max-w-[170px]">123456</td>
              <td className="px-6 py-4 max-w-[170px]">klkklkl@gmail.com</td>
              <td className="px-6 py-4 max-w-[170px]">klkklkl@gmail.com</td>
              <td className="px-6 py-4 max-w-[170px]">01234567890</td>
              <td className="px-6 py-4 max-w-[170px] text-left">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
