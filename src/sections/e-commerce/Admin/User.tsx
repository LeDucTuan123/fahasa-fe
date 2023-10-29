import React from 'react';

export default function User() {
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
            <td className="px-6 py-4 max-w-[170px]">01234567890</td>
            <td className="px-6 py-4 max-w-[170px]">Sg Ho Chi Minh</td>
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
            <td className="px-6 max-w-[170px] py-4">klkklkl@gmail.com</td>
            <td className="px-6 max-w-[170px] py-4">01234567890</td>
            <td className="px-6 max-w-[170px] py-4">Sg Ho Chi Minh</td>
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
            <td className="px-6 py-4 max-w-[170px]">01234567890</td>
            <td className="px-6 py-4 max-w-[170px]">Sg Ho Chi Minh Sg Ho Chi Minh Sg Ho Chi Minh Sg Ho Chi Minh</td>
            <td className="px-6 py-4 max-w-[170px] text-left">
              <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
