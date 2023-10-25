import { Helmet } from 'react-helmet-async';
import Order from 'src/sections/e-commerce/profile/Order';

function ProfileOrderPage() {
  return (
    <>
      <Helmet>Hóa đơn người dùng</Helmet>

      <Order />
    </>
  );
}

export default ProfileOrderPage;
