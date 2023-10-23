import { Icon } from '@iconify/react';

export default function Desktop() {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row  py-7">
          <div className="w-[30%] flex-row flex">
            <div className="flex flex-col border-r-[1px] border-gray-300">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                alt="logoFahasa"
                className="w-[300px] object-contain"
              />
              <p className="text-md pt-8">
                Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 - 62 Lê Lợi,
                Quận 1, TP. HCM, Việt NamFahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua
                và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
              </p>

              <div className="flex flex-col w-full">
                <div className="flex flex-row pt-5 justify-between">
                  <Icon
                    icon="ic:baseline-facebook"
                    fontSize="39px"
                  />
                  <Icon
                    icon="ri:instagram-fill"
                    fontSize="39px"
                  />
                  <Icon
                    icon="icon-park-solid:youtobe"
                    fontSize="39px"
                  />
                  <Icon
                    icon="mdi:gmail"
                    fontSize="39px"
                  />
                  <Icon
                    icon="mdi:gmail"
                    fontSize="39px"
                  />
                </div>

                <div className="flex flex-row justify-between pt-3">
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                    alt="ggplay"
                    className="w-40 object-contain pr-3"
                  />
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                    alt="store"
                    className="w-40 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] flex flex-row">
            <div className="grid grid-cols-3 w-full gap-4 pl-5">
              <div className="flex flex-col space-y-3">
                <h5 className="text-2xl">DỊCH VỤ</h5>

                <ul className="space-y-3 text-sm">
                  <li>Điều khoản sử dụng</li>
                  <li>Chính sách bảo mật thông tin cá nhân</li>
                  <li>Chính sách bảo mật thanh toán</li>
                  <li>Giới thiệu Fahasa</li>
                  <li>Hệ thống trung tâm - nhà sách</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <h5 className="text-2xl">HỖ TRỢ</h5>

                <ul className="space-y-3 text-sm">
                  <li>Chính sách đổi - trả - hoàn tiền</li>
                  <li>Chính sách bảo hành - bồi hoàn</li>
                  <li>Chính sách vận chuyển</li>
                  <li>Chính sách khách sỉ</li>
                  <li>Phương thức thanh toán và xuất HĐ</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <h5 className="text-2xl">TÀI KHOẢN CỦA TÔI</h5>

                <ul className="space-y-3 text-sm">
                  <li>Đăng nhập/Tạo mới tài khoản</li>
                  <li>Thay đổi địa chỉ khách hàng</li>
                  <li>Chi tiết tài khoản</li>
                  <li>Lịch sử mua hàng</li>
                </ul>
              </div>

              <div className="col-span-3 flex flex-col ">
                <h5 className="text-2xl">LIÊN HỆ</h5>

                <div className="flex flex-row text-md justify-between pt-4">
                  <div className="flex items-center">
                    <Icon
                      icon="ic:baseline-phone"
                      fontSize={24}
                    />

                    <span className="pl-2">60-62 Lê Lợi, Q.1, TP. HCM</span>
                  </div>

                  <div className="flex items-center">
                    <Icon
                      icon="material-symbols:mail"
                      fontSize={24}
                    />
                    <span className="pl-2">cskh@fahasa.com.vn</span>
                  </div>

                  <div className="flex items-center">
                    <Icon
                      icon="mdi:address-marker"
                      fontSize={24}
                    />
                    <span className="pl-2">1900636467</span>
                  </div>
                </div>

                {/* <!-- <ul className="md:hidden space-y-3 text-sm">
                        <li>Đăng nhập/Tạo mới tài khoản</li>
                        <li>Thay đổi địa chỉ khách hàng</li>
                        <li>Chi tiết tài khoản</li>
                        <li>Lịch sử mua hàng</li>
                    </ul> --> */}
              </div>

              <div className="col-span-3 flex flex-col">
                <div className="flex flex-row ">
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_snappy1.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <div className="w-[20%]">
                    <img
                      src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/logo_moca_120.jpg"
                      alt="lo1"
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
