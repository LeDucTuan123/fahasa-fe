import { useRoutes } from 'react-router-dom';
import AdminLayout from 'src/layouts/AdminLayout';
import ProfileLayout from 'src/layouts/ProfileLayout';
import MainLayout from '../layouts/main';
import {
  AdminDashboard,
  AdminFeedback,
  AdminProduct,
  AdminUser,
  DetailProductPage,
  Error,
  HomePage,
  Login,
  Products,
  Profile,
  ProfileAddress,
  ProfileOrder,
} from './elements';
import AdminOrther from 'src/pages/AdminOrtherPage';

export default function Route() {
  return useRoutes([
    //Main
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: '/', element: <HomePage /> },
        { path: '/detailproduct', element: <DetailProductPage /> },
        { path: '/login', element: <Login /> },
        { path: '/products', element: <Products /> },
        { path: '/*', element: <Error /> },
      ],
    },
    // login
    {},
    // profile layout
    {
      element: <ProfileLayout />,
      children: [
        { path: '/profile', element: <Profile /> },
        { path: '/address', element: <ProfileAddress /> },
        { path: '/order', element: <ProfileOrder /> },
      ],
    },
    // Admin layout
    {
      element: <AdminLayout />,
      children: [
        { path: '/admin/dashboard', element: <AdminDashboard /> },
        { path: '/admin/products', element: <AdminProduct /> },
        { path: '/admin/user', element: <AdminUser /> },
        { path: '/admin/feedback', element: <AdminFeedback /> },
        { path: '/admin/orther', element: <AdminOrther /> },
      ],
    },
  ]);
}
