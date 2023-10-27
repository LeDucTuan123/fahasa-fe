import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { links } from './List_Item';

interface Props {
    onMouse: () => void;
    onLeave: () => void;
}

const MegaMenu = ({ onMouse, onLeave }: Props) => {
    return (
        <>
            <div
                id="menu-mega"
                className="absolute bg-white top-14"
                onMouseEnter={() => onMouse()}
                onMouseLeave={() => onLeave()}
            >
                {links.map((link) => (
                    <div className=" rounded-lg flex px-2 py-5 mx-auto border border-dark-400 shadow md:px-2">
                        <div className="menu-left">
                            <div className="font-bold text-2xl text-[#7A7E7F] text-left px-5 mb-2 w-[280px]">
                                Danh mục sản phẩm
                            </div>
                            <ul className="w-[280px] px-3 text-left text-base text-[#212121] font-bold">
                                <div>
                                    <li>
                                        <div className="py-4 hover:bg-[#f2f4f5] rounded-lg cursor-pointer">
                                            <Link
                                                to={'#'}
                                                className="w-full px-2"
                                            >
                                                <span className="menu-title capitalize">Sách </span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="py-4 hover:bg-[#f2f4f5] rounded-lg cursor-pointer">
                                            <Link
                                                to={'#'}
                                                className="w-full px-2"
                                            >
                                                <span className="menu-title capitalize">Dụng cụ </span>
                                            </Link>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                        <div className="w-px px-[1px] bg-gray-400"></div>
                        <div className="menu-right  grid grid-cols-4 gap-x-10 px-4">
                            {link.sublinks.map((head) => (
                                <div className="xl:w-[200px] lg:w-[150px] mt-5">
                                    <span className="text-2xl font-semibold text-[#333333] uppercase">{head.Head}</span>
                                    <ul className="mt-2">
                                        {head.sublink.map((sub) => (
                                            <div>
                                                <li className="">
                                                    <Link
                                                        to={'#'}
                                                        className=" hover:text-[#bf9a61]"
                                                    >
                                                        <p className="truncate ...">{sub.name}</p>
                                                    </Link>
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MegaMenu;
