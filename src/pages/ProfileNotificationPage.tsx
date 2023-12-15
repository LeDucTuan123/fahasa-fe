import { Helmet } from 'react-helmet-async';
import { Notification } from 'src/sections/e-commerce/profile/Notification';

function ProfileNotificationPage() {
  return (
    <>
      <Helmet>Thông báo</Helmet>

      <Notification />
    </>
  );
}

export default ProfileNotificationPage;
