import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalVoucher from './ModalVoucher';
import fetch from 'src/services/axios/Axios';
import Voucher from './Voucher';

export default function Cart() {
  // const IsmUp = useResponsive('up', 'md');
  const [product, setProduct] = useState<Array<any>>([]);
  const [productPay, setProductPay] = useState<Array<any>>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    // lấy dữ liệu voucher
    fetch('/rest/voucher')
      .then((res) => {
        setVouchers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // nếu không đăng nhập
    const cartProduct = localStorage.getItem('cart');
    if (cartProduct) {
      setProduct(JSON.parse(cartProduct));
    }
  }, []);

  // check tất cả sản phẩm vào mảng thanh toán
  function handleCheckAll(e: React.ChangeEvent<HTMLInputElement>) {
    let checked = e.target.checked;
    if (checked) {
      setCheckAll(checked);
      setProductPay(product);
    } else {
      setCheckAll(checked);
      setProductPay([]);
    }
  }

  // check để thêm sản phẩm vào mảng thanh toán
  function handleCheckToPay(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    let checked = e.target.checked;
    if (checked) {
      let p = product?.find((item: any) => {
        return item.id === id;
      });
      setProductPay((prev) => {
        return [...prev, p];
      });
    } else {
      setProductPay((prev) => {
        return prev?.filter((item: any) => {
          return item.id !== id;
        });
      });
    }
  }

  //xóa sản phẩm khỏi giỏ hàng
  function handleDeleteProduct(id: number) {
    // khi không đăng nhập
    const cartProduct = localStorage.getItem('cart');
    if (cartProduct) {
      let cart: Array<any> = JSON.parse(cartProduct);
      cart = cart.filter((item: any) => {
        return item.id !== id;
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      setProduct(cart);
    }
  }

  // giảm số lượng
  function handleDecreaseQuantity(id: number) {
    // khi không đăng nhập
    const cartProduct = localStorage.getItem('cart');
    if (cartProduct) {
      let cart: Array<any> = JSON.parse(cartProduct);
      let index: number = cart.findIndex((item) => {
        return item.id === id;
      });
      // số lượng phải lớn hơn 1 mới giảm
      if (cart[index].quantity > 1) {
        cart[index].quantity = cart[index].quantity - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        setProduct(cart);
      }
    }
  }
  // tăng số lượng
  function handleIncreaseQuantity(id: number) {
    const cartProduct = localStorage.getItem('cart');
    if (cartProduct) {
      let cart: Array<any> = JSON.parse(cartProduct);
      let index: number = cart.findIndex((item) => {
        return item.id === id;
      });
      cart[index].quantity = cart[index].quantity + 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      setProduct(cart);
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }
  // chuyển đổi thành tiền việt
  function ConvertToVietNamDong(money: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
  }

  function handleApplyVoucher(id: number) {
    console.log(id);
  }

  return (
    <>
      <div>
        <div className="text-left font-normal text-xl p-3">
          GIỎ HÀNG <span className="font-light text-lg">({product && product.length} sản phẩm)</span>
        </div>
        <div className="grid grid-cols-12">
          {/*cụm sản phẩm */}
          <div className="bg-white col-span-8 m-1">
            <div className="col-span-4 grid grid-cols-11 bg-gray-500 rounded-lg p-1">
              <div className="col-span-1 flex justify-center items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={checkAll}
                  onChange={(e) => handleCheckAll(e)}
                />
              </div>
              <div className="col-span-5">Chọn tất cả ({product && product.length} sản phẩm)</div>
              <div className="col-span-2 flex justify-center items-center">Số lượng</div>
              <div className="col-span-2 flex justify-center items-center">Thành tiền</div>
              <div className="col-span-1"></div>
            </div>
            {/* danh sách sản phẩm */}
            <div className="col-span-4 rounded-lg mt-1">
              {/* sản phẩm trong ds */}
              {product &&
                product.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="col-span-4 grid grid-cols-11 bg-gray-50 rounded-lg p-1 border-b-2"
                    >
                      <div className="col-span-1 flex justify-center items-center">
                        <input
                          className="h-5 w-5"
                          type="checkbox"
                          onChange={(e) => handleCheckToPay(e, item.id)}
                          disabled={checkAll}
                          checked={
                            productPay &&
                            productPay.some((i) => {
                              return item.id === i.id;
                            })
                          }
                        />
                      </div>
                      <div className="col-span-5 grid grid-cols-6">
                        <div className="col-span-2 pe-2">
                          <img
                            src={item.images}
                            alt={item.title}
                          />
                        </div>
                        <div className="col-span-4 grid grid-rows-1">
                          <div className=" text-sm m-1">{item.title}</div>
                          {/* <div className=" text-xs text-orange-500 m-1 h-[20px]">
                            Ngày NXB dự kiến phát hành 27/10/2023
                          </div> */}
                          <div className=" grid grid-cols-3 m-1">
                            <strong className="row-span-1 text-[15.5px]">
                              {ConvertToVietNamDong(item.price - (item.price * item.discount) / 100)}
                            </strong>
                            <div className="col-span-1 text-sm text-gray-600 line-through ps-1">
                              {ConvertToVietNamDong(item.price)}
                            </div>
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
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            disabled={productPay && productPay.some((i: any) => i.id === item.id)}
                            className={
                              (productPay && productPay.some((i: any) => i.id === item.id) && 'cursor-default') || ''
                            }
                          >
                            <Icon
                              icon="iconoir:minus"
                              fontSize={16}
                            />
                          </button>

                          <input
                            type="text"
                            value={item.quantity}
                            style={{
                              width: '40px',
                              height: '90%',
                              outline: 'none',
                              border: 'none',
                              textAlign: 'center',
                            }}
                            readOnly
                          />
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            disabled={productPay && productPay.some((i: any) => i.id === item.id)}
                            className={
                              (productPay && productPay.some((i: any) => i.id === item.id) && 'cursor-default') || ''
                            }
                          >
                            <Icon
                              icon="bi:plus"
                              fontSize={16}
                            />
                          </button>
                        </Box>
                      </div>

                      <div className="col-span-2 text-red-800 font-medium flex justify-center items-center">
                        {ConvertToVietNamDong((item.price - (item.price * item.discount) / 100) * item.quantity)}
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        disabled={productPay && productPay.some((i: any) => i.id === item.id)}
                        className={
                          (productPay &&
                            productPay.some((i: any) => i.id === item.id) &&
                            'col-span-1 flex justify-center items-center cursor-default') ||
                          'col-span-1 flex justify-center items-center'
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-span-4 grid grid-rows-2 ms-1">
            <Voucher
              vouchers={vouchers}
              handleOpenModal={handleOpenModal}
              productPay={productPay}
              handleApplyVoucher={handleApplyVoucher}
            />
            {/* thành tiền */}
            <div className="bg-gray-100 mt-2 max-h-48 rounded-lg">
              <div className="grid grid-cols-2 border-b-2 max-h-12">
                <div className="text-left p-2">Thành tiền</div>
                <div className="text-right p-2">
                  {productPay &&
                    productPay?.length > 0 &&
                    ConvertToVietNamDong(
                      productPay?.reduce((accum, currentValue) => {
                        return (
                          accum +
                          (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                            currentValue.quantity
                        );
                      }, 0),
                    )}
                </div>
              </div>
              <div className="grid grid-cols-5 max-h-12">
                <strong className="col-span-3 text-left text-base p-2">Tổng số tiền (gồm VAT)</strong>
                <strong className="col-span-2 text-right p-2 text-red-700 text-xl">
                  {productPay &&
                    productPay?.length > 0 &&
                    ConvertToVietNamDong(
                      productPay?.reduce((accum, currentValue) => {
                        return (
                          accum +
                          (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                            currentValue.quantity
                        );
                      }, 0),
                    )}
                </strong>
              </div>
              <div className="grid grid-rows-2 m-2 h-28">
                {productPay && productPay?.length > 0 ? (
                  <button className="bg-red-500 justify-center items-center w-full h-12 text-white font-bold text-2xl opacity-50 hover:bg-red-500 hover:opacity-100 hover:cursor-pointer">
                    Thanh toán
                  </button>
                ) : (
                  <button className="bg-gray-400 justify-center items-center w-full h-12 text-white font-bold text-2xl opacity-50 hover:cursor-no-drop">
                    Thanh toán
                  </button>
                )}

                <span className="text-red-600 text-left text-xs pb-2">(Giảm giá trên web chỉ áp dụng cho bán lẻ)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalVoucher
        openModal={openModal}
        setOpenModal={handleCloseModal}
        vouchers={vouchers}
        productPay={productPay}
        handleApplyVoucher={handleApplyVoucher}
      />
    </>
  );
}
