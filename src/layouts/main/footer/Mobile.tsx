import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';

export default function Mobile() {
  return (
    <div className="flex flex-col justify-center py-10">
      <div className="space-y-3">
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
          className="object-contain pb-5"
          alt="logo"
        />
        <p className="text-md">
          Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1,
          TP. HCM, Việt NamFahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng
          trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
        </p>

        <div className="flex flex-row gap-2">
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

        <div className="flex flex-row gap-2">
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
            alt="ggplay"
            style={{
              width: '120px',
              objectFit: 'contain',
            }}
          />
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
            alt="appstore"
            style={{
              width: '120px',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <div className=" flex flex-col pt-[20px] space-y-5">
        <div>
          <p className="text-2xl font-semibold">DỊCH VỤ</p>

          <div className="space-y-3 pt-2">
            <p>Điều khoản sử dụng</p>
            <p>Chính sách bảo mật </p>
            <p>Chính sách bảo mật thanh toán</p>
            <p>Giới thiệu Fahasa</p>
            <p>Hệ thống trung tâm - nhà sách</p>
          </div>
        </div>

        <div>
          <p className="text-2xl font-semibold">HỖ TRỢ</p>

          <div className="space-y-3 pt-2">
            <p>Chính sách đổi - trả - hoàn tiền</p>
            <p>Chính sách bảo hành - bồi hoàn</p>
            <p>Chính sách vận chuyển</p>
            <p>Chính sách khách sỉ</p>
            <p>Phương thức thanh toán và xuất HĐ</p>
          </div>
        </div>

        <div>
          <p className="text-2xl font-semibold">TÀI KHOẢN CỦA TÔI</p>

          <div className="space-y-3 pt-2">
            <p>Đăng nhập/Tạo mới tài khoản</p>
            <p>Thay đổi địa chỉ khách hàng</p>
            <p>Chi tiết tài khoản</p>
            <p>Lịch sử mua hàng</p>
          </div>
        </div>

        <div>
          <p className="text-2xl font-semibold">LIÊN HỆ</p>

          <div className="space-y-3 pt-2">
            <div className="flex gap-2">
              <Icon
                icon="mdi:address-marker"
                fontSize={24}
              />
              <p>60-62 Lê Lợi, Q.1, TP. HCM</p>
            </div>
            <div className="flex gap-2">
              <Icon
                icon="material-symbols:mail"
                fontSize={24}
              />
              <p>cskh@fah asa.com.vn</p>
            </div>
            <div className="flex gap-2">
              <Icon
                icon="ic:baseline-phone"
                fontSize={24}
              />
              <p>1900636467</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
