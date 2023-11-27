import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { useEffect, useState } from 'react';
import { ConvertToVietNamDong } from 'src/util/SupportFnc';
import ModalVoucher from '../cart/ModalVoucher';
import fetch from 'src/services/axios/Axios';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import ModalMyVoucher from '../cart/ModalMyVoucher';
import { apiPaths } from 'src/services/api/path-api';

import ListAddress from './ListAddress';

export default function Payment() {
  const navigate = useNavigate();
  const [paymentMedthod, setPaymentMedthod] = useState<string>('money');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const paymentLocal = localStorage.getItem('payment');
  const payment = JSON.parse(paymentLocal ? paymentLocal : '');
  const cart = payment.cart;
  const [addressId, setAddressId] = useState<number>(0);
  const [address, setAddress] = useState<any>();
  const sum = cart.reduce((accum: number, item: any) => {
    return accum + item.quantity * (item.price - (item.price * item.discount) / 100);
  }, 0);
  const [voucher, setVoucher] = useState<any>(payment.voucher && payment.voucher);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [information, setInformation] = useState<any>({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  });
  const [informationError, setInformationError] = useState<any>({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  });
  const books = useSelector((state: RootState) => state.book.books);
  const tools = useSelector((state: RootState) => state.tool.tools);
  const user: any = useSelector((state: RootState) => state.user.userData);

  const [openMyModal, setOpenMyModal] = useState(false);
  const [myVouchers, setMyVouchers] = useState([]);
  const [applyMyVoucher, setApplyMyVoucher] = useState<any>(payment.myvoucher && payment.myvoucher);

  console.log('payment myvoucher:', applyMyVoucher);

  console.log(cart);

  useEffect(() => {
    fetch
      .get('/rest/voucher')
      .then((res) => {
        setVouchers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch
      .get(`${apiPaths.myvoucher}/success/${user.id}`)
      .then((res) => setMyVouchers(res.data))
      .catch((error) => console.log(error));
    setInformation({
      firstname: user && user.firstname === null ? '' : user.firstname,
      lastname: user && user.lastname === null ? '' : user.lastname,
      phone: user && user.phone === null ? '' : user.phone,
      address: '',
      city: '',
      district: '',
      ward: '',
    });
    setAddressId(() => {
      const a = user.listAddress.find((item: any) => {
        return item.isactive;
      });
      return a && a.id;
    });
  }, [user]);
  // kiểm lỗi mỗi lần information thay đổi
  useEffect(() => {
    setInformationError(() => validation(information));
  }, [information]);

  // thay đổi địa chỉ mỗi lần addressId thay đổi
  useEffect(() => {
    const a = user.listAddress.find((item: any) => {
      return item.id === addressId;
    });

    setAddress(a);
  }, [addressId, user]);

  function validation(i: any) {
    let error = { firstname: '', lastname: '', phone: '', address: '', city: '', district: '', ward: '' };
    const phoneNumberRegex = /^(0[1-9])+([0-9]{8})\b/;
    if (i.firstname.trim().length === 0 || i.firstname === null) {
      error.firstname = 'Thông tin này không được để trống';
    }

    if (i.lastname.trim().length === 0) {
      error.lastname = 'Thông tin này không được để trống';
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

    if (i.city.trim().length === 0) {
      error.city = 'Thông tin này không được để trống';
    }

    if (i.district.trim().length === 0) {
      error.district = 'Thông tin này không được để trống';
    }

    if (i.ward.trim().length === 0) {
      error.ward = 'Thông tin này không được để trống';
    }

    return error;
  }

  function ChangePaymentMedthod(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentMedthod(e.target.value);
  }

  // phần này truyền cho voucher modal

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleApplyVoucher(id: number) {
    setVoucher(
      vouchers.find((item: any) => {
        return item.id === id;
      }),
    );
  }

  function removeApplyVoucher() {
    setVoucher(undefined);
  }

  // -----------------

  function valid() {
    if (
      informationError.firstname === '' &&
      informationError.lastname === '' &&
      informationError.phone === '' &&
      informationError.address === '' &&
      informationError.city === '' &&
      informationError.district === '' &&
      informationError.ward === ''
    ) {
      return true;
    } else {
      return false;
    }
  }
  console.log(myVouchers);
  console.log(address);
  function calculateTotalAmount() {
    const voucherValue = voucher ? voucher.valuev : 0;
    const applyMyVoucherValue = applyMyVoucher && applyMyVoucher.length > 0 ? applyMyVoucher[0].valuev : 0;
    const applyMyVoucherLocal = applyMyVoucher && applyMyVoucher.length === 0 ? applyMyVoucher.valuev : 0;
    const cityShippingFee = information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000;
    const cityAddress = address && address.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000;

    if (applyMyVoucher && voucher && applyMyVoucher.length > 0) {
      return sum - (voucherValue + applyMyVoucherValue) + (openForm ? cityShippingFee : cityAddress);
    }

    if (voucher && !applyMyVoucher) {
      return sum - voucherValue + (openForm ? cityShippingFee : cityAddress);
    }

    if (!voucher && applyMyVoucher && applyMyVoucher.length > 0) {
      return sum - applyMyVoucherValue + (openForm ? cityShippingFee : cityAddress);
    }

    if (!voucher && !applyMyVoucher) {
      return sum + (openForm ? cityShippingFee : cityAddress);
    }
    //local
    if (voucher && applyMyVoucher && applyMyVoucher.length === 0) {
      return sum - (voucherValue + applyMyVoucherLocal) + (openForm ? cityShippingFee : cityAddress);
    }

    if (!voucher && applyMyVoucher && applyMyVoucher.length === 0) {
      return sum - applyMyVoucherLocal + (openForm ? cityShippingFee : cityAddress);
    }

    /////
    // Return a default value or handle other cases as needed
    return sum;
  }

  console.log('user id: ', applyMyVoucher?.id);

  function handlePayment() {
    if (valid() && openForm) {
      fetch
        .post('/rest/order/payment', {
          orderdate: new Date(),

          totalamount: calculateTotalAmount(),
          receiver: information.lastname + information.firstname,
          ship: information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000,
          user: {
            id: user.id,
          },
          statuss: {
            id: 3,
          },
          voucher: voucher && voucher.id ? { id: voucher.id } : null,
          myvoucher:
            (applyMyVoucher && applyMyVoucher.length === 0 && { id: applyMyVoucher.id }) ||
            (applyMyVoucher && applyMyVoucher.length > 0 && { id: applyMyVoucher[0].id }) ||
            (!applyMyVoucher && null),

          address: {
            firstname: information.firstname,
            lastname: information.lastname,
            phone: information.phone,
            city: information.city,
            district: information.district,
            ward: information.ward,
            address: information.address,
            user: { id: user.id },
          },
          orderdetails: cart.map((item: any) => {
            return {
              id: item.odid,
              quantity: item.quantity,
              price: item.price - (item.price * item.discount) / 100,
              book: books.find((book) => {
                return book.title === item.title;
              }),
              schooltool: tools.find((tool) => {
                return tool.title === item.title;
              }),
            };
          }),
        })
        .then((res) => {
          if (paymentMedthod === 'momo') {
            fetch
              .get(`/orders/momo-pay/${res.data.id}`)
              .then((res) => {
                window.location.href = res.data;
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (paymentMedthod === 'vnpay') {
            fetch
              .get(`/payment/vnpay/${res.data.id}`)
              .then((res) => {
                window.location.href = res.data;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            navigate(`/success/${res.data.id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!openForm) {
      fetch
        .post('/rest/order/payment', {
          orderdate: new Date(),
          totalamount: calculateTotalAmount(),
          // sum -
          // (voucher ? voucher.valuev : 0) +
          // (address.city && address.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
          receiver: address.lastname + ' ' + address.firstname,
          ship: address.city && address.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000,
          user: {
            id: user.id,
          },
          address: { id: address.id },
          statuss: {
            id: 3,
          },
          voucher: voucher ? { id: voucher.id } : null,
          myvoucher:
            (applyMyVoucher && applyMyVoucher.length === 0 && { id: applyMyVoucher.id }) ||
            (applyMyVoucher && applyMyVoucher.length > 0 && { id: applyMyVoucher[0].id }) ||
            (!applyMyVoucher && null),
          orderdetails: cart.map((item: any) => {
            return {
              id: item.odid,
              quantity: item.quantity,
              price: item.price - (item.price * item.discount) / 100,
              book: books.find((book) => {
                return book.title === item.title;
              }),
              schooltool: tools.find((tool) => {
                return tool.title === item.title;
              }),
            };
          }),
        })
        .then((res) => {
          if (paymentMedthod === 'momo') {
            fetch
              .get(`/orders/momo-pay/${res.data.id}`)
              .then((res) => {
                window.location.href = res.data;
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (paymentMedthod === 'vnpay') {
            fetch
              .get(`/payment/vnpay/${res.data.id}`)
              .then((res) => {
                window.location.href = res.data;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            navigate(`/success/${res.data.id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Có lỗi');
    }
  }

  function handleApplyMyVoucher(id: number) {
    console.log('id: ', id);
    setApplyMyVoucher(
      myVouchers.find((item: any) => {
        console.log('item: ', item);
        return item[0]?.id === id;
      }),
    );
    console.log(applyMyVoucher);
  }
  // phần này truyền cho ListAddress
  function changeToForm() {
    setOpenForm(true);
  }

  function changeToListAddress() {
    setOpenForm(false);
  }

  function changeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressId(Number(e.target.value));
  }

  return (
    <>
      <div className="pt-5">
        {/* <div className="bg-white h-[46px] flex items-center">
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
        </div> */}
        {openForm ? (
          <Form
            information={information}
            setInformationError={setInformationError}
            informationError={informationError}
            setInformation={setInformation}
            validation={validation}
            changeToListAddress={changeToListAddress}
          />
        ) : (
          <ListAddress
            listAddress={user.listAddress}
            changeToForm={changeToForm}
            addressId={addressId}
            changeAddress={changeAddress}
          />
        )}

        <div className="bg-white p-5 mt-4">
          <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Phương thức vận chuyển</h3>
          <div className="mt-3">
            <label className="font-semibold">
              <input
                type="radio"
                className=""
                defaultChecked
              />{' '}
              Giao hàng tiêu chuẩn:{' '}
              {openForm ? (
                <span>{information.city && information.city === 'Thành phố Hồ Chí Minh' ? 'Miễn phí' : '31.000đ'}</span>
              ) : (
                <span>{address && address.city === 'Thành phố Hồ Chí Minh' ? 'Miễn phí' : '31.000đ'}</span>
              )}
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
                value={'vnpay'}
                checked={paymentMedthod === 'vnpay'}
                onChange={(e) => ChangePaymentMedthod(e)}
              />{' '}
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10327"
                alt="img"
                className="inline-block mx-1"
              />
              VNPAY
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
            <div className="flex items-center pb-4">
              <label className="text-[15px] inline-block">Mã KM/Quà tặng</label>
              {voucher && (
                <span className="mx-3 bg-[#FFB3234D] text-[#FFB323] py-1 px-2 rounded-lg font-bold flex items-center">
                  Chọn mã thành công - Mã giảm giá {voucher.valuev / 1000}k toàn sàn - đơn hàng{' '}
                  {voucher.condition / 1000}k
                  <Icon
                    icon="system-uicons:cross"
                    className="hover:cursor-pointer ml-1"
                  />
                </span>
              )}

              <span
                className="underline text-blue-600 hover:cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Chọn mã khuyến mãi
              </span>
            </div>
            <h3 className="uppercase font-bold text-[14px] border-b-2 py-2">Mã khuyến mãi của tôi</h3>
            <div className="flex items-center pt-2">
              <label className="text-[15px] inline-block">Mã KM/Quà tặng</label>
              {applyMyVoucher && applyMyVoucher[0] && (
                <>
                  <span className="mx-3 bg-[#FFB3234D] text-[#FFB323] py-1 px-2 rounded-lg font-bold flex items-center">
                    Chọn mã thành công - Mã giảm giá {applyMyVoucher[0].valuev / 1000}k
                    <Icon
                      icon="system-uicons:cross"
                      className="hover:cursor-pointer ml-1"
                    />
                  </span>
                  ,
                </>
              )}
              {applyMyVoucher && !applyMyVoucher[0] && (
                <>
                  <span className="mx-3 bg-[#FFB3234D] text-[#FFB323] py-1 px-2 rounded-lg font-bold flex items-center">
                    Chọn mã thành công - Mã giảm giá {applyMyVoucher.valuev / 1000}k
                    <Icon
                      icon="system-uicons:cross"
                      className="hover:cursor-pointer ml-1"
                    />
                  </span>
                  ,
                </>
              )}

              <span
                className="underline text-blue-600 hover:cursor-pointer"
                onClick={() => setOpenMyModal(true)}
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
              {cart &&
                cart.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-5 gap-2 py-2"
                    >
                      <div className="max-w-[150px] max-h-[150px]">
                        <img
                          src={item.images}
                          className="h-full w-full"
                          alt={item.title}
                        />
                      </div>
                      <div>{item.title}</div>
                      <div className="text-center">
                        <p>{ConvertToVietNamDong(item.price - (item.price * item.discount) / 100)}</p>
                        <p className="text-[13px] line-through text-[#bfbfbf]">{item.price}</p>
                      </div>
                      <div className="text-center">{item.quantity}</div>
                      <div className="text-center">
                        <p className="text-[#F39801] font-semibold">
                          {ConvertToVietNamDong(item.quantity * (item.price - (item.price * item.discount) / 100))}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[185px] fixed bottom-0 right-0 left-0 z-50 shadow-2xl shadow-[rgba(0,0,0,0.66)]">
          <div className="lg:container w-full ml-auto mr-auto block box-border">
            <div className="border-b-2 pb-3">
              <div className="self-end">
                <div className="flex justify-end mt-1">
                  <p className="text-[15px]">Thành tiền</p>
                  <p className="w-[150px] text-end text-[15px]">{ConvertToVietNamDong(sum)}</p>
                </div>
                {voucher && (
                  <div className="flex justify-end mt-1">
                    <p className="text-[15px]">
                      Giảm giá (Nhập mã thành công - Mã giảm giá {voucher.valuev / 1000}K TOÀN SÀN - Đơn hàng từ{' '}
                      {voucher.condition / 1000}K)
                    </p>
                    <p className="w-[150px] text-end text-[15px]">-{ConvertToVietNamDong(voucher.valuev)}</p>
                  </div>
                )}
                {applyMyVoucher && !applyMyVoucher[0] && (
                  <div className="flex justify-end mt-1">
                    <p className="text-[15px]">
                      Giảm giá (Nhập mã thành công - Mã giảm giá {applyMyVoucher.valuev / 1000}K)
                    </p>
                    <p className="w-[150px] text-end text-[15px]">-{ConvertToVietNamDong(applyMyVoucher.valuev)}</p>
                  </div>
                )}
                {applyMyVoucher && applyMyVoucher[0] && (
                  <div className="flex justify-end mt-1">
                    <p className="text-[15px]">
                      Giảm giá (Nhập mã thành công - Mã giảm giá {applyMyVoucher[0].valuev / 1000}K)
                    </p>
                    <p className="w-[150px] text-end text-[15px]">-{ConvertToVietNamDong(applyMyVoucher[0].valuev)}</p>
                  </div>
                )}

                <div className="flex justify-end mt-1">
                  <p className="text-[15px]">Phí vận chuyển (Giao hàng tiêu chuẩn)</p>
                  <p className="w-[150px] text-end">
                    {information.city && information.city === 'Thành phố Hồ Chí Minh' ? '0đ' : '31.000đ'}
                  </p>
                </div>
                <div className="flex justify-end mt-1">
                  <p className="text-[15px] font-bold">Tổng Số Tiền (gồm VAT)</p>
                  <p className="w-[150px] text-end text-[#F39801] font-semibold">
                    {applyMyVoucher &&
                      voucher &&
                      applyMyVoucher[0] &&
                      ConvertToVietNamDong(
                        sum -
                          (voucher.valuev + applyMyVoucher[0].valuev) +
                          (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}
                    {voucher &&
                      !applyMyVoucher &&
                      ConvertToVietNamDong(
                        sum -
                          voucher.valuev +
                          (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}
                    {!voucher &&
                      applyMyVoucher &&
                      applyMyVoucher[0] &&
                      ConvertToVietNamDong(
                        sum -
                          applyMyVoucher[0].valuev +
                          (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}
                    {!voucher &&
                      !applyMyVoucher &&
                      ConvertToVietNamDong(
                        sum + (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}

                    {/*mới vô lấy myvoucher từ local */}
                    {applyMyVoucher &&
                      voucher &&
                      !applyMyVoucher[0] &&
                      ConvertToVietNamDong(
                        sum -
                          (voucher.valuev + applyMyVoucher.valuev) +
                          (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}
                    {applyMyVoucher &&
                      !voucher &&
                      !applyMyVoucher[0] &&
                      ConvertToVietNamDong(
                        sum -
                          applyMyVoucher.valuev +
                          (information.city && information.city === 'Thành phố Hồ Chí Minh' ? 0 : 31000),
                      )}
                  </p>
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
              <button
                onClick={() => handlePayment()}
                className="bg-[#C92127] text-white text-[19px] py-2 px-10 rounded-lg"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalVoucher
        openModal={openModal}
        setCloseModal={handleCloseModal}
        vouchers={vouchers}
        productPay={cart}
        applyVoucher={voucher}
        handleApplyVoucher={handleApplyVoucher}
        removeApplyVoucher={removeApplyVoucher}
      />

      <ModalMyVoucher
        openMyModal={openMyModal}
        setCloseModal={() => setOpenMyModal(false)}
        myVouchers={myVouchers && myVouchers}
        productPay={cart}
        applyMyVoucher={applyMyVoucher}
        handleApplyMyVoucher={handleApplyMyVoucher}
        removeApplyMyVoucher={() => setApplyMyVoucher(undefined)}
      />
    </>
  );
}
