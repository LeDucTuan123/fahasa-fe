import React from 'react';
import { Filter, Products } from '../products';

export default function ProductsView() {
  return (
    <>
      <div className="grid grid-cols-4">
        <Filter />
        <div className="col-span-3">
          <Products />
        </div>
      </div>
    </>
  );
}
