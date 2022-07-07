import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
const portalURL = "https://portal.ultranote.org/";
// const portalURL = "http://localhost:5000/";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SimpleReactLightbox>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App portalURL={portalURL} />
          </PersistGate>
        </BrowserRouter>
      </SimpleReactLightbox>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
