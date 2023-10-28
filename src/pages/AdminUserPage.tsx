import React from 'react';
import { Helmet } from 'react-helmet-async';
import { User } from 'src/sections/e-commerce/Admin';

export default function AdminUser() {
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <User />
    </>
  );
}
