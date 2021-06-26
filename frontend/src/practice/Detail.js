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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  },
  cardVedio: {
    position: "absolute",
    left: "0",
    top: "0",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
  cardPaper: {
    minHeight: "600px",
    height: "100%",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "30px",
  },
  listPaper: { height: "100%", padding: "30px" },
}));

export default function Detail() {
  const detailClasses = useStyles();
  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography
          variant="body1"
          component="p"
          className={detailClasses.article}
        >
          &nbsp;none
        </Typography>
      );
    return array.map((el, i, all) => {
      return (
        <Typography
          key={el}
          variant="body1"
          component="p"
          className={detailClasses.article}
        >
          &nbsp;{el}
        </Typography>
      );
    });
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Grid container>
        <Grid item xs={8} sm={8} md={8}>
          <Paper elevation={3} className={detailClasses.cardPaper}>
            <Card className={detailClasses.card}>
              <div className={detailClasses.cardMedia}>
                <iframe
                  className={detailClasses.cardVedio}
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/tbntKmb0St8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardContent className={detailClasses.cardContent}>
                <Typography gutterBottom variant="h4" component="h2">
                  測試
                </Typography>
                <Divider />
                <div style={{ paddingTop: "5px" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    className={detailClasses.article}
                  >
                    佳生大神好carry
                  </Typography>
                </div>
              </CardContent>
              <CardActions
                style={{ position: "relative", bottom: "0px", height: "30px" }}
              >
                <div
                  style={{ position: "absolute", bottom: "5px", right: "16px" }}
                >
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Paper elevation={3} className={detailClasses.listPaper} />
        </Grid>
      </Grid>
    </Container>
  );
}
