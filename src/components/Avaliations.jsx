import { useState } from "react";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  fade,
  CardActions,
  IconButton,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAxios } from "../hooks/useAxios";
import { api } from "../services/api";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    backgroundColor: theme.palette.background.secondary,
  },
  isLoading: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: "rgba(255, 0, 0, 0.815)",
  },
  icon: {
    color: theme.palette.icon.default,
  },
  liked: {
    color: theme.palette.secondary,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Avaliations = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isValidating } = useAxios("reviews");

  function handleFavorite(id, liked) {
    api.patch(`/reviews/${id}`, {
      liked: !liked,
    });
    window.location.reload();
  }

  return (
    <Container maxWidth="md">
      <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Exemplo: Pé de Fava"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
      <Grid container spacing={4} justify="center">
        {isValidating ? (
          <Typography variant="h5" className={classes.isLoading}>
            Carregando avaliações...
          </Typography>
        ) : (
          data
            ?.filter((review) =>
              review?.restaurant.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((review) => (
              <Grid item key={review.id}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="avaliação"
                        alt={review.reviewer.name}
                        className={classes.avatar}
                      ></Avatar>
                    }
                    title={`${review.reviewer.name} disse:`}
                    subheader={review.title}
                  />
                  <CardMedia
                    className={classes.media}
                    image={review.restaurant.thumbnail}
                    title={review.restaurant.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h6">
                      {review.restaurant.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      component="span"
                    >
                      Avaliação: {review.rating}/10
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {review.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="adicione aos favoritos"
                      title="Adicione aos favoritos"
                      color="secondary"
                      onClick={() => handleFavorite(review.id, review.liked)}
                    >
                      <FavoriteIcon
                        className={review.liked ? classes.liked : classes.icon}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
        )}
      </Grid>
    </Container>
  );
};
