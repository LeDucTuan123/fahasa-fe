import React, { useEffect, useState } from 'react';
import { Banner, BestSellingBooks, Category, LatestBooks } from '../home';
import fetch from 'src/services/axios';
import { getProduct } from 'src/redux/slice/productSlice';
import { useAppDispatch } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import { BookType } from 'src/types/book';

export default function HomeView() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getProduct());
  //   // fetch.get(apiPaths.products).then((res) => console.log(res.data));
  // }, [dispatch]);

  const [books, setBooks] = useState<Array<BookType>>([]);

  useEffect(() => {
    fetch(apiPaths.book)
      .then((res) => {
        let bookTemp: any = [];
        for (let i = 0; i < 10; i++) {
          bookTemp.push(res.data[i]);
        }
        setBooks(bookTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Banner />

      <Category />

      <BestSellingBooks books={books} />

      <LatestBooks />
    </>
  );
}
