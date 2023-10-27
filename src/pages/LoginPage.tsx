import React from 'react';
import { Helmet } from 'react-helmet-async';
import Login from 'src/sections/e-commerce/login/Login';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Login />
    </>
  );
}
