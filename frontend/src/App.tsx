import React from "react";
import { Provider } from "react-redux";
import Routes from "./routes";

import { GlobalStyle } from "./App.styles";

const App: React.FC = () => {
  return (
    <>
      <>
        <GlobalStyle />
        <Routes />
      </>
    </>
  );
};

export default App;
