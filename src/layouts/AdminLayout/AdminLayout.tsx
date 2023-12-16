import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import { useSelector } from 'react-redux';
import { setIsLogin } from 'src/redux/slice/authSlice';
import { getUser } from 'src/redux/slice/userSlice';
import { RootState, useAppDispatch } from 'src/redux/store';
import { toast } from 'react-toastify';

export default function AdminLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const handleShowSidebar = () => setIsShowSidebar(!isShowSidebar);

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const user: any = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }
    if (isLogin === true || token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin || (user && user.authorities && user.authorities[0].authority === 'USER')) {
      navigate('/error');
    }
  }, [user]);

  return (
    <div className="p-0 m-0 w-full h-screen">
      <div className="flex flex-row">
        <div className={`${isShowSidebar ? 'w-[250px]' : 'w-[80px]'} duration-300 transform h-screen bg-[#10163a] `}>
          <Sidebar
            isShowSidebar={isShowSidebar}
            onHandleShowSidebar={handleShowSidebar}
          />
        </div>

        <div className="w-full flex flex-1 h-screen ">
          <div className="w-full flex flex-col">
            <Header />

            <div className="p-5 h-screen overflow-y-scroll ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
