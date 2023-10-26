import React from 'react'
import { Outlet } from 'react-router-dom';

export default function SingleLayout() {
  return (
    <>
      <div className="flex flex-col h-1">

        <main className="flex-grow pt-32 ">
          <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
            <Outlet />
          </div>
        </main>

      </div>
    </>
  );
}
