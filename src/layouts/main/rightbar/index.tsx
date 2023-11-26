import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Suggest from './Suggest';
import Favorite from './Favorite';

export default function Rightbar() {
  const [isShowRightbar, setIsShowSidebar] = useState(false);
  const [valueRightbar, setValueRightbar] = useState('');

  const handleButtonFavorite = () => {
    setIsShowSidebar(true);
    setValueRightbar('favorite');
    if (isShowRightbar && valueRightbar === 'favorite') {
      setIsShowSidebar(false);
    }
  };

  const handleButtonSuggest = () => {
    setIsShowSidebar(true);
    setValueRightbar('suggest');
    if (isShowRightbar && valueRightbar === 'suggest') {
      setIsShowSidebar(false);
    }
  };

  return (
    <div
      className={`absolute ${
        isShowRightbar ? 'right-0' : '-right-[350px]'
      } top-0 bg-slate-50 h-full w-[350px] transform  duration-300 shadow-inherit z-50`}
      style={{ boxShadow: 'rgb(0 0 0 / 10%) -4px 0px 7px 6px' }}
    >
      <div className={`absolute flex flex-col ${isShowRightbar ? '-left-[48px]' : '-left-[62px]'} top-52  `}>
        <button
          className={`w-12 h-12 bg-gray-400 p-2 flex items-center justify-center rounded-tl-lg hover:bg-red-400 hover:text-red-500 ${
            valueRightbar === 'favorite' && 'bg-red-400 text-red-500'
          } `}
          onClick={handleButtonFavorite}
        >
          <Icon
            icon="carbon:favorite"
            className="text-3xl bg-slate-200 rounded-lg p-1 "
          />
        </button>
        <button
          className={`w-12 h-12 bg-gray-400 p-2 flex items-center justify-center rounded-bl-lg ${
            valueRightbar === 'suggest' && 'bg-red-400 text-red-500'
          } hover:bg-red-400 hover:text-red-500 `}
          onClick={handleButtonSuggest}
        >
          <Icon
            icon="bi:book"
            className="text-3xl bg-slate-200 rounded-lg p-1 "
          />
        </button>
      </div>

      <div className="w-full h-screen overflow-x-hidden ">
        {valueRightbar === 'favorite' ? (
          <>
            <Favorite />
          </>
        ) : (
          <>
            <Suggest />
          </>
        )}
      </div>
    </div>
  );
}
