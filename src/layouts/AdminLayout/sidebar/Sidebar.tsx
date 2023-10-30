import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'src/components/Link';
import Logo from '../../../assets/image/logo.png';

const List_Item_Sidebar = [
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
    title: 'Feedback',
    icon: 'material-symbols:comment',
    path: '/admin/feedback',
  },
  {
    id: 5,
    title: 'Order',
    icon: 'icon-park-solid:other',
    path: '/admin/orther',
  },
];

export default function Sidebar() {
  return (
    <div className="p-3 flex h-full flex-col">
      <div className="flex h-14 mb-5 gap-5 items-center border-b-[1px] border-gray-400">
        <Link
          to={'/'}
          className="text-4xl font-mono w-40  hidden lg:block "
        >
          <img
            src={Logo}
            alt=""
            className="w-full"
          />
        </Link>
      </div>

      <div className="flex flex-col h-full ">
        {List_Item_Sidebar.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => (isActive ? ' text-slate-900 bg-slate-300' : ' text-gray-200')}
          >
            <div
              key={item.id}
              className="flex px-3 gap-3 whil items-center w-full h-12  text-2xl hover:bg-slate-400 hover:text-slate-900 duration-300"
            >
              <Icon
                icon={`${item.icon}`}
                fontSize={26}
              />
              <button>{item.title}</button>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
