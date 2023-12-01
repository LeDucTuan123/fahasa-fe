import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';
import { LatestBooks } from '../home';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getBook } from 'src/redux/slice/bookSlice';
import { getTools } from 'src/redux/slice/ToolSlice';
import ProgressBar from './ProgressBar';
import ModalReview from './ModalReview';
import { ConvertToVietNamDong, formatDateToDDMMYYYY } from 'src/util/SupportFnc';
import { increase } from 'src/redux/slice/countSlice';
import { count } from 'console';

export default function DetailProduct() {
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState<BookType>();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const u = localStorage.getItem('user');
  const user = u && JSON.parse(u);
  const dispatch = useAppDispatch();
  const percent5Star =
    data &&
    (data?.reviews?.reduce((accum: any, item: any) => {
      if (item.rating === 5) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0) /
      data.reviews.length) *
      100;
  const percent4Star =
    data &&
    (data?.reviews?.reduce((accum: any, item: any) => {
      if (item.rating === 4) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0) /
      data.reviews.length) *
      100;
  const percent3Star =
    data &&
    (data?.reviews?.reduce((accum: any, item: any) => {
      if (item.rating === 3) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0) /
      data.reviews.length) *
      100;
  const percent2Star =
    data &&
    (data?.reviews?.reduce((accum: any, item: any) => {
      if (item.rating === 2) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0) /
      data.reviews.length) *
      100;
  const percent1Star =
    data &&
    (data?.reviews?.reduce((accum: any, item: any) => {
      if (item.rating === 1) {
        return accum + 1;
      } else {
        return accum;
      }
    }, 0) /
      data.reviews.length) *
      100;
  //state để đóng mở modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Lấy danh sách book trong redux bookSlice
  const books: BookType[] = useSelector((state: any) => state.book.books);
  const tools = useSelector((state: RootState) => state.tool.tools);

  const cate = useSelector((state: RootState) => state.common.category);

  const { id } = useParams();

  const fetchData = useCallback(() => fetch.get(`/rest/${cate}/${id}`).then((res) => setData(res.data)), [cate, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, isLogin]);
  // const book = useSelector((state: any) => state.productDetail);

  // // const dispatch = useAppDispatch();

  // // const fetchDetail = useCallback(() => {
  // //   dispatch(getDetailProduct(id));
  // // }, [dispatch, id]);

  // // useEffect(() => {
  // //   fetchDetail();
  // // }, [fetchDetail]);

  // hàm thêm sản phẩm vào localstorage khi không đăng nhập
  function handleAddProduct() {
    let obj: any = { ...data, quantity: counter };
    const cartLocal = localStorage.getItem('cart');
    let cart: Array<any> = [];
    if (cartLocal) {
      cart = JSON.parse(cartLocal || '');

      // Kiểm tra xem sản phẩm đó đã dc thêm vào storage chưa
      const index = cart.findIndex((item: any) => {
        return item.id === obj.id && item.title === obj.title;
      });

      // nếu rùi thì chỉ thêm vào số lượng cho sản phẩm đó
      if (index !== -1) {
        obj.quantity = obj.quantity + cart[index].quantity;
        cart.splice(index, 1, obj);
        localStorage.setItem('cart', JSON.stringify(cart));
        // nếu không thì thêm mới
      } else {
        cart.push(obj);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      // khi trong storage chưa có gì hết
    } else {
      cart.push(obj);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  async function addProductToDB() {
    fetch
      .post('/rest/order/create', {
        orderdate: new Date(),
        totalamount: null,
        user: { id: user.id },
        statuss: { id: 1 },
        voucher: null,
        orderdetails: [
          {
            quantity: counter,
            price: data!.price - (data!.price * data!.discount) / 100,
            book: books.find((book) => {
              return book.title === data!.title;
            }),
            schooltool: tools.find((tool) => {
              return tool.title === data!.title;
            }),
          },
        ],
      })
      .then((res) => {
        dispatch(getBook());
        dispatch(getTools());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleBuyNow() {
    if (isLogin) {
      addProductToDB();
      dispatch(increase());
    } else {
      handleAddProduct();
    }
    navigate('/cart');
  }

  function closeModal() {
    setOpenModal(false);
  }

  console.log(percent5Star);
  return (
    <div className="flex flex-col space-y-2 pt-4">
      <div className="flex flex-row bg-white p-3 rounded-md">
        <div className="flex flex-col w-[40%]">
          <div className="flex flex-row w-[400px] gap-2">
            <div className="hidden sm:block ">
              <div className="imagedetail">
                <img
                  src={data?.images}
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div className="imagedetail">
                <img
                  src={data?.images}
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div className="imagedetail">
                <img
                  src={data?.images}
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div className="imagedetail">
                <img
                  src={data?.images}
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div className="imagedetail">
                <img
                  src={data?.images}
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <img
                src={data?.images}
                alt="img1"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="pt-3 flex flex-col sm:flex-row justify-between">
            <button
              onClick={() => {
                if (isLogin) {
                  addProductToDB();
                  dispatch(increase());
                } else {
                  handleAddProduct();
                }
              }}
              className="text-[#1230b0] text-base font-medium border-[2px] uppercase border-[#1230b0] px-5 rounded-md py-2  active:bg-red-300 active:text-white duration-100 hover:bg-[#1230b0] hover:text-white"
            >
              <div className="flex justify-center items-center">
                <Icon
                  icon="uil:cart"
                  fontSize={25}
                />
                <span>Thêm vào giỏ hàng</span>
              </div>
            </button>
            <button
              onClick={() => {
                handleBuyNow();
              }}
              className="bg-[#1230b0] text-base font-medium uppercase border-none w-[] rounded-md text-white  button-buy"
            >
              <span className="px-[4rem] py-2 ">Mua ngay</span>
            </button>
          </div>
        </div>
        <div className="w-[60%] space-y-2">
          <p className="text-2xl pb-4">{data?.title}</p>

          <div className="w-full flex flex-row">
            {/* <div className="w-[60%]">
              {/* <p className="text-sm">Nhà cung cấp: {data?.author}</p> */}
            {/* <p className="text-sm">TNhà xuất bản: {data?.author}</p> */}
            {/* </div> */}
            <div className="w-[40%] flex items-center">
              <span className="text-sm pr-2 font-medium">Tác giả: </span> <p>{data?.author}</p>
              {/* <p className="text-sm">Hình thức bìa: {data?.description}</p> */}
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="text-[2rem] font-extrabold text-gray-800">
              {ConvertToVietNamDong(
                data?.price && data.discount ? data?.price - (data?.price * data?.discount) / 100 : 0,
              )}
            </div>
            <span className="line-through">{ConvertToVietNamDong(data?.price ? data.price : 0)}</span>
            <div className="discount">{data?.discount}%</div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-full pr-4">
              <p className="text-xl font-medium">Miêu tả: </p>
              <p className="text-sm">{data?.description}</p>
            </div>
            {/* <div> */}
            {/* <p className="text-sm">Tác giả: {data?.author}</p> */}
            {/* <p className="text-sm">Hình thức bìa: {data?.description}</p> */}
            {/* </div> */}
          </div>

          <div className="flex flex-row items-center py-3">
            <p className="text-xl font-semibold w-[200px]">Số lượng: </p>

            <div className="flex h-[35px] items-center border-[1px] border-solid border-[#3333] rounded-md px-2 justify-between">
              <Icon
                icon="iconoir:minus"
                fontSize={24}
                onClick={() => counter !== 1 && setCounter(counter - 1)}
                style={{ cursor: 'pointer' }}
              />

              <input
                type="text"
                value={counter}
                style={{
                  width: '40px',
                  height: '90%',
                  outline: 'none',
                  border: 'none',
                  textAlign: 'center',
                }}
                readOnly
              />

              <Icon
                icon="bi:plus"
                fontSize={24}
                onClick={() => setCounter(counter + 1)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <hr /> */}

      <div className="mt-3 p-3 bg-white w-full rounded">
        <h1 className="font-bold text-2xl text-[#333]">Đánh giá sản phẩm</h1>
        <div className="flex mt-3 border-b-2 pb-3">
          <div className="flex">
            <div className="flex-col mx-10 items-center">
              <p className="text-center font-bold text-2xl mt-7">{data?.reviews?.length}</p>
              <p className="m-auto text-center font-bold text-xl">Lượt đánh giá</p>
            </div>
            <div>
              <div className="flex items-center">
                <div className="flex items-center px-3">
                  <span className="w-3 mr-3 text-[#333] text-[18px]">5</span>
                  <Icon
                    icon="solar:star-bold"
                    className="text-yellow-300"
                  />
                </div>
                <ProgressBar
                  percent={percent5Star === undefined || isNaN(percent5Star) ? 0 : Math.round(percent5Star)}
                />
                <span className="ms-3 text-[#333] text-[18px]">
                  {percent5Star === undefined || isNaN(percent5Star) ? '0%' : Math.round(percent5Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center px-3">
                  <span className="w-3 mr-3 text-[#333] text-[18px]">4</span>
                  <Icon
                    icon="solar:star-bold"
                    className="text-yellow-300"
                  />
                </div>
                <ProgressBar
                  percent={percent4Star === undefined || isNaN(percent4Star) ? 0 : Math.round(percent4Star)}
                />
                <span className="ms-3 text-[#333] text-[18px]">
                  {percent4Star === undefined || isNaN(percent4Star) ? '0%' : Math.round(percent4Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center px-3">
                  <span className="w-3 mr-3 text-[#333] text-[18px]">3</span>
                  <Icon
                    icon="solar:star-bold"
                    className="text-yellow-300"
                  />
                </div>
                <ProgressBar
                  percent={percent3Star === undefined || isNaN(percent3Star) ? 0 : Math.round(percent3Star)}
                />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent3Star === undefined || isNaN(percent3Star) ? '0%' : Math.round(percent3Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center px-3">
                  <span className="w-3 mr-3 text-[#333] text-[18px]">2</span>
                  <Icon
                    icon="solar:star-bold"
                    className="text-yellow-300"
                  />
                </div>
                <ProgressBar
                  percent={percent2Star === undefined || isNaN(percent2Star) ? 0 : Math.round(percent2Star)}
                />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent2Star === undefined || isNaN(percent2Star) ? '0%' : Math.round(percent2Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center px-3">
                  <span className="w-3 mr-3 text-[#333] text-[18px]">1</span>
                  <Icon
                    icon="solar:star-bold"
                    className="text-yellow-300"
                  />
                </div>
                <ProgressBar
                  percent={percent1Star === undefined || isNaN(percent1Star) ? 0 : Math.round(percent1Star)}
                />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent1Star === undefined || isNaN(percent1Star) ? '0%' : Math.round(percent1Star) + '%'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1">
            <button
              onClick={() => setOpenModal(true)}
              className="m-auto py-1 px-20 font-semibold text-[18px] text-white bg-[#1982f9] border-2 rounded-lg flex items-center"
            >
              <div className="flex items-center py-2">
                <Icon
                  icon="tabler:pencil-star"
                  fontSize={24}
                  className="me-2"
                />
                <span>Gửi đánh giá của bạn</span>
              </div>
            </button>
          </div>
        </div>
        <div>
          {data?.reviews?.map((item: any) => {
            return (
              <div
                key={item.id}
                className="flex mt-5"
              >
                <div className="min-w-[172px]">
                  <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {item.username}
                  </p>
                  <p className="text-[#7A7E7F]">{formatDateToDDMMYYYY(item.createdate)}</p>
                </div>
                <div>
                  <div className="flex mb-3">
                    {item.rating >= 1 && (
                      <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                        alt="img"
                      />
                    )}
                    {item.rating >= 2 && (
                      <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                        alt="img"
                      />
                    )}
                    {item.rating >= 3 && (
                      <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                        alt="img"
                      />
                    )}
                    {item.rating >= 4 && (
                      <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                        alt="img"
                      />
                    )}
                    {item.rating >= 5 && (
                      <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                        alt="img"
                      />
                    )}
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LatestBooks books={books} />
      <ModalReview
        openModal={openModal}
        CloseModal={closeModal}
        data={data}
        fetchData={fetchData}
      />
    </div>
  );
}
