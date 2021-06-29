import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardActions,
  Paper,
  CardContent,
  Typography,
  Divider,
  Container,
  Link,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useQuery, useMutation } from "react-query";
import instance from "../setting";
import { useUserInfo } from "../hooks/useInfo";
import Edit from "./Edit";
import useMapArr from "../utils/functions/useMapArr";

const blackTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#171717",
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
  container: { marginTop: "50px" },
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    width: "100%",
    height: "0",
    paddingTop: "56.25%", // 16:9
    position: "relative",
  },
  cardContent: {
    height: "100%",
    overflow: "scroll",
  },
  cardVedio: {
    position: "absolute",
    left: "0",
    top: "0",
  },
  cardActions: {
    position: "relative",
    bottom: "0px",
    height: "30px",
  },
  cardBtn: {
    position: "absolute",
    bottom: "5px",
    right: "16px",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
  text: {
    paddingTop: "5px",
  },
  listPaper: {
    height: "100%",
    padding: "30px",
    overflow: "scroll",
    maxHeight: "600px",
  },
  cardPaper: {
    minHeight: "550px",
    maxHeight: "600px",
    height: "100%",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "30px",
  },
  listBtn: {
    marginTop: "10px",
  },
}));

export default function Detail(props) {
  const [open, setOpen] = useState(false);
  const detailClasses = useStyles();
  const { userInfo } = useUserInfo();
  const {
    match: {
      params: { articleId },
    },
  } = props;
  const isCurrentId = (target) => {
    return target._id === articleId;
  };
  const {
    data: cards = [],
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "CardFetching",
    async () => {
      const data = await instance.get("/api/practice/posts");
      return data.data;
    },
    {
      retry: false,
      onSuccess: () => {},
    }
  );

  const remove = useMutation(
    async (err) => {
      const data = await instance.post("/api/practice/posts/delete", {
        postId: cards.find(isCurrentId)._id,
        userId: userInfo.id,
      });
      return data;
    },
    {
      onSuccess: ({ data }) => {},
    }
  );
  const handleRemove = () => {
    remove.mutate();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={blackTheme}>
      <Container className={detailClasses.container}>
        <Grid container>
          <Grid item xs={8} sm={8} md={8}>
            <Paper elevation={3} className={detailClasses.cardPaper}>
              {cards.find(isCurrentId) && (
                <Card className={detailClasses.card}>
                  {!cards.find(isCurrentId).url ? null : (
                    <div className={detailClasses.cardMedia}>
                      <iframe
                        className={detailClasses.cardVedio}
                        width="100%"
                        height="100%"
                        src={cards.find(isCurrentId).url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <CardContent className={detailClasses.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {cards.find(isCurrentId).title}
                    </Typography>
                    <Divider />
                    <div className={detailClasses.text}>
                      {!cards.find(isCurrentId).url
                        ? useMapArr(
                            cards.find(isCurrentId).content.split("\n"),
                            detailClasses.article
                          )
                        : useMapArr(
                            cards.find(isCurrentId).description.split("\n"),
                            detailClasses.article
                          )}
                    </div>
                  </CardContent>
                  <CardActions className={detailClasses.cardActions}>
                    <div className={detailClasses.cardBtn}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Edit
                      </Button>
                      {userInfo.id === cards.find(isCurrentId).uploader._id && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleRemove}
                        >
                          <Link underline="none" href="/home/posts">
                            Delete
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardActions>
                </Card>
              )}
            </Paper>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Paper elevation={3} className={detailClasses.listPaper}>
              {cards.map((card, index) => {
                return (
                  <Link
                    key={`${index}+${card.title}`}
                    underline="none"
                    href={`/home/posts/${card._id}`}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      variant="outlined"
                      className={detailClasses.listBtn}
                      key={`${index}${card.title}`}
                      disabled={articleId === card._id}
                    >
                      {card.title}
                    </Button>
                  </Link>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Edit
              handleClose={handleClose}
              refetchEvents={refetchEvents}
              card={cards.find(isCurrentId)}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}