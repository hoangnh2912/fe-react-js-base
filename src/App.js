import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";

function App() {
  return (
    <Provider store={require("./redux/store").default}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
