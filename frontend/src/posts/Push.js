import React, { isValidElement, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "react-query";
import { useUserInfo } from "../hooks/useInfo";
import instance from "../setting";
import Loading from "../components/Loading";

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

export default function Push({ refetchEvents, handleClose }) {
  const classes = useStyles();
  const { userInfo } = useUserInfo();
  const [video, setVideo] = useState({
    title: "",
    url: "",
    content: "",
  });

  const handleChange = (e, type) => {
    setVideo({ ...video, [type]: e.target.value });
  };

  const { mutate: push, isLoading } = useMutation(
    async (err) => {
      const user = userInfo.id;
      const data = await instance.post("/api/practice/posts/upload", {
        post: {
          title: video.title,
          url: video.url,
          content: video.content,
          description: video.content,
        },
        userId: user,
      });
      return data;
    },
    {
      retry: false,
      onSuccess: ({ data }) => {
        refetchEvents();
        handleClose();
      },
      onError: () => {
        handleClose();
      },
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    push();
  };

  if (isLoading) return <Loading />;
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
            value={video.content}
            id="outlined-multiline-static"
            label="Article"
            margin="normal"
            multiline
            rows={6}
            required
            fullWidth
            variant="outlined"
            type="text"
            onChange={(e) => handleChange(e, "content")}
          />

          <TextField
            value={video.url}
            variant="outlined"
            margin="normal"
            fullWidth
            id="video"
            label="Video url"
            name="video"
            onChange={(e) => handleChange(e, "url")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onSubmit}
            disabled={video.title === "" || video.content === ""}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}
