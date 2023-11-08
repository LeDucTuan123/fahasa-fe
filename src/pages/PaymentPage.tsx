import React from 'react';
import { Helmet } from 'react-helmet-async';
import FormPayment from 'src/sections/e-commerce/payment';

export default function PaymentPage() {
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <FormPayment />
    </>
  );
}
