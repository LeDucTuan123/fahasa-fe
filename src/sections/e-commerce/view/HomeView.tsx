import React, { useEffect } from 'react';
import { Banner, BestSellingBooks, Category, LatestBooks } from '../home';
import { BookType } from 'src/types/book';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import fetch from 'src/services/axios/Axios';
import { ToolType } from 'src/types/tool';

export default function HomeView() {
  const cartProduct = localStorage.getItem('cart');
  const books: BookType[] = useSelector((state: any) => state.book.books);
  const tools: ToolType[] = useSelector((state: RootState) => state.tool.tools);
  const user: any = useSelector((state: RootState) => state.user.userData);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  // đẩy dữ liệu từ local lên db khi đăng nhập thành công và xóa cart trong localstorage
  function pushCartFromLocalToDB() {
    if (cartProduct) {
      let product = cartProduct && JSON.parse(cartProduct);
      // khi trong localstorage có sản phẩm thì nó sẽ được đẩy vào db khi có đăng nhập
      fetch
        .post('/rest/order/create', {
          orderdate: new Date(),
          totalamount: null,
          user: { id: user.id },
          statuss: { id: 1 },
          voucher: null,
          orderdetails: [
            ...product.map((item: any) => {
              return {
                quantity: item.quantity,
                price: item.price - (item.price * item.discount) / 100,
                book: books.find((book) => {
                  return book.title === item.title;
                }),
                schooltool: tools.find((tool) => {
                  return tool.title === item.title;
                }),
              };
            }),
          ],
        })
        .then((res) => {
          localStorage.removeItem('cart');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (user && user.id && isLogin) {
      pushCartFromLocalToDB();
    }
  }, []);

  return (
    <>
      <Banner />

      <Category />

      <BestSellingBooks books={books} />

      <LatestBooks books={books} />
    </>
  );
}
