import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavoriteBook } from 'src/redux/slice/commonSlice';
import { RootState, useAppDispatch } from 'src/redux/store';
import { BookType } from 'src/types/book';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   color: theme.palette.text.secondary,
//   border: '1px solid #3333',
//   height: '200px',
//   cursor: 'pointer',
// }));

interface props {
  books: Array<BookType>;
  onScrollToTop?: () => void;
  skeletonProducts: JSX.Element[];
}

export default function BestSellingBooks({ books, onScrollToTop, skeletonProducts }: props) {
  const itemsPerPage = 10;
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const totalItems = books.length;

  const user: any = useSelector((state: RootState) => state.user.userData);
  const favo: any = useSelector((state: RootState) => state.common.favorite);

  const storedData: any = localStorage.getItem('favoriteItems');
  const favoriteItemsFromLocalStorage: any | string[] = storedData ? JSON.parse(storedData) : [];

  const dispatch = useAppDispatch();

  const loadMore = () => {
    setDisplayedItems((prev) => prev + (totalItems - 150));
  };

  const showLess = () => {
    setDisplayedItems(itemsPerPage);
  };
  const handleAddFavoriteBook = (item: any) => {
    const updatedFavoriteItems: any = [...favoriteItemsFromLocalStorage, item];

    localStorage.setItem('favoriteItems', JSON.stringify(updatedFavoriteItems));

    const userId = user.id;
    dispatch(
      addToFavoriteBook({
        userId,
        bookId: item.id,
      }),
    );
  };

  return (
    <div className="w-full pt-5 bg-white p-3 mt-4 rounded-lg">
      <div className="flex items-center pb-3 px-3 gap-3 ">
        <Icon
          icon={'ep:sell'}
          className="text-3xl font-extrabold text-red-400"
        />
        <p className="text-xl font-bold uppercase">Sách bán chạy</p>
      </div>
      <div className="w-full px-3 pb-5">
        <hr className="w-full border-gray-200" />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-3">
        {/* {category.map((pr, index) => (
          <div
            key={index}
            className="p-5 border-[1px] border-gray-300 shadow-md rounded-md"
          >
            <Link to="/detailproduct">
              <img
                src={pr.image}
                alt={pr.title}
                className="w-full h-[140px] object-cover"
              />
            </Link>
            <div className="pt-2">
              <p className="text-sm">{pr.title}</p>
              <p className="text-sm">{pr.price}</p>
            </div>
          </div>
        ))} */}

        {books.length > 0 ? (
          books.slice(0, displayedItems).map((item: any) => {
            let isFavorite = false;
            const favoritepr = localStorage.getItem('favoriteItems');
            if (favoritepr) {
              let fv: any = JSON.parse(favoritepr);
              fv.filter((i: any) => {
                if (i.title === item.title) {
                  isFavorite = true;
                }
              });
            }
            // console.log(isFavorite);
            return (
              <div
                key={item.id}
                className="p-5 border-[1px] border-gray-300 shadow-md rounded-md relative bg-white "
              >
                <Link
                  to={`/detailproduct/${item.id}`}
                  onClick={() => onScrollToTop}
                >
                  <img
                    src={item.images}
                    alt={'img'}
                    className="w-full max-h-[190px] object-cover hover:scale-105 transition duration-700 ease-in-out"
                  />
                </Link>
                <div className="pt-2 ">
                  <Link
                    to={`/detailproduct/${item.id}`}
                    onClick={() => onScrollToTop}
                  >
                    <p className="text-sm line-clamp-2 h-[40px]">{item.title}</p>
                  </Link>
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-[#C92127] mt-2">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          item.price - (item.price * item.discount) / 100,
                        )}
                      </p>
                      <p className="text-sm text-[#888888] line-through">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </p>
                      <span className="absolute right-1 top-2 first-letter bg-[#F7941E] text-white font-semibold px-1 py-2 rounded-full">
                        {item.discount}%
                      </span>
                    </div>
                    <Icon
                      onClick={() => handleAddFavoriteBook(item)}
                      icon={'ic:round-favorite'}
                      className={`hover:text-red-500 text-3xl  cursor-pointer ${
                        isFavorite ? 'text-red-500' : 'text-slate-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>{skeletonProducts}</>
        )}
      </div>
      {displayedItems < totalItems - 150 ? (
        <div className="text-center mt-4">
          <button
            className="text-[#d32f2f] font-semibold border-[2px] border-[#d32f2f] px-4 rounded-md py-2 active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white"
            onClick={loadMore}
          >
            Xem Thêm
          </button>
        </div>
      ) : (
        displayedItems > itemsPerPage && (
          <div className="text-center mt-4">
            <button
              className="text-[#d32f2f] font-semibold border-[2px] border-[#d32f2f] px-4 rounded-md py-2 active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white"
              onClick={showLess}
            >
              Thu gọn
            </button>
          </div>
        )
      )}
    </div>
  );
}
