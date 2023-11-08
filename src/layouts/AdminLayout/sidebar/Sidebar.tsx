import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'src/components/Link';
import Logo from '../../../assets/image/logo.png';

interface Props {
  isShowSidebar: boolean;
  onHandleShowSidebar: () => void;
}

interface itemType {
  id: number;
  title: string;
  icon: string;
  path: string;
}

const List_Item_Sidebar: itemType[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'material-symbols:dashboard',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Product',
    icon: 'clarity:book-solid',
    path: '/admin/products',
  },
  {
    id: 3,
    title: 'User',
    icon: 'mdi:user',
    path: '/admin/user',
  },
  {
    id: 4,
    title: 'Hóa đơn',
    icon: 'solar:bill-list-bold',
    path: '/admin/bill',
  },
  {
    id: 5,
    title: 'Voucher',
    icon: 'mdi:voucher',
    path: '/admin/voucher',
  },
  {
    id: 6,
    title: 'Order',
    icon: 'icon-park-solid:other',
    path: '/admin/orther',
  },
];

export default function Sidebar({ isShowSidebar, onHandleShowSidebar }: Props) {
  return (
    <div className="p-3 flex h-full flex-col">
      <div className="flex justify-between px-2 h-14 mb-5 gap-5 items-center border-b-[1px] border-gray-400">
        <Icon
          icon={'ep:menu'}
          fontSize={40}
          className="text-gray-200"
          onClick={() => onHandleShowSidebar()}
        />
        {isShowSidebar && (
          <Icon
            icon={'ic:twotone-keyboard-backspace'}
            fontSize={24}
            className="text-gray-200"
            onClick={() => onHandleShowSidebar()}
          />
        )}
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-full ">
          {List_Item_Sidebar.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => (isActive ? ' text-slate-900 bg-slate-300 rounded-md' : ' text-gray-200')}
            >
              <div
                key={item.id}
                className={`${
                  isShowSidebar ? 'px-3 gap-3' : ' items-center justify-center'
                } flex while items-center w-full h-12 text-2xl hover:bg-slate-400 hover:rounded-md hover:text-slate-900 duration-300`}
              >
                <Icon
                  icon={`${item.icon}`}
                  fontSize={32}
                />
                <button className="truncate">{isShowSidebar && item.title}</button>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="text-slate-200 py-1">
          <hr />
          <div className="flex flex-col h-full pt-3">
            <div className={' active:text-slate-900 active:bg-slate-300 active:rounded-md text-gray-200'}>
              <div
                className={`${
                  isShowSidebar ? 'px-3 gap-3' : ' items-center justify-center'
                } flex while items-center w-full h-12 text-2xl hover:bg-slate-400 hover:rounded-md hover:text-slate-900 duration-300`}
              >
                <Icon
                  icon="uil:setting"
                  fontSize={32}
                />
                <button className="truncate">{isShowSidebar && 'Setting'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
