import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/main';
import SingleLayout from '../layouts/singleMain';
import { DetailProductPage, Error, HomePage, Login, Products } from './elements';

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
      ],
    },
    // login
    {
      element: <SingleLayout />,
      children: [
        {path: '/login', element: <Login />},
        {path: '/register', element: 'Loading... register'}
      ]
    },
  ]);
}
