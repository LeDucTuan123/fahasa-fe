import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface VoucherProps {
  vouchers: any;
  handleOpenModal: () => void;
  productPay: Array<any>;
  handleApplyVoucher: (id: number) => void;
  applyVoucher: any;
  removeApplyVoucher: () => void;
  handleOpenMyModal: () => void;
}

function Voucher({
  vouchers,
  handleOpenModal,
  productPay,
  handleApplyVoucher,
  applyVoucher,
  removeApplyVoucher,
  handleOpenMyModal,
}: VoucherProps) {
  const [countVoucher, setCountVoucher] = useState(0);

  useEffect(() => {
    let sum = productPay?.reduce((accum, currentValue) => {
      return accum + (currentValue.price - (currentValue.price * currentValue.discount) / 100) * currentValue.quantity;
    }, 0);
    let index = vouchers.findIndex((item: any) => {
      return item.condition > sum;
    });
    setCountVoucher(index === -1 ? vouchers.length : index);
  }, [productPay, vouchers]);

  function ConvertToVietNamDong(money: number) {
    if (money < 0) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0);
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
  }
  return (
    <>
      {/* Cụm mã giảm giá */}
      <div className="grid grid-rows-1 bg-white rounded-lg">
        {/* Khuyến mãi */}
        <div className="grid grid-cols-2  p-2 text-blue-600 border-b-2 h-12">
          <div className="cols-span-1 grid grid-cols-5">
            <Icon
              icon="heroicons-outline:ticket"
              fontSize={30}
            />
            <p className="col-span-4 ms-2 mt-1 uppercase font-medium">Khuyến mãi</p>
          </div>
          <div className="text-right col-span-1 grid grid-cols-5 ml-7">
            <p
              onClick={() => handleOpenModal()}
              className="col-span-4 me-1 mt-1 hover:cursor-pointer font-medium"
            >
              Xem thêm
            </p>
            <svg
              className="mt-2 hover:cursor-pointer"
              onClick={() => handleOpenModal()}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </div>
        </div>
        {/* mã giảm giá */}
        <div className="pt-14">
          {vouchers && countVoucher < vouchers.length
            ? vouchers.slice(countVoucher, countVoucher + 2).map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="border-b-2"
                  >
                    <div className="grid grid-rows-1 ms-2 mb-2">
                      <div className="grid grid-rows-2">
                        <div className="grid grid-cols-5">
                          <h2 className="col-span-4 font-semibold">
                            MÃ GIẢM {item.valuev / 1000}K - ĐƠN HÀNG TỪ {item.condition / 1000}K
                          </h2>
                        </div>
                        <div className="font-extralight text-sm mt-1">Số lượng: {item.quantity}</div>
                      </div>
                      <div className="grid grid-cols-3 mt-5">
                        <div className="col-span-2 grid grid-rows-2">
                          {/* <div className="h-[5px] w-56 bg-gradient-to-r from-blue-500 to-blue-900 animate-pulse"></div>*/}
                          <ProgressBar
                            totalMoney={item.condition}
                            currentMoney={productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0)}
                          />
                          <div className="grid grid-cols-3">
                            <p className="col-span-2 text-[10px]">
                              Mua thêm{' '}
                              {ConvertToVietNamDong(
                                item.condition -
                                  productPay?.reduce((accum, currentValue) => {
                                    return (
                                      accum +
                                      (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                        currentValue.quantity
                                    );
                                  }, 0),
                              )}{' '}
                              để nhận mã
                            </p>
                            <p className="text-[10px]">{ConvertToVietNamDong(item.condition)}</p>
                          </div>
                        </div>
                        {applyVoucher && applyVoucher.id === item.id ? (
                          <button
                            onClick={() => removeApplyVoucher()}
                            className="text-blue-500 border-2 border-blue-500 border-solid rounded hover:bg-blue-500 hover:text-white"
                          >
                            Bỏ chọn
                          </button>
                        ) : (
                          <>
                            {item.condition -
                              productPay?.reduce((accum, currentValue) => {
                                return (
                                  accum +
                                  (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                    currentValue.quantity
                                );
                              }, 0) <
                            0 ? (
                              <button
                                onClick={() => handleApplyVoucher(item.id)}
                                className="bg-blue-500 text-white rounded-lg me-2"
                              >
                                Áp dụng
                              </button>
                            ) : (
                              <Link
                                to={'/'}
                                className="bg-blue-500 text-white rounded-lg me-2 leading-[30px] text-center"
                              >
                                Mua thêm
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : vouchers.slice(vouchers.length - 2).map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="border-b-2 "
                  >
                    <div className="grid grid-rows-1 ms-2 mb-2">
                      <div className="grid grid-rows-2">
                        <div className="grid grid-cols-5">
                          <h2 className="col-span-4 font-semibold">
                            MÃ GIẢM {item.valuev / 1000}K - ĐƠN HÀNG TỪ {item.condition / 1000}K
                          </h2>
                        </div>
                        <div className="font-extralight text-sm mt-1">Số lượng: {item.quantity}</div>
                      </div>
                      <div className="grid grid-cols-3 mt-5">
                        <div className="col-span-2 grid grid-rows-2">
                          {/* <div className="h-[5px] w-56 bg-gradient-to-r from-blue-500 to-blue-900 animate-pulse"></div>*/}
                          <ProgressBar
                            totalMoney={item.condition}
                            currentMoney={productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0)}
                          />
                          <div className="grid grid-cols-3">
                            <p className="col-span-2 text-[10px]">
                              Mua thêm{' '}
                              {ConvertToVietNamDong(
                                item.condition -
                                  productPay?.reduce((accum, currentValue) => {
                                    return (
                                      accum +
                                      (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                        currentValue.quantity
                                    );
                                  }, 0),
                              )}{' '}
                              để nhận mã
                            </p>
                            <p className="text-[10px]">{ConvertToVietNamDong(item.condition)}</p>
                          </div>
                        </div>
                        {applyVoucher && applyVoucher.id === item.id ? (
                          <button
                            onClick={() => removeApplyVoucher()}
                            className="text-blue-500 border-2 border-blue-500 border-solid rounded hover:bg-blue-500 hover:text-white"
                          >
                            Bỏ chọn
                          </button>
                        ) : (
                          <>
                            {item.condition -
                              productPay?.reduce((accum, currentValue) => {
                                return (
                                  accum +
                                  (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                    currentValue.quantity
                                );
                              }, 0) <
                            0 ? (
                              <button
                                onClick={() => handleApplyVoucher(item.id)}
                                className="bg-blue-500 text-white rounded-lg me-2"
                              >
                                Áp dụng
                              </button>
                            ) : (
                              <Link
                                to={'/'}
                                className="bg-blue-500 text-white rounded-lg me-2 leading-[30px] text-center"
                              >
                                Mua thêm
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* footer khuyến mãi */}
        <div className="grid grid-rows-2 p-2 text-left gap-2 shadow-sm">
          <button
            onClick={() => handleOpenModal()}
            className="grid grid-cols-5 row-span-2 h-10 bg-blue-300 text-blue-900 font-medium text-sm text-left ps-1 rounded-lg"
          >
            <div className="col-span-4 grid grid-cols-3 m-[10px]">
              <p className="col-span-2">{countVoucher} khuyến mãi đủ điều kiện</p>
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

          <button
            onClick={() => handleOpenMyModal()}
            className="grid grid-cols-5 row-span-2 h-10 bg-blue-300 text-blue-900 font-medium text-sm text-left ps-1 rounded-lg"
          >
            <div className="col-span-4 grid grid-cols-3 m-[10px]">
              <p className="col-span-2">Sử dụng voucher của tôi</p>
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
        </div>
      </div>
    </>
  );
}

export default Voucher;
