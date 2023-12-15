import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Notification } from 'src/sections/e-commerce/Admin';

export default function AdminNotificationPage() {
  return (
    <>
      <Helmet>
        <title>Notification</title>
      </Helmet>

      <Notification />
    </>
  );
}
