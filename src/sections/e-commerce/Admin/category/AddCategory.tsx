import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { CategoryType } from 'src/types';

export default function AddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);

  const [categories, setCategories] = useState<CategoryType[]>([]); // Dữ liệu thể loại từ API
  const [selectedCategory1, setSelectedCategory1] = useState<number | string>('1'); // Thể loại cấp 1 được chọn
  const [selectedCategory2, setSelectedCategory2] = useState<number | string>(''); // Thể loại cấp 2 được chọn

  useEffect(() => {
    const fetchCategories = async () => {
      // Gọi API để lấy dữ liệu thể loại
      const res = await fetch.get(apiPaths.category);
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const handleCategory1Change = (e: any) => {
    const category1 = e.target.value;
    setSelectedCategory1(category1);
    setSelectedCategory2(''); // Đặt thể loại cấp 2 về giá trị mặc định khi thể loại cấp 1 thay đổi
    // setSelectedCategory3(''); // Đặt thể loại cấp 3 về giá trị mặc định khi thể loại cấp 1 thay đổi
  };

  const handleCategory2Change = (e: any) => {
    const category2 = e.target.value;
    setSelectedCategory2(category2);
    // setSelectedCategory3(''); // Đặt thể loại cấp 3 về giá trị mặc định khi thể loại cấp 2 thay đổi
  };

  return (
    <>
      <div className="space-y-4">
        <div className="w-full h-auto shadow-xl p-5 border-[1px] rounded-xl">
          <div className="flex relative pb-5">
            <div className="w-full">
              <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full col-span-2 mb-6 group">
                  <div className="flex pb-5">
                    <button
                      id="states-button"
                      data-dropdown-toggle="dropdown-states"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      type="button"
                    >
                      Thể loại 1{' '}
                    </button>

                    <select
                      id="states"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // onChange={handleOnchange}
                      value={selectedCategory1}
                      onChange={handleCategory1Change}
                      //   onChange={(event: any) => setValueCateLv1(event.target.value)}
                    >
                      {categories
                        .filter((lv) => lv.level === 1)
                        .map((item) => (
                          <>
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.categoryname}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                </div>
                {/* ssccsadsadsdsdsadsadsdsdsdsdsds        sdsds d sd sd sds */}
                <div className="relative z-0 w-full col-span-2 mb-6 group">
                  <div className="flex pb-5">
                    <button
                      id="states-button"
                      data-dropdown-toggle="dropdown-states"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      type="button"
                    >
                      Thể loại 2{' '}
                    </button>

                    <select
                      id="states"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // onChange={handleOnchange}
                      value={`${selectedCategory2}`}
                      onChange={handleCategory2Change}
                    >
                      {categories
                        // .slice(25, categories.length)
                        // eslint-disable-next-line array-callback-return
                        .filter((lv) => {
                          if (selectedCategory1 === '1') {
                            return lv.level === 2 && lv.parent.id === 1;
                          }
                          if (selectedCategory1 === '2') {
                            return lv.level === 2 && lv.parent.id === 2;
                          }
                          if (selectedCategory1 === '3') {
                            return lv.level === 2 && lv.parent.id === 3;
                          }
                        })
                        .map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.categoryname}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="relative col-span-1 z-0 w-full mb-6 group">
                  <button
                    id="dropdownSearchButton"
                    data-dropdown-toggle="dropdownSearch"
                    className="w-[241px] justify-between inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Thể loại 3{' '}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {/* <!-- Dropdown menu --> */}
                  <div
                    id="dropdownSearch"
                    className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
                  >
                    <div className="p-3">
                      <label
                        htmlFor="input-group-search"
                        className="sr-only"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="input-group-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search user"
                        />
                      </div>
                    </div>
                    <ul
                      className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownSearchButton"
                    >
                      {categories
                        // .slice(25, categories.length)
                        .filter(
                          (lv: any) =>
                            lv.level === 3 &&
                            lv.parent.level === 2 &&
                            lv.parent.id === Number(selectedCategory2) &&
                            lv.parent.parent.level === 1 &&
                            lv.parent.parent.id === Number(selectedCategory1),
                        )
                        .map((item) => {
                          console.log(selectedCategory2);
                          return (
                            <li
                              key={item.id}
                              className="flex justify-between"
                            >
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <label
                                  htmlFor={`checkbox-item-${item.id}`}
                                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  {item.categoryname}
                                </label>
                                {/* <span>x</span> */}
                              </div>
                            </li>
                          );
                        })}
                    </ul>

                    {/* <a
                  href="#"
                  className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                  </svg>
                  Delete user
                </a> */}
                  </div>
                </div>
                <div className="relative flex flex-col justify-between ml-10 col-span-2 z-0 w-full mb-6 group">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_discount"
                      id="floating_discount"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_discount"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Tên thể loại
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      // type="submit"
                      className={
                        isShowEdit
                          ? 'bg-orange-300 text-white  hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                          : ' bg-green-400 text-white  hover:bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-[96px] sm:w-auto px-5 py-2.5 text-center'
                      }
                    >
                      {isLoading ? (
                        <Icon
                          icon={'mingcute:loading-fill'}
                          fontSize={24}
                          className="animate-spin"
                        />
                      ) : isShowEdit ? (
                        'Sửa'
                      ) : (
                        'Tạo mới'
                      )}
                    </button>
                    {isShowEdit ? (
                      <button
                        type="submit"
                        className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
                        // onClick={() => setIsShowEdit(false)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        >
                          Xóa
                        </button>
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        >
                          Reset
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
