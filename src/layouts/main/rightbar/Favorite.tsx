import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'src/components/Link';
import { RootState } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';
import { ToolType } from 'src/types/tool';

export default function Favorite() {
  const [products, setProducts] = useState<[]>([]);

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const userData: any = useSelector((state: RootState) => state.user.userData);
  const books = useSelector((state: RootState) => state.book.books);
  const tools = useSelector((state: RootState) => state.tool.tools);

  // console.log('initital book: ', initialBooks);

  useEffect(() => {
    const fetchFavorite = async () => {
      if (isLogin && userData && userData.id) {
        const res = await fetch.get(`/rest/favorite/success/${userData && userData.id && userData.id}`);
        const pr = res.data.map((item: any) => item[0]);
        console.log('ghgh:', pr);
        if (res.data) {
          let product = pr.map((prs: any) => {
            let book: any = books.some((item) => {
              return item.id === prs.id;
            });
            let tool: any = tools.some((item) => {
              return item.id === prs.id;
            });
            if (book || tool) {
              return {
                id: prs.favorite[0].id,
                title: prs.title,
                images: prs.images,
                author: prs.author,
                brand: prs.brand,
              };
            }
          });
          setProducts(product);
        }
      } else {
        setProducts([]);
      }
    };

    fetchFavorite();
  }, [books, isLogin, tools, userData]);
  console.log(products);

  const handleDeleteFavorite = async (item: any) => {
    const favoritepr = localStorage.getItem('favoriteItems');
    if (favoritepr) {
      let fv: any = JSON.parse(favoritepr);
      fv = fv.filter((i: any) => {
        return i.title !== item.title;
      });
      localStorage.setItem('favoriteItems', JSON.stringify(fv));
      setProducts(fv);
    }

    try {
      await fetch.delete(`${apiPaths.favorite}/${item.id}`);
      const pr: any = products.filter((i: any) => i.id !== item.id);
      toast.success('Xóa thành công');
      return setProducts(pr);
    } catch (error) {
      toast.error('Xóa thất bại');
    }
    console.log(item.id);
  };

  console.log(products);
  return (
    <>
      <div className="absolute w-full z-50">
        <div className=" flex h-10 bg-red-300 items-center justify-center">
          <span className="font-serif text-2xl ">Yêu thích</span>
        </div>
      </div>
      <div className="w-full h-screen overflow-y-scroll pt-20">
        <div className="grid grid-cols-2 ">
          {isLogin && userData !== null ? (
            <>
              {products.length === 0 ? (
                <div className="flex col-span-2 w-full items-center justify-center">
                  <p className="text-2xl text-red-300 w-full text-center">Chưa có sản phẩm yêu thích nào</p>
                </div>
              ) : (
                products.map((item: any) => (
                  <div
                    key={item.id}
                    className="relative w-full h-64 border-[1px] border-solid hover:shadow-2xl cursor-pointer"
                  >
                    <div className="w-full h-40 p-2">
                      <img
                        src={item.images}
                        alt=""
                        className="w-full h-full object-cover "
                      />
                      <p className="text-sm font-sans overflow-hidden text-ellipsis line-clamp-2 pt-2">{item.title}</p>
                      {item.author ? (
                        <p className="text-sm pt-1">
                          <span className="font-bold">Tác giả</span> <span className="text-[13px]">{item.author}</span>
                        </p>
                      ) : (
                        <p className="text-sm pt-1">
                          <span className="font-bold">Thương hiệu</span>{' '}
                          <span className="text-[13px]">{item.brand}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteFavorite(item)}
                      className="absolute top-2 right-2 text-[12px] bg-gray-400 p-1 rounded-lg hover:bg-red-400"
                    >
                      Xóa
                    </button>
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              <div className="flex col-span-2 flex-col w-full items-center justify-center">
                <p className="text-2xl text-red-300 w-full text-center">Vui lòng đăng nhập để lưu sản phẩm yêu thích</p>
                <br />
                <Link to="/login">
                  <p className="text-2xl text-blue-400 w-full text-center underline hover:text-blue-500 cursor-pointer">
                    Đăng nhập
                  </p>
                </Link>
              </div>
            </>
          )}
        </div>
        {/* <div
          className="w-full text-center p-3 pb-5 text-red-400 underline hover:text-red-500 cursor-pointer active:text-red-800"
          onClick={() => setMore((prev) => prev + 10)}
        >
          Xem thêm
        </div> */}
      </div>
    </>
  );
}
