import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    breakInside: "avoid-column",
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
}));

export default function Movie({ title, url, article }) {
  const movieClasses = useStyles();
  const tempArtic = article.split("\n");
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
        <div style={{ paddingTop: "5px" }}>{mappingArrayToText(tempArtic)}</div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
