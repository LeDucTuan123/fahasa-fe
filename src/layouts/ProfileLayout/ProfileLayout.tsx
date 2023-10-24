import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../main/footer';
import Header from '../main/header';

function Profilelayout() {
  return (
    <div className="flex flex-col h-1">
      <Header />

      <main className="flex-grow pt-32 ">
        <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto flex box-border">
          <div className="min-w-[250px] shadow-lg border-solid border-2 border-[#e8e8e8] max-h-[300px]">
            <h1 className="text-center text-xl font-bold uppercase text-[#C92127] py-5 border">Tài khoản</h1>
            <ul className="divide-y divide-dashed divide-slate-400">
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? 'block p-5 text-[#C92127]' : 'block p-5 hover:text-[#C92127]'
                  }
                >
                  Thông tin tài khoản
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/address"
                  className={({ isActive }) =>
                    isActive ? 'block p-5 text-[#C92127]' : 'block p-5 hover:text-[#C92127]'
                  }
                >
                  Sổ địa chỉ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    isActive ? 'block p-5 text-[#C92127]' : 'block p-5 hover:text-[#C92127]'
                  }
                >
                  Đơn hàng của tôi
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full ml-3">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profilelayout;
