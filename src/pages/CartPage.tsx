import React from 'react'
import { Helmet } from 'react-helmet-async'
import CartView from 'src/sections/e-commerce/view/CartView'

export default function CartPage() {
  return (
    <>
     <Helmet>
        <title>Giỏ hàng</title>
     </Helmet>

     <CartView/>
    </>
  )
}
