import React from 'react';
import { Link } from 'src/components/Link';
import { setIsShowSearch } from 'src/redux/slice/commonSlice';
import { useAppDispatch } from 'src/redux/store';
import { BookType } from 'src/types/book';
import { ToolType } from 'src/types/tool';

interface Props {
  data?: BookType[] | ToolType[] | undefined;
  searchResult?: BookType[] | undefined;
}

export function SearchDefault({ data }: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="text-xl font-bold">Từ khóa hot</p>
      <div className="w-full h-auto">
        <div className="grid grid-cols-3 w-full gap-4 ">
          {data &&
            data.slice(0, 6).map((item) => (
              <Link
                to={`/detailproduct/${item.id}`}
                className="max-w-[200px] p-2 max-h-[70px] flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100"
                key={item.id}
                onClick={() => dispatch(setIsShowSearch(false))}
              >
                <img
                  className="object-cover w-14 rounded-t-lg h-14 md:h-auto "
                  src={item.images}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <p className="text-sm line-clamp-2 pt-5 font-bold tracking-tight text-gray-900 ">{item.title}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}</p>
                </div>
              </Link>
            ))}
        </div>
        <p className="text-xl font-bold py-2">Danh mục nổi bậc</p>

        <div className="flex flex-row w-full gap-4 ">
          {data &&
            data.slice(10, 14).map((item) => (
              <Link
                to={`/detailproduct/${item.id}`}
                className="w-full p-2  flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100"
                key={item.id}
                onClick={() => dispatch(setIsShowSearch(false))}
              >
                <img
                  className="object-cover w-full rounded-t-lg h-20"
                  src={item.images}
                  alt=""
                />
                <p className="pt-1 text-sm text-ellipsis overflow-hidden h-[84px] line-clamp-4 w-full">{item.title}</p>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export const SearchInput = ({ searchResult }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="text-xl font-bold pb-3">Sản phẩm</p>
      <div className="w-full h-auto">
        <div className="grid grid-cols-3 w-full gap-4 ">
          {searchResult &&
            searchResult.slice(0, 6).map((item) => (
              <Link
                to={`/detailproduct/${item.id}`}
                className="max-w-[200px] p-2 max-h-[70px] flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100"
                key={item.id}
                onClick={() => dispatch(setIsShowSearch(false))}
              >
                <img
                  className="object-cover w-14 rounded-t-lg h-14 md:h-auto "
                  src={item.images}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <p className="text-sm line-clamp-2 pt-5 font-bold tracking-tight text-gray-900 ">{item.title}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
