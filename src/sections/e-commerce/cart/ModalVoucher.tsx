import { Icon } from '@iconify/react';
import { Modal, Button } from 'flowbite-react';

interface modalVoucherProps {
  openModal: boolean | undefined;
  setOpenModal: () => void;
}

function ModalVoucher({ openModal, setOpenModal }: modalVoucherProps) {
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
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
          <div className="flex mt-3 shadow-md p-3 rounded-md">
            <div className="bg-amber-500 w-[100px] h-[100px] flex rounded-lg">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/promotion/ico_promotion.svg?q=10293"
                alt="img"
                className="m-auto"
              />
            </div>
            <div className="ml-3 flex-1 relative">
              <h2 className="font-semibold text-lg uppercase">Mã giảm 10k - Đơn hàng từ 150k</h2>
              <p className="text-[#7A7E7F] text-sm">Ngày hết hạn: 20-10-2023</p>
              <p className="text-[#7A7E7F] text-sm">Số lượng còn lại: 100</p>
              <Button className="absolute bottom-2 right-0">Áp dụng</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVoucher;
