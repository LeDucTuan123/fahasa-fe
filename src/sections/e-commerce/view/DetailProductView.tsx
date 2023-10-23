import { Helmet } from 'react-helmet-async';
import { DetailProduct } from '../detailProduct';

export default function DetailProductView() {

  return (
    <>
      <Helmet>
        <title>Sản phẩm chi tiết</title>
      </Helmet>

      <DetailProduct />
    </>
  );
}
