import { Icon } from '@iconify/react';
import { Modal } from 'flowbite-react';

interface modalVoucherProps {
  openMyModal: boolean | undefined;
  setCloseModal: () => void;
  myVouchers: any;
  productPay: Array<any>;
  applyMyVoucher: any;
  handleApplyMyVoucher: (id: number) => void;
  removeApplyMyVoucher: () => void;
}

function ModalMyVoucher({
  openMyModal,
  setCloseModal,
  myVouchers,
  productPay,
  applyMyVoucher,
  handleApplyMyVoucher,
  removeApplyMyVoucher,
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
        show={openMyModal}
        onClose={() => setCloseModal()}
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
          {myVouchers &&
            myVouchers.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className={`flex mt-3 shadow-md p-3 rounded-md ${
                    item[0].orders.length > 0 && 'bg-gray-300 opacity-60'
                  }`}
                >
                  <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
                    <img
                      src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                      alt="img"
                      className="m-auto"
                    />
                  </div>
                  <div className="ml-3 flex-1 relative">
                    <h2 className="font-semibold text-lg uppercase">Mã giảm {ConvertToVietNamDong(item[0].valuev)}</h2>
                    <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: {item[0].expdate}</p>
                    <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: {item[0].quantity}</p>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2 grid grid-rows-2">{/* ... */}</div>
                      {(applyMyVoucher && !applyMyVoucher[0] && applyMyVoucher.id === item[0].id) ||
                      (applyMyVoucher && applyMyVoucher[0] && applyMyVoucher[0].id === item[0].id) ? (
                        <button
                          onClick={() => removeApplyMyVoucher()}
                          className="text-blue-500 border-2 border-blue-500 border-solid rounded hover:bg-blue-500 hover:text-white"
                        >
                          Bỏ chọn
                        </button>
                      ) : (
                        <>
                          {item[0].orders.length > 0 ? (
                            <span className="text-gray-500 text-lg">Đã sử dụng</span>
                          ) : (
                            <button
                              onClick={() => handleApplyMyVoucher(item[0].id)}
                              className="bg-blue-500 text-white rounded-lg me-2"
                            >
                              Áp dụng
                            </button>
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

export default ModalMyVoucher;
