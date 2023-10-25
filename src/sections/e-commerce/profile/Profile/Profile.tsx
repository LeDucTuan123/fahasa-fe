import { useState } from 'react';

function Profile() {
  const [isShow, setIsShow] = useState(false);

  function showChangePassword(e: any) {
    setIsShow(e.target.checked);
  }
  return (
    <>
      <div className="p-5 shadow-lg w-full">
        <h1 className="uppercase font-bold">Thông tin tài khoản</h1>
        <form className="mt-3">
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Họ*</label>
            <input
              className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
              type="text"
              placeholder="Nhập họ"
            />
          </div>
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Tên*</label>
            <input
              className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
              type="text"
              placeholder="Nhập tên"
            />
          </div>
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Số điện thoại</label>
            <input
              className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
              type="text"
              placeholder="Chưa có số điện thoại"
            />
          </div>
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Email</label>
            <input
              className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
              type="email"
              placeholder="Chưa có email"
            />
          </div>
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Giới tính*</label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
              />{' '}
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
              />{' '}
              Nữ
            </label>
          </div>
          <div className="mt-3">
            <label className="mr-5 w-[180px] inline-block">Birthday*</label>
            <input
              className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
              type="date"
            />
          </div>
          <div className="mt-5">
            <label className="mr-5 w-[180px] inline-block"></label>
            <label>
              <input
                className="w-[25px] border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
                type="checkbox"
                onChange={(e) => showChangePassword(e)}
              />
              Đổi mật khẩu
            </label>
          </div>
          {isShow ? (
            <>
              <div className="mt-3">
                <label className="mr-5 w-[180px] inline-block">Mật khẩu hiện tại*</label>
                <input
                  className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                />
              </div>
              <div className="mt-3">
                <label className="mr-5 w-[180px] inline-block">Mật khẩu mới*</label>
                <input
                  className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
                  type="password"
                  placeholder="Mật khẩu mới"
                />
              </div>
              <div className="mt-3">
                <label className="mr-5 w-[180px] inline-block">Nhập lại mật khẩu mới*</label>
                <input
                  className="w-3/4 border p-1 pl-3 font-bold text-sm text-[#495057] outline-blue-500"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="text-center mt-8">
            <button className="border py-2 px-14 bg-[#c92127] text-white font-bold rounded-lg">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
