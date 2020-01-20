import { createMuiTheme } from "@material-ui/core";
import { purple, teal, pink, blueGrey, indigo } from "@material-ui/core/colors";

const themeOverrides = {
  // MuiList: {
  //   padding: {
  //     paddingTop: 0,
  //     paddingBottom: 0,
  //   },
  // },
  //   MuiToolbar: {
  //     regular: {
  //       height: "56px",
  //       minHeight: "56px",
  //       '@media(min-width:960px)' : {
  // //      [defaultTheme.breakpoints.up('md')] : {
  //         height:"64px",
  //         minHeight: "64px",
  //       }
  //     }
  //   }
};

const lightTheme = createMuiTheme({
  palette: {
    primary: { main: "#1294f1" },
    secondary: { main: "#36475f" }
  },
  overrides: themeOverrides
});

const darkTheme = createMuiTheme({
  palette: {
    primary: { main: "#77ddff" },
    secondary: { main: "#26678f" },
    type: "dark"
  },
  overrides: themeOverrides
});

export { lightTheme, darkTheme };
