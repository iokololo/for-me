import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "react-range-slider-input/dist/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../i18n";
import "./assets/fonts/fonts.css";
import "./global_style.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./components/AppRouter";
import { YMaps } from "@pbe/react-yandex-maps";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_TRACKING_ID);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <AppRouter />
    </Suspense>
  </Provider>
);
