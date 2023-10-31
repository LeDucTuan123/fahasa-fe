import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { getBook } from 'src/redux/slice/bookSlice';
import { useAppDispatch } from 'src/redux/store';

export default function MainLayout() {
  const dispatch = useAppDispatch();

  useEnhancedEffect(() => {
    dispatch(getBook());
  }, [dispatch]);
  return (
    <>
      <Header />

      <main className="bg-[#f0f0f0] pb-5">
        <div className=" lg:container w-full ml-auto mr-auto block box-border">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}
