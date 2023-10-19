import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DetailProductView } from 'src/sections/e-commerce/view'

export default function DetailProductPage() {
  return (
    <>
    <Helmet>
        <title>Chi tiết sản phẩm</title>
    </Helmet>

    <DetailProductView />
    </>
  )
}
