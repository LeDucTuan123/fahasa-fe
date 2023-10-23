import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import { Box, Container } from '@mui/material';
import Footer from './footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-1">
      <Header />

      <main className="flex-grow pt-12">
        <div className=" sticky px-[1/3] min-h-20 py-4 top-0 z-[20] flex w-full items-center justify-between border-gray-500">
          <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
            
            <Outlet />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
