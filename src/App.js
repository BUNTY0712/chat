import React from "react";
import MainRouter from "./MainRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Store"; // Import both store and persistor
// import "./App.css";

const App = () => {
  return (
    <>
      <Provider store={store} basename="./chat">
        <PersistGate loading={null} persistor={persistor}>
          <MainRouter basename="/chat" />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
