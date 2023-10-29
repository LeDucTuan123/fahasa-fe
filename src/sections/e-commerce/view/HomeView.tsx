import React, { useEffect } from 'react';
import { Banner, BestSellingBooks, Category, LatestBooks } from '../home';
import fetch from 'src/services/axios';
import { getProduct } from 'src/redux/slice/productSlice';
import { useAppDispatch } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';

export default function HomeView() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct());
    // fetch.get(apiPaths.products).then((res) => console.log(res.data));
  }, [dispatch]);

  return (
    <>
      <Banner />

      <Category />

      <BestSellingBooks />

      <LatestBooks />
    </>
  );
}
