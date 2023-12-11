import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
// import { getUser } from 'src/redux/slice/userSlice';
import { setIsLogin } from 'src/redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

export default function ChangeEmail({ onClose }: { onClose: any }) {
  const dispatch = useAppDispatch();

  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [otpMessage, setOtpMessage] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);

  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isPassEnabled, setIsPassEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const user: any = useSelector((state: RootState) => state.user.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const [email, setEmail] = useState(user.email);

  const handleSendOTP = () => {
    if (newEmail.trim() === '') {
      setEmailError('Vui lòng nhập email');
    } else {
      // Gửi mã OTP và xử lý logic khi email không trống
      // Reset lỗi nếu có
      setEmailError('');
      // Tiến hành gửi request POST với Axios
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      axios
        .post('http://localhost:8080/api/v1/user/change-email/request', { newEmail })
        .then((response) => {
          // Xử lý kết quả nếu cần
          if (!response.data.success) {
            setResponseMessage(response.data.message);
            setIsSuccess(true);
            setIsOtpEnabled(true);
          } else {
            setIsSuccess(false);
            setResponseMessage(response.data.message);
          }
        })
        .catch((error) => {
          setIsSuccess(false);
          setResponseMessage(error.response.data.message);
        });
    }
  };

  const handleValiOtp = () => {
    axios
      .post('http://localhost:8080/api/v1/user/change-email/validate', { newEmail, otp })
      .then((response) => {
        // Xử lý kết quả nếu cần
        if (!response.data.success) {
          setOtpMessage(response.data.message);
          setOtpSuccess(true);
          setIsPassEnabled(true);
        } else {
          setOtpSuccess(false);
          setOtpMessage(response.data.message);
        }
      })
      .catch((error) => {
        setOtpSuccess(false);
        setOtpMessage(error.response.data.message);
      });
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setIsLogin(false));
    window.location.href = '/';
  };

  const handleChangeEmail = () => {
    axios
      .post('http://localhost:8080/api/v1/user/change-email/update', { email, newEmail })
      .then((response) => {
        // Xử lý kết quả nếu cần
        if (response.status === 200) {
          toast.success('Email đã được thay đổi thành công');
          toast.warning('Hãy đăng nhập lại!');
          //   onClose();
          logout();
        }
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (token) {
  //     dispatch(setIsLogin(true));
  //   }

  //   if (isLogin) {
  //     navigate('/');
  //   }
  // }, [dispatch, isLogin, user]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(setIsLogin(true));
  //   }
  //   if (isLogin === true || token) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch]);

  return (
    <div className="bg-black bg-opacity-25 backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full">
      <div className="relative p-4 w-full max-w-[500px] max-h-full rounded-2xl bg-white">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-center p-3 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">THAY ĐỔI EMAIL</h3>
        </div>
        {/*  */}
        {isLoading ? (
          <>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                action=""
                className="flex flex-col gap-4 px-3"
              >
                <div>
                  <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Email</label>
                  <div
                    className={`relative border rounded-xl ${isSuccess && responseMessage ? 'border-green-500' : ''} ${
                      emailError || (!isSuccess && responseMessage) ? 'border-red-500' : ''
                    }`}
                  >
                    <input
                      className="w-3/4 p-2 border-none outline-none rounded-xl text-base"
                      type="email"
                      name="email"
                      placeholder="Nhập Email đã đăng ký"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <span
                      onClick={handleSendOTP}
                      className="absolute cursor-pointer top-1/2 text-indigo-400 -translate-y-1/2 right-3"
                    >
                      Gửi mã OTP
                    </span>
                  </div>
                  {emailError && <p className="text-red-500 px-1 pt-2">{emailError}</p>}
                  <Icon
                    icon="eos-icons:three-dots-loading"
                    className="text-3xl"
                  />
                </div>
                <div>
                  <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Mã xác nhận OTP</label>
                  <div
                    className={`relative border rounded-xl  ${!isOtpEnabled ? 'bg-gray-300' : ''} ${
                      otpSuccess && otpMessage ? 'border-green-500' : ''
                    } ${!otpSuccess && otpMessage ? 'border-red-500' : ''}`}
                  >
                    <input
                      className="w-3/4 p-2 border-none outline-none rounded-xl text-base disabled:bg-gray-300"
                      type="text"
                      placeholder="6 ký tự"
                      maxLength={6}
                      disabled={!isOtpEnabled}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {isOtpEnabled && (
                      <span
                        onClick={handleValiOtp}
                        className="absolute cursor-pointer top-1/2 text-indigo-400 -translate-y-1/2 right-3"
                      >
                        Kiểm tra
                      </span>
                    )}
                  </div>
                  {otpMessage && (
                    <p className={`px-1 pt-2 ${otpSuccess ? 'text-green-500' : 'text-red-500'}`}>{otpMessage}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    disabled={!isPassEnabled}
                    onClick={handleChangeEmail}
                    className="bg-[#002d74] mt-5 w-[150px] rounded-xl text-white py-2 hover:scale-105 duration-300 disabled:bg-gray-300 disabled:hover:scale-100"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          // Hiển thị nội dung khi không còn loading
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              action=""
              className="flex flex-col gap-4 px-3"
            >
              <div>
                <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Email</label>
                <div
                  className={`relative border rounded-xl ${isSuccess && responseMessage ? 'border-green-500' : ''} ${
                    emailError || (!isSuccess && responseMessage) ? 'border-red-500' : ''
                  }`}
                >
                  <input
                    className="w-3/4 p-2 border-none outline-none rounded-xl text-base"
                    type="email"
                    name="email"
                    placeholder="Nhập Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <span
                    onClick={handleSendOTP}
                    className="absolute cursor-pointer top-1/2 text-indigo-400 -translate-y-1/2 right-3"
                  >
                    Gửi mã OTP
                  </span>
                </div>
                {emailError && <p className="text-red-500 px-1 pt-2">{emailError}</p>}
                {responseMessage && (
                  <p className={`px-1 pt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{responseMessage}</p>
                )}
              </div>
              <div>
                <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Mã xác nhận OTP</label>
                <div
                  className={`relative border rounded-xl  ${!isOtpEnabled ? 'bg-gray-300' : ''} ${
                    otpSuccess && otpMessage ? 'border-green-500' : ''
                  } ${!otpSuccess && otpMessage ? 'border-red-500' : ''}`}
                >
                  <input
                    className="w-3/4 p-2 border-none outline-none rounded-xl text-base disabled:bg-gray-300"
                    type="text"
                    placeholder="6 ký tự"
                    maxLength={6}
                    disabled={!isOtpEnabled}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  {isOtpEnabled && (
                    <span
                      onClick={handleValiOtp}
                      className="absolute cursor-pointer top-1/2 text-indigo-400 -translate-y-1/2 right-3"
                    >
                      Kiểm tra
                    </span>
                  )}
                </div>
                {otpMessage && (
                  <p className={`px-1 pt-2 ${otpSuccess ? 'text-green-500' : 'text-red-500'}`}>{otpMessage}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  disabled={!isPassEnabled}
                  onClick={handleChangeEmail}
                  className="bg-[#002d74] mt-5 w-[200px] rounded-xl font-bold text-white py-2 hover:scale-105 duration-300 disabled:text-gray-700 disabled:bg-gray-300 disabled:hover:scale-100"
                >
                  Xác nhận
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="border-[#002d74] border-2 w-[200px] font-bold rounded-xl text-[#002d74] py-2 hover:scale-105 duration-300 disabled:bg-gray-300 disabled:hover:scale-100"
                >
                  Trở về
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
