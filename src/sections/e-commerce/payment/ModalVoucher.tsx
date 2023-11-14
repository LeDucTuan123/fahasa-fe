import { Icon } from '@iconify/react';
import { Modal } from 'flowbite-react';
import ProgressBar from '../cart/ProgressBar';
import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';
import { Link } from 'react-router-dom';

interface ModalVoucherProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalVoucher({ openModal, setOpenModal }: ModalVoucherProps) {
  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVoucher;
