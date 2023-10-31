import React, { useEffect } from 'react';
import { Banner, BestSellingBooks, Category, LatestBooks } from '../home';
import { BookType } from 'src/types/book';
import { useAppDispatch } from 'src/redux/store';
import { getBook } from 'src/redux/slice/bookSlice';
import { useSelector } from 'react-redux';

export default function HomeView() {
  const dispatch = useAppDispatch();
  const books: BookType[] = useSelector((state: any) => state.book.books);

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  return (
    <>
      <Banner />

      <Category />

      <BestSellingBooks books={books} />

      <LatestBooks books={books} />
    </>
  );
}
