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

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "600px",
  },
  cardContent: {
    height: "100%",
    overflow: "auto",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
}));

export default function Note({ id, title, content }) {
  const noteClasses = useStyles();
  const tempArtic = content.split("\n");
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
    <Grid item xs={12} sm={6} md={6} style={{ position: "relative" }}>
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
        <CardActions
          style={{ position: "relative", bottom: "0px", height: "30px" }}
        >
          <div style={{ position: "absolute", bottom: "5px", right: "16px" }}>
            <Link underline="none" href={`/practice/${id}`}>
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
