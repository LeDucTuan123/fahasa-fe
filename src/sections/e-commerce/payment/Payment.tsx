import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import ModalVoucher from './ModalVoucher';

export default function FormPayment() {
  const [address, setAddress] = useState<any>({
    city: '',
    district: '',
    ward: '',
  });
  const [information, setInformation] = useState<any>({
    fullname: '',
    email: '',
    phone: '',
    address: '',
  });
  const [informationError, setInformationError] = useState<any>({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  });
  const [paymentMedthod, setPaymentMedthod] = useState<string>('money');
  const [openModal, setOpenModal] = useState<boolean>(false);

  function validation(i: any) {
    let error = { fullname: '', email: '', phone: '', address: '', city: '', district: '', ward: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^(0[1-9])+([0-9]{8})\b/;
    if (i.fullname.trim().length === 0) {
      error.fullname = 'Thông tin này không được để trống';
    }

    if (i.fullname.trim().length < 3 && i.fullname.trim().length > 0) {
      error.fullname = 'Tên ít nhất phải có 3 ký tự';
    }

    if (!emailRegex.test(i.email)) {
      error.email = 'Không phải định dạng email';
    }

    if (i.email.trim().length === 0) {
      error.email = 'Thông tin này không được để trống';
    }

    if (i.phone.trim().length === 0) {
      error.phone = 'Thông tin này không được để trống';
    }

    if (i.phone.trim().length > 0 && i.phone.trim().length < 10) {
      error.phone = 'Số điện thoại phải có ít nhất 10 số';
    }

    if (i.phone.trim().length > 0 && !phoneNumberRegex.test(i.phone)) {
      error.phone = 'Không đúng định dạng số điện thoại';
    }

    if (i.address.trim().length === 0) {
      error.address = 'Thông tin này không được để trống';
    }

    if (i.city === '-1') {
      error.city = 'Thông tin này không được để trống';
    }

    if (i.district === '-1') {
      error.district = 'Thông tin này không được để trống';
    }

    if (i.ward === '-1') {
      error.ward = 'Thông tin này không được để trống';
    }

    return error;
  }

  function ChangePaymentMedthod(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentMedthod(e.target.value);
  }
  return (
    <>
      <div className="pt-5">
        <div className="bg-white h-[46px] flex items-center">
          <div className="bg-[#F39801] h-full flex w-[40px]">
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_warning_white.svg?q=10298"
              className="m-auto"
              alt="img"
            />
          </div>

          <span className="ms-3 me-1">Bạn đã là thành viên? </span>
          <Link
            to={'/login'}
            className="text-[#F39801] font-bold underline"
          >
            Đăng nhập ngay
          </Link>
        </div>
        <Form
          information={information}
          setInformationError={setInformationError}
          setAddress={setAddress}
          informationError={informationError}
          setInformation={setInformation}
          validation={validation}
        />
        <div className="bg-white p-5 mt-4">
          <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Phương thức vận chuyển</h3>
          <div className="mt-3">
            <label className="font-semibold">
              <input
                type="radio"
                className=""
                checked
              />{' '}
              Giao hàng tiêu chuẩn: 31.000đ
            </label>
          </div>
        </div>
        <div className="bg-white p-5 mt-4">
          <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Phương thức thanh toán</h3>
          <div className="mt-3">
            <label className="text-[14px] block">
              <input
                type="radio"
                className=""
                value={'zalo'}
                checked={paymentMedthod === 'zalo'}
                onChange={(e) => ChangePaymentMedthod(e)}
              />{' '}
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayapp.svg?q=10298"
                alt="img"
                className="inline-block mx-1"
              />
              Ví Zalo pay
            </label>
            <label className="text-[14px] block mt-4">
              <input
                type="radio"
                className=""
                value={'momo'}
                checked={paymentMedthod === 'momo'}
                onChange={(e) => ChangePaymentMedthod(e)}
              />{' '}
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10298"
                alt="img"
                className="inline-block mx-1"
              />
              Ví Momo
            </label>
            <label className="text-[14px] block mt-4">
              <input
                type="radio"
                className=""
                value={'money'}
                checked={paymentMedthod === 'money'}
                onChange={(e) => ChangePaymentMedthod(e)}
              />{' '}
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10298"
                alt="img"
                className="inline-block mx-1"
              />
              Thanh toán bằng tiền mặt khi nhận hàng
            </label>
          </div>
        </div>
        <div className="bg-white p-5 mt-4">
          <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Mã khuyến mãi/Mã quà tặng</h3>
          <div className="mt-3">
            <div className="flex items-center">
              <label className="text-[15px] inline-block">Mã KM/Quà tặng</label>
              <span className="mx-3 bg-[#FFB3234D] text-[#FFB323] py-1 px-2 rounded-lg font-bold flex items-center">
                Chọn mã thành công - Mã giảm giá 10k toàn sàn - đơn hàng 150k
                <Icon
                  icon="system-uicons:cross"
                  className="hover:cursor-pointer ml-1"
                />
              </span>
              <span
                className="underline text-blue-600 hover:cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Chọn mã khuyến mãi
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 mt-4">
          <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Kiểm tra lại đơn hàng</h3>
          <div className="mt-3">
            <div className="divide-y">
              <div className="grid grid-cols-5 gap-2 py-2">
                <div className="max-w-[150px] max-h-[150px]">
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product//8/9/8936066697088.jpg"
                    className="h-full w-full"
                    alt="img"
                  />
                </div>
                <div>Lý thuyết trò chơi</div>
                <div className="text-center">
                  <p>161.100đ</p>
                  <p className="text-[13px] line-through text-[#bfbfbf]">179.000đ</p>
                </div>
                <div className="text-center">4</div>
                <div className="text-center">
                  <p className="text-[#F39801] font-semibold">87.500đ</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-2">
                <div className="max-w-[150px] max-h-[150px]">
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product//8/9/8936066697088.jpg"
                    className="h-full w-full"
                    alt="img"
                  />
                </div>
                <div>Lý thuyết trò chơi</div>
                <div className="text-center">
                  <p>161.100đ</p>
                  <p className="text-[13px] line-through text-[#bfbfbf]">179.000đ</p>
                </div>
                <div className="text-center">4</div>
                <div className="text-center">
                  <p className="text-[#F39801] font-semibold">87.500đ</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 py-2">
                <div className="max-w-[150px] max-h-[150px]">
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product//8/9/8936066697088.jpg"
                    className="h-full w-full"
                    alt="img"
                  />
                </div>
                <div>Lý thuyết trò chơi</div>
                <div className="text-center">
                  <p>161.100đ</p>
                  <p className="text-[13px] line-through text-[#bfbfbf]">179.000đ</p>
                </div>
                <div className="text-center">4</div>
                <div className="text-center">
                  <p className="text-[#F39801] font-semibold">87.500đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[185px] fixed bottom-0 right-0 left-0 z-50 shadow-2xl shadow-[rgba(0,0,0,0.66)]">
          <div className="lg:container w-full ml-auto mr-auto block box-border">
            <div className="border-b-2 pb-3">
              <div className="self-end">
                <div className="flex justify-end mt-1">
                  <p className="text-[15px]">Thành tiền</p>
                  <p className="w-[150px] text-end text-[15px]">694.500đ</p>
                </div>
                <div className="flex justify-end mt-1">
                  <p className="text-[15px]">
                    Giảm giá (Nhập mã thành công - Mã giảm giá 10K TOÀN SÀN - Đơn hàng từ 150K)
                  </p>
                  <p className="w-[150px] text-end text-[15px]">-10.000 đ</p>
                </div>
                <div className="flex justify-end mt-1">
                  <p className="text-[15px]">Phí vận chuyển (Giao hàng tiêu chuẩn)</p>
                  <p className="w-[150px] text-end">31.000 đ</p>
                </div>
                <div className="flex justify-end mt-1">
                  <p className="text-[15px] font-bold">Tổng Số Tiền (gồm VAT)</p>
                  <p className="w-[150px] text-end text-[#F39801] font-semibold">694.500đ</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-3 content-center">
              <Link
                to={'/cart'}
                className="text-[#555555] font-bold"
              >
                {' '}
                <Icon
                  icon="formkit:arrowleft"
                  className="inline"
                />
                Quay về giỏ hàng
              </Link>
              <button className="bg-[#C92127] text-white text-[19px] py-2 px-10 rounded-lg">Xác nhận thanh toán</button>
            </div>
          </div>
        </div>
      </div>
      <ModalVoucher
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}