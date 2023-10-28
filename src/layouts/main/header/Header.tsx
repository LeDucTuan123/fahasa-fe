import { Icon } from '@iconify/react';
import { Link } from 'src/components/Link';
import Logo from '../../../assets/image/logo.png';
import MegaMenu from './MegaMenu';

import { useState } from 'react';
import { List_nav } from './List_Item';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnMouseEnter = () => {
    setIsOpen(true);
  };
  const handleOnMouseLeave = () => {
    setIsOpen(false);
  };

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
                className="bx bx-chevron-down text-2xl lg:block hidden"
              />

              {/* {showDropdown && (
                                    
                                )} */}
            </div>
          </div>
          <div className="flex items-center w-full mx-2 border border-[#d3d4d5] rounded-lg bg-white">
            <input
              type="search"
              autoComplete="off"
              placeholder="Tìm kiếm.."
              className="px-4 py-1 border-none outline-none w-full bg-transparent"
            />
            <div className="m-1 rounded-full lg:rounded-lg bg-[#c92127] text-white px-2 lg:px-6 lg:py-1 ">
              <Icon
                icon="tabler:search"
                className="bx bx-search text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* msg icon */}
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
      </nav>
      {/* <div className="dropdown-cover w-screen h-screen"></div> */}
    </div>
  );
}
