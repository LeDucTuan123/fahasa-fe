import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../layouts/main'
import { DetailProductPage, Error, HomePage } from './elements'


export default function Route() {
  return useRoutes([

    //Main
    {
        element: <MainLayout />,
        children: [
            {element: <HomePage />, index: true},
            {path: '/', element: <HomePage />},
            {path: '/detailproduct', element: <DetailProductPage />},
            {path: '/*', element: <Error />}
        ]
    }
  ])
}
