import React from 'react';
import Header from '../main/header';
import { Outlet } from 'react-router-dom';

export default function SpinLuckyLayout() {
  return (
    <>
      <div className="relative">
        <div className="absolute w-full bg-slate-50 z-[9999]">
          <Header />
        </div>
        <div className="absolute top-0 h-screen w-full overflow-y-hidden bg-gray-400 bg-lucky">
          <Outlet />
        </div>
      </div>
    </>
  );
}
