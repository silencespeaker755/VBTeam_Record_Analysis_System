import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { useQuery, useMutation } from "react-query";
import instance from "../setting";
import { useUserInfo } from "../hooks/useInfo";
import Edit from "./Edit";
import useMapArr from "../utils/functions/useMapArr";

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
    overflow: "auto",
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
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
    maringLeft: "10px",
    maringRight: "10px",
    overflow: "auto",
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
  link: {
    textDecoration: "none",
  },
}));

export default function Detail(props) {
  const [open, setOpen] = useState(false);
  const detailClasses = useStyles();
  const { userInfo } = useUserInfo();
  const [textBox, setTextBox] = useState("");
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
      onSuccess: (data) => {
        setTextBox(
          !data.find(isCurrentId).url
            ? useMapArr(
                data.find(isCurrentId).content.split("\n"),
                detailClasses.article
              )
            : useMapArr(
                data.find(isCurrentId).description.split("\n"),
                detailClasses.article
              )
        );
      },
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
    <Container className={detailClasses.container}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} style={{ height: "700px" }}>
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
                  <div className={detailClasses.text}>{textBox}</div>
                </CardContent>
                <CardActions className={detailClasses.cardActions}>
                  {userInfo.id === cards.find(isCurrentId).uploader._id && (
                    <div className={detailClasses.cardBtn}>
                      <Button size="small" onClick={handleClickOpen}>
                        Edit
                      </Button>

                      <Button size="small" onClick={handleRemove}>
                        <Link to="/home/posts" className={detailClasses.link}>
                          Delete
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardActions>
              </Card>
            )}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          style={{ paddingLeft: "29px", paddingRight: "29px" }}
        >
          <Paper elevation={3} className={detailClasses.listPaper}>
            {cards.map((card, index) => {
              return (
                <Link
                  key={`${index}+${card.title}`}
                  to={`/home/posts/${card._id}`}
                  className={detailClasses.link}
                >
                  <Button
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
  );
}
