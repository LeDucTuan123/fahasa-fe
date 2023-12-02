import { Helmet } from 'react-helmet-async';
import ProductsView from 'src/sections/e-commerce/view/ProductsView';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
