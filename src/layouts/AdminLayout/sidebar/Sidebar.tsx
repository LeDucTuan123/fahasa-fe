import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBarsStaggered,
  faBook,
  faCartShopping,
  faComment,
  faDashboard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const List_Item_Sidebar = [
  {
    id: 1,
    title: 'Dashboard',
    icon: faDashboard,
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Product',
    icon: faBook,
    path: '/admin/products',
  },
  {
    id: 3,
    title: 'User',
    icon: faUser,
    path: '/admin/user',
  },
  {
    id: 4,
    title: 'Feedback',
    icon: faComment,
    path: '/admin/feedback',
  },
  {
    id: 5,
    title: 'Order',
    icon: faCartShopping,
    path: '/admin/orther',
  },
];

export default function Sidebar() {
  return (
    <div className="p-3 flex h-full flex-col">
      <div className="flex h-14 mb-5 gap-5 items-center">
        <FontAwesomeIcon icon={faBarsStaggered} />
        <p className="text-2xl">Admin</p>
      </div>

      <div className="flex flex-col h-full bg-slate-100">
        {List_Item_Sidebar.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? 'bg-slate-400 text-white' : 'bg-white text-gray-700')}
          >
            <div
              key={item.id}
              className="flex px-3 gap-3 items-center w-full h-12 border-[1px] text-2xl hover:bg-slate-400 hover:text-white duration-300"
            >
              <FontAwesomeIcon icon={item.icon} />
              <button>{item.title}</button>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
