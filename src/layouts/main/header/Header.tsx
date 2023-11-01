import { Icon } from '@iconify/react';
import { Link } from 'src/components/Link';
import Logo from '../../../assets/image/logo.png';
import MegaMenu from './MegaMenu';
import fetch from 'src/services/axios';

import { useState, useEffect } from 'react';
import { List_nav } from './List_Item';
import Search from './search';

// là mảng chứa những category level 2
let level2: any = null;
// là mảng chứa những category level 3
let level3: any = null;

export default function Header() {
  // Đây là đoạn code gọi api category -- start
  const [categoryLevel1, setCategoryLevel1] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<Number>();

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
          <Search />
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

            {/* info */}
            <div className="z-10 hidden top-20 absolute bg-slate-200 rounded-lg border shadow items-center">
              <div className="px-2 py-2">
                <div className="py-2">
                  <div className="px-6 py-3 text-center border bg-indigo-500 rounded-lg ">
                    <span className="text-base font-semibold text-white">Đăng nhập</span>
                  </div>
                </div>
                <div className="py-2">
                  <div className="px-6 py-3 text-center border-2 border-indigo-500 bg-white rounded-lg ">
                    <span className="text-base font-semibold text-indigo-500">Đăng ký</span>
                  </div>
                </div>
              </div>
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
