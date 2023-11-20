import { Link } from 'src/components/Link';
import imgLogin from '../../../assets/image/login-page.jpg';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { login, setIsLogin } from 'src/redux/slice/authSlice';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getUser } from 'src/redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Kiểm tra giá trị của email và password
    if (email === '' || password === '') {
      // Hiển thị lỗi bên dưới form
      const errorElement = document.querySelector('#error');

      if (errorElement && errorElement.classList) {
        errorElement.classList.remove('hidden');
        errorElement.textContent = 'Vui lòng nhập email và mật khẩu';
      }

      // Chặn không cho submit form
      return;
    } else {
      // Ẩn lỗi
      const errorElement = document.querySelector('#error');
      errorElement?.classList.add('hidden');
    }

    dispatch(login({ email, password }));
    dispatch(getUser());
  };
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(setIsLogin(true));
    }
    if (isLogin) {
      navigate('/');
    }
  }, [dispatch, isLogin]);

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadaow-lg max-w-4xl p-5">
          {/* form */}
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-[#002d74] ">Đăng nhập</h2>
            <p className="text-sm mt-4 text-[#002d74]">
              Hãy bắt đầu với BOOK nào!{' '}
              <span className="pl-3 hover:text-[#547acc] underline">
                <Link
                  to="/"
                  className=" "
                >
                  Trang chủ
                </Link>
              </span>
            </p>

            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleLogin}
            >
              <input
                className="p-2 rounded-xl mt-8 border"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl w-full border"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Icon
                  icon="ph:eye-light"
                  className="absolute top-1/2 text-gray-500 -translate-y-1/2 right-3"
                />
              </div>
              <div className="text-center">
                <p
                  id="error"
                  className="text-red-500 hidden"
                >
                  Vui lòng nhập email và mật khẩu
                </p>
                {error && <div className="text-red-500">{error}</div>}
              </div>
              <button
                type="submit"
                className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                {loading ? 'Đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white rounded-xl w-full py-2 mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
              <Icon
                icon="flat-color-icons:google"
                width="25"
                className="mr-3"
              />
              Đăng nhập với Google
            </button>

            <p className="mt-5 text-sm border-b border-gray-400 py-4 cursor-pointer hover:text-[#547acc] duration-300">
              Quên mật khẩu?
            </p>

            <div className="mt-3 text-xs flex justify-between items-center">
              <p>Bạn chưa có tài khoản?</p>
              <Link
                to="/register"
                className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="h-full rounded-2xl"
              src={imgLogin}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
