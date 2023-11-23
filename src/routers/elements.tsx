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
export const Register = Loadable(lazy(() => import('../sections/e-commerce/login/Register')));
export const Error = Loadable(lazy(() => import('../pages/Error404')));

export const SpinLuckyVoucher = Loadable(lazy(() => import('../pages/SpinLucky')));

export const Cart = Loadable(lazy(() => import('../pages/CartPage')));
export const Payment = Loadable(lazy(() => import('../pages/PaymentPage')));
export const PaymentSuccess = Loadable(lazy(() => import('../pages/PaymentSuccessPage')));

export const Products = Loadable(lazy(() => import('../pages/ProductsPage')));
export const Profile = Loadable(lazy(() => import('../pages/ProfilePage')));
export const ProfileOrder = Loadable(lazy(() => import('../pages/ProfileOrderPage')));
export const ProfileAddress = Loadable(lazy(() => import('../pages/ProfileAddressPage')));
//admin
export const AdminDashboard = Loadable(lazy(() => import('../pages/AdminDashboardPage')));
export const AdminProduct = Loadable(lazy(() => import('../pages/AdminProductPage')));
export const AdminUser = Loadable(lazy(() => import('../pages/AdminUserPage')));
export const AdminBill = Loadable(lazy(() => import('../pages/AdminBillPage')));
export const AdminOrther = Loadable(lazy(() => import('../pages/AdminOrtherPage')));
export const AdminVoucher = Loadable(lazy(() => import('../pages/AdminVoucherPage')));
export const AdminCategory = Loadable(lazy(() => import('../pages/AdminCategoryPage')));
