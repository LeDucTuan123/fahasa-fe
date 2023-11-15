import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Category } from 'src/sections/e-commerce/Admin';

export default function AdminCategoryPage() {
  return (
    <>
      <Helmet>
        <title>Quản lý thể loại</title>
      </Helmet>

      <Category />
    </>
  );
}
