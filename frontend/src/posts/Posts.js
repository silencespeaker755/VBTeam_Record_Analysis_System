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
import Loading from "../components/Loading";

const blackTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  overrides: {
    MuiCard: {
      root: {
        "&:hover": { boxShadow: "1px 0px 10px 1px rgba(0,0,0,0.3)" },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  edit: { padding: theme.spacing(8, 0, 1, 0), paddingLeft: "20px" },
  cardGrid: {
    padding: theme.spacing(8, 0, 8, 0),
  },
  tab: {
    width: "auto%",
    flexGrow: 1,
    position: "absolute",
    right: 0,
    top: "-55px",
  },
  paper: {
    marginBottom: "20px",
    marginRight: "20px",
    marginLeft: "20px",
    paddingRight: "10px",
    paddingLeft: "10px",
    position: "relative",
    minHeight: "550px",
  },
  btn: {
    height: "48px",
    width: "10%",
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
      return data.data;
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

  useEffect(() => {
    document.title = "文章&影片";
  }, []);

  if (isEventsLoading) return <Loading />;

  return (
    <>
      <ThemeProvider theme={blackTheme}>
        <main>
          <div className={classes.edit}>
            <Button
              variant="outlined"
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
                scrollButtons="auto"
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
