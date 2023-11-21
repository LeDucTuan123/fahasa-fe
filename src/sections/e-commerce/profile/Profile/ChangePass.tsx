import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface ChangePassProps {
  changeToForm: () => void;
}

function ChangePass(props: ChangePassProps) {
  const userData: any = useSelector((state: RootState) => state.user.userData);

  const formik = useFormik({
    initialValues: {
      email: userData.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('Thông tin này không thể để trống')
        .min(4, 'Tối thiểu là 4 ký tự')
        .matches(/^[a-zA-Z0-9]*$/, 'Chỉ nhập số và chữ'),
      newPassword: Yup.string()
        .required('Thông tin này không thể để trống')
        .min(4, 'Tối thiểu là 4 ký tự')
        .matches(/^[a-zA-Z0-9]*$/, 'Chỉ nhập số và chữ'),
      confirmPassword: Yup.string()
        .required('Thông tin này không thể để trống')
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận phải giống mật khẩu')
        .nullable(),
    }),
    onSubmit: async (values) => {
      axios
        .post('http://localhost:8080/api/v1/user/change-password', values)
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    },
  });

  return (
    <>
      <div
        className="inline-flex items-center hover:cursor-pointer hover:font-bold pt-2"
        onClick={() => props.changeToForm()}
      >
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          className="text-[#2489F4]"
        />
        <span className="text-[#2489F4] inline-block">Quay lại</span>
      </div>
      <div className="p-5 shadow-lg w-full rounded-lg">
        <h1 className="uppercase font-bold">Thay đổi mật khẩu</h1>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="mt-3"
        >
          <div className="py-3 flex">
            <label className="mr-5 w-[200px] inline-block font-medium">Mật khẩu hiện tại:</label>
            <div className="w-[70%]">
              <input
                className={`w-full border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md ${
                  formik.errors.currentPassword ? 'border-red-500' : ''
                }`}
                type="password"
                name="currentPassword"
                placeholder="Mật khẩu hiện tại"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
              />
              <div className="py-2 px-1">
                {formik.errors.currentPassword && (
                  <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
                )}
              </div>
            </div>
          </div>
          <div className="py-3 flex">
            <label className="mr-5 w-[200px] inline-block font-medium">Mật khẩu mới:</label>
            <div className="w-[70%]">
              <input
                className={`w-full border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md ${
                  formik.errors.newPassword ? 'border-red-500' : ''
                }`}
                type="password"
                name="newPassword"
                placeholder="Mật khẩu mới"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              <div className="py-2 px-1">
                {formik.errors.newPassword && <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>}
              </div>
            </div>
          </div>
          <div className="py-3 flex">
            <label className="mr-5 w-[200px] inline-block font-medium">Nhập lại mật khẩu mới:</label>
            <div className="w-[70%]">
              <input
                className={`w-full border p-2 pl-3 font-bold text-sm text-[#495057] outline-blue-500 rounded-md ${
                  formik.errors.confirmPassword ? 'border-red-500' : ''
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <div className="py-2 px-1">
                {formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="border py-2 px-14 bg-[#1230b0] text-white font-bold rounded-lg"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePass;
