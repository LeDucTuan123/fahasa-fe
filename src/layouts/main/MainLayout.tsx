import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getTools } from 'src/redux/slice/ToolSlice';
import { getBook } from 'src/redux/slice/bookSlice';
import { useAppDispatch } from 'src/redux/store';
import Footer from './footer';
import Header from './header';

export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBook());
    dispatch(getTools());
  }, [dispatch]);

  return (
    <>
      <Header />

      <main className="bg-[#f0f0f0] pb-5 ">
        <div className="lg:container w-full ml-auto mr-auto block box-border">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}
