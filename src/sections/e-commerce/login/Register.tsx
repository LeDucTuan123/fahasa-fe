import { Link } from 'src/components/Link';
import imgLogin from '../../../assets/image/login-page.jpg';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập email hợp lệ'),
      phone: Yup.string()
        .required('Số điện thoại không được bỏ trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Vui lòng nhập số điện thoại'),
      password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(4, 'Tối thiểu là 4 ký tự')
        .matches(/^[a-zA-Z0-9]*$/, 'Chỉ nhập số và chữ'),
      confirmPassword: Yup.string()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận phải giống mật khẩu')
        .nullable(),
    }),
    onSubmit: async (values) => {
      try {
        // Gửi yêu cầu POST đến API đăng ký
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', values);

        if (response.status >= 200 && response.status < 300) {
          toast.success('Đăng ký thành công');
          navigate('/login');
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        // Xử lý lỗi nếu có
        toast.error(error.message);
        console.error('Lỗi khi đăng ký:', error.message);
      }
    },
  });

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadaow-lg max-w-4xl p-5 flex-row-reverse">
          {/* form */}
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-[#002d74] ">Đăng ký</h2>
            <p className="text-sm mt-4 text-[#002d74]">Tạo cho mình một tài khoản nào!</p>

            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="register-from flex flex-col gap-4"
            >
              <div className="">
                <input
                  className={`p-2 rounded-xl mt-8 border w-full outline-none ${
                    formik.errors.email ? 'border-red-500' : ''
                  }`}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                <div className="py-2 px-1">
                  {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                </div>
              </div>
              <div>
                <input
                  className={`p-2 rounded-xl border w-full outline-none ${formik.errors.phone ? 'border-red-500' : ''}`}
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="Số điện thoại"
                />
                <div className="py-2 px-1">
                  {formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    className={`p-2 rounded-xl border w-full outline-none ${
                      formik.errors.password ? 'border-red-500' : ''
                    }`}
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Mật khẩu"
                  />
                  <Icon
                    icon="ph:eye-light"
                    className="absolute top-1/2 text-gray-500 -translate-y-1/2 right-3"
                  />
                </div>
                <div className="py-2 px-1">
                  {formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
                </div>
              </div>
              <div>
                <input
                  className={`p-2 rounded-xl border w-full outline-none ${
                    formik.errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="Nhập lại mật khẩu"
                />
                <div className="py-2 px-1">
                  {formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Đăng ký
              </button>
            </form>

            <p className="mt-5 text-sm border-b border-gray-400 py-4 cursor-pointer hover:text-[#547acc] duration-300">
              Quên mật khẩu?
            </p>

            <div className="mt-3 text-xs flex justify-between items-center">
              <p>Bạn đã có tài khoản?</p>
              <Link
                to="/login"
                className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"
              >
                Đăng nhập
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
