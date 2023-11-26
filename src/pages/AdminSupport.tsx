import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SupportAdmin } from 'src/sections/e-commerce/BoxChat/supportAdmin';

export default function AdminSupport() {
  return (
    <>
      <Helmet>
        <title>Hỗ trợ khách hàng</title>
      </Helmet>

      <SupportAdmin />
    </>
  );
}
