import { Icon } from '@iconify/react';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <div className="space-y-4 h-screen">
        <div className="grid grid-cols-4 gap-4 h-24">
          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-orange-300 rounded-[50%] ml-4">
              <Icon
                icon="mdi:user"
                fontSize={32}
              />
            </span>
            <div>
              <p className="text-gray-500 text-xl">Tổng tài khoảng</p>
              <span>42</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-[50%] ml-4">
              <Icon
                icon="noto-v1:books"
                fontSize={32}
              />
            </span>
            <div>
              <p className="text-gray-500 text-xl">Tổng sản phẩm</p>
              <span>9999</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="relative w-14 h-14 flex items-center justify-center bg-rose-300 rounded-[50%] ml-4">
              <Icon
                icon="clarity:user-line"
                fontSize={32}
              />
              <span className="absolute w-[12px] h-[12px] bg-green-300 border-[2px] border-solid border-amber-300 rounded-[50%] top-[53%] left-[60%]"></span>
            </span>
            <div>
              <p className="text-gray-500 text-xl">Trực tuyến</p>
              <span>123</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
        </div>

        {/* //////////////////////////// */}
        {/* <div className="min-h-[400px] grid grid-rows-10 grid-cols-3 gap-4">
          <div className="row-span-5 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
          <div className="row-span-3 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
          <div className="row-span-5 flex flex-row items-center gap-4 border-[1px] border-solid border-gray-300 rounded-md shadow-md">
            <span className="w-14 h-14 flex items-center justify-center bg-green-400 rounded-[50%] ml-4">
              <Icon
                icon="nimbus:money"
                fontSize={32}
              />
            </span>
            <div className="relative">
              <p className="text-gray-500 text-xl">Tổng doanh thu</p>
              <span>$5000</span>
              <span className="text-green-400 text-sm absolute top-6 pl-1">+300$</span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
