import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  signUp: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 6),
  },
}));

export default function Push({ setCards, cards, handleClose }) {
  const classes = useStyles();

  const [video, setVideo] = useState({
    title: "",
    url: "",
    article: "",
  });

  const handleChange = (e, type) => {
    setVideo({ ...video, [type]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCards((pre) => {
      return [...pre, video];
    });
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.signUp}>
        <Typography component="h1" variant="h4">
          Add Video
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={video.title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            onChange={(e) => handleChange(e, "title")}
          />
          <TextField
            value={video.url}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="video"
            label="Video url"
            name="video"
            onChange={(e) => handleChange(e, "url")}
          />
          <TextField
            value={video.article}
            id="outlined-multiline-static"
            label="Article"
            margin="normal"
            multiline
            rows={4}
            required
            fullWidth
            variant="outlined"
            onChange={(e) => handleChange(e, "article")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}
