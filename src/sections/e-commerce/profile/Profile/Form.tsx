import { RootState } from 'src/redux/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
interface formProps {
  changeToPass: () => void;
}

function FormProfile(props: formProps) {
  function changePass() {
    props.changeToPass();
  }

  const userData: any = useSelector((state: RootState) => state.user.userData);

  type UserProfile = {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    birthday: string;
    gender: string;
  };

  const initialProfile: UserProfile = {
    firstname: userData?.firstname || '',
    lastname: userData?.lastname || '',
    phone: userData?.phone || '',
    email: userData?.email || '',
    birthday: userData?.birthday || '',
    gender: userData?.gender || '',
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const onSave = (e: any) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/v1/user/change-info', profile)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload(); // Reload trang sau khi hiển thị thông báo trong một khoảng thời gian
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="uppercase font-bold">Thông tin tài khoản</h1>
        <form className="mt-3">
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Họ:</label>
            <input
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md"
              type="text"
              placeholder="Nhập họ"
              value={profile.firstname}
              onChange={(e) => handleInputChange(e, 'firstname')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Tên:</label>
            <input
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md"
              type="text"
              placeholder="Nhập tên"
              value={profile.lastname}
              onChange={(e) => handleInputChange(e, 'lastname')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Số điện thoại:</label>
            <input
              disabled
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md disabled:bg-gray-300"
              type="text"
              placeholder="Chưa có số điện thoại"
              value={profile.phone}
              onChange={(e) => handleInputChange(e, 'phone')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Email:</label>
            <input
              disabled
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md disabled:bg-gray-300"
              type="email"
              placeholder="Chưa có email"
              value={profile.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Giới tính:</label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === 'male'}
                onChange={(e) => handleInputChange(e, 'gender')}
              />{' '}
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === 'female'}
                onChange={(e) => handleInputChange(e, 'gender')}
              />{' '}
              Nữ
            </label>
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Ngày sinh:</label>
            <input
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md"
              type="date"
              value={profile.birthday}
              onChange={(e) => handleInputChange(e, 'birthday')}
            />
          </div>
          <div className="mt-5">
            <button
              className="border py-1 px-5 bg-[#1230b0] text-white font-semibold rounded-lg"
              onClick={changePass}
            >
              Đổi mật khẩu
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onSave}
              // Disable nút nếu không có sự thay đổi trong profile
              disabled={
                profile.firstname === initialProfile.firstname &&
                profile.lastname === initialProfile.lastname &&
                profile.phone === initialProfile.phone &&
                profile.email === initialProfile.email &&
                profile.gender === initialProfile.gender &&
                profile.birthday === initialProfile.birthday
              }
              className="border py-2 px-14 bg-[#1230b0] text-white font-bold rounded-lg disabled:bg-gray-400"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormProfile;
