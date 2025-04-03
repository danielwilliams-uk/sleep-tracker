/*import { createMuiTheme } from '@material-ui/core/styles';
 *   todo: createMuiTheme deprecated. See docs... use @material-uk/core pathway
 * */
import { createTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#5c67a3",
      main: "#1976D2",
      dark: "#2e355b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
    openTitle: "#1976D2",
    protectedTitle: pink["400"],
    type: "light",
  },
});

export default theme;
