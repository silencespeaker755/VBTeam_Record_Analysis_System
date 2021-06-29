import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useMutation } from "react-query";
import Loading from "../components/Loading";
import { useUserInfo } from "../hooks/useInfo";
import SignUp from "./SignUp";
import axios from "../setting";

const blackTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  signBox: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: "10px",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { changeUser } = useUserInfo();
  const [open, setOpen] = React.useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    setUser({ ...user, [type]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: signin, isLoading } = useMutation(
    async (err) => {
      const data = await axios.post("/api/user/login", user);
      return data;
    },
    {
      retry: false,
      onSuccess: ({ data }) => {
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("id", data.id);
        localStorage.setItem("auth", data.auth);
        changeUser(data.id, data.isAdmin, data.auth);
        if (data.auth) {
          history.push("/home");
        } else {
          history.push("/auth");
        }
      },
      onError: (err) => {
        if (err.response.status === 401) {
          setIsErr(true);
          setErrMsg(err.response.data);
        }
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    signin();
    handleClose();
  };

  if (isLoading) return <Loading />;

  return (
    <ThemeProvider theme={blackTheme}>
      <Container component="main" maxWidth="xs">
        <div className={classes.signBox}>
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          {isErr ? (
            <Alert className={classes.alert} severity="error">
              {errMsg}
            </Alert>
          ) : null}
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e, "email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e, "password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => onSubmit(e)}
              disabled={user.email === "" || user.password === ""}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Button onClick={handleClickOpen}>sign up</Button>
              </Grid>
            </Grid>
          </form>
          {/* 跳窗 SignUp */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <SignUp handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
}
