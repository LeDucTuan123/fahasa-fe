import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeView } from 'src/sections/e-commerce/view';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <HomeView />
    </>
  );
}
