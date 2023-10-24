import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-1">
      <Header />

      <main className="flex-grow pt-32 ">
        <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
