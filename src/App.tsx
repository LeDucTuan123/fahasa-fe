import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Route from "./routers";

function App() {
  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <Route />
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
