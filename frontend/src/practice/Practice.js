import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Movie from "./Movie";
import Push from "./Push";
import Note from "./Note";

const useStyles = makeStyles((theme) => ({
  control: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    padding: theme.spacing(8, 0, 8, 0),
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Practice() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [cards, setCards] = useState([
    {
      title: "土木杯",
      article: "輕鬆虐",
      url: "https://www.youtube.com/embed/VbfpW0pbvaU",
    },
    {
      title: "土木杯",
      article: "輕鬆虐",
      url: "https://www.youtube.com/embed/VbfpW0pbvaU",
    },
  ]);

  return (
    <>
      <main>
        <div className={classes.control}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Practice
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Upload video
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Delete video
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            {cards.map((card, index) =>
              card.url === "" ? (
                <Note
                  key={`${index}+${card.title}`}
                  title={card.title}
                  article={card.article}
                />
              ) : (
                <Movie
                  key={`${index}+${card.title}`}
                  title={card.title}
                  url={card.url}
                  article={card.article}
                />
              )
            )}
          </Grid>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Push setCards={setCards} cards={cards} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
