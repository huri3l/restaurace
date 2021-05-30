import {
  Box,
  CssBaseline,
  MuiThemeProvider,
  Switch,
  Typography,
  createMuiTheme,
} from "@material-ui/core";

import { Avaliations } from "./Avaliations";
import { Description } from "./Description";
import { Header } from "./Header";

import { lightTheme, darkTheme } from "../styles/themes";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitch } from "../reducers/theme";

export const Layout = () => {
  const actualTheme = useSelector((state) => state.themeReducer);

  const dispatch = useDispatch();

  function switchTheme() {
    dispatch(themeSwitch(actualTheme));
  }

  const appliedTheme = createMuiTheme(
    actualTheme === "light" ? lightTheme : darkTheme
  );

  return (
    <MuiThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Box marginLeft={2}>
          <Typography component="span" variant="subtitle2" align="center">
            Tema Escuro
          </Typography>
          <Switch
            checked={actualTheme === "dark" ? true : false}
            onChange={switchTheme}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Box>
        <Description />
        <Avaliations />
      </main>
    </MuiThemeProvider>
  );
};
