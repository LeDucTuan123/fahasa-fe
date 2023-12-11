import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalVoucher from './ModalVoucher';
import fetch from 'src/services/axios/Axios';
import Voucher from './Voucher';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { BookType } from 'src/types/book';
import { ToolType } from 'src/types/tool';
import { useNavigate } from 'react-router-dom';
import { ConvertToVietNamDong } from 'src/util/SupportFnc';
import { apiPaths } from 'src/services/api/path-api';
import ModalMyVoucher from './ModalMyVoucher';
import { increase } from 'src/redux/slice/countSlice';
import { SkeletonCart } from 'src/components/skeleton';

interface Props {
  product: any;
  setProduct: any;
}

export default function Cart({ product, setProduct }: Props) {
  // const IsmUp = useResponsive('up', 'md');

  const [productPay, setProductPay] = useState<Array<any>>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);

  const [vouchers, setVouchers] = useState([]);
  const [myVouchers, setMyVouchers] = useState([]);

  const [applyVoucher, setApplyVoucher] = useState<any>();
  const [applyMyVoucher, setApplyMyVoucher] = useState<any>();

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  // const u = localStorage.getItem('user');
  // const user = u && JSON.parse(u);
  const cartProduct = localStorage.getItem('cart');
  const user: any = useSelector((state: RootState) => state.user.userData);
  const books = useSelector((state: RootState) => state.book.books);
  const tools = useSelector((state: RootState) => state.tool.tools);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function test() {
      const voucher = await fetch.get('/rest/voucher');
      setVouchers(voucher.data);
      if (isLogin && user.id) {
        const myVoucher = await fetch.get(`${apiPaths.myvoucher}/success/${user.id}`);
        setMyVouchers(myVoucher.data);
        // lấy dữ liệu db đổ lên cart
        const res = await fetch.get(`/rest/order/cart/${user.id}`);
        if (res.data) {
          let orderdetails = res.data.orderdetails;
          let products = orderdetails.map((od: any) => {
            let book = books.find((book: BookType) => {
              return book.orderdetails?.some((item: any) => {
                return item.id === od.id;
              });
            });
            if (book) {
              return { ...book, quantity: od.quantity, odid: od.id };
            }
            let tool = tools.find((tool: ToolType) => {
              return tool.orderdetails?.some((item: any) => {
                return od.id === item.id;
              });
            });
            return { ...tool, quantity: od.quantity, odid: od.id };
          });
          setProduct(products);
        }
      } else {
        // nếu không đăng nhập
        if (cartProduct) {
          setProduct(JSON.parse(cartProduct));
        }
      }
    }
    test();
    // lấy dữ liệu voucher
  }, [books, cartProduct, isLogin, tools, user.id]);

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
  function handleCheckToPay(e: React.ChangeEvent<HTMLInputElement>, id: number, title: string) {
    let checked = e.target.checked;
    if (checked) {
      let p = product?.find((item: any) => {
        return item.id === id && item.title === title;
      });
      setProductPay((prev) => {
        return [...prev, p];
      });
    } else {
      setProductPay((prev) => {
        return prev?.filter((item: any) => {
          return item.title !== title;
        });
      });
    }
  }

  //xóa sản phẩm khỏi giỏ hàng
  function handleDeleteProduct(title: string, id: number) {
    if (isLogin) {
      console.log(typeof id, id);
      fetch
        .delete(`/rest/orderdetail/delete/${id}`)
        .then((res) => {
          dispatch(increase());
          setProduct((prev: any[]) => {
            return prev.filter((item: any) => {
              return item.odid !== id;
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // khi không đăng nhập
      const cartProduct = localStorage.getItem('cart');
      dispatch(increase());
      if (cartProduct) {
        let cart: Array<any> = JSON.parse(cartProduct);
        cart = cart.filter((item: any) => {
          return item.title !== title;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        setProduct(cart);
      }
    }
  }

  // giảm số lượng
  function handleDecreaseQuantity(title: string, odid: number) {
    if (isLogin) {
      // khi đăng nhập
      fetch
        .patch('/rest/orderdetail/updateQuantity', { id: odid, type: 'desc' })
        .then((res) => {
          setProduct((prev: any[]) => {
            return prev.map((item: any) => {
              if (item.odid === res.data.id) {
                return { ...item, quantity: res.data.quantity };
              }
              return item;
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // khi không đăng nhập
      const cartProduct = localStorage.getItem('cart');
      if (cartProduct) {
        let cart: Array<any> = JSON.parse(cartProduct);
        let index: number = cart.findIndex((item) => {
          return item.title === title;
        });
        // số lượng phải lớn hơn 1 mới giảm
        if (cart[index].quantity > 1) {
          cart[index].quantity = cart[index].quantity - 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          setProduct(cart);
        }
      }
    }
  }
  // tăng số lượng
  function handleIncreaseQuantity(title: string, odid: number) {
    if (isLogin) {
      // khi đăng nhập
      fetch
        .patch('/rest/orderdetail/updateQuantity', { id: odid, type: 'asc' })
        .then((res) => {
          setProduct((prev: any[]) => {
            return prev.map((item: any) => {
              if (item.odid === res.data.id) {
                return { ...item, quantity: res.data.quantity };
              }
              return item;
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // khi không đăng nhập
      const cartProduct = localStorage.getItem('cart');
      if (cartProduct) {
        let cart: Array<any> = JSON.parse(cartProduct);
        let index: number = cart.findIndex((item) => {
          return item.title === title;
        });
        cart[index].quantity = cart[index].quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        setProduct(cart);
      }
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleApplyVoucher(id: number) {
    setApplyVoucher(
      vouchers.find((item: any) => {
        console.log('item: ', item);
        return item.id === id;
      }),
    );
    console.log(applyVoucher);
  }

  function handleApplyMyVoucher(id: number) {
    console.log('id: ', id);
    setApplyMyVoucher(
      myVouchers.find((item: any) => {
        console.log('item: ', item);
        return item[0].id === id;
      }),
    );
    console.log(applyMyVoucher);
  }

  function removeApplyVoucher() {
    setApplyVoucher(undefined);
  }

  function handleNavigateToPayment() {
    localStorage.setItem(
      'payment',
      JSON.stringify({
        cart: productPay,
        voucher: applyVoucher && applyVoucher,
        myvoucher: applyMyVoucher && applyMyVoucher[0],
      }),
    );
    navigate('/payment');

    if (isLogin) {
      localStorage.setItem(
        'payment',
        JSON.stringify({ cart: productPay, voucher: applyVoucher, myvoucher: applyMyVoucher }),
      );
      navigate('/payment');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <div>
        <div className="text-left font-normal text-xl p-3">
          GIỎ HÀNG <span className="font-light text-lg">({product && product.length} sản phẩm)</span>
        </div>
        {/* Check box */}
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 rounded-lg mr-2">
            <div className="bg-white col-span-4 grid grid-cols-11 rounded-lg p-1 font-medium mb-3">
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
            <div>
              <div className="bg-white col-span-2 rounded-lg">
                {/* danh sách sản phẩm */}
                <div className="col-span-4 rounded-lg mt-1">
                  {/* sản phẩm trong ds */}
                  {product &&
                    product.map((item: any) => {
                      return (
                        <>
                          {item.id ? (
                            <div>
                              <div
                                key={`${item.title} ${item.id}`}
                                className="col-span-4 grid grid-cols-11 rounded-lg p-1 py-2 border-b-2"
                              >
                                <div className="col-span-1 flex justify-center items-center">
                                  <input
                                    className="h-5 w-5"
                                    type="checkbox"
                                    onChange={(e) => handleCheckToPay(e, item.id, item.title)}
                                    disabled={checkAll}
                                    checked={
                                      productPay &&
                                      productPay.some((i) => {
                                        return item.id === i.id && item.title === i.title;
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-span-5 grid grid-cols-6">
                                  <div className="col-span-2 pe-2">
                                    <img
                                      src={item.images && item.images}
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
                                      onClick={() => handleDecreaseQuantity(item.title, item.odid)}
                                      disabled={productPay && productPay.some((i: any) => i.title === item.title)}
                                      className={
                                        (productPay &&
                                          productPay.some((i: any) => i.title === item.title) &&
                                          'cursor-default') ||
                                        ''
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
                                        width: '45px',
                                        height: '90%',
                                        outline: 'none',
                                        border: 'none',
                                        textAlign: 'center',
                                      }}
                                      readOnly
                                    />
                                    <button
                                      onClick={() => handleIncreaseQuantity(item.title, item.odid)}
                                      disabled={productPay && productPay.some((i: any) => i.title === item.title)}
                                      className={
                                        (productPay &&
                                          productPay.some((i: any) => i.title === item.title) &&
                                          'cursor-default') ||
                                        ''
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
                                  {ConvertToVietNamDong(
                                    (item.price - (item.price * item.discount) / 100) * item.quantity,
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDeleteProduct(item.title, item.odid)}
                                  disabled={productPay && productPay.some((i: any) => i.title === item.title)}
                                  className={
                                    (productPay &&
                                      productPay.some((i: any) => i.title === item.title) &&
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
                            </div>
                          ) : (
                            <>
                              <SkeletonCart />
                            </>
                          )}
                        </>
                      );
                    })}
                  {product && product.length === 0 && (
                    <>
                      <SkeletonCart />
                      <SkeletonCart />
                      <SkeletonCart />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Voucher */}
          <div>
            <div className=" grid grid-rows-2 ms-1 max-h-[700px]">
              <Voucher
                vouchers={vouchers}
                handleOpenModal={handleOpenModal}
                handleOpenMyModal={() => setOpenMyModal(true)}
                productPay={productPay}
                handleApplyVoucher={handleApplyVoucher}
                applyVoucher={applyVoucher}
                removeApplyVoucher={removeApplyVoucher}
              />

              {/* thành tiền */}
              <div className="bg-white mt-9 max-h-48 rounded-lg ">
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
                {applyVoucher && (
                  <div className="grid grid-cols-2 border-b-2 min-h-12">
                    <div className="text-left p-2">
                      Mã giảm {applyVoucher && applyVoucher.valuev / 1000}K - Đơn hàng từ{' '}
                      {applyVoucher && applyVoucher.condition / 1000}K
                    </div>
                    <div className="text-right p-2">{ConvertToVietNamDong(applyVoucher && applyVoucher.valuev)}</div>
                  </div>
                )}

                {applyMyVoucher && (
                  <div className="grid grid-cols-2 border-b-2 min-h-12">
                    <div className="text-left p-2 flex flex-col">
                      <span>Mã giảm {applyMyVoucher && applyMyVoucher[0].valuev / 1000}k</span>
                      <span>Mã code: {applyMyVoucher && applyMyVoucher[0].code}</span>
                    </div>
                    <div className="text-right p-2">
                      {ConvertToVietNamDong(applyMyVoucher && applyMyVoucher[0].valuev)}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-5 min-h-12">
                  <strong className="col-span-3 text-left text-base p-2">Tổng số tiền (gồm VAT)</strong>
                  <strong className="col-span-2 text-right p-2 text-red-700 text-xl">
                    {(productPay && productPay?.length > 0 && applyVoucher) ||
                    (productPay && productPay?.length > 0 && applyMyVoucher) ||
                    (productPay && productPay?.length > 0 && applyVoucher && applyMyVoucher) ? (
                      <>
                        {applyVoucher &&
                          !applyMyVoucher &&
                          ConvertToVietNamDong(
                            productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0) - applyVoucher.valuev,
                          )}

                        {!applyVoucher &&
                          applyMyVoucher &&
                          ConvertToVietNamDong(
                            productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0) - applyMyVoucher[0].valuev,
                          )}

                        {applyVoucher &&
                          applyMyVoucher &&
                          ConvertToVietNamDong(
                            productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0) -
                              applyVoucher.valuev -
                              applyMyVoucher[0].valuev,
                          )}
                      </>
                    ) : (
                      <>
                        {ConvertToVietNamDong(
                          productPay?.reduce((accum, currentValue) => {
                            return (
                              accum +
                              (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                currentValue.quantity
                            );
                          }, 0),
                        )}
                      </>
                    )}
                  </strong>
                </div>
                <div className="grid grid-rows-2 m-2 h-28">
                  {productPay && productPay?.length > 0 ? (
                    <button
                      onClick={() => {
                        handleNavigateToPayment();
                      }}
                      className="bg-red-600 rounded-lg justify-center items-center w-full h-12 text-white font-bold text-2xl  hover:bg-red-500 hover:opacity-100 hover:cursor-pointer"
                    >
                      Thanh toán
                    </button>
                  ) : (
                    <button className="bg-gray-400 rounded-lg justify-center items-center w-full h-12 text-white font-bold text-2xl opacity-50 hover:cursor-no-drop">
                      Thanh toán
                    </button>
                  )}

                  <span className="text-red-600 text-left text-xs pb-2">
                    (Giảm giá trên web chỉ áp dụng cho bán lẻ)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Giỏ */}
      </div>
      <ModalVoucher
        openModal={openModal}
        setCloseModal={handleCloseModal}
        vouchers={vouchers}
        productPay={productPay}
        applyVoucher={applyVoucher}
        handleApplyVoucher={handleApplyVoucher}
        removeApplyVoucher={removeApplyVoucher}
      />
      <ModalMyVoucher
        openMyModal={openMyModal}
        setCloseModal={() => setOpenMyModal(false)}
        myVouchers={myVouchers}
        productPay={productPay}
        applyMyVoucher={applyMyVoucher}
        handleApplyMyVoucher={handleApplyMyVoucher}
        removeApplyMyVoucher={() => setApplyMyVoucher(undefined)}
      />
    </>
  );
}
