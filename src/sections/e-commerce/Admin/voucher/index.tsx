import React from 'react';
import FormVoucher from './FormVoucher';
import { Icon } from '@iconify/react';

export default function index() {
  return (
    <>
      <p className="text-xl pb-5 font-bold uppercase flex items-center gap-2">Quản lý Voucher</p>
      <FormVoucher />
    </>
  );
}
