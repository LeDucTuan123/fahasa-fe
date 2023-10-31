import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 max-h-[min((100vh-60px)-60px,734px)] min-h-[100px] top-0 block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi text-sm shadow-lg font-medium">
      {children}
    </div>
  );
};

export default function Search() {
  const [searchValue, setsearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResutl, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const dataHot = useSelector((state: RootState) => state.book.books);

  return (
    // <div className="flex items-center w-full mx-2 border border-[#d3d4d5] rounded-lg bg-white">
    <HeadlessTippy
      interactive
      // visible={!showResutl && searchResult.length > 0}
      visible={true}
      placement="bottom"
      render={(attrs) => (
        <div
          className="sm:w-[651px]"
          tabIndex={1}
          {...attrs}
        >
          <Wrapper>
            <p className="text-xl font-bold">Từ khóa hot</p>
            <div className="w-full h-auto">
              <div className="grid grid-cols-3 w-full gap-4 ">
                {dataHot.slice(0, 6).map((data) => (
                  <a
                    href="#"
                    className="max-w-[200px] flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100"
                  >
                    <img
                      className="object-cover w-14 rounded-t-lg h-14 md:h-auto "
                      src={data.images}
                      alt=""
                    />
                    <div className="flex flex-col truncate justify-between p-4 leading-normal">
                      <p className="mb-2 text-sm  font-bold tracking-tight text-gray-900 ">{data.title}</p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
                        order.
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Wrapper>
        </div>
      )}
    >
      <form
        action=""
        className="relative w-full flex-center flex items-center mx-2 border border-[#d3d4d5] rounded-lg bg-white"
      >
        <input
          type="search"
          autoComplete="off"
          placeholder="Tìm kiếm.."
          className="px-4 py-1 border-none outline-none w-full bg-transparent"
        />
        <div className="m-1 rounded-full lg:rounded-lg bg-[#c92127] text-white px-2 lg:px-6 lg:py-1 ">
          <Icon
            icon="tabler:search"
            className="bx bx-search text-sm"
          />
        </div>
      </form>
    </HeadlessTippy>
    // </div>
  );
}
