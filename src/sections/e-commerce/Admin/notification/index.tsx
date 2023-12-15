import React from 'react';
import FormNotification from './FormNotification';
import { Icon } from '@iconify/react';

export default function Notification() {
  return (
    <>
      <p className="text-xl pb-5 uppercase items-center font-bold ">Quản lý Thông báo</p>
      <FormNotification />
    </>
  );
}
