import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PaymentSuccess } from 'src/routers/elements';

export default function PaymentSuccessPage() {
  return (
    <>
      <Helmet>
        <title>Payment success</title>
      </Helmet>

      <PaymentSuccess />
    </>
  );
}
