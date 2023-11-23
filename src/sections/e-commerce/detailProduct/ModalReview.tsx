import { Button, Modal } from 'flowbite-react';

interface ModalReviewProps {
  openModal: boolean;
  CloseModal: () => void;
}

function ModalReview({ openModal, CloseModal }: ModalReviewProps) {
  return (
    <>
      <Modal
        size={'3xl'}
        dismissible
        show={openModal}
        onClose={() => CloseModal()}
      >
        <Modal.Header>
          <p className="uppercase text-center text-md font-bold">Viết đánh giá sản phẩm</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-col justify-center">
            <div className="flex justify-center">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg"
                alt="img"
                className="h-[25px] w-[25px]"
              />
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg"
                alt="img"
                className="h-[25px] w-[25px]"
              />
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg"
                alt="img"
                className="h-[25px] w-[25px]"
              />
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg"
                alt="img"
                className="h-[25px] w-[25px]"
              />
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg"
                alt="img"
                className="h-[25px] w-[25px]"
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Nhập tên sẽ hiển thị khi đánh giá"
                className="w-full py-1 border-[#CDCFD0] rounded-lg text-[#646464]"
              />
            </div>
            <div className="mt-3">
              <textarea
                rows={5}
                placeholder="Nhận xét của bạn về sản phẩm"
                className="w-full border-[#CDCFD0]"
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <button className="me-3 bg-white text-[#7A7E7F] px-[16px] py-[8px]">Hủy</button>
            <Button className="bg-[#C92127] hover:bg-[#C92127]">Gửi nhận xét</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReview;
