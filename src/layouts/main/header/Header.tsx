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
    <div className="bg-blue-300 sticky px-[1/3] min-h-20 py-4 top-0 z-[20] flex w-full items-center justify-between border-gray-500">
      <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
        <div className="flex md:flex-row sm:flex-col">
          <div className="md:hidden sm:flex justify-center pb-4">
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

            <div className="flex w-full h-8 px-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full border-gray-500 border-[1px] pl-4 outline-none rounded-md text-gray-500"
              />
            </div>

            <div className="md:min-w-[300px] flex justify-end ">
              <div className="hidden md:flex justify-between items-center">
                {ITEMS_NAVIGATION_LIST.map((item: ItemsNavType) => (
                  <button
                    key={item.id}
                    className="active:bg-gray-500 h-full p-2 rounded-sm hover:bg-gray-400 transition-[500ms]"
                  >
                    <Link to={item.path} className="flex flex-col items-center">
                      <Icon icon={item.icon} fontSize={24} />
                      <p className='text-[18px]'>{item.title}</p>
                    </Link>
                  </button>
                ))}
              </div>
              <div className="md:hidden">
                <button onClick={toggkeNavbar}>
                  <>
                    {isOpen ? (
                      <Icon icon="ion:close" />
                    ) : (
                      <Icon icon="material-symbols:menu" />
                    )}
                  </>
                </button>
              </div>

              <div className="absolute top-28">
                <div className="flex flex-col h-fit min-w-[200px] bg-slate-400">
                  {ITEMS_NAVIGATION_LIST.map((item: ItemsNavType) => (
                    <button
                      key={item.id}
                      className={`hidden sm:${
                        isOpen && 'flex'
                      } active:bg-gray-500 h-full p-2 rounded-sm hover:bg-gray-200 transition-[500ms] delay-75`}
                    >
                      <Link to={item.path} className="flex items-center">
                        <Icon icon={item.icon} fontSize={24} />
                        <p className='text-[18px]'>{item.title}</p>
                      </Link>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
