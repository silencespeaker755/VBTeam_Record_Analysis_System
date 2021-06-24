import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    width: "100%",
    height: "0",
    paddingTop: "56.25%", // 16:9
    position: "relative",
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

export default function Note({ title, article }) {
  const movieClasses = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6} md={6}>
        <Card className={movieClasses.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              className={movieClasses.article}
              component="p"
            >
              {article}
            </Typography>
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
      </Grid>
    </>
  );
}
