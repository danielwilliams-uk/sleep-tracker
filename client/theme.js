import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  palette: {
    primary: {
      main: "#5C6BC0",
      light: "#8E99F3",
      dark: "#26418F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#BA68C8",
      light: "#E1BEE7",
      dark: "#883997",
      contrastText: "#ffffff",
    },
    openTitle: "#1976D2",
    protectedTitle: pink["400"],
    type: "light",

    background: {
      default: "#F3F4F6",
      paper: "#ffffff",
    },
    text: {
      primary: "#8E99F3",
      secondary: "#5F6368",
    },
  },
});

export default theme;
