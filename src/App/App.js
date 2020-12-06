import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { SideMenu } from "../components/SideMenu";
import "./App.css";
import Employees from "../pages/Employees/Employees";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#00ffd3",
      main: "#02f509",
    },
    background: {
      default: "#f4f4f4",
    },
  },

  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0px)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />

        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
