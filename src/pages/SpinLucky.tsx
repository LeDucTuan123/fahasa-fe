import { Helmet } from 'react-helmet-async';
import SpinLuckyVoucher from 'src/sections/e-commerce/spinLucky/SpinLuckyVoucher';

function SpinLucky() {
  return (
    <>
      <Helmet>Vong quay may man</Helmet>

      <SpinLuckyVoucher />
    </>
  );
}

export default SpinLucky;
