import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

export default function AdminLayout() {
  return (
    <div className="p-0 m-0 w-full h-screen">
      <div className="flex flex-row">
        <div className="w-[250px] h-screen bg-slate-900 ">
          <Sidebar />
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
