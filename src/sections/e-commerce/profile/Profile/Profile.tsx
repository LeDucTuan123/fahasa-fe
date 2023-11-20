import ChangePass from './ChangePass';
import { useState } from 'react';
import Form from './Form';

function Profile() {
  const [isChange, setIsChange] = useState(false);

  // thay đổi giữa form và list địa chỉ
  function changeToPass() {
    setIsChange(true);
  }

  function changeToForm() {
    setIsChange(false);
  }
  return <>{isChange ? <ChangePass changeToForm={changeToForm} /> : <Form changeToPass={changeToPass} />}</>;

}

export default Profile;
