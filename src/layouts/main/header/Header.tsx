import { Icon } from '@iconify/react';
import { Link } from 'src/components/Link';
import Logo from '../../../assets/image/logo.png';
import MegaMenu from './MegaMenu';

import { useEffect, useState } from 'react';
import { List_nav } from './List_Item';

export default function Header() {
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

  //
  const [openMenuMB, setopenMenuMB] = useState(false);

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

  const [isOpenMobile, setOpenMobile] = useState(false);

  const handleMenuMobile = () => {
    setOpenMobile(!isOpenMobile);
  };

  console.log(openMenu);

  return (
    <div className="lg:container mx-auto py-2 ">
      <nav className="">
        <div className="flex lg:gap-2 items-center px-2 lg:px-0 py-2 h-[68px]">
          <div className="flex justify-around items-center gap-4">
            {/* logo */}
            <Link
              to={'/'}
              className="text-4xl font-mono w-52 hidden lg:block"
            >
              <img
                src={Logo}
                alt=""
                className="w-full"
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
          <div className="flex items-center w-full mx-2 border border-[#d3d4d5] rounded-lg bg-white">
            <input
              type="search"
              autoComplete="off"
              placeholder="Tìm kiếm.."
              className="px-4 py-1 border-none outline-none w-full bg-transparent"
            />
            <div className="m-1 rounded-full lg:rounded-lg bg-[#c92127] text-white px-2 lg:px-6 py-1 lg:py-2 ">
              <Icon
                icon="tabler:search"
                className="bx bx-search text-sm"
              />
            </div>
          </div>
          {/* msg icon */}
          <div className="flex items-center gap-2">
            {List_nav.map((item) => (
              <Link
                key={item.id}
                to={item.path}
              >
                <div className="header-icon text-gray-header">
                  <Icon
                    icon={`${item.icon}`}
                    className="bx bx-bell text-2xl"
                  />
                  <span className="text-sm hidden lg:block">{item.title}</span>
                </div>
              </Link>
            ))}

            {/* <div
                                    className="z-10 top-14 absolute bg-white rounded-lg shadow w-44"
                                    onMouseOver={handleMouseOver}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ul className="py-2 text-sm text-gray-700 ">
                                        <li>
                                            <Link
                                                to={"#"}
                                                className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={"#"}
                                                className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={"#"}
                                                className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                                            >
                                                Earnings
                                            </Link>
                                        </li>
                                    </ul>
                                </div> */}
          </div>
        </div>
        {isOpen && (
          <MegaMenu
            onMouse={handleOnMouseEnter}
            onLeave={handleOnMouseLeave}
          />
        )}
        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed bg-[#f8f6f0] top-0 right-0 transition-all w-screen h-full duration-500 ${
            openMenu ? 'left-0' : 'left-[-100%]'
          }`}
        >
          {/* header mobile */}
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
              <div className=" h-[90px] border rounded-lg px-[2px] flex flex-col justify-center items-center ">
                <Icon
                  icon="material-symbols:book-outline"
                  className="text-2xl"
                />
                <span className="text-center text-sm font-semibold">Sách Trong Nước</span>
              </div>
              <div className=" h-[90px] border rounded-lg px-[2px] flex flex-col justify-center items-center ">
                <Icon
                  icon="material-symbols:book-outline"
                  className="text-2xl"
                />
                <span className="text-center text-sm font-semibold">Sách Trong Nước</span>
              </div>
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
              <div className="py-1">
                <div
                  className="flex justify-between py-2 px-2 w-full bg-white border rounded-lg"
                  onClick={handleMenuMobile}
                >
                  <div>
                    <span className="uppercase font-semibold">Văn học</span>
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

                {isOpenMobile && (
                  <div className="">
                    <div className="py-2 px-2 w-full bg-white border">
                      <span className="capitalize">Tieu thuyet</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
