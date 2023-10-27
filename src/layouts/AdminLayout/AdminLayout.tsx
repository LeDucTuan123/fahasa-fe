import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

export default function AdminLayout() {
  return (
    <div className="p-0 m-0 w-full h-screen">
      <div className="flex flex-row">
        <div className="w-[250px] h-screen bg-slate-500">
          <Sidebar />
        </div>

        <div className="w-full flex flex-1 h-screen bg-red-300">
          <div className="w-full flex flex-col">
            <Header />

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
