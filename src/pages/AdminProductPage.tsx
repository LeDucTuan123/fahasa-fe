import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Product } from 'src/sections/e-commerce/Admin';

export default function AdminProduct() {
  return (
    <>
      <Helmet>
        <title>Admin Product</title>
      </Helmet>

      <Product />
    </>
  );
}
