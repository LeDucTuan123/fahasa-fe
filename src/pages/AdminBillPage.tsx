import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Bill } from 'src/sections/e-commerce/Admin';

export default function AdminBill() {
  return (
    <>
      <Helmet>
        <title>Admin Feedback</title>
      </Helmet>

      <Bill />
    </>
  );
}
