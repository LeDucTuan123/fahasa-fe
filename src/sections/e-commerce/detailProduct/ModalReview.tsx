import { Button, Modal } from 'flowbite-react';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';

interface ModalReviewProps {
  openModal: boolean;
  CloseModal: () => void;
  data: any;
}

function ModalReview({ openModal, CloseModal, data }: ModalReviewProps) {
  const [rating, setRating] = useState<number>(5);
  const user: any = useSelector((state: RootState) => state.user.userData);
  const books: BookType[] = useSelector((state: RootState) => state.book.books);
  const tools: any = useSelector((state: RootState) => state.tool.tools);
  const [information, setInformation] = useState({
    username: user && user.lastname ? user.lastname + user.firstname : '',
    comment: '',
  });
  const [informationError, setInformationError] = useState({ username: '', comment: '' });
  function handleStarClick(star: number) {
    setRating(star);
  }

  const validate = useCallback(() => {
    let errors = { username: '', comment: '' };
    if (information.username.trim().length === 0) {
      errors.username = 'Thông tin này quan trọng. Không được để trống';
    }
    if (information.comment.trim().length === 0) {
      errors.comment = 'Thông tin này quan trọng. Không được để trống';
    }
    return errors;
  }, [information.comment, information.username]);

  useEffect(() => {
    setInformationError(() => {
      return validate();
    });
  }, [information, validate]);

  function isValid() {
    if (informationError.username.trim().length === 0 && informationError.comment.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;

    let changed = {
      [name]: value,
    };

    setInformation((prev: any) => {
      return { ...prev, ...changed };
    });
  }

  function handleSendReview() {
    if (isValid()) {
      fetch
        .post('/rest/review/send', {
          rating: rating,
          comment: information.comment,
          createdate: new Date(),
          username: information.username,
          book: books.find((item: BookType) => {
            return item.title === data.title;
          }),
          schooltool: tools.find((item: any) => {
            return item.title === data.title;
          }),
          user: { id: user.id },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('có lỗi');
    }
  }

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
              {[...Array(5)].map((item, index) => {
                return (
                  <img
                    src={
                      index < rating
                        ? 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg'
                        : 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_gray.svg'
                    }
                    alt="img"
                    className="h-[25px] w-[25px] hover:cursor-pointer"
                    onClick={() => handleStarClick(index + 1)}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Nhập tên sẽ hiển thị khi đánh giá"
                className="w-full py-1 border-[#CDCFD0] rounded-lg text-[#646464]"
                name="username"
                value={information.username}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-600">{informationError.username}</p>
            </div>
            <div className="mt-3">
              <textarea
                rows={5}
                placeholder="Nhận xét của bạn về sản phẩm"
                className="w-full border-[#CDCFD0]"
                name="comment"
                value={information.comment}
                onChange={(e) => handleChange(e)}
              ></textarea>
              <p className="text-red-600">{informationError.comment}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <button
              className="me-3 bg-white text-[#7A7E7F] px-[16px] py-[8px]"
              onClick={() => CloseModal()}
            >
              Hủy
            </button>
            <Button
              className="bg-[#C92127] hover:bg-[#C92127]"
              onClick={() => handleSendReview()}
            >
              Gửi nhận xét
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReview;
