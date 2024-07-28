import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "::-webkit-scrollbar-thumb": {
            display: "none",
          },
          "::-webkit-scrollbar-track": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      },
    },
  },
});

export default theme;
