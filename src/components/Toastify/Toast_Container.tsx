import React from 'react';
import { ToastContainer as Container } from 'react-toastify';

export default function ToastContainer() {
  return (
    <>
      <Container
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
