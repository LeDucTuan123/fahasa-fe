import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Orther } from 'src/sections/e-commerce/Admin';

export default function AdminOrther() {
  return (
    <>
      <Helmet>
        <title>Admin Orther</title>
      </Helmet>

      <Orther />
    </>
  );
}
