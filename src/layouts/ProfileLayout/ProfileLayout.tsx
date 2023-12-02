import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../main/footer';
import Header from '../main/header';
import { Icon } from '@iconify/react';
import { setIsLogin } from 'src/redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function Profilelayout() {
  const dispatch = useAppDispatch();
  const user: any = useSelector((state: RootState) => state.user.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }

    if (!isLogin) {
      navigate('/');
    }
  }, [dispatch, isLogin, user]);

  return (
    <>
      <Header />

      <main className="bg-[#f0f0f0] py-5 block h-screen">
        <div className="lg:container w-full mx-auto flex box-border ">
          <div className="min-w-[250px] shadow-lg border-[#e8e8e8] max-h-[300px] bg-white rounded-md">
            <h1 className="text-center text-xl font-bold uppercase text-[#C92127] py-5">Tài khoản</h1>
            <hr />
            <ul className="divide-y">
              <li className="flex justify-center items-center">
                <NavLink
                  to="/member/profile"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-3 text-[#1435cd] font-semibold w-full'
                      : 'flex items-center px-5 py-3 hover:text-[#1435cd] hover:bg-[#f5f5f5] w-full'
                  }
                >
                  <Icon
                    icon="ri:user-settings-line"
                    className="mr-3"
                  />
                  Thông tin tài khoản
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/member/address"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-3 text-[#1435cd] font-semibold w-full'
                      : 'flex items-center px-5 py-3 hover:text-[#1435cd] hover:bg-[#f5f5f5] w-full'
                  }
                >
                  <Icon
                    icon="mdi:address-marker-outline"
                    className="mr-3"
                  />
                  Sổ địa chỉ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/member/order"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-3 text-[#1435cd] font-semibold w-full'
                      : 'flex items-center px-5 py-3 hover:text-[#1435cd] hover:bg-[#f5f5f5] w-full'
                  }
                >
                  <Icon
                    icon="icon-park-outline:transaction-order"
                    className="mr-3"
                  />
                  Đơn hàng của tôi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/member/myvoucher"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center px-5 py-3 text-[#1435cd] font-semibold w-full'
                      : 'flex items-center px-5 py-3 hover:text-[#1435cd] hover:bg-[#f5f5f5] w-full'
                  }
                >
                  <Icon
                    icon="mdi:voucher-outline"
                    className="mr-3"
                  />
                  Ví voucher
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full ml-3 bg-white rounded-lg">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profilelayout;
