import { Icon } from '@iconify/react';
import { Box, colors } from '@mui/material';
import React, { useState } from 'react';
import useResponsive from 'src/hooks/useResponsive';

export default function Cart() {
  const IsmUp = useResponsive('up', 'md');

  const [counter, setCounter] = useState(1);

  return (
    <>
      <div>
        <div className="text-left font-normal text-xl p-3">
          GIỎ HÀNG <span className="font-light text-lg">(1 sản phẩm)</span>
        </div>
        <div className="grid grid-cols-12">
          {/*cụm sản phẩm */}
          <div className="bg-white col-span-8 m-1">
            <div className="col-span-4 grid grid-cols-11 bg-gray-500 rounded-lg p-1">
              <div className="col-span-1 flex justify-center items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                />
              </div>
              <div className="col-span-5">Chọn tất cả (2 sản phẩm)</div>
              <div className="col-span-2 flex justify-center items-center">Số lượng</div>
              <div className="col-span-2 flex justify-center items-center">Thành tiền</div>
              <div className="col-span-1"></div>
            </div>
            {/* danh sách sản phẩm */}
            <div className="col-span-4 rounded-lg mt-1">
              {/* sản phẩm trong ds */}
              <div className="col-span-4 grid grid-cols-11 bg-gray-50 rounded-lg p-1 border-b-2">
                <div className="col-span-1 flex justify-center items-center">
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                  />
                </div>
                <div className="col-span-5 grid grid-cols-6">
                  <div className="col-span-2 pe-2">
                    <img
                      src="https://cdn0.fahasa.com/media/catalog/product//h/a/haikyu_-premium-boxset-01_boxset_qua-tang.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-span-4 grid grid-rows-1">
                    <div className=" text-sm m-1">
                      Premium Boxset Haikyu!! - Tập: 1 - 15 (Bộ 15 Cuốn) - Tặng Kèm Bìa Áo Hiệu Ứng UV + Bìa Áo Hiệu Ứng
                      Metalize
                    </div>
                    <div className=" text-xs text-orange-500 m-1 h-[20px]">Ngày NXB dự kiến phát hành 27/10/2023</div>
                    <div className=" grid grid-cols-3 m-1">
                      <strong className="row-span-1 text-[15.5px]">570.000 đ</strong>
                      <div className="col-span-1 text-sm text-gray-600 line-through ps-1">600.000 đ</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Box
                    sx={{
                      display: 'flex',
                      height: '25px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #3333',
                      borderRadius: '5px',
                      px: 2,
                    }}
                  >
                    <Icon
                      icon="iconoir:minus"
                      fontSize={16}
                      onClick={() => counter !== 1 && setCounter(counter - 1)}
                      style={{ cursor: 'pointer' }}
                    />

                    <input
                      type="text"
                      value={counter}
                      style={{
                        width: '16px',
                        height: '90%',
                        outline: 'none',
                        border: 'none',
                        textAlign: 'center',
                      }}
                    />

                    <Icon
                      icon="bi:plus"
                      fontSize={16}
                      onClick={() => setCounter(counter + 1)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </div>

                <div className="col-span-2 text-red-800 font-medium flex justify-center items-center">570.000 đ</div>

                <div className="col-span-1 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
              </div>
              {/* sản phẩm trong ds */}
              <div className="col-span-4 grid grid-cols-11 bg-gray-50 rounded-lg p-1 border-b-2">
                <div className="col-span-1 flex justify-center items-center">
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                  />
                </div>
                <div className="col-span-5 grid grid-cols-6">
                  <div className="col-span-2 pe-2">
                    <img
                      src="https://cdn0.fahasa.com/media/catalog/product//h/a/haikyu_-premium-boxset-01_boxset_qua-tang.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-span-4 grid grid-rows-1">
                    <div className=" text-sm m-1">
                      Premium Boxset Haikyu!! - Tập: 1 - 15 (Bộ 15 Cuốn) - Tặng Kèm Bìa Áo Hiệu Ứng UV + Bìa Áo Hiệu Ứng
                      Metalize
                    </div>
                    <div className=" text-xs text-orange-500 m-1 h-[20px]">Ngày NXB dự kiến phát hành 27/10/2023</div>
                    <div className=" grid grid-cols-3 m-1">
                      <strong className="row-span-1 text-[15.5px]">570.000 đ</strong>
                      <div className="col-span-1 text-sm text-gray-600 line-through ps-1">600.000 đ</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Box
                    sx={{
                      display: 'flex',
                      height: '25px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #3333',
                      borderRadius: '5px',
                      px: 2,
                    }}
                  >
                    <Icon
                      icon="iconoir:minus"
                      fontSize={16}
                      onClick={() => counter !== 1 && setCounter(counter - 1)}
                      style={{ cursor: 'pointer' }}
                    />

                    <input
                      type="text"
                      value={counter}
                      style={{
                        width: '16px',
                        height: '90%',
                        outline: 'none',
                        border: 'none',
                        textAlign: 'center',
                      }}
                    />

                    <Icon
                      icon="bi:plus"
                      fontSize={16}
                      onClick={() => setCounter(counter + 1)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </div>

                <div className="col-span-2 text-red-800 font-medium flex justify-center items-center">570.000 đ</div>

                <div className="col-span-1 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
              </div>
              {/* sản phẩm trong ds */}
              <div className="col-span-4 grid grid-cols-11 bg-gray-50 rounded-lg p-1 border-b-2">
                <div className="col-span-1 flex justify-center items-center">
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                  />
                </div>
                <div className="col-span-5 grid grid-cols-6">
                  <div className="col-span-2 pe-2">
                    <img
                      src="https://cdn0.fahasa.com/media/catalog/product//h/a/haikyu_-premium-boxset-01_boxset_qua-tang.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-span-4 grid grid-rows-1">
                    <div className=" text-sm m-1">
                      Premium Boxset Haikyu!! - Tập: 1 - 15 (Bộ 15 Cuốn) - Tặng Kèm Bìa Áo Hiệu Ứng UV + Bìa Áo Hiệu Ứng
                      Metalize
                    </div>
                    <div className=" text-xs text-orange-500 m-1 h-[20px]">Ngày NXB dự kiến phát hành 27/10/2023</div>
                    <div className=" grid grid-cols-3 m-1">
                      <strong className="row-span-1 text-[15.5px]">570.000 đ</strong>
                      <div className="col-span-1 text-sm text-gray-600 line-through ps-1">600.000 đ</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Box
                    sx={{
                      display: 'flex',
                      height: '25px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #3333',
                      borderRadius: '5px',
                      px: 2,
                    }}
                  >
                    <Icon
                      icon="iconoir:minus"
                      fontSize={16}
                      onClick={() => counter !== 1 && setCounter(counter - 1)}
                      style={{ cursor: 'pointer' }}
                    />

                    <input
                      type="text"
                      value={counter}
                      style={{
                        width: '16px',
                        height: '90%',
                        outline: 'none',
                        border: 'none',
                        textAlign: 'center',
                      }}
                    />

                    <Icon
                      icon="bi:plus"
                      fontSize={16}
                      onClick={() => setCounter(counter + 1)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </div>

                <div className="col-span-2 text-red-800 font-medium flex justify-center items-center">570.000 đ</div>

                <div className="col-span-1 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
              </div>
              {/* sản phẩm trong ds */}
              <div className="col-span-4 grid grid-cols-11 bg-gray-50 rounded-lg p-1 border-b-2">
                <div className="col-span-1 flex justify-center items-center">
                  <input
                    className="h-5 w-5"
                    type="checkbox"
                  />
                </div>
                <div className="col-span-5 grid grid-cols-6">
                  <div className="col-span-2 pe-2">
                    <img
                      src="https://cdn0.fahasa.com/media/catalog/product//h/a/haikyu_-premium-boxset-01_boxset_qua-tang.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-span-4 grid grid-rows-1">
                    <div className=" text-sm m-1">
                      Premium Boxset Haikyu!! - Tập: 1 - 15 (Bộ 15 Cuốn) - Tặng Kèm Bìa Áo Hiệu Ứng UV + Bìa Áo Hiệu Ứng
                      Metalize
                    </div>
                    <div className=" text-xs text-orange-500 m-1 h-[20px]">Ngày NXB dự kiến phát hành 27/10/2023</div>
                    <div className=" grid grid-cols-3 m-1">
                      <strong className="row-span-1 text-[15.5px]">570.000 đ</strong>
                      <div className="col-span-1 text-sm text-gray-600 line-through ps-1">600.000 đ</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Box
                    sx={{
                      display: 'flex',
                      height: '25px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #3333',
                      borderRadius: '5px',
                      px: 2,
                    }}
                  >
                    <Icon
                      icon="iconoir:minus"
                      fontSize={16}
                      onClick={() => counter !== 1 && setCounter(counter - 1)}
                      style={{ cursor: 'pointer' }}
                    />

                    <input
                      type="text"
                      value={counter}
                      style={{
                        width: '16px',
                        height: '90%',
                        outline: 'none',
                        border: 'none',
                        textAlign: 'center',
                      }}
                    />

                    <Icon
                      icon="bi:plus"
                      fontSize={16}
                      onClick={() => setCounter(counter + 1)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </div>

                <div className="col-span-2 text-red-800 font-medium flex justify-center items-center">570.000 đ</div>

                <div className="col-span-1 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 grid grid-rows-2 ms-1">
            {/* Cụm mã giảm giá */}
            <div className="grid grid-rows-1 bg-gray-100 rounded-lg pt-2">
              {/* Khuyến mãi */}
              <div className="grid grid-cols-2  p-2 text-blue-600 border-b-2 h-12">
                <div className="cols-span-1 grid grid-cols-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="2em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64v64c0 8.8-7.4 15.7-15.7 18.6C541.5 217.1 528 235 528 256s13.5 38.9 32.3 45.4c8.3 2.9 15.7 9.8 15.7 18.6v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320c0-8.8 7.4-15.7 15.7-18.6C34.5 294.9 48 277 48 256s-13.5-38.9-32.3-45.4C7.4 207.7 0 200.8 0 192V128z" />
                  </svg>
                  <p className="col-span-4 ms-2 mt-1">Khuyến mãi</p>
                </div>
                <div className="text-right col-span-1 grid grid-cols-5">
                  <p className="col-span-4 me-1 mt-1">Xem thêm</p>
                  <svg
                    className="mt-2"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </div>
              </div>
              {/* mã giảm giá */}
              <div className="border-b-2 ">
                <div className="grid grid-rows-1 ms-2 mb-2">
                  <div className="grid grid-rows-2">
                    <div className="grid grid-cols-5">
                      <h2 className="col-span-4 font-semibold">MÃ GIẢM 30K - ĐƠN HÀNG TỪ 270K</h2>
                      <a
                        className="underline text-blue-600 text-sm text-right m-auto"
                        href="#"
                      >
                        Chi tiết
                      </a>
                    </div>
                    <div className="font-extralight text-sm mt-1">ÁP DỤNG THỨ 2 ĐẾN THỨ 4 HÀNG TUẦN</div>
                  </div>
                  <div className="grid grid-cols-3 mt-5">
                    <div className="col-span-2 grid grid-rows-2">
                      {/* <div className="h-[5px] w-56 bg-gradient-to-r from-blue-500 to-blue-900 animate-pulse"></div>*/}
                      <div className="h-[5px] w-56 bg-gradient-to-r from-blue-200 to-blue-900 animate-progress active"></div>
                      <div className="grid grid-cols-3">
                        <p className="col-span-2 text-[10px]">Mua thêm 270.000đ để nhận mã</p>
                        <p className="text-[10px]">270.000 đ</p>
                      </div>
                    </div>
                    <button className="bg-blue-500 text-white rounded-lg me-2">Mua thêm</button>
                  </div>
                </div>
              </div>
              {/* mã giảm giá */}
              <div className="border-b-2">
                <div className="grid grid-rows-2 ms-2 mb-2">
                  <div className="grid grid-rows-2">
                    <div className="grid grid-cols-5">
                      <h2 className="col-span-4 font-semibold">MÃ GIẢM 30K - ĐƠN HÀNG TỪ 270K</h2>
                      <a
                        className="underline text-blue-600 text-sm text-right m-auto"
                        href="#"
                      >
                        Chi tiết
                      </a>
                    </div>
                    <div className="font-extralight text-sm mt-1">ÁP DỤNG THỨ 2 ĐẾN THỨ 4 HÀNG TUẦN</div>
                  </div>
                  <div className="grid grid-cols-3 mt-5">
                    <div className="col-span-2 grid grid-rows-2">
                      {/* <div className="h-[5px] w-56 bg-gradient-to-r from-blue-500 to-blue-900 animate-pulse"></div>*/}
                      <div className="h-[5px] w-56 bg-gradient-to-r from-blue-200 to-blue-900 animate-progress active"></div>
                      <div className="grid grid-cols-3">
                        <p className="col-span-2 text-[10px]">Mua thêm 270.000đ để nhận mã</p>
                        <p className="text-[10px]">270.000 đ</p>
                      </div>
                    </div>
                    <button className="bg-blue-500 text-white rounded-lg me-2">Mua thêm</button>
                  </div>
                </div>
              </div>
              {/* footer khuyến mãi */}
              <div className="grid grid-rows-2 p-2 text-left">
                <button className="grid grid-cols-5 row-span-2 h-10 bg-blue-300 text-blue-900 font-medium text-sm text-left ps-1 rounded-lg">
                  <div className="col-span-4 grid grid-cols-3 m-[10px]">
                    <p className="col-span-2">1 khuyến mãi đủ điều kiện</p>
                    <svg
                      className="col-span-1 mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                  </div>

                  <div className="col-span-1 p-3 flex justify-end items-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 320 512"
                    >
                      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  </div>
                </button>
                <span className="row-span-1 text-xs m-1">Có thể áp dụng nhiều mã</span>
              </div>
            </div>
            {/* thành tiền */}
            <div className="bg-gray-100 mt-2 max-h-48 rounded-lg">
              <div className="grid grid-cols-2 border-b-2 max-h-12">
                <div className="text-left p-2">Thành tiền</div>
                <div className="text-right p-2">0 đ</div>
              </div>
              <div className="grid grid-cols-5 max-h-12">
                <strong className="col-span-3 text-left text-base p-2">Tổng số tiền (gồm VAT)</strong>
                <strong className="col-span-2 text-right p-2 text-red-700 text-xl">0 đ</strong>
              </div>
              <div className="grid grid-rows-2 m-2 h-28">
                <button className="bg-gray-400 justify-center items-center w-full h-12 text-white font-bold text-2xl opacity-50 hover:bg-red-500 hover:opacity-100 hover:cursor-no-drop">
                  Thanh toán
                </button>
                <span className="text-red-600 text-left text-xs pb-2">(Giảm giá trên web chỉ áp dụng cho bán lẻ)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
