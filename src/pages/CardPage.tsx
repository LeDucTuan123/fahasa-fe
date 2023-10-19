import React from 'react'
import { Helmet } from 'react-helmet-async'
import CardView from 'src/sections/e-commerce/view/CardView'

export default function CardPage() {
  return (
    <>
        <Helmet>
            <title>Giỏ hàng</title>
        </Helmet>

        <CardView />
    
    </>
  )
}
