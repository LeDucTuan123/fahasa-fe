import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ChangeEmail from './ChangeEmail';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getUser } from 'src/redux/slice/userSlice';
import { setIsLogin } from 'src/redux/slice/authSlice';
interface formProps {
  changeToPass: () => void;
}

function FormProfile(props: formProps) {
  function changePass() {
    props.changeToPass();
  }

  const dispatch = useAppDispatch();

  const userData: any = useSelector((state: RootState) => state.user.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

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

  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }
    if (isLogin === true || token) {
      dispatch(getUser());
    }
  }, [dispatch]);

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
              value={profile.lastname}
              onChange={(e) => handleInputChange(e, 'lastname')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Tên:</label>
            <input
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md"
              type="text"
              placeholder="Nhập tên"
              value={profile.firstname}
              onChange={(e) => handleInputChange(e, 'firstname')}
            />
          </div>
          <div className="py-3">
            <label className="mr-5 w-[180px] inline-block font-medium">Số điện thoại:</label>
            <input
              disabled
              className="w-3/4 border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md disabled:bg-slate-300"
              type="text"
              placeholder="Chưa có số điện thoại"
              value={profile.phone}
              onChange={(e) => handleInputChange(e, 'phone')}
            />
          </div>
          <div className="py-3 flex">
            <label className="mr-5 w-[180px] inline-block font-medium">Email:</label>
            <div className="relative w-3/4">
              <input
                disabled
                className="w-full border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md disabled:bg-slate-300"
                type="email"
                placeholder="Chưa có email"
                value={profile.email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
              <span
                onClick={() => {
                  setOpenModal(true);
                }}
                className="absolute cursor-pointer top-1/2 text-indigo-500 text-sm font-bold -translate-y-1/2 right-3"
              >
                Thay đổi
              </span>
            </div>
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
      {openModal && <ChangeEmail onClose={() => setOpenModal(false)} />}
    </>
  );
}

export default FormProfile;
