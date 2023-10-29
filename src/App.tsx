import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Route from './routers';
import { store } from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Route />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </>
  );
}

export default App;
