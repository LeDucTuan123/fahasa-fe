import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export default function Suggest() {
  const [value, setValue] = useState('book');
  const [more, setMore] = useState(10);

  const books = useSelector((state: RootState) => state.book.books);
  const tools = useSelector((state: RootState) => state.tool.tools);

  useEffect(() => {
    setMore(10);
  }, [value]);

  return (
    <>
      <div className="absolute w-full">
        <div className=" flex h-10 bg-slate-200 items-center justify-center">
          <span className="font-serif text-2xl">Gợi ý</span>
        </div>
        <div className="flex bg-slate-50 w-full h-10 border-[1px] border-solid cursor-pointer">
          <div
            className={`${
              value === 'book' && 'bg-gray-400 text-slate-50'
            } flex w-[50%] h-full items-center justify-center p-2 hover:bg-gray-400 border-r-[1px] border-solid duration-300`}
            onClick={() => setValue('book')}
          >
            Sách
          </div>
          <div
            className={`${
              value === 'tool' && 'bg-gray-400 text-slate-50'
            } flex w-[50%] h-full items-center justify-center p-2 hover:bg-gray-400 duration-300 `}
            onClick={() => setValue('tool')}
          >
            Dụng cụ
          </div>
        </div>
      </div>

      <div className="w-full h-screen overflow-y-scroll pt-20">
        <div className="grid grid-cols-2 ">
          {value === 'book'
            ? books.slice(0, more).map((item) => (
                <div
                  key={item.id}
                  className="w-full h-64 border-[1px] border-solid hover:shadow-2xl cursor-pointer"
                >
                  <div className="w-full h-40 p-2">
                    <img
                      src={item.images}
                      alt=""
                      className="w-full h-full object-cover "
                    />
                    <p className="text-sm font-sans overflow-hidden text-ellipsis line-clamp-2 pt-2">{item.title}</p>
                    <p className="text-sm pt-1">
                      <span className="font-bold">Tác giả</span> <span className="text-[13px]">{item.author}</span>
                    </p>
                  </div>
                </div>
              ))
            : tools.slice(0, more).map((item) => (
                <div
                  key={item.id}
                  className="w-full h-64 border-[1px] border-solid hover:shadow-2xl cursor-pointer"
                >
                  <div className="w-full h-40 p-2">
                    <img
                      src={item.images}
                      alt=""
                      className="w-full h-full object-cover "
                    />
                    <p className="text-sm font-sans overflow-hidden text-ellipsis line-clamp-2 pt-2">{item.title}</p>
                    <p className="text-sm pt-1">
                      <span className="font-bold">Thương hiệu</span> <span className="text-[13px]">{item.brand}</span>
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <div
          className="w-full text-center p-3 pb-5 text-red-400 underline hover:text-red-500 cursor-pointer active:text-red-800"
          onClick={() => setMore((prev) => prev + 10)}
        >
          Xem thêm
        </div>
      </div>
    </>
  );
}
