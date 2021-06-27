import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Dialog,
  DialogContent,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Visibility, Description, Movie } from "@material-ui/icons";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { useQuery } from "react-query";
import Video from "./Video";
import Push from "./Push";
import Note from "./Note";
import instance from "../setting";

const blackTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  overrides: {
    MuiCard: {
      root: {
        boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.3)",
        "&:hover": { boxShadow: "2px 4px 20px 2px rgba(0,0,0,0.3)" },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  edit: { padding: theme.spacing(8, 0, 1, 5) },
  cardGrid: {
    padding: theme.spacing(8, 0, 8, 0),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  tab: {
    width: "40%",
    flexGrow: 1,
    position: "absolute",
    right: 0,
    top: "-55px",
  },
  paper: {
    padding: theme.spacing(5, 0, 5, 0),
    margin: theme.spacing(0, 5, 0, 5),
    position: "relative",
  },
  btn: {
    height: "48px",
    width: "10%",
    margin: theme.spacing(0, 1, 0, 0),
  },
}));

export default function Practice() {
  let list;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const {
    data: cards = [],
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "CardsFetching",
    async () => {
      const data = await instance.get("/api/practice/posts");
      return data.data.sort((a, b) => {
        const dateA = new Date(a.uploadTime);
        const dateB = new Date(b.uploadTime);
        return dateB - dateA;
      });
    },
    {
      retry: false,
      onSuccess: () => {},
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  if (tab === 0) {
    list = cards.map((card, index) =>
      !card.url ? (
        <Note
          key={`${index}+${card.title}`}
          title={card.title}
          content={card.content}
          id={card._id}
        />
      ) : (
        <Video
          key={`${index}+${card.title}`}
          title={card.title}
          url={card.url}
          description={card.description}
          id={card._id}
        />
      )
    );
  } else if (tab === 1) {
    list = cards.map((card, index) =>
      !card.url ? (
        <Note
          key={`${index}+${card.title}`}
          title={card.title}
          content={card.content}
          id={card._id}
        />
      ) : null
    );
  } else {
    list = cards.map((card, index) =>
      !card.url ? null : (
        <Video
          key={`${index}+${card.title}`}
          title={card.title}
          url={card.url}
          description={card.description}
          id={card._id}
        />
      )
    );
  }

  return (
    <>
      <ThemeProvider theme={blackTheme}>
        <main>
          <div className={classes.edit}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              className={classes.btn}
            >
              Upload
            </Button>
          </div>

          <Paper elevation={3} className={classes.paper}>
            <Paper square elevation={3} className={classes.tab}>
              <Tabs
                value={tab}
                onChange={handleTab}
                variant="scrollable"
                indicatorColor="primary"
                scrollButtons="on"
                textColor="primary"
                aria-label="icon tabs example"
                className={classes.tabs}
              >
                <Tab icon={<Visibility />} aria-label="all" />
                <Tab icon={<Description />} aria-label="article" />
                <Tab icon={<Movie />} aria-label="video" />
              </Tabs>
            </Paper>
            <Container className={classes.cardGrid}>
              <Grid container spacing={4}>
                {list}
              </Grid>
            </Container>
          </Paper>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <Push
                cards={cards}
                handleClose={handleClose}
                refetchEvents={refetchEvents}
              />
            </DialogContent>
          </Dialog>
        </main>
      </ThemeProvider>
    </>
  );
}
