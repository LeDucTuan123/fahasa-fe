import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';

import { AdminDashboard, AdminFeedback, AdminOrther, AdminProduct, AdminUser, Cart } from './elements';

import {
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
                { path: '/detailproduct', element: <DetailProductPage /> },
                { path: '/products', element: <Products /> },
                { path: '/*', element: <Error /> },
                { path: '/cart', element: <Cart /> },
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
                { path: '/admin/feedback', element: <AdminFeedback /> },
                { path: '/admin/orther', element: <AdminOrther /> },
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
