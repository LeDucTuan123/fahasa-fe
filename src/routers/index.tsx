import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';

import {
  AdminBill,
  AdminDashboard,
  AdminOrther,
  AdminProduct,
  AdminUser,
  AdminVoucher,
  Cart,
  Payment,
  DetailProductPage,
  Error,
  HomePage,
  Login,
  Products,
  Profile,
  ProfileAddress,
  ProfileOrder,
  Register,
} from './elements';

import ProfileLayout from 'src/layouts/ProfileLayout';
import AdminLayout from 'src/layouts/AdminLayout';

export default function Route() {
  return useRoutes([
    //Main
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: '/', element: <HomePage /> },
        { path: '/detailproduct/:id', element: <DetailProductPage /> },
        { path: '/:level1', element: <Products /> },
        { path: '/:level1/:level2', element: <Products /> },
        { path: '/:level1/:level2/:level3', element: <Products /> },
        { path: '/products/:search', element: <Products /> },
        { path: '/*', element: <Error /> },
        { path: '/cart', element: <Cart /> },
        { path: '/payment', element: <Payment /> },
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
      children: [
        { path: '/admin/dashboard', element: <AdminDashboard /> },
        { path: '/admin/products', element: <AdminProduct /> },
        { path: '/admin/user', element: <AdminUser /> },
        { path: '/admin/bill', element: <AdminBill /> },
        { path: '/admin/orther', element: <AdminOrther /> },
        { path: '/admin/voucher', element: <AdminVoucher /> },
      ],
    },
    // profile layout
    {
      element: <ProfileLayout />,
      children: [
        { path: '/profile', element: <Profile /> },
        { path: '/address', element: <ProfileAddress /> },
        { path: '/order', element: <ProfileOrder /> },
      ],
    },
  ]);
}
