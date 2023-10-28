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

export const Cart = Loadable(lazy(() => import('../pages/CartPage')));

export const Products = Loadable(lazy(() => import('../pages/ProductsPage')));
export const Profile = Loadable(lazy(() => import('../pages/ProfilePage')));
export const ProfileOrder = Loadable(lazy(() => import('../pages/ProfileOrderPage')));
export const ProfileAddress = Loadable(lazy(() => import('../pages/ProfileAddressPage')));
//admin
export const AdminDashboard = Loadable(lazy(() => import('../pages/AdminDashboardPage')));
export const AdminProduct = Loadable(lazy(() => import('../pages/AdminProductPage')));
export const AdminUser = Loadable(lazy(() => import('../pages/AdminUserPage')));
export const AdminFeedback = Loadable(lazy(() => import('../pages/AdminFeedbackPage')));
export const AdminOrther = Loadable(lazy(() => import('../pages/AdminOrtherPage')));
