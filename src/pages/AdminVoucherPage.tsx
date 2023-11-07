import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Voucher } from 'src/sections/e-commerce/Admin';

export default function AdminVoucherPage() {
  return (
    <>
      <Helmet>
        <title>Voucher</title>
      </Helmet>

      <Voucher />
    </>
  );
}
