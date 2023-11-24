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
import { formatDateToDDMMYYYY } from 'src/util/SupportFnc';

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
    } else {
      handleAddProduct();
    }
    navigate('/cart');
  }

  function closeModal() {
    setOpenModal(false);
  }
  return (
    <div className="flex flex-col space-y-2 pt-4">
      <div className="flex flex-row">
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
                } else {
                  handleAddProduct();
                }
              }}
              className="text-[#d32f2f] text-xl border-[2px] border-[#d32f2f] px-5 rounded-md py-2 flex sm:w-[55%] active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white"
            >
              <Icon
                icon="mdi:cart"
                fontSize={24}
              />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              onClick={() => {
                handleBuyNow();
              }}
              className="bg-[#d32f2f] py-2 px-5 text-xl border-none rounded-md text-white sm:w-[40%] button-buy"
            >
              <span>Mua ngay</span>
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
            <div className="w-[40%]">
              <p className="text-sm">Tác giả: {data?.author}</p>
              {/* <p className="text-sm">Hình thức bìa: {data?.description}</p> */}
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="text-[2rem] font-extrabold text-gray-800">{data?.price} đ</div>
            <span className="line-through">{data?.stock}</span>
            <div className="discount">{data?.discount}%</div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-full pr-4">
              <p className="text-xl">Miêu tả: </p>
              <p className="text-sm">{data?.description}</p>
            </div>
            {/* <div> */}
            {/* <p className="text-sm">Tác giả: {data?.author}</p> */}
            {/* <p className="text-sm">Hình thức bìa: {data?.description}</p> */}
            {/* </div> */}
          </div>

          <div className="flex flex-row items-center">
            <p className="text-xl w-[200px]">SỐ LƯỢNG: </p>

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
                  width: '25px',
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

      <hr />

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
                <span className="me-3 text-[#333] text-[18px]">5 sao</span>
                <ProgressBar percent={percent5Star === undefined ? 0 : Math.round(percent5Star)} />
                <span className="ms-3 text-[#333] text-[18px]">
                  {percent5Star === undefined ? '0%' : Math.round(percent5Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="me-3 text-[rgb(51,51,51)] text-[18px]">4 sao</span>
                <ProgressBar percent={percent4Star === undefined ? 0 : Math.round(percent4Star)} />
                <span className="ms-3 text-[#333] text-[18px]">
                  {percent4Star === undefined ? '0%' : Math.round(percent4Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="me-3 text-[#333] text-[18px]">3 sao</span>
                <ProgressBar percent={percent3Star === undefined ? 0 : Math.round(percent3Star)} />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent3Star === undefined ? '0%' : Math.round(percent3Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="me-3 text-[#333] text-[18px]">2 sao</span>
                <ProgressBar percent={percent2Star === undefined ? 0 : Math.round(percent2Star)} />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent2Star === undefined ? '0%' : Math.round(percent2Star) + '%'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="me-3 text-[#333] text-[18px]">1 sao</span>
                <ProgressBar percent={percent1Star === undefined ? 0 : Math.round(percent1Star)} />
                <span className="ms-3 text-[#333] text-[18px]">
                  {' '}
                  {percent1Star === undefined ? '0%' : Math.round(percent1Star) + '%'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1">
            <button
              onClick={() => setOpenModal(true)}
              className="m-auto py-1 px-20 font-semibold text-[18px] text-[#C92127] border-[#C92127] border-2 rounded-lg flex items-center"
            >
              <Icon
                icon="solar:pen-linear"
                className="me-2"
              />
              Viết đánh giá
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

          <div className="flex mt-5">
            <div className="min-w-[172px]">
              <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">Pun</p>
              <p className="text-[#7A7E7F]">07/09/2020</p>
            </div>
            <div>
              <div className="flex mb-3">
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                  alt="img"
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                  alt="img"
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                  alt="img"
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                  alt="img"
                />
                <img
                  src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_star_yellow.svg"
                  alt="img"
                />
              </div>
              <p>
                Nhắc đến hai chữ tuổi thơ, trong đầu bạn sẽ nghĩ đến điều gì? Đối với mình là những buổi trưa hè trốn
                cha mẹ đi chơi cùng lũ bạn. Nào bắn bi, nào đánh khăng, nào trốn tìm, nào tập bơi uống nước no căng
                bụng, nhiều không kể hết và thích thú nhất là những que kem đá mát lạnh mua ở chỗ xe kem có cái thùng gỗ
                bạc thếch phía sau, lúc nào cũng phát ra tiếng còi bóp toe toe vang dậy cả một góc đường. Sau này lớn
                hơn một chút, khi Internet bắt đầu buổi bình minh, mỗi phố huyện mới chỉ có một, hai tiệm net nho nhỏ.
                Khi ấy đứa nào dành dụm được vài nghìn bạc để thuê máy là ngay lập tức đằng sau nó xuất hiện một “hội
                đồng” đứng xem, chỉ chỉ trỏ trỏ. Rồi đứa này xin chơi ké, đứa kia xin di thử con chuột khiến cho đứa
                đang ngồi chơi bỗng chốc thấy mình chở nên quyền lực hơn người. Nhưng đời đâu có như mơ, khi phụ huynh
                bắt được, cái đám đứng sau đó lủi nhanh như cuốc, bỏ lại khổ chủ với mấy cái quật đau đến điếng người.
                Một quãng tuổi thơ như thế, giờ đây nhắc lại, so với các em, các cháu sinh ra quen với máy móc, smart
                phone; với nhà cao tầng, chung cư kín mít; vẫn được thế hệ 9x tụi mình tự hào là tuổi thơ dữ dội, nhưng
                đấy chỉ là cái dữ dội của thời bình. Còn tuổi thơ trong thời chiến mà mình may mắn được đọc và biết đến
                trong quyển sách mang tên “Tuổi thơ dữ dội” của nhà văn Phùng Quán, quả thực vượt xa những gì mình tưởng
                tượng. Quyển này mình được cô bạn cùng tổ tặng. “Quà sinh nhật”. Nó bảo thế, mặc dù lúc nhận sách, sinh
                nhật đã qua được cả tháng rồi. Tiểu thuyết khá dài, gồm 8 phần, độ ngót ngét 800 trang, đặc tiếng địa
                Huế, may mà mình với kinh nghiệm 5 năm có lẻ ở Vinh nên không gặp khó khăn khi đọc. Chứ phải đưa cho ai
                đó người Bắc, chưa nghe tiếng miền Trung bao giờ thì đến phải vừa đọc vừa tra từ điển. Nội dung tác phẩm
                kể về câu chuyện xảy ra ở mặt trận Thừa Thiên những ngày mới bắt đầu cuộc kháng chiến chống Pháp. Đọc
                đến những cái tên như cầu Tràng Tiền, chùa Từ Đàm, Đông Ba, An Cựu, Bao Vinh và cả cái đoạn này “ Mới xa
                Huế chưa đầy tháng mà chúng có cảm tưởng đã xa Huế hàng năm trời. Biết bao kỷ niệm da diết… Huế tưng
                bừng, sôi sục trong ngày tổng khởi nghĩa, Huế lẫm liệt ngang tàng nổ súng kháng chiến. Huế gầm thét dữ
                dội năm mươi ngày đêm vây hãm quân thù. Huế hài hước cười cợt bất cứ trong hoàn cảnh nào” tự nhiên trong
                lòng có một nỗi mong muốn tha thiết đến Huế, thăm lại cái xứ mộng mơ mà hồi bé tí ti chưa biết gì mình
                dịp một lần đi với bố. Nhân vật chính là những đội viên Đội thiếu niên trinh sát thuộc Trung đoàn Trần
                Cao Vân, gồm ba mươi hai bạn nhỏ chạc mười ba, mười bốn tuổi như Mừng, Lượm sứt, Vịnh sưa, Quỳnh Sơn Ca,
                Bồng da rắn, Tư dát,… - những cái tên đặc biệt đã tóm lược được phần nào tính cách và ngoại hình của mỗi
                nhân vật. Phùng Quán kể cho chúng ta nghe về tình bạn, lòng yêu cách mạng nhiệt thành, quá trình sống,
                chiến đấu, trưởng thành và hy sinh – lẽ tất nhiên, có cuộc chiến nào mà không có những mất mát, đau
                thương - giữa muôn vàn khó khăn trong buổi đầu kháng chiến của các em Đọc cả tiểu thuyết, mình ấn tượng
                nhất với hai thứ. Một là cuộc “trường kỳ” vượt ngục đến ba lần, hấp dẫn và hồi hộp chả kém gì phim hành
                động Hollywood bên trời Tây của Lượm - chiến sĩ cộng sản nòi. Nhưng mà vượt ngục một mình thì thật bình
                thường quá, Lượm của chúng ta còn dắt theo cả Thúi – thằng nhóc bán kẹo kéo ốm nhom ốm nhách - và Lép
                sẹo - đứa tù giang hồ đã từng đánh nhau thừa sống thiếu chết với nó – cao chạy xa bay khỏi cái nhà lao
                Thừa Phủ khét tiếng. Biến tất cả những tên cai tù có thừa sự độc ác, xảo trá và chiêu trò bỗng chốc trở
                thành vài tên học việc chưa thạo nghề. Xét về độ nghĩa hiệp, Lượm thật chả kém cạnh gì mấy anh hùng
                giang hồ trong tiểu thuyết kiếm hiệp của Kim Dung. Mà các bạn có biết vì sao Lượm vượt ngục thành công
                không? Vì nó là tù nhân duy nhất biết tiếng Pháp. Đấy, việc học hành đến nơi đến chốn rất quan trọng, ở
                tù cũng phân ra loại có học và không có học cơ mà. Điều thứ hai là nỗi oan khiên của Mừng, nó có giải
                thích thế nào cũng chẳng được. Không ai chịu hiểu nó! Cả chiến khu giờ đây quay mặt. Nó từ đứa nhóc tì
                liên lạc được mọi người quý mến trở thành kẻ Việt gian lành nghề đáng ghê tởm. Mừng khóc tức tưởi khi
                ngay cả mẹ, người coi nó là cả lẽ sống và cũng là người nó yêu quý nhất trên đời – sẵn lòng trèo lên tất
                cả các ngọn cây bút bút trong thành phố Huế giữa những ngày chiến trận để lấy cây tầm gửi đem về chữa
                bệnh hen suyễn cho mẹ và từ đó mở ra cơ duyên tham gia Vệ Quốc Đoàn – đến lúc chết đi cũng không tin
                tưởng nó “ Rứa mà chừ mạ được gặp con thì té ra con đi làm Việt gian, bị Chánh phủ giam tù. Ôi chao, đau
                lòng mạ quá con ơi! Biết nông nỗi ni thì mạ đừng gặp con còn hơn!...”. Giọt nước mắt ấy thực sự làm mình
                gai người, bất giác thấy giống như Phùng Quán đang mượn nhân vật Mừng để bộc bạch những nỗi niềm trong
                lòng về quãng thời gian “cá trộm, rượu chịu, văn chui” đầy tủi nhục suốt mấy chục năm của mình. Nói tóm
                lại cho cùng “Tuổi thơ dữ dội”, được viết bởi Phùng Quán - một nhà văn thuộc thế hệ cũ. Lẽ hiển nhiên,
                nó mang trong mình âm hưởng của một bản anh hùng ca, ngợi ca về cuộc chiến mà dân tộc Việt Nam chúng ta
                đã dám bước vào, chiến đấu và chiến thắng.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LatestBooks books={books} />
      <ModalReview
        openModal={openModal}
        CloseModal={closeModal}
        data={data}
      />
    </div>
  );
}
