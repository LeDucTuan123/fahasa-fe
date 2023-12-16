import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';

import {
  AdminBill,
  AdminCategory,
  AdminDashboard,
  AdminOrther,
  AdminProduct,
  AdminSupport,
  AdminUser,
  AdminVoucher,
  AdminNotification,
  Cart,
  DetailProductPage,
  Error,
  HomePage,
  Login,
  Payment,
  Products,
  Profile,
  ProfileAddress,
  ProfileMyvoucher,
  ProfileNotification,
  ProfileOrder,
  Register,
  SpinLuckyVoucher,
} from './elements';

import AdminLayout from 'src/layouts/AdminLayout';
import ProfileLayout from 'src/layouts/ProfileLayout';
import { SpinLuckyLayout } from 'src/layouts/spinlucky-layout';
import PaymentSuccess from 'src/sections/e-commerce/PaymentSuccess/PaymentSuccess';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export default function Route() {
  const user: any = useSelector((state: RootState) => state.user.userData);

  //redirect authority
  useEffect(() => {
    if (user && user.role === 'ADMIN') localStorage.setItem('authority', user.role);
  }, [user, user.role]);

  return useRoutes([
    //Main
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: '/', element: <HomePage /> },
        { path: '/detailproduct/:id', element: <DetailProductPage /> },
        { path: '/category/:level1', element: <Products /> },
        { path: '/category/:level1/:level2', element: <Products /> },
        { path: '/category/:level1/:level2/:level3', element: <Products /> },
        { path: '/products/:search', element: <Products /> },
        { path: '/*', element: <Error /> },
        { path: '/cart', element: <Cart /> },
        { path: '/payment', element: <Payment /> },
        { path: '/success/:id', element: <PaymentSuccess /> },
      ],
    },
    {
      element: <SpinLuckyLayout />,
      children: [
        { element: <SpinLuckyVoucher />, index: true },
        { path: '/spin/lucky', element: <SpinLuckyVoucher /> },
      ],
    },
    // login
    {
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    //Admin layout
    {
      element: <AdminLayout />,
      path: '/admin',
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'products', element: <AdminProduct /> },
        { path: 'user', element: <AdminUser /> },
        { path: 'bill', element: <AdminBill /> },
        { path: 'orther', element: <AdminOrther /> },
        { path: 'voucher', element: <AdminVoucher /> },
        { path: 'notification', element: <AdminNotification /> },
        { path: 'category', element: <AdminCategory /> },
        { path: 'support', element: <AdminSupport /> },
      ],
    },
    // profile layout
    {
      path: '/member',
      element: <ProfileLayout />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'address', element: <ProfileAddress /> },
        { path: 'order', element: <ProfileOrder /> },
        { path: 'notification', element: <ProfileNotification /> },
        { path: 'myvoucher', element: <ProfileMyvoucher /> },
      ],
    },
  ]);
}
