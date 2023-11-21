import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'src/components/Link';

import { RootState, useAppDispatch } from 'src/redux/store';

import Pagination, { resetPagination } from 'src/Pagination';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';
import Filter from './Filter'; // Hãy đảm bảo rằng bạn đã import thành phần Filter đúng cách



export default function Products() {
  const [searchResult, setSearchResult] = useState<BookType[]>([]);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [selectedPriceRange, setSelectedPriceRange] = useState('0-150000000');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9999); // Tổng số sản phẩm cần hiển thị

  const dispatch = useAppDispatch();
  const cate = useSelector((state: RootState) => state.common.category);
  const searchInputText = useSelector((state: RootState) => state.common.textSearchValue);
  const level = useSelector((state: RootState) => state.common.catelvId);
  const id = useSelector((state: RootState) => state.common.id);
  const parencate = useSelector((state: RootState) => state.common.parenCategory);

  const [categoryResult, setCategoryResult] = useState<BookType[]>([]);

  const handlePriceFilter = (priceRange: string) => {
    setSelectedPriceRange(priceRange);
  };

  const emptyCartImageUrl = 'http://www.muctamloc.com/assets/images/empty_cart.png';

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const handleDisplayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPostsPerPage = e.target.value === 'all' ? 999999 : Number(e.target.value);
    setPostsPerPage(newPostsPerPage);

    if (e.target.value === 'all') {
      setCurrentPage(1);
    } else {
      const newTotalPages = Math.ceil(categoryResult.length / newPostsPerPage);
      setCurrentPage(currentPage > newTotalPages ? newTotalPages : currentPage);
    }
  };


  const fetchApiSearch = useCallback(async () => {
    if (searchInputText) {
      try {
        const apiUrl = cate === 'book' ? `${apiPaths.book}/search?q=${searchInputText}` : `${apiPaths.school}/search?q=${searchInputText}`;
        const res = await fetch.get(apiUrl);
        setCategoryResult(res.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  }, [cate, searchInputText]);

  useEffect(() => {
    fetchApiSearch();
  }, [fetchApiSearch, selectedPriceRange]);

  // Lọc kết quả tìm kiếm dựa trên phạm vi giá được chọn
  const filteredResults = selectedPriceRange
    ? categoryResult.filter((item) => {
      const [minPrice, maxPrice] = selectedPriceRange.split('-');
      const itemPrice = item.price - (item.price * item.discount) / 100;
      return itemPrice >= parseFloat(minPrice) && itemPrice <= parseFloat(maxPrice);
    })
    : categoryResult;

  useEffect(() => {
    // Move the fetching logic inside the useEffect with proper dependencies
    const fetchData = async () => {
      try {
        if (id === 1 || id === 2) {
          const res = await fetch.get(`http://localhost:8080/rest/book/cate/${id}`);
          setCategoryResult(res.data);
        } else if (id === 3) {
          const res = await fetch.get(`http://localhost:8080/rest/schooltool`);
          setCategoryResult(res.data);
        } else if (level === 2 && (parencate === 'Sách trong nước' || parencate === 'Sách nước ngoài')) {
          const res = await fetch.get(`http://localhost:8080/rest/book/cate2/${id}`);
          setCategoryResult(res.data);
        } else if (level === 2 && parencate === 'Dụng cụ học sinh') {
          const res = await fetch.get(`http://localhost:8080/rest/schooltool/cate2/${id}`);
          setCategoryResult(res.data);
        } else if (level === 3 && (parencate === 'Sách trong nước' || parencate === 'Sách nước ngoài')) {
          const res = await fetch.get(`http://localhost:8080/rest/book/cate3/${id}`);
          setCategoryResult(res.data);
        } else if (level === 3 && parencate === 'Dụng cụ học sinh') {
          const res = await fetch.get(`http://localhost:8080/rest/schooltool/cate3/${id}`);
          setCategoryResult(res.data);
        }
      } catch (error) {
        console.error('Error fetching category results:', error);
        // Handle errors if needed
      }
    };

    fetchData();
  }, [id, level, parencate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const sortedCategoryResult = [...filteredResults];
    if (sortCriteria === 'high-to-low') {
      sortedCategoryResult.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === 'low-to-high') {
      sortedCategoryResult.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'a-to-z') {
      sortedCategoryResult.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === 'z-to-a') {
      sortedCategoryResult.sort((a, b) => b.title.localeCompare(a.title));
    }

    const newLastPostIndex = currentPage * postsPerPage;
    const newFirstPostIndex = newLastPostIndex - postsPerPage;
    setSearchResult(sortedCategoryResult.slice(newFirstPostIndex, newLastPostIndex));
  }, [sortCriteria, postsPerPage, currentPage, categoryResult, filteredResults]);

  const pages = Math.ceil(filteredResults.length / postsPerPage);

  useEffect(() => {
    // Gọi hàm reset khi totalPosts thay đổi và currentPage nằm ngoài khoảng trang có sẵn
    if (currentPage > pages && currentPage <= filteredResults.length) {
      resetPagination(); // Chuyển resetPagination vào đây nếu muốn gọi reset chỉ khi điều kiện đúng
      setCurrentPage(pages);
    }

    // Nếu muốn reset trang mỗi khi totalPosts thay đổi
    // resetPagination(); // Chuyển resetPagination vào đây nếu muốn gọi reset mỗi khi totalPosts thay đổi
  }, [filteredResults.length, currentPage, pages, setCurrentPage, resetPagination]);



  return (
    <div className="grid grid-cols-4">
      <div>
        {' '}
        <Filter
          handlePriceFilter={handlePriceFilter}
          selectedPriceRange={selectedPriceRange}
        />
      </div>

      <div className="col-span-3">
        <div>
          <div className="columns-2">
            <img
              alt=""
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/SaiGonbookT1023_Social_1080x1080.png"
            />
            <img
              alt=""
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/NCC1980BooksT1023_Gold_BannerSocial_1080x1080.png"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 m-3">
          <div>Sắp xếp theo: </div>
          <div className="flex justify-end">
            <select
              name="sort"
              className="w-64 ps-2"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="default">Mặc định</option>
              <option value="high-to-low">Giá (Cao đến thấp)</option>
              <option value="low-to-high">Giá (Thấp đến cao)</option>
              <option value="a-to-z">Tên (Từ a - z)</option>
              <option value="z-to-a">Tên (Từ z - a)</option>
            </select>
            <select
              name="display-quantity" // Thêm một tên cho phần tử select
              className="w-64 ms-3 ps-2"
              value={postsPerPage} // Đặt giá trị đã chọn
              onChange={handleDisplayChange} // Xử lý sự kiện thay đổi
            >
              <option value="all">Tất cả</option>
              <option value={128}>128 sản phẩm</option>
              <option value={64}>64 sản phẩm</option>
              <option value={24}>24 sản phẩm</option>
              <option value={12}>12 sản phẩm</option>
              <option value={4}>4 sản phẩm</option>
            </select>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
          {searchResult.length === 0 ? (
            <div className="text-center">
              <img
                src={emptyCartImageUrl}
                alt="Empty Cart"
              />
              <p className="m-1">Không có sản phẩm</p>
            </div>
          ) : (
            searchResult.map((item: BookType) => (
              <div
                key={item.id}
                className="p-5 border-[1px] border-gray-300 shadow-md rounded-md relative"
              >
                <Link to={`/detailproduct/${item.id}`}>
                  <img
                    src={item.images}
                    alt={'img'}
                    className="w-full max-h-[190px] object-cover"
                  />
                </Link>
                <div className="pt-2 ">
                  <p className="text-sm line-clamp-2 h-[40px]">{item.title}</p>
                  <p className="text-lg font-semibold text-[#C92127] mt-2">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      item.price - (item.price * item.discount) / 100,
                    )}
                  </p>
                  <p className="text-sm text-[#888888] line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                  </p>
                  <span className="absolute right-1 top-2 first-letter bg-[#F7941E] text-white font-semibold px-1 py-2 rounded-full">
                    {item.discount}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='mt-3 flex flex-wrap justify-center'>
          <Pagination
            totalPosts={filteredResults.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            resetPagination={() => setCurrentPage(1)}
          />
        </div>
      </div>
    </div>
  );
}
