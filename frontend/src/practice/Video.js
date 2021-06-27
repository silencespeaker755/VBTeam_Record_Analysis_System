import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { relativeTimeRounding } from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "600px",
    position: "relative",
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
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
}));

export default function Video({ id, title, url, description }) {
  const movieClasses = useStyles();
  let tempArtic;
  if (description) {
    tempArtic = description.split("\n");
  } else {
    tempArtic = ["No description"];
  }

  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography
          variant="body1"
          component="p"
          className={movieClasses.article}
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
          className={movieClasses.article}
        >
          &nbsp;{el}
        </Typography>
      );
    });
  };

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card className={movieClasses.card}>
        <div className={movieClasses.cardMedia}>
          <iframe
            className={movieClasses.cardVedio}
            width="100%"
            height="100%"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <CardContent className={movieClasses.cardContent}>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
          <Divider />
          <div style={{ paddingTop: "5px" }}>
            {mappingArrayToText(tempArtic)}
          </div>
        </CardContent>
        <CardActions
          style={{ position: "relative", bottom: "0px", height: "30px" }}
        >
          <div style={{ position: "absolute", bottom: "5px", right: "16px" }}>
            <Link underline="none" href={`/home/article/${id}`}>
              <Button size="small" color="primary">
                ...More
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
