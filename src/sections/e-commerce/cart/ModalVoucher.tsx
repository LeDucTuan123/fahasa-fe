import { Icon } from '@iconify/react';
import { Modal } from 'flowbite-react';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import { formatDateToDDMMYYYY } from 'src/util/SupportFnc';

interface modalVoucherProps {
  openModal: boolean | undefined;
  setOpenModal: () => void;
  vouchers: any;
  productPay: Array<any>;
  applyVoucher: any;
  handleApplyVoucher: (id: number) => void;
  removeApplyVoucher: () => void;
}

function ModalVoucher({
  openModal,
  setOpenModal,
  vouchers,
  productPay,
  applyVoucher,
  handleApplyVoucher,
  removeApplyVoucher,
}: modalVoucherProps) {
  function ConvertToVietNamDong(money: number) {
    if (money < 0) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0);
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
  }
  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal()}
      >
        <Modal.Header>
          <div className="flex items-center">
            <Icon
              icon="ph:ticket-bold"
              className="text-[#2f80ed] mr-1"
            />
            <h2 className="uppercase text-[#2f80ed] font-semibold text-base">Chọn mã khuyến mãi</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-end justify-between">
            <h3 className="text-base font-semibold">Mã giảm giá</h3>
            <p className="text-sm text-[#2f80ed]">Áp dụng tối đa: 1</p>
          </div>
          {vouchers &&
            vouchers.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="flex mt-3 shadow-md p-3 rounded-md"
                >
                  <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
                    <img
                      src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                      alt="img"
                      className="m-auto"
                    />
                  </div>
                  <div className="ml-3 flex-1 relative">
                    <h2 className="font-semibold text-lg uppercase">
                      Mã giảm {item.valuev / 1000}k - Đơn hàng từ {item.condition / 1000}k
                    </h2>
                    <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: {formatDateToDDMMYYYY(item.expdate)}</p>
                    <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: {item.quantity}</p>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2 grid grid-rows-2">
                        {/* <div className="h-[5px] w-56 bg-gradient-to-r from-blue-500 to-blue-900 animate-pulse"></div>*/}
                        <ProgressBar
                          totalMoney={item.condition}
                          currentMoney={productPay?.reduce((accum, currentValue) => {
                            return (
                              accum +
                              (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                currentValue.quantity
                            );
                          }, 0)}
                        />
                        <div className="grid grid-cols-3">
                          <p className="col-span-2 text-[10px]">
                            Mua thêm{' '}
                            {ConvertToVietNamDong(
                              item.condition -
                                productPay?.reduce((accum, currentValue) => {
                                  return (
                                    accum +
                                    (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                      currentValue.quantity
                                  );
                                }, 0),
                            )}{' '}
                            để nhận mã
                          </p>
                          <p className="text-[10px]">{ConvertToVietNamDong(item.condition)}</p>
                        </div>
                      </div>
                      {applyVoucher && applyVoucher.id === item.id ? (
                        <button
                          onClick={() => removeApplyVoucher()}
                          className="text-blue-500 border-2 border-blue-500 border-solid rounded hover:bg-blue-500 hover:text-white"
                        >
                          Bỏ chọn
                        </button>
                      ) : (
                        <>
                          {item.condition -
                            productPay?.reduce((accum, currentValue) => {
                              return (
                                accum +
                                (currentValue.price - (currentValue.price * currentValue.discount) / 100) *
                                  currentValue.quantity
                              );
                            }, 0) <
                          0 ? (
                            <button
                              onClick={() => handleApplyVoucher(item.id)}
                              className="bg-blue-500 text-white rounded-lg me-2"
                            >
                              Áp dụng
                            </button>
                          ) : (
                            <Link
                              to={'/'}
                              className="bg-blue-500 text-white rounded-lg me-2 leading-[30px] text-center"
                            >
                              Mua thêm
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVoucher;
