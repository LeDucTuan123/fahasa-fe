import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';

import { Cart } from './elements';

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
