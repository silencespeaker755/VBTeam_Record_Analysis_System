import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import useMapArr from "../utils/functions/useMapArr";

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
  cardActions: {
    position: "relative",
    bottom: "0px",
    height: "30px",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
  text: {
    paddingTop: "5px",
  },
  more: {
    position: "absolute",
    bottom: "5px",
    right: "16px",
  },
  link: {
    textDecoration: "none",
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
          <div className={movieClasses.text}>
            {useMapArr(tempArtic, movieClasses.article)}
          </div>
        </CardContent>
        <CardActions className={movieClasses.cardActions}>
          <div className={movieClasses.more}>
            <Link to={`/home/posts/${id}`} className={movieClasses.link}>
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
