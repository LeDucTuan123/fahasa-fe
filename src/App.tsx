import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import 'slick-carousel/slick/slick.css';
import './sections/e-commerce/home/slick-theme.css';

import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from './components/Toastify/Toast_Container';

import Route from './routers';
import { store } from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <HelmetProvider>
          <SkeletonTheme>
            <BrowserRouter>
              <ToastContainer />
              <Route />
            </BrowserRouter>
          </SkeletonTheme>
        </HelmetProvider>
      </Provider>
    </>
  );
}

export default App;
