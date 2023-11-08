import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';

interface VoucherProps {
  vouchers: any;
  handleOpenModal: () => void;
  productPay: Array<any>;
  handleApplyVoucher: (id: number) => void;
}

function Voucher({ vouchers, handleOpenModal, productPay, handleApplyVoucher }: VoucherProps) {
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
            <p
              onClick={() => handleOpenModal()}
              className="col-span-4 me-1 mt-1 hover:cursor-pointer"
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
        {vouchers && countVoucher < vouchers.length
          ? vouchers.slice(countVoucher, countVoucher + 2).map((item: any) => {
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
                          className="bg-blue-500 text-white rounded-lg me-2 text-center leading-[30px]"
                        >
                          Mua thêm
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        {/* footer khuyến mãi */}
        <div className="grid grid-rows-2 p-2 text-left">
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
        </div>
      </div>
    </>
  );
}

export default Voucher;
