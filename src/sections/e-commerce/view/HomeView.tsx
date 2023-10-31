import React from 'react';
import { Banner, BestSellingBooks, Category, LatestBooks } from '../home';
import { BookType } from 'src/types/book';
import { useSelector } from 'react-redux';

export default function HomeView() {
  const books: BookType[] = useSelector((state: any) => state.book.books);

  return (
    <>
      <Banner />

      <Category />

      <BestSellingBooks books={books} />

      <LatestBooks books={books} />
    </>
  );
}
