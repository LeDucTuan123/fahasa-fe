import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { links } from './List_Item';
import fetch from 'src/services/axios';

interface Props {
  onMouse: () => void;
  onLeave: () => void;
}

let level2: any = null;
let level3: any = null;

const MegaMenu = ({ onMouse, onLeave }: Props) => {
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
  return (
    <>
      <div
        id="menu-mega"
        className="absolute bg-yellow-400 top-14"
        onMouseEnter={() => onMouse()}
        onMouseLeave={() => onLeave()}
      >
        <div className=" rounded-lg flex px-2 py-5 mx-auto border border-dark-400 shadow md:px-2">
          <div className="menu-left">
            <div className="font-bold text-xl text-[#7A7E7F] text-left px-5 mb-2 w-[280px]">Danh mục sản phẩm</div>
            <ul className="w-[280px] px-3 text-left text-base text-[#212121] font-bold">
              <div>
                <li>
                  {categoryLevel1.map((item: any) => {
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
                          to={'#'}
                          className="w-full px-2"
                        >
                          <span className="menu-title capitalize text-lg">{item.categoryname} </span>
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
              return (
                <div className="xl:w-[200px] lg:w-[150px] mt-5">
                  <span className="text-[13px] font-bold text-[#333333] uppercase">{item.categoryname}</span>
                  <ul className="mt-2">
                    <div>
                      {item.listCategory &&
                        item.listCategory.map((item: any) => {
                          return (
                            <li className="">
                              <Link
                                to={'#'}
                                className=" hover:text-[#bf9a61]"
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

            {/* {link.sublinks.map((head) => (
                
              ))} */}
          </div>
          {/* </div>
        {links.map((link) => (
          
        ))} */}
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
