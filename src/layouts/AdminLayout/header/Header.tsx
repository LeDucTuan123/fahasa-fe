import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setIsLogin } from 'src/redux/slice/authSlice';
import { getUser } from 'src/redux/slice/userSlice';
import { RootState, useAppDispatch } from 'src/redux/store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {
  const dispatch = useAppDispatch();
  const [isShow, setIshow] = useState(true);

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const user: any = useSelector((state: RootState) => state.user.userData);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }
    if (isLogin === true || token) {
      dispatch(getUser());
    }
  }, [dispatch]);
  // const isAdmin = user.authorities[0].authority === 'ADMIN';
  const isAdmin = user && user.authorities && user.authorities[0].authority === 'USER';
  useEffect(() => {
    if (!isAdmin) {
      <Navigate to={'/'} />;
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setIsLogin(false));
    toast.success('Đăng xuất thành công');
    window.location.href = '/';
  };

  return (
    <>
      <div className="bg-[#10163a] p-4 px-8 flex items-center space-x-5 text-gray-200">
        {/* <Link to={'/'}>
          <Icon
            icon="mynaui:home"
            fontSize={40}
          />
        </Link> */}
        <div className="h-10 w-[30%] relative rounded-xl">
          <Icon
            icon={'ion:search'}
            fontSize={32}
            className="absolute top-1/2 -translate-y-1/2 ml-2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="h-full w-full border-none outline-none pl-12 rounded-xl text-black font-medium placeholder:text-gray-400 "
          />
        </div>

        <div className="flex-1 flex justify-end ">
          <div className="space-x-5 flex items-center">
            <div className="cursor-pointer">
              <Icon
                icon={'tabler:message'}
                fontSize={24}
              />
            </div>

            <div className="cursor-pointer">
              <Icon
                icon={'mdi:bell-outline'}
                fontSize={24}
              />
            </div>

            <div
              className=""
              onClick={() => setIshow(!isShow)}
            >
              <div className="flex justify-center items-center gap-2">
                <div className="w-[150px]">
                  <div className="text-end px-2 font-semibold truncate">
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <div className="w-[40px]">
                  <img
                    src="data:image/png;base64,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"
                    alt="account"
                    className="w-full h-full rounded-[50%] object-cover cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {!isShow && (
              <div className="absolute px-2 top-14 right-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 ">
                  <li>
                    <button className="flex items-center gap-3 text-start w-full px-4 py-2 bg-hover_primary hover:text-white">
                      <Icon icon="lucide:layout-dashboard" /> <span>Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 text-start w-full px-4 py-2 bg-hover_primary hover:text-white">
                      <Icon icon="ep:setting" /> <span>Settings</span>
                    </button>
                  </li>
                  <li>
                    <button className="text-start w-full block px-4 py-2 bg-hover_primary hover:text-white">
                      Earnings
                    </button>
                  </li>
                </ul>
                <div className="py-2">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 text-start w-full px-4 py-2 text-sm text-gray-700 bg-hover_primary hover:text-white"
                  >
                    <Icon icon="lets-icons:on-button" /> <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
