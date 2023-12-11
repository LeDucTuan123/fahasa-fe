import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
interface EditAddressProps {
  changeToList: () => void;
  id: string;
}

function EditAddress(props: EditAddressProps) {
  // các state để lưu địa chỉ
  const [listAddress, setListAddress] = useState<Array<any>>([]);
  const [listDistrics, setListDistrics] = useState<Array<any>>([]);
  const [listWards, setListWards] = useState<Array<any>>([]);
  const user: any = useSelector((state: RootState) => state.user.userData);

  const formik = useFormik({
    initialValues: {
      user: {
        id: user.id,
      },
      firstname: '',
      lastname: '',
      phone: '',
      city: 1,
      district: 6,
      ward: 199,
      address: '',
      isactive: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Thông tin này không được để trống'),
      lastname: Yup.string().required('Thông tin này không được để trống'),
      phone: Yup.string()
        .required('Thông tin này không được để trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Vui lòng nhập số điện thoại'),
      city: Yup.string().required('Thông tin này không được để trống'),
      district: Yup.string().required('Thông tin này không được để trống'),
      ward: Yup.string().required('Thông tin này không được để trống'),
      address: Yup.string().required('Thông tin này không được để trống'),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const foundAddress = user.listAddress.find((address: any) => address.id === props.id);

    const { city, district, ward } = foundAddress;

    // Tìm id của thành phố từ listAddress dựa trên Name
    const cityId = listAddress.find((item) => item.Name === city)?.Id;
    // Tìm id của quận/huyện từ listDistrics dựa trên Name
    const districtId = listDistrics.find((item) => item.Name === district)?.Id;
    // Tìm id của xã/phường từ listWards dựa trên Name
    const wardId = listWards.find((item) => item.Name === ward)?.Id;

    console.log(`City ID: ${cityId}`);
    console.log(`District ID: ${districtId}`);
    console.log(`Ward ID: ${wardId}`);

    formik.setValues({
      ...formik.values,
      firstname: foundAddress.firstname,
      lastname: foundAddress.lastname,
      phone: foundAddress.phone,
      address: foundAddress.address,
      isactive: foundAddress.isactive,
    });
  }, [props.id, user.listAddress, listAddress, listDistrics, listWards]);

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then((res) => setListAddress(res.data))
      .catch((error) => console.log(error));
  }, []);

  // hàm sẽ chạy khi chọn tỉnh thành
  function handleChangeCity(e: React.ChangeEvent<HTMLSelectElement>) {
    const c = listAddress.find((item) => {
      return item.Id === e.target.value;
    });

    if (c) {
      setListDistrics(c.Districts);
    } else {
      setListDistrics([]);
    }
    setListWards([]);
    formik.setFieldValue('city', e.target.value);
  }

  // hàm sẽ chạy khi chọn phường
  function handleChangeDistrict(e: React.ChangeEvent<HTMLSelectElement>) {
    const d = listDistrics.find((item) => {
      return item.Id === e.target.value;
    });
    if (d) {
      setListWards(d.Wards);
    } else {
      setListWards([]);
    }
    formik.setFieldValue('district', e.target.value);
  }
  // hàm sẽ chạy khi chọn xã
  function handleChangeWard(e: React.ChangeEvent<HTMLSelectElement>) {
    const w = listWards.find((item) => {
      return item.Id === e.target.value;
    });
    formik.setFieldValue('ward', e.target.value);
  }

  return (
    <>
      <div
        className="inline-flex items-center hover:cursor-pointer hover:font-bold"
        onClick={() => props.changeToList()}
      >
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          className="text-[#2489F4]"
        />
        <span className="text-[#2489F4] inline-block">Quay lại</span>
      </div>
      <div className="p-5 shadow-lg w-full">
        <h1 className="uppercase text-[#c92127] font-bold text-lg">Cập nhật địa chỉ </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 "
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <h3 className="text-lg">Thông tin liên hệ</h3>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  name="lastname"
                  placeholder="Tên*"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                <div className="py-2 px-1">
                  {/* Kiểm tra nếu đã có giá trị firstname thì không hiển thị lỗi */}
                  {formik.touched.lastname && typeof formik.errors.lastname === 'string' ? (
                    <p className="text-red-500 text-sm">{formik.errors.lastname}</p>
                  ) : null}
                </div>
              </div>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  name="firstname"
                  placeholder="Họ*"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                <div className="py-2 px-1">
                  {formik.touched.firstname && typeof formik.errors.firstname === 'string' ? (
                    <p className="text-red-500 text-sm">{formik.errors.firstname}</p>
                  ) : null}
                </div>
              </div>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  name="phone"
                  placeholder="Ví dụ: 0979123xxx (10 ký tự số)"
                  maxLength={10}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <div className="py-2 px-1">
                  {formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg">Địa chỉ</h3>
              <div className="mt-5">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  name="address"
                  placeholder="Địa chỉ*"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <div className="py-2 px-1">
                  {formik.errors.address && <p className="text-red-500 text-sm">{formik.errors.address}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Tỉnh/Thành phố*</label>
                <select
                  value={formik.values.city}
                  onChange={(e) => handleChangeCity(e)}
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                  {listAddress &&
                    listAddress.map((item) => {
                      return (
                        <option
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.Name}
                        </option>
                      );
                    })}
                </select>
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500">{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Quận/Huyện*</label>
                <select
                  value={formik.values.district}
                  // disabled={!formik.values.city} // Disable khi chưa chọn thành phố
                  onChange={(e) => handleChangeDistrict(e)}
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                  {listDistrics &&
                    listDistrics.map((item) => {
                      return (
                        <option
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.Name}
                        </option>
                      );
                    })}
                </select>
                {formik.touched.district && formik.errors.district ? (
                  <div className="text-red-500">{formik.errors.district}</div>
                ) : null}
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Xã/Phường*</label>
                <select
                  value={formik.values.ward}
                  // disabled={!formik.values.district} // Disable khi chưa chọn quận/huyện
                  onChange={(e) => handleChangeWard(e)}
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                  {listWards &&
                    listWards.map((item) => {
                      return (
                        <option
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.Name}
                        </option>
                      );
                    })}
                </select>
                {formik.touched.ward && formik.errors.ward ? (
                  <div className="text-red-500">{formik.errors.ward}</div>
                ) : null}
              </div>
              <div className="mt-5">
                <label>
                  <input
                    className=" border-b-2 mr-3"
                    type="checkbox"
                    name="isactive"
                    checked={formik.values.isactive}
                    onChange={(e) => formik.setFieldValue('isactive', e.target.checked)}
                  />
                  Sử dụng như Địa chỉ thanh toán mặc định của tôi
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="border py-2 px-14 bg-[#c92127] text-white font-bold rounded-lg"
            >
              Lưu địa chỉ
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAddress;
