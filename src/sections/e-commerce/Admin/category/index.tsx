import { useState } from 'react';
import Category from './Category';
import AddCategory from './AddCategory';

export default function Categories() {
  const [showForm, setShowForm] = useState('addCateProduct');

  const handleOnchange = (e: any) => {
    setShowForm(e.target.value);
  };
  return (
    <>
      <div className="text-xl pb-4 font-bold uppercase">Quản lý Thể loại</div>
      <div className="w-full h-auto shadow-md border-[1px] p-5 mb-5 rounded-xl">
        <div className="flex pb-5">
          <button
            id="states-button"
            data-dropdown-toggle="dropdown-states"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            Thể loại{' '}
          </button>

          <label
            htmlFor="states"
            className="sr-only"
          >
            ...
          </label>
          <select
            id="states"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleOnchange}
          >
            <option value="addCateProduct">Thêm thể loại cho sách</option>
            <option value="addNewCategory">Thêm mới thể loại</option>
          </select>
        </div>
      </div>
      {showForm === 'addCateProduct' ? <Category /> : <AddCategory />}
    </>
  );
}
