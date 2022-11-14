import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none", ...Array(20).fill('none')],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
