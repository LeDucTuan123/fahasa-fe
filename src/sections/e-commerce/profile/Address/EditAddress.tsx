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
      city: '',
      district: '',
      ward: '',
      address: '',
      isactive: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Họ không được để trống'),
      lastname: Yup.string().required('Tên không được để trống'),
      phone: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),
      city: Yup.string().required('Tỉnh/Thành phố là bắt buộc'),
      district: Yup.string().required('Quận/Huyện là bắt buộc'),
      ward: Yup.string().required('Xã/Phường là bắt buộc'),
      address: Yup.string().required('Địa chỉ không được để trốngg'),
    }),
    onSubmit: async (values) => {
      // Lấy obj chứa thông tin của tỉnh/thành phố, quận/huyện, xã/phường từ listAddress
      const selectedCity = listAddress.find((item) => item.Id === values.city);
      const selectedDistrict = selectedCity?.Districts.find((item: any) => item.Id === values.district);
      const selectedWard = selectedDistrict?.Wards.find((item: any) => item.Id === values.ward);

      // Tạo obj mới chỉ chứa tên của tỉnh/thành phố, quận/huyện, xã/phường
      const formattedValues = {
        ...values,
        city: selectedCity?.Name || '', // Lưu tên của tỉnh/thành phố
        district: selectedDistrict?.Name || '', // Lưu tên của quận/huyện
        ward: selectedWard?.Name || '', // Lưu tên của xã/phường
      };

      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/user/rest/address/update/${props.id}`,
          formattedValues,
        );
        // Xử lý response nếu cần
        console.log('Update success:', response.data);
        // Hiển thị thông báo hoặc thực hiện các hành động sau khi update thành công
        toast.success('Đã cập nhật địa chỉ thành công');
        window.location.reload();
      } catch (error) {
        // Xử lý lỗi nếu request không thành công
        console.error('Update failed:', error);
        // Hiển thị thông báo hoặc xử lý lỗi khi update không thành công
        toast.error('Cập nhật địa chỉ không thành công');
      }
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
      {/* <div
        className="inline-flex items-center hover:cursor-pointer hover:font-bold"
        onClick={() => props.changeToList()}
      >
        <Icon
          icon="material-symbols:keyboard-arrow-left"
          className="text-[#2489F4]"
        />
        <span className="text-[#2489F4] inline-block">Quay lại</span>
      </div> */}
      <div className="p-5 shadow-lg w-full">
        <h1 className="uppercase text-[#c92127] font-bold text-lg">Cập nhật địa chỉ </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 "
        >
          <div className="grid grid-cols-2 gap-7">
            <div className="">
              <h3 className="text-lg font-semibold mb-6">Thông tin người nhận hàng</h3>
              <div className="grid grid-cols-2 gap-3 justify-center items-center">
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Tên</span> <span className="text-red-500">*</span>
                  </div>
                  <input
                    className="outline-none block rounded-md text-sm font-medium placeholder:text-slate-400 w-full"
                    type="text"
                    name="lastname"
                    placeholder="Vui lòng nhập tên"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                  />
                  <div className="h-[23px] px-1">
                    {/* Kiểm tra nếu đã có giá trị firstname thì không hiển thị lỗi */}
                    {formik.touched.lastname && typeof formik.errors.lastname === 'string' ? (
                      <p className="text-red-500 text-sm">{formik.errors.lastname}</p>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Họ</span> <span className="text-red-500">*</span>
                  </div>
                  <input
                    className="outline-none rounded-md text-sm font-medium placeholder:text-slate-400 w-full"
                    type="text"
                    name="firstname"
                    placeholder="Vui lòng nhập họ"
                    value={formik.values.firstname}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  <div className="h-[23px] px-1">
                    {formik.touched.firstname && typeof formik.errors.firstname === 'string' ? (
                      <p className="text-red-500 text-sm">{formik.errors.firstname}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <span className="font-medium">Số điện thoại</span> <span className="text-red-500">*</span>
                </div>
                <input
                  className="outline-none rounded-md text-sm font-medium placeholder:text-slate-400 w-full"
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  maxLength={10}
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
                <div className="h-[23px] px-1">
                  {formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Địa chỉ nhận hàng</h3>
              <div className="grid grid-cols-2 gap-3 justify-center items-center">
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Địa chỉ</span> <span className="text-red-500">*</span>
                  </div>
                  <input
                    className="outline-none rounded-md text-sm font-medium placeholder:text-slate-400 w-full"
                    type="text"
                    name="address"
                    placeholder="Số nhà, tên đường.."
                    value={formik.values.address}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  <div className="h-[23px] px-1">
                    {formik.errors.address && <p className="text-red-500 text-sm">{formik.errors.address}</p>}
                  </div>
                </div>
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Tỉnh/Thành phố</span> <span className="text-red-500">*</span>
                  </div>
                  <select
                    value={formik.values.city}
                    onChange={(e) => handleChangeCity(e)}
                    className="outline-none w-full rounded-md text-sm font-medium placeholder:text-slate-400"
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
                  <div className="h-[23px] px-1 text-sm">
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-red-500">{formik.errors.city}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 justify-center items-center">
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Quận/Huyện</span> <span className="text-red-500">*</span>
                  </div>
                  <select
                    value={formik.values.district}
                    disabled={!formik.values.city} // Disable khi chưa chọn thành phố
                    onChange={(e) => handleChangeDistrict(e)}
                    className="outline-none w-full rounded-md text-sm font-medium placeholder:text-slate-400"
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
                  <div className="h-[23px] px-1 text-sm">
                    {formik.touched.district && formik.errors.district ? (
                      <div className="text-red-500">{formik.errors.district}</div>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <div className="mb-2">
                    <span className="font-medium">Xã/Phường</span> <span className="text-red-500">*</span>
                  </div>
                  <select
                    value={formik.values.ward}
                    disabled={!formik.values.district} // Disable khi chưa chọn quận/huyện
                    onChange={(e) => handleChangeWard(e)}
                    className="outline-none w-full rounded-md text-sm font-medium placeholder:text-slate-400"
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
                  <div className="h-[23px] px-1 text-sm">
                    {formik.touched.ward && formik.errors.ward ? (
                      <div className="text-red-500">{formik.errors.ward}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2">
                <div></div>
                <label className="flex justify-end items-center font-medium cursor-pointer">
                  <input
                    className="mx-3 cursor-pointer"
                    type="checkbox"
                    name="isactive"
                    checked={formik.values.isactive}
                    onChange={(e) => formik.setFieldValue('isactive', e.target.checked)}
                  />
                  Đặt làm mặc định
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => props.changeToList()}
              className="border py-2 px-8 border-[#1230b0] text-[#1230b0] font-bold rounded-md"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="border py-2 px-10 bg-[#1230b0] text-white font-bold rounded-md"
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
