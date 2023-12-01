import { Icon } from '@iconify/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'src/components/Link';
import { setIsLogin } from 'src/redux/slice/authSlice';

import { RootState, useAppDispatch } from 'src/redux/store';
import fetch from 'src/services/axios';
import LogoHome from '../../../assets/image/logo.png';
import MegaMenu from './MegaMenu';

import { jwtDecode } from 'jwt-decode';

import Search from './search';

import { toast } from 'react-toastify';
import { getUser } from 'src/redux/slice/userSlice';
import { setCount } from 'src/redux/slice/countSlice';

// là mảng chứa những category level 2
let level2: any = null;
// là mảng chứa những category level 3
let level3: any = null;

export default function Header() {
  // const user = useSelector((state: RootState) => state.user.userData);
  const dispatch = useAppDispatch();
  const dispatch1 = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const user: any = useSelector((state: RootState) => state.user.userData);
  const cartl = localStorage.getItem('cart');
  const cartlocal = JSON.parse(cartl ? cartl : '[]');
  // Đây là đoạn code gọi api category -- start
  const [categoryLevel1, setCategoryLevel1] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<Number>();
  const [countCart, setCountCart] = useState<number>(0);
  const count = useSelector((state: RootState) => state.count.count);
  const temp = useSelector((state: RootState) => state.count.temp);

  useEffect(() => {
    if (isLogin && user) {
      fetch
        .get(`/rest/order/cart/${user.id}`)
        .then((res) => {
          dispatch(setCount(res.data.orderdetails.length));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCountCart(cartlocal.length);
    }
  }, [cartlocal.length, temp, dispatch, isLogin, user]);

  // lấy dữ liệu category
  useEffect(() => {
    fetch('/rest/category')
      .then((res) => {
        let level1 = res.data.filter((item: any) => {
          return item.level === 1;
        });
        level2 = res.data.filter((item: any) => {
          return item.level === 2;
        });
        level3 = res.data.filter((item: any) => {
          return item.level === 3;
        });
        setCategoryLevel1(level1);
        setCurrentCategory(1);
        handleOnMouseEnterChange(1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // khi di chuột vào thì nó sẽ đổi category level 2 và level 3 tương ứng
  function handleOnMouseEnterChange(id: number) {
    let subcate: any =
      level2 &&
      level2.filter((item: any) => {
        return item.parent.id === id;
      });
    subcate.forEach((element: any) => {
      element.listCategory = level3.filter((item: any) => {
        return item.parent.id === element.id;
      });
    });
    setCurrentCategory(id);
    setSubCategory(subcate);
  }
  // Đây là đoạn code gọi api category -- end

  // hover
  const [isOpen, setIsOpen] = useState(false);

  const handleOnMouseEnter = () => {
    setIsOpen(true);
  };
  const handleOnMouseLeave = () => {
    setIsOpen(false);
  };

  // click
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // mobile
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleSize);
    handleSize();
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width < 1020) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  // mở menu con sử dụng trong mobile -- start
  const [isOpenMobile, setOpenMobile] = useState<number>(0);

  const handleMenuMobile = (id: number) => {
    // nếu người dùng bấm lại menu con thì nó sẽ ẩn đi
    if (id === isOpenMobile) {
      setOpenMobile(0);
      return;
    }
    setOpenMobile(id);
  };

  // mở menu con sử dụng trong mobile --> end

  // show info

  const [openInfo, setOpenInfo] = useState(false);

  const handleInfo = () => {
    setOpenInfo(!openInfo);
  };

  // token

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }
    if (isLogin === true || token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setIsLogin(false));
    toast.success('Đăng xuất thành công');
  };

  const storedToken: any = token;
  if (storedToken) {
    const decoded: any = jwtDecode(storedToken);

    // Kiểm tra thông tin thời gian hết hạn
    if (decoded.exp * 1000 < Date.now()) {
      // Token đã hết hạn
      logout();
    } else {
      // Token vẫn còn hạn sử dụng
    }
  } else {
    // Nếu không có token, không cần thực hiện việc giải mã
  }

  return (
    <div className="lg:container mx-auto py-2 ">
      <nav className="">
        <div className="flex lg:gap-2 items-center px-2 lg:px-0 py-2 h-[68px]">
          <div className="flex justify-around items-center gap-4">
            {/* logo */}
            <Link
              to={'/'}
              className="text-4xl font-mono w-52 h-[70px] hidden lg:block"
            >
              <img
                src={LogoHome}
                alt=""
                className="h-[70px]"
              />
            </Link>

            {/* mega menu */}
            {openMenu && isMobile ? (
              // mobile
              <>
                <div onClick={handleMenu}>
                  <Icon
                    icon="gg:arrow-left-o"
                    className="text-3xl text-gray-header"
                  />
                </div>
              </>
            ) : !openMenu && isMobile ? (
              // mobile
              <div
                className="btn-menu relative cursor-pointer items-center flex px-2 text-gray-header"
                onClick={handleMenu}
              >
                <Icon
                  icon="bx:customize"
                  className="bx bx-customize text-3xl"
                />
                <Icon
                  icon="fe:arrow-down"
                  className="bx bx-chevron-down text-xl lg:block hidden"
                />
              </div>
            ) : (
              // desktop
              <div>
                <div
                  className="btn-menu relative cursor-pointer items-center flex px-2 text-gray-header"
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  <Icon
                    icon="bx:customize"
                    className="bx bx-customize text-3xl"
                  />
                  <Icon
                    icon="fe:arrow-down"
                    className="bx bx-chevron-down text-xl lg:block hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* search */}
          <Search />
          {/* msg icon */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <div className="header-icon text-gray-header">
                <Icon
                  icon="solar:bell-line-duotone"
                  className="bx bx-bell text-2xl"
                />
                <span className="text-sm hidden lg:block">Thông báo</span>
              </div>
            </Link>
            <Link to="/cart">
              <div className="header-icon text-gray-header relative">
                <Icon
                  icon="uil:cart"
                  className="bx bx-bell text-2xl"
                />
                <span className="text-sm hidden lg:block">Giỏ hàng</span>
                <span className="cart_count">{isLogin && user ? count : countCart}</span>
              </div>
            </Link>
            <div>
              <HeadlessTippy
                visible={openInfo}
                onClickOutside={() => setOpenInfo(false)}
              >
                <div className="relative">
                  <div
                    onClick={handleInfo}
                    className="header-icon text-gray-header"
                  >
                    <Icon
                      icon="bx:user"
                      className="bx bx-bell text-2xl"
                    />
                    <span className="text-sm hidden lg:block">Tài khoản</span>
                  </div>
                  {/* info */}
                  {openInfo && (
                    <div>
                      {isLogin && (
                        <div className="w-[250px] top-[65px] z-10 right-0 absolute bg-slate-200 rounded-lg border shadow items-center">
                          <div className="px-2 py-2">
                            {user && user.authorities[0] && user.authorities[0].authority === 'ADMIN' && (
                              <>
                                <div className="p-1 hover:bg-gray-50">
                                  <Link to="/admin/dashboard">
                                    <div className="flex items-center w-full">
                                      <Icon
                                        icon="grommet-icons:user-admin"
                                        className="text-xl"
                                      />
                                      <span className="px-2">Quản lý {'(Admin)'}</span>
                                    </div>
                                  </Link>
                                </div>
                                <hr className="border-gray-300 py-1" />
                              </>
                            )}
                            <div className="p-1 hover:bg-gray-50">
                              <Link to="/member/profile">
                                <div className="flex items-center w-full">
                                  <Icon
                                    icon="ri:user-settings-line"
                                    className="text-xl"
                                  />
                                  <span className="px-2">Thông tin Tài Khoản</span>
                                </div>
                              </Link>
                            </div>
                            <hr className="border-gray-300 py-1" />
                            <div className="p-1 hover:bg-gray-50">
                              <Link to="/member/address">
                                <div className="flex items-center w-full">
                                  <Icon
                                    icon="mdi:address-marker-outline"
                                    className="text-xl"
                                  />
                                  <span className="px-2">Sổ địa chỉ</span>
                                </div>
                              </Link>
                            </div>
                            <hr className="border-gray-300 py-1" />
                            <div className="p-1 hover:bg-gray-50">
                              <Link to="/member/order">
                                <div className="flex items-center w-full">
                                  <Icon
                                    icon="icon-park-outline:transaction-order"
                                    className="text-xl"
                                  />
                                  <span className="px-2">Đơn hàng của tôi</span>
                                </div>
                              </Link>
                            </div>
                            <hr className="border-gray-300 py-1" />
                            <div className="p-1 hover:bg-gray-50">
                              <div onClick={logout}>
                                <div className="flex items-center">
                                  <Icon
                                    icon="heroicons-outline:logout"
                                    className="text-xl"
                                  />
                                  <span className="px-2">Đăng xuất</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isLogin && (
                        <div className="w-[200px] top-[65px] z-10 right-0 absolute bg-slate-200 rounded-lg border shadow-2xl shadow-indigo-500/40 items-center">
                          <div className="px-2 py-2">
                            <div className="py-2 group">
                              <Link to="/login">
                                <div className="px-6 py-3 cursor-pointer text-center border bg-indigo-500 rounded-lg group-hover:bg-white transition duration-500">
                                  <span className="text-base font-semibold text-white group-hover:text-indigo-500 transition duration-500">
                                    Đăng nhập
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="py-2 group">
                              <Link to="/register">
                                <div className="px-6 py-3 h-[48px] cursor-pointer text-center border-2 border-indigo-500 bg-white rounded-lg group-hover:bg-indigo-500 transition duration-500">
                                  <span className="text-base font-semibold text-indigo-500 group-hover:text-white transition duration-500">
                                    Đăng ký
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </HeadlessTippy>
            </div>
          </div>
        </div>
        {isOpen && (
          <MegaMenu
            onMouse={handleOnMouseEnter}
            onLeave={handleOnMouseLeave}
            categoryLevel1={categoryLevel1}
            subCategory={subCategory}
            currentCategory={currentCategory}
            handleOnMouseEnterChange={handleOnMouseEnterChange}
          />
        )}

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed bg-[#f8f6f0] top-0 right-0 transition-all w-screen h-full duration-500 z-50 ${
            openMenu ? 'left-0' : 'left-[-100%]'
          }`}
        >
          {/* Header mobile */}
          <div className="flex justify-between bg-indigo-300 grid-cols-2 px-2">
            <div
              onClick={handleMenu}
              className="py-4"
            >
              <Icon
                icon="gg:arrow-left-o"
                className="text-3xl text-white "
              />
            </div>
            <div className="flex items-center px-4 py-4">
              <span className="text-xl font-bold text-white">Danh Mục Sản Phẩm</span>
            </div>
            <div></div>
          </div>

          <div className="flex w-full ">
            {/* danh muc */}
            <div className="categori-menu bg-[#f8f6f0] w-[90px]">
              {categoryLevel1.map((item: any) => {
                return (
                  <div
                    className=" h-[90px] border rounded-lg px-[2px] flex flex-col justify-center items-center "
                    onClick={() => handleOnMouseEnterChange(item.id)}
                  >
                    <Icon
                      icon="material-symbols:book-outline"
                      className="text-2xl"
                    />
                    <span className="text-center text-sm font-semibold">{item.categoryname}</span>
                  </div>
                );
              })}
            </div>
            {/* categori */}
            <div className="categori-content w-[calc(100%-90px)] py-1 px-1">
              {/* all-content */}
              <div className="flex items-center">
                <Link
                  to="#"
                  className="flex justify-between py-2 px-2 w-full bg-white border rounded-lg"
                >
                  <div>
                    <span className="uppercase font-semibold">Tất cả sản phẩm</span>
                  </div>
                  <Icon
                    icon="ri:arrow-drop-right-line"
                    className="text-2xl"
                  />
                </Link>
              </div>
              {/* content */}
              {subCategory.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="py-1"
                  >
                    <div
                      className="flex justify-between py-2 px-2 w-full bg-white border rounded-lg"
                      onClick={() => handleMenuMobile(item.id)}
                    >
                      <div>
                        <span className="uppercase font-semibold">{item.categoryname}</span>
                      </div>
                      {isOpenMobile ? (
                        <Icon
                          icon="ri:arrow-drop-up-fill"
                          className="text-2xl"
                        />
                      ) : (
                        <Icon
                          icon="ri:arrow-drop-down-fill"
                          className="text-2xl"
                        />
                      )}
                    </div>

                    {item.id === isOpenMobile &&
                      item.listCategory &&
                      item.listCategory.map((item: any) => {
                        return (
                          <div
                            className=""
                            key={item.id}
                          >
                            <div className="py-2 px-2 w-full bg-white border">
                              <span className="capitalize">{item.categoryname}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
