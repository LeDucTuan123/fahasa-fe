import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'src/components/Link';
import search from 'src/layouts/main/header/search';
import { RootState } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';

export default function Products() {
  const [searchResult, setSearchResult] = useState<BookType[]>([]);

  const cate = useSelector((state: RootState) => state.common.category);
  const searchInputText = useSelector((state: RootState) => state.common.textSearchValue);
  const level = useSelector((state: RootState) => state.common.catelvId);
  const id = useSelector((state: RootState) => state.common.id);
  const parencate = useSelector((state: RootState) => state.common.parenCategory);

  useEffect(() => {
    if (id === 1 || id === 2) {
      fetch.get(`http://localhost:8080/rest/book/cate/${id}`).then((res) => setSearchResult(res.data));
    } else if (id === 3) {
      fetch.get(`http://localhost:8080/rest/schooltool`).then((res) => setSearchResult(res.data));
    }
    if (level === 2 && (parencate === 'Sách trong nước' || parencate === 'Sách nước ngoài')) {
      fetch.get(`http://localhost:8080/rest/book/cate2/${id}`).then((res) => setSearchResult(res.data));
    } else if (level === 2 && parencate === 'Dụng cụ học sinh') {
      fetch.get(`http://localhost:8080/rest/schooltool/cate2/${id}`).then((res) => setSearchResult(res.data));
    } else if (level === 3 && (parencate === 'Sách trong nước' || parencate === 'Sách nước ngoài')) {
      fetch.get(`http://localhost:8080/rest/book/cate3/${id}`).then((res) => setSearchResult(res.data));
    } else if (level === 3 && parencate === 'Dụng cụ học sinh') {
      fetch.get(`http://localhost:8080/rest/schooltool/cate3/${id}`).then((res) => setSearchResult(res.data));
    }
  }, [id, level, parencate]);

  useEffect(() => {
    if (cate === 'book') {
      fetch
        .get(`${apiPaths.book}/search?q=${searchInputText}`)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      fetch
        .get(`${apiPaths.school}/search?q=${searchInputText}`)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [cate, searchInputText]);

  console.log(searchResult);

  return (
    <div>
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
      <div>
        <div>Sắp xếp theo</div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
        {searchResult.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
