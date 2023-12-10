import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Cart from './Cart';
import logo from 'src/assets/image/logozoroCart.svg';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const countCart: any = useSelector((state: RootState) => state.count.count);

  console.log('countCart: ', countCart);
  return (
    <>
      {countCart !== 0 ? (
        <Cart />
      ) : (
        <>
          <div className="py-3">
            <p className="text-xl">Giỏ hàng{`(${countCart} sản phẩm)`} </p>
          </div>
          <div className="w-full h-80 bg-white rounded-lg ">
            <div className="flex flex-col w-full h-full justify-center items-center space-y-3">
              <img
                src={logo}
                alt="cart logo"
                className="w-50 object-cover"
              />
              <p className="text-sm">Chưa có sản phẩm trong giỏ hàng của bạn.</p>
              <button className="bg-orange-500 px-5 py-2 w-fit rounded-md border-none">Mua sắm ngay</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
