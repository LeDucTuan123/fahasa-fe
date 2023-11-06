import { Icon } from '@iconify/react';
import HeadlessTippy from '@tippyjs/react/headless';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from 'src/hooks/useDebounce';
import { setCategory, setIsShowSearch, setTextSearchValue } from 'src/redux/slice/commonSlice';
import { RootState, useAppDispatch } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';

import { SearchDefault, SearchInput } from './SearchList';
import { useNavigate } from 'react-router-dom';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" pb-4 pt-4 p-2 max-h-[min((100vh-60px)-60px,734px)] min-h-[100px] top-0 block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi text-sm shadow-lg font-medium">
      {children}
    </div>
  );
};

export default function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isShowSearch = useSelector((state: RootState) => state.common.isShowSearch);
  const dataBooks = useSelector((state: RootState) => state.book.books);
  const dataTools = useSelector((state: RootState) => state.tool.tools);

  const [searchValue, setsearchValue] = useState('');
  const [cate, setCate] = useState('book');
  const [searchResult, setSearchResult] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceValue = useDebounce(searchValue, 500); //delay 500ms khi gõ tìm kiếm
  const scrollYRef = useRef(0);

  const handleCloseSearch = useCallback(() => {
    if (isShowSearch) {
      dispatch(setIsShowSearch(false));
      // setCate('book');
    }
  }, [dispatch, isShowSearch]);

  //khi nguoi dùng lăng chuột thì sẽ tắt search
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      handleCloseSearch();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      handleCloseSearch();
      window.removeEventListener('scoll', handleScroll);
    };
  }, [handleCloseSearch]);

  /////////////////////////////////////////////
  //fetch data search
  // const fetchData = useCallback(() => {}, [cate, debounceValue]);

  useEffect(() => {
    setLoading(true);
    if (cate === 'book') {
      fetch
        .get(`${apiPaths.book}/search?q=${debounceValue}`)
        .then((res) => {
          setSearchResult(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      fetch
        .get(`${apiPaths.school}/search?q=${debounceValue}`)
        .then((res) => {
          setSearchResult(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [cate, debounceValue]);

  const onChangeSearchValue = (e: any) => {
    setsearchValue(e.target.value);
  };

  const handleOnchangeCategory = (e: any) => {
    setCate(e.target.value);
    dispatch(setCategory(e.target.value));
  };

  const handleCloseSearchInput = () => {
    setsearchValue('');
    // focusInput.current.focus();
  };

  const handleOnKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(setIsShowSearch(false));
      dispatch(setTextSearchValue(debounceValue));
      navigate(`/products/searchengine?q=${debounceValue}`);
    }
  };

  const handleOnClickSearchh = (event: any) => {
    event.preventDefault();
    dispatch(setIsShowSearch(false));
    dispatch(setTextSearchValue(debounceValue));
    navigate(`/products/searchengine?q=${debounceValue}`);
  };

  return (
    // <div className="flex items-center w-full mx-2 border border-[#d3d4d5] rounded-lg bg-white">
    <>
      <HeadlessTippy
        interactive
        // visible={!showResutl && searchResult.length > 0}
        visible={isShowSearch && searchResult.length > 0}
        placement="bottom"
        render={(attrs) => (
          <div
            className="sm:w-[651px] dropdown-cover"
            tabIndex={1}
            {...attrs}
          >
            <Wrapper>
              <>
                {debounceValue ? (
                  <SearchInput searchResult={searchResult} />
                ) : (
                  <SearchDefault data={cate === 'book' ? dataBooks : dataTools} />
                )}
              </>
            </Wrapper>
          </div>
        )}
        onClickOutside={handleCloseSearch}
      >
        <form
          action=""
          className="relative w-full flex-center flex items-center mx-2 border border-[#d3d4d5] rounded-lg bg-white"
        >
          {/* {isShowSearch && ( */}
          <div className="absolute top-0 w-16 h-full">
            <select
              disabled={isShowSearch ? false : true}
              id="countries"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleOnchangeCategory}
            >
              <option value="book">Sách</option>
              <option value="schooltool">Dụng cụ</option>
            </select>
          </div>
          {/* )} */}
          <input
            type="text"
            autoComplete="off"
            placeholder="Tìm kiếm.."
            value={searchValue}
            className={`${
              isShowSearch ? '' : 'text-gray-400'
            } pl-20 px-4 py-1 border-none outline-none w-full bg-transparent`}
            onChange={onChangeSearchValue}
            onClick={() => dispatch(setIsShowSearch(true))}
            onKeyPress={handleOnKeyUp}
          />
          <div
            className="m-1 rounded-full lg:rounded-lg bg-[#c92127] text-white px-2 lg:px-6 lg:py-1 "
            onClick={handleOnClickSearchh}
          >
            <Icon
              icon="tabler:search"
              className="bx bx-search text-sm"
            />
          </div>
          {!!searchValue && !loading && isShowSearch && (
            <Icon
              icon="iconamoon:close-fill"
              fontSize={24}
              className="right-20 absolute top-1 text-gray-600"
              onClick={handleCloseSearchInput}
            />
          )}
          {loading && isShowSearch && (
            <Icon
              icon="ep:loading"
              fontSize={24}
              className="right-20 absolute top-1 text-gray-600 animate-spin"
            />
          )}
        </form>
      </HeadlessTippy>
      {isShowSearch && isShowSearch && (
        <div
          className={`fixed lg:block hidden dropdown-cover h-screen w-screen bg-black opacity-50 top-[86px] right-0 z-10`}
        ></div>
      )}
    </>
    // </div>
  );
}
