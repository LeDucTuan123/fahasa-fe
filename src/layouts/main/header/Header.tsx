import { Icon } from '@iconify/react';
import { Link } from 'src/components/Link';
import { ITEMS_NAVIGATION_LIST } from '../../../constans';
import { ItemsNavType } from '../../../types';

import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggkeNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-300 fixed px-[1/3] min-h-20 py-4 top-0 z-[50] flex w-full items-center justify-between border-gray-500">
      <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
        <div className="flex md:flex-row flex-col">
          <div className="flex md:hidden justify-center pb-4">
            <Link to="/">
              <img
                src="https:cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                // width="201px"
                // height="49px"
                style={{ objectFit: 'contain' }}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex w-full items-center ">
            <div className="pr-5 hidden md:flex">
              <Link to="/">
                <img
                  src="https:cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                  // width="201px"
                  // height="49px"
                  style={{ objectFit: 'contain' }}
                  alt="logo"
                />
              </Link>
            </div>

            <div className="hidden md:flex whitespace-nowrap justify-between items-center">
              <button className="active:bg-gray-500 h-full">
                <Link to="#">Nhà sách</Link>
              </button>
            </div>

            <div className="flex w-full h-10 px-4 relative">
              <Icon
                icon="basil:search-outline"
                fontSize={24}
                className="absolute left-6 top-2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full border-white focus:border-gray-400 border-[1px] pl-9 outline-none rounded-md text-gray-500"
              />
            </div>

            <div className="md:min-w-[300px] flex justify-end ">
              <div className="hidden md:flex justify-between items-center">
                {ITEMS_NAVIGATION_LIST.map((item: ItemsNavType) => (
                  <button
                    key={item.id}
                    className="active:bg-[#5994d9] h-full p-2 rounded-sm hover:bg-[#7db5f7] transition-[500ms]"
                  >
                    <Link to={item.path} className="flex flex-col items-center">
                      <Icon icon={item.icon} fontSize={24} />
                      <p className="text-[18px]">{item.title}</p>
                    </Link>
                  </button>
                ))}
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={toggkeNavbar}>
                  <>
                    {isOpen ? (
                      <Icon icon="ion:close" fontSize={32} />
                    ) : (
                      <Icon icon="material-symbols:menu" fontSize={32} />
                    )}
                  </>
                </button>
              </div>

              {isOpen && (
                <div className="absolute top-[140px] ">
                  <div className="flex flex-col h-fit min-w-[200px] border-[1px] bg-slate-50 border-gray-300 rounded-md">
                    {ITEMS_NAVIGATION_LIST.map((item: ItemsNavType) => (
                      <button
                        key={item.id}
                        className={`active:bg-[#5994d9] h-full p-2 hover:bg-[#7db5f7] transition-[500ms] delay-75`}
                      >
                        <Link to={item.path} className="flex items-center">
                          <Icon icon={item.icon} fontSize={24} />
                          <p className="text-[18px]">{item.title}</p>
                        </Link>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
