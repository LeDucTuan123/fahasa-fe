import { Icon } from '@iconify/react';
import { Link } from 'src/components/Link';
import { ITEMS_NAVIGATION_LIST } from '../../../constans';
import { ItemsNavType } from '../../../types';
import Logo from '../../../assets/image/logo.png';
import MegaMenu from './MegaMenu';

import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggkeNavbar = () => {
        setIsOpen(!isOpen);
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
                            onMouseEnter={toggkeNavbar}
                            onMouseLeave={toggkeNavbar}
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
                        <div className="header-icon text-gray-header">
                            <Icon
                                icon="solar:bell-line-duotone"
                                className="bx bx-bell text-2xl"
                            />
                            <span className="text-sm hidden lg:block">Thông báo</span>
                        </div>
                        {/* cart icon */}
                        <div className="header-icon text-gray-header">
                            <Icon
                                icon="uil:cart"
                                className="bx bx-cart-alt text-2xl"
                            />
                            <span className="text-sm hidden lg:block">Giỏ hàng</span>
                        </div>
                        {/* avatar */}
                        <div className="header-icon text-gray-header">
                            <Link
                                to="/login"
                                className="header-icon text-gray-header "
                            >
                                <Icon
                                    icon="bx:user"
                                    className="bx bx-user text-2xl text-gray-header"
                                />
                                <span className="text-sm text-gray-header hidden lg:block">Tài khoản</span>
                            </Link>
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
                </div>
                {isOpen && <MegaMenu onMouse={toggkeNavbar} />}
            </nav>
            {/* <div className="dropdown-cover w-screen h-screen"></div> */}
        </div>
    );
}
