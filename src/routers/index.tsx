import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';
import { Cart, DetailProductPage, Error, HomePage, Login } from './elements';

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
        { path: '/*', element: <Error /> },
        { path: '/cart', element: <Cart/> }
      ],
    },
    // login
    {},
  ]);
}
