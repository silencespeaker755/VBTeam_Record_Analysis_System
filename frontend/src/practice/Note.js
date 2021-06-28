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
import useMapArr from "../utils/functions/useMapArr";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "600px",
  },
  cardGrid: {
    position: "relative",
  },
  cardContent: {
    height: "100%",
    overflow: "auto",
  },
  cardAction: {
    position: "relative",
    bottom: "0px",
    height: "30px",
  },
  cardMore: {
    position: "absolute",
    bottom: "5px",
    right: "16px",
  },
  article: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
  text: {
    paddingTop: "20px",
  },
}));

export default function Note({ id, title, content }) {
  const noteClasses = useStyles();
  const tempArtic = content.split("\n");

  return (
    <Grid item xs={12} sm={6} md={6} className={noteClasses.cardGrid}>
      <Card className={noteClasses.card}>
        <CardContent className={noteClasses.cardContent}>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
          <Divider />
          <div className={noteClasses.text}>
            {useMapArr(tempArtic, noteClasses.article)}
          </div>
        </CardContent>
        <CardActions className={noteClasses.cardAction}>
          <div className={noteClasses.cardMore}>
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
