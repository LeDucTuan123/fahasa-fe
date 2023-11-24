import { Helmet } from 'react-helmet-async';
import { Myvoucher } from 'src/sections/e-commerce/profile/Myvoucher';

function ProfileOrderPage() {
  return (
    <>
      <Helmet>Voucher người dùng</Helmet>

      <Myvoucher />
    </>
  );
}

export default ProfileOrderPage;
