import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Dashboard } from 'src/sections/e-commerce/Admin';

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>

      <Dashboard />
    </>
  );
}
