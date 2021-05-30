import { AppBar, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "0.5rem",
    boxShadow: "none",
    marginBottom: "2rem",
    backgroundColor: theme.palette.background.default,
  },
  headerTitle: {
    color: theme.palette.text.primary,
  },
  headerSubtitle: {
    color: theme.palette.text.secondary,
  },
  themeSwitcher: {
    left: "auto",
    right: 0,
    width: "fit-content",
  },
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.header} align="center">
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.headerTitle}
      >
        restaurace
      </Typography>
      <Typography
        component="h1"
        variant="subtitle2"
        align="center"
        className={classes.headerSubtitle}
      >
        Avaliações de restaurantes
      </Typography>
    </AppBar>
  );
};
