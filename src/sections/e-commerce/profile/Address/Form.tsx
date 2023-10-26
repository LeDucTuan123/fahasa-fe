import { Icon } from '@iconify/react';

interface formProps {
  changeToList: () => void;
}

function Form(props: formProps) {
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
        <h1 className="uppercase text-[#c92127] font-bold text-lg">Thêm địa chỉ mới</h1>
        <form className="mt-5 ">
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <h3 className="text-lg">Thông tin liên hệ</h3>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  placeholder="Tên*"
                />
                <p className="text-[#c92127]">Thông tin này quan trọng. Vui lòng không để trống</p>
              </div>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  placeholder="Họ*"
                />
              </div>
              <div className="mt-7">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  placeholder="Số điện thoại*"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg">Địa chỉ</h3>
              <div className="mt-5">
                <input
                  className="outline-none border-b-2 w-full"
                  type="text"
                  placeholder="Địa chỉ*"
                />
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Tỉnh/Thành phố*</label>
                <select
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Quận/Huyện*</label>
                <select
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="mr-3 w-[120px] inline-block">Xã/Phường*</label>
                <select
                  className="outline-none px-3 border-2 w-[250px]"
                  placeholder="Địa chỉ*"
                >
                  <option value="">Vui lòng chọn</option>
                </select>
              </div>
              <div className="mt-5">
                <label>
                  <input
                    className=" border-b-2 mr-3"
                    type="checkbox"
                  />
                  Sử dụng như Địa chỉ thanh toán mặc định của tôi
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="border py-2 px-14 bg-[#c92127] text-white font-bold rounded-lg">Lưu địa chỉ</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
