import React, { useCallback, useEffect, useState } from 'react';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { CategoryType } from 'src/types';
import ListProductNoneCategory from './ListProductNoneCategory';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getBook } from 'src/redux/slice/bookSlice';
import { toast } from 'react-toastify';

const dataCate = {
  id: '',
  title: '',
};

export default function Category() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<CategoryType[]>([]); // Dữ liệu thể loại từ API
  const [formCate, setFormCate] = useState(dataCate);
  const [selectedCategory1, setSelectedCategory1] = useState<number | string>('1'); // Thể loại cấp 1 được chọn
  const [selectedCategory2, setSelectedCategory2] = useState<number | string>(''); // Thể loại cấp 2 được chọn
  // const [selectedCategory3, setSelectedCategory3] = useState<number | string>(''); // Thể loại cấp 3 được chọn
  const [checkedItems, setCheckedItems] = useState<any>([]);

  const dataBook = useSelector((state: RootState) => state.book.books);

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  const handleCheckboxChange = (id: number) => {
    // Kiểm tra xem giá trị đã tồn tại trong mảng hay chưa
    // const isChecked = checkedItems.includes({ id: item.id });

    const isIdSelected = checkedItems.some((item: any) => item.id === id);

    //kiem tra id co ton tai hay chua
    if (isIdSelected) {
      const updatedItems = checkedItems.filter((item: any) => item.id !== id);
      setCheckedItems(updatedItems);
    } else {
      // Nếu id chưa tồn tại, thêm nó vào mảng
      const selectedItem: any = categories.find((item) => item.id === id);
      setCheckedItems([...checkedItems, { id: selectedItem.id }]);
    }
  };
  // console.log(checkedItems.map((item: any) => item));

  const handleAddCategoryProduct = () => {
    try {
      if (!formCate.id) return toast.error('Vui lòng thêm ID sản phẩm');
      for (let i = 0; i < checkedItems.length; i++) {
        fetch({
          method: 'POST',
          url: 'http://localhost:8080/rest/cat',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            category: { id: checkedItems[i].id },
            book: { id: formCate.id },
          }),
        }).then(() => {});
      }
      toast.success('Thêm thể loại thành công');
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại');
    }
  };

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
    setCheckedItems([]);
  };

  const handleCategory2Change = (e: any) => {
    const category2 = e.target.value;
    setSelectedCategory2(category2);
    setCheckedItems([]);
    // setSelectedCategory3(''); // Đặt thể loại cấp 3 về giá trị mặc định khi thể loại cấp 2 thay đổi
  };

  const handleEditing = (e: any) => {
    setFormCate({
      id: e.id,
      title: e.title,
    });
  };

  const handleResetCategory = () => {
    setCheckedItems([]);
  };
  // const handleUpdateCategoryBook = () => {}

  console.log(selectedCategory2);
  return (
    <div className="space-y-4">
      <div className="w-full h-auto shadow-md p-5 border-[1px] rounded-xl">
        <div className="flex relative pb-5">
          <div className="w-full">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formCate.id}
                  onChange={(event: any) => setFormCate((prev) => ({ ...prev, id: event.target.value }))}
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Id
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formCate.title}
                  onChange={(event) => setFormCate((prev) => ({ ...prev, title: event.target.value }))}
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên sách
                </label>
              </div>

              {/* ssccsadsadsdsdsadsadsdsdsdsdsds        sdsds d sd sd sds */}
              <div className="relative z-0 w-full mb-6 group">
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
                      .filter((lv) => lv.level === 1 && lv.id !== 3)
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
              <div className="relative z-0 w-full mb-6 group">
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
              <div className="relative z-0 w-full mb-6 group">
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
                          <li key={item.id}>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={`checkbox-item-${item.id}`}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                // value={item.id}
                                // checked={checkedItems.includes(item.id)}
                                checked={checkedItems.some((selectedItem: any) => selectedItem.id === item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                              />
                              <label
                                htmlFor={`checkbox-item-${item.id}`}
                                className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                              >
                                {item.categoryname}
                              </label>
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
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddCategoryProduct}
              >
                thêm thể loại
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Xóa
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sửa
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleResetCategory}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <ListProductNoneCategory
        dataBook={dataBook}
        onHandleEditing={handleEditing}
      />
    </div>
  );
}
