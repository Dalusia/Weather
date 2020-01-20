import React, { useState } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getCookie, setCookie } from "./utils/cookies";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Routes from "./Routes";
import { ThemeContext } from "./Context";
import { lightTheme, darkTheme } from "./Theme";

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    getCookie("theme") === "dark"
  );

  const setDarkModeWrapper: (darkMode: boolean) => void = darkMode => {
    setCookie("theme", darkMode ? "dark" : "light", 365);
    setDarkMode(darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode: darkMode, setDarkMode: setDarkModeWrapper }}
    >
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
