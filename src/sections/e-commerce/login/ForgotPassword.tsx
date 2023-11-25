import { Icon } from '@iconify/react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgotPassword({ onClose }: { onClose: any }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [otpMessage, setOtpMessage] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);

  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isPassEnabled, setIsPassEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = () => {
    if (email.trim() === '') {
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
        .post('http://localhost:8080/api/v1/user/reset-password/request', { email })
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
      .post('http://localhost:8080/api/v1/user/reset-password/validate', { email, otp })
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

  const handleForgotPassword = () => {
    axios
      .post('http://localhost:8080/api/v1/user/reset-password/update-password', { email, newPassword })
      .then((response) => {
        // Xử lý kết quả nếu cần
        if (response.status === 200) {
          toast.success('Mật khẩu đã được cập nhật thành công');
          onClose();
        }
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <div className="bg-black bg-opacity-25 backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full">
      <div className="relative p-4 w-full max-w-[500px] max-h-full rounded-2xl bg-white">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">KHÔI PHỤC MẬT KHẨU</h3>
          <button
            onClick={onClose}
            type="button"
            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Icon
              icon="octicon:x-16"
              height="24"
            />
            <span className="sr-only">Close modal</span>
          </button>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                <div>
                  <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Mật khẩu</label>
                  <input
                    className="w-full p-2 rounded-xl border disabled:bg-gray-300 disabled:border-none"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    disabled={!isPassEnabled}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    disabled={!isPassEnabled}
                    onClick={handleForgotPassword}
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
                    placeholder="Nhập Email đã đăng ký"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              <div>
                <label className="pt-4 pb-2 px-1 text-lg block font-medium text-gray-900 ">Mật khẩu</label>
                <input
                  className="w-full p-2 rounded-xl border disabled:bg-gray-300 disabled:border-none"
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  disabled={!isPassEnabled}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  disabled={!isPassEnabled}
                  onClick={handleForgotPassword}
                  className="bg-[#002d74] mt-5 w-[150px] rounded-xl text-white py-2 hover:scale-105 duration-300 disabled:bg-gray-300 disabled:hover:scale-100"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
