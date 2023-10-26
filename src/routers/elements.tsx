import { ElementType, Suspense, lazy } from 'react';

// ------------------------------------------------------------------------------
const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback="Loading...">
    <Component {...props} />
  </Suspense>
);

// Main
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const DetailProductPage = Loadable(lazy(() => import('../pages/DetailProductPage')));
export const Login = Loadable(lazy(() => import('../pages/LoginPage')));
export const Error = Loadable(lazy(() => import('../pages/Error404')));

export const Cart = Loadable(lazy(() => import('../pages/CartPage')));

export const Products = Loadable(lazy(() => import('../pages/ProductsPage')));
export const Profile = Loadable(lazy(() => import('../pages/ProfilePage')));
export const ProfileOrder = Loadable(lazy(() => import('../pages/ProfileOrderPage')));
export const ProfileAddress = Loadable(lazy(() => import('../pages/ProfileAddressPage')));

