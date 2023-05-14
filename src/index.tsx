import { ConnectedRouter } from "connected-react-router";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as StoreProvider } from "react-redux";
import createStore, { history } from "store";
import App from "./App";
import { UIProvider } from "./ui";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const { store, persistor } = createStore();

ReactDOM.render(
  <StoreProvider store={store}>
    <UIProvider>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </UIProvider>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
