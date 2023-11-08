import React from 'react';
import FormVoucher from './FormVoucher';
import { Icon } from '@iconify/react';

export default function index() {
  return (
    <>
      <p className="text-xl pb-5 flex items-center gap-2">
        Quản lý Voucher{' '}
        <span>
          <Icon
            icon={'mdi:voucher'}
            fontSize={24}
          />{' '}
        </span>{' '}
      </p>
      <FormVoucher />
    </>
  );
}
