import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getTools } from 'src/redux/slice/ToolSlice';
import { getBook } from 'src/redux/slice/bookSlice';
import { useAppDispatch } from 'src/redux/store';
import Footer from './footer';
import Header from './header';
import Rightbar from './rightbar';

import SpinLucky from './spinlucky';

import { SupportEngine } from 'src/sections/e-commerce/BoxChat/supportEngine';


export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBook());
    dispatch(getTools());
  }, [dispatch]);

  return (
    <>
      <div className="relative h-screen overflow-x-hidden">
        <div className="h-full overflow-y-scroll">
          <Header />

          <main className="bg-[#f0f0f0] pb-5 ">
            <div className=" lg:container w-full ml-auto mr-auto block box-border ">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>


        <SpinLucky />

        <SupportEngine />

        <Rightbar />
      </div>
    </>
  );
}
