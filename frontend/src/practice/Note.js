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
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    breakInside: "avoid-column",
  },
  cardContent: {
    height: "100%",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
}));

export default function Note({ title, description }) {
  const noteClasses = useStyles();
  const tempArtic = description.split("\n");
  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography
          variant="body1"
          component="p"
          className={noteClasses.article}
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
          className={noteClasses.article}
        >
          &nbsp;{el}
        </Typography>
      );
    });
  };

  return (
    <Card className={noteClasses.card}>
      <CardContent className={noteClasses.cardContent}>
        <Typography gutterBottom variant="h4" component="h2">
          {title}
        </Typography>
        <Divider />
        <div
          style={{
            paddingTop: "20px",
          }}
        >
          {mappingArrayToText(tempArtic)}
        </div>
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
