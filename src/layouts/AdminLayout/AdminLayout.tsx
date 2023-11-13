import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

export default function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const handleShowSidebar = () => setIsShowSidebar(!isShowSidebar);

  return (
    <div className="p-0 m-0 w-full h-screen">
      <div className="flex flex-row">
        <div className={`${isShowSidebar ? 'w-[250px]' : 'w-[80px]'} duration-300 transform h-screen bg-slate-900 `}>
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
