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
    icon: 'lucide:layout-dashboard',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Sản phẩm',
    icon: 'iconoir:book',
    path: '/admin/products',
  },
  {
    id: 3,
    title: 'Người dùng',
    icon: 'lucide:user-round',
    path: '/admin/user',
  },
  {
    id: 4,
    title: 'Đơn hàng',
    icon: 'ph:package', // icon-park-outline:transaction-order
    path: '/admin/bill',
  },
  {
    id: 5,
    title: 'Voucher',
    icon: 'streamline:tickets',
    path: '/admin/voucher',
  },
  {
    id: 6,
    title: 'Thể loại',
    icon: 'uil:create-dashboard',
    path: '/admin/category',
  },
  {
    id: 7,
    title: 'Thông báo',
    icon: 'heroicons-outline:bell',
    path: '/admin/notification',
  },
  {
    id: 8,
    title: 'Hỗ trợ',
    icon: 'fluent:person-support-24-regular',
    path: '/admin/support',
  },
  {
    id: 9,
    title: 'Khác',
    icon: 'fluent:more-circle-16-regular',
    path: '/admin/orther',
  },
];

export default function Sidebar({ isShowSidebar, onHandleShowSidebar }: Props) {
  return (
    <div className="p-3 flex h-full flex-col">
      <div className="flex px-2 gap-3 mb-5 items-center border-b-[1px] border-gray-400">
        {isShowSidebar ? (
          <>
            <div className="h-[63px] flex items-center gap-3">
              <div>
                <Icon
                  icon={'line-md:close-to-menu-transition'} // line-md:close-to-menu-alt-transition
                  fontSize={40}
                  className="text-gray-200 cursor-pointer"
                  onClick={() => onHandleShowSidebar()}
                />
              </div>
              <div className="w-full">
                <Link to="/">
                  <img
                    src={Logo}
                    alt=""
                    className=""
                  />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[63px] flex items-center">
            <Icon
              icon={'line-md:menu-to-close-transition'} // line-md:menu-to-close-alt-transition
              fontSize={40}
              className="text-gray-200 cursor-pointer"
              onClick={() => onHandleShowSidebar()}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-full ">
          {List_Item_Sidebar.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive ? ' text-white font-medium bg_btnAdmin rounded-md py-1' : ' text-slate-400 font-medium py-1'
              }
            >
              <div
                key={item.id}
                className={`${
                  isShowSidebar ? 'px-3 gap-3' : ' items-center justify-center'
                } flex while items-center w-full h-12 text-xl px-3 hover:pl-5 hover:rounded-md hover:text-white duration-300`}
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
                  icon="line-md:cog-loop"
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
