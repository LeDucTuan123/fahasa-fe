import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Feedback } from 'src/sections/e-commerce/Admin';

export default function AdminFeedback() {
  return (
    <>
      <Helmet>
        <title>Admin Feedback</title>
      </Helmet>

      <Feedback />
    </>
  );
}
