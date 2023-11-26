import axios from 'axios';
import { useEffect, useState } from 'react';

interface FormProps {
  informationError: any;
  setInformationError: React.Dispatch<any>;
  information: any;
  setInformation: React.Dispatch<any>;
  validation: (i: any) => any;
  changeToListAddress: () => void;
}

function Form({
  informationError,
  information,
  setInformationError,
  setInformation,
  validation,
  changeToListAddress,
}: FormProps) {
  // các state để lưu địa chỉ
  const [listAddress, setListAddress] = useState<Array<any>>([]);
  const [listDistrics, setListDistrics] = useState<Array<any>>([]);
  const [listWards, setListWards] = useState<Array<any>>([]);

  useEffect(() => {
    // gọi api lấy địa chỉ
    axios
      .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then((res) => {
        setListAddress(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // hàm sẽ chạy khi chọn tỉnh thành
  function handleChangeCity(e: React.ChangeEvent<HTMLSelectElement>) {
    const c = listAddress.find((item) => {
      return item.Id === e.target.value;
    });
    if (c) {
      setListDistrics(c.Districts);
      setInformation((i: any) => {
        return { ...i, city: c.Name };
      });
    } else {
      setListDistrics([]);
      setInformation((i: any) => {
        return { ...i, city: '', district: '', ward: '' };
      });
    }
    setListWards([]);
  }

  // hàm sẽ chạy khi chọn phường
  function handleChangeDistric(e: React.ChangeEvent<HTMLSelectElement>) {
    const d = listDistrics.find((item) => {
      return item.Id === e.target.value;
    });
    if (d) {
      setListWards(d.Wards);
      setInformation((i: any) => {
        return { ...i, district: d.Name };
      });
    } else {
      setListWards([]);
      setInformation((i: any) => {
        return { ...i, district: '', ward: '' };
      });
    }
  }
  // hàm sẽ chạy khi chọn xã
  function handleChangeWard(e: React.ChangeEvent<HTMLSelectElement>) {
    const w = listWards.find((item) => {
      return item.Id === e.target.value;
    });
    if (w) {
      setInformation((i: any) => {
        return { ...i, ward: w.Name };
      });
    } else {
      setInformation((i: any) => {
        return { ...i, ward: '' };
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const changed = {
      [name]: value,
    };
    let updatedInfo: any;
    setInformation((i: any) => {
      updatedInfo = { ...i, ...changed };
      return updatedInfo;
    });

    setInformationError(() => validation(updatedInfo));
  }
  console.log('informationErr: ', informationError);
  return (
    <div className="bg-white p-5 mt-4">
      <div className="flex justify-between border-b-2">
        <h3 className="uppercase font-bold text-[14px]  pb-2">Địa chỉ giao hàng</h3>
        <button
          className="text-[#007bff] font-semibold hover:font-bold"
          onClick={() => changeToListAddress()}
        >
          Danh sách địa chỉ có sẵn
        </button>
      </div>
      <div className="mt-3">
        <div>
          <label className="text-[15px] mr-3 w-[170px] inline-block">First Name</label>
          <input
            type="text"
            name="firstname"
            value={information.firstname}
            onChange={(e) => handleChange(e)}
            placeholder="Nhập first name"
            className={
              informationError.firstname.length > 0
                ? 'py-1 text-[14px] font-bold outline outline-1 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] outline-red-600'
                : 'py-1 text-[14px] font-bold border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] '
            }
          />
        </div>
        {informationError.firstname.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.firstname}</p>
          </div>
        )}

        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Last name</label>
          <input
            type="text"
            name="lastname"
            value={information.lastname}
            placeholder="Nhập lastname"
            onChange={(e) => handleChange(e)}
            className={
              informationError.lastname.length > 0
                ? 'py-1 text-[14px] font-bold outline outline-1 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] outline-red-600'
                : 'py-1 text-[14px] font-bold border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] '
            }
          />
        </div>
        {informationError.lastname.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.lastname}</p>
          </div>
        )}
        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={information.phone}
            onChange={(e) => handleChange(e)}
            placeholder="Ví dụ: 0979123xxx (10 ký tự số)"
            maxLength={10}
            className={
              informationError.phone.length > 0
                ? 'py-1 text-[14px] font-bold outline outline-1 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] outline-red-600'
                : 'py-1 text-[14px] font-bold border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] '
            }
          />
        </div>
        {informationError.phone.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.phone}</p>
          </div>
        )}
        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Tỉnh/Thành Phố</label>
          <select
            onChange={(e) => handleChangeCity(e)}
            className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
          >
            <option value="">-- Chọn tỉnh thành --</option>
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
        </div>
        {informationError.city.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.city}</p>
          </div>
        )}
        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Quận/Huyện</label>
          <select
            disabled={listDistrics && listDistrics.length === 0}
            onChange={(e) => handleChangeDistric(e)}
            className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
          >
            <option value="">-- Chọn quận huyện --</option>
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
        </div>
        {informationError.district.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.district}</p>
          </div>
        )}
        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Phường/Xã</label>
          <select
            onChange={(e) => handleChangeWard(e)}
            disabled={listWards && listWards.length === 0}
            className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
          >
            <option value="">-- Chọn phường xã --</option>
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
        </div>
        {informationError.ward.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.ward}</p>
          </div>
        )}
        <div className="mt-4">
          <label className="text-[15px] mr-3 w-[170px] inline-block">Địa chỉ nhận hàng</label>
          <input
            type="text"
            name="address"
            value={information.address}
            onChange={(e) => handleChange(e)}
            placeholder="Nhập địa chỉ nhận hàng"
            className={
              informationError.address.length > 0
                ? 'py-1 text-[14px] font-bold outline outline-1 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] outline-red-600'
                : 'py-1 text-[14px] font-bold border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057] '
            }
          />
        </div>
        {informationError.address.length > 0 && (
          <div className="mt-2">
            <label className="text-[15px] mr-3 w-[170px] inline-block"></label>
            <p className="inline-block text-[13px] text-red-600 font-semibold">{informationError.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
