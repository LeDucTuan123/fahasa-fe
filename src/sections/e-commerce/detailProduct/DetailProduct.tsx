import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';
import { LatestBooks } from '../home';

export default function DetailProduct() {
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState<BookType>();

  const { id } = useParams();

  const fetchData = useCallback(() => fetch.get(`/rest/book/${id}`).then((res) => setData(res.data)), [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(data?.images);
  // const book = useSelector((state: any) => state.productDetail);

  // // const dispatch = useAppDispatch();

  // // const fetchDetail = useCallback(() => {
  // //   dispatch(getDetailProduct(id));
  // // }, [dispatch, id]);

  // // useEffect(() => {
  // //   fetchDetail();
  // // }, [fetchDetail]);

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
            <button className="text-[#d32f2f] text-xl border-[2px] border-[#d32f2f] px-5 rounded-md py-2 flex sm:w-[55%] active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white">
              <Icon
                icon="mdi:cart"
                fontSize={24}
              />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button className="bg-[#d32f2f] py-2 px-5 text-xl border-none rounded-md text-white sm:w-[40%] button-buy">
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

      <LatestBooks />
    </div>
  );
}
