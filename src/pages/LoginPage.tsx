import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginView from 'src/sections/e-commerce/view/LoginView';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}
