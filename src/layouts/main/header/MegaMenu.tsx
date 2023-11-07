import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { links } from './List_Item';
import fetch from 'src/services/axios';
import { CategoryType } from 'src/types';
import { useAppDispatch } from 'src/redux/store';
import { setParentId, setTextCateName } from 'src/redux/slice/commonSlice';

interface Props {
  onMouse: () => void;
  onLeave: () => void;
  categoryLevel1: any;
  subCategory: any;
  currentCategory: any;
  handleOnMouseEnterChange: (id: number) => void;
}

// let level2: any = null;
// let level3: any = null;

const MegaMenu = ({
  onMouse,
  onLeave,
  categoryLevel1,
  subCategory,
  currentCategory,
  handleOnMouseEnterChange,
}: Props) => {
  const dispatch = useAppDispatch();
  const handelOnClickCate = (e: CategoryType) => {
    dispatch(setTextCateName(e.categoryname));
  };

  const handelOnClickCate2 = (e: CategoryType) => {
    dispatch(setParentId(e.id));
  };

  return (
    <>
      <div
        id="menu-mega"
        className="absolute lg:block hidden py-5 top-14"
        onMouseEnter={() => onMouse()}
        onMouseLeave={() => onLeave()}
      >
        <div className="relative rounded-lg flex px-2 py-5 bg-white mx-auto border border-dark-400 shadow md:px-2 z-20">
          <div className="menu-left">
            <div className="font-bold text-xl text-[#7A7E7F] text-left px-5 mb-2 w-[280px]">Danh mục sản phẩm</div>
            <ul className="w-[280px] px-3 text-left text-base text-[#212121] font-bold">
              <div>
                <li>
                  {categoryLevel1.map((item: CategoryType) => {
                    const updatedUrl = item.categoryname.replace(/\s/g, '-');
                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => handleOnMouseEnterChange(item.id)}
                        className={
                          item.id === currentCategory
                            ? 'py-4 bg-[#f2f4f5] rounded-lg cursor-pointer'
                            : 'py-4 hover:bg-[#f2f4f5] rounded-lg cursor-pointer'
                        }
                      >
                        <Link
                          to={updatedUrl}
                          className="w-full px-2"
                        >
                          <span
                            className="menu-title capitalize text-lg"
                            onClick={() => handelOnClickCate(item)}
                          >
                            {item.categoryname}{' '}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </li>
              </div>
            </ul>
          </div>
          <div className="w-px px-[1px] bg-gray-400"></div>
          <div className="menu-right  grid grid-cols-4 gap-x-10 px-4">
            {subCategory.map((item: any) => {
              const updatedUrl = item.categoryname.replace(/\s/g, '-');
              const updatedUrl1 = item.parent.categoryname.replace(/\s/g, '-');

              return (
                <div className="xl:w-[200px] lg:w-[150px] mt-5">
                  <Link
                    to={`${updatedUrl1}/${updatedUrl}`}
                    onClick={() => handelOnClickCate2(item)}
                  >
                    <span className="text-[13px] font-bold text-[#333333] uppercase">{item.categoryname}</span>
                  </Link>
                  <ul className="mt-2">
                    <div>
                      {item.listCategory &&
                        item.listCategory.map((item: CategoryType) => {
                          const updatedUrl = item.categoryname.replace(/\s/g, '-');
                          const updatedUrl1 = item.parent.categoryname.replace(/\s/g, '-');
                          const updatedUrl2 = item.parent.parent.categoryname.replace(/\s/g, '-');

                          return (
                            <li className="">
                              <Link
                                to={`${updatedUrl2}/${updatedUrl1}/${updatedUrl}`}
                                className=" hover:text-[#bf9a61]"
                                onClick={() => handelOnClickCate2(item)}
                              >
                                <p className="truncate ... text-[13px]">{item.categoryname}</p>
                              </Link>
                            </li>
                          );
                        })}
                    </div>
                    {/* {head.sublink.map((sub) => (
                      
                    ))} */}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* dropdown-cover */}
      <div className="fixed lg:block hidden dropdown-cover h-screen w-screen bg-black opacity-50 top-20 right-0 z-10"></div>
    </>
  );
};

export default MegaMenu;
