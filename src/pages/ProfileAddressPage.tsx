import { Helmet } from 'react-helmet-async';
import Address from 'src/sections/e-commerce/profile/Address';

function ProfileAddressPage() {
  return (
    <>
      <Helmet>Địa chỉ người dùng</Helmet>

      <Address />
    </>
  );
}

export default ProfileAddressPage;
