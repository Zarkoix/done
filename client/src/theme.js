import { createMuiTheme } from "@material-ui/core/styles";

export const DARK_MODE_LOC = "isDarkTheme";

export const isDarkTheme = () => Boolean(localStorage.getItem(DARK_MODE_LOC));

export const setDarkTheme = (bool = true) => {
  if (bool) {
    localStorage.setItem(DARK_MODE_LOC, true);
  } else {
    localStorage.removeItem(DARK_MODE_LOC);
  }
};

const theme = createMuiTheme({
  palette: {
    type: isDarkTheme() ? "dark" : "light",
    primary: {
      main: "#593f62"
    },
    secondary: {
      main: "#63d2ff"
    }
  }
});

export default theme;
