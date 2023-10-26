import { Helmet } from 'react-helmet-async';
import Profile from 'src/sections/e-commerce/profile/Profile';

function ProfilePage() {
  return (
    <>
      <Helmet>Thông tin người dùng</Helmet>

      <Profile />
    </>
  );
}

export default ProfilePage;
