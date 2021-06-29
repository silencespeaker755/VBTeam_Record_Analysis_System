import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useMutation, useQuery } from "react-query";
import HintModal from "../components/HintModal";
import { useUserInfo } from "../hooks/useInfo";
import axios from "../setting";
import Loading from "../components/Loading";

const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#303b53",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    flexGrow: 1,
  },
  outerPaper: {
    height: "600px",
    width: "50%",
    minWidth: "350px",
    overflow: "hidden",
    background: "#F9F9F9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "",
    alignItems: "center",
  },
  title: {
    color: "white",
    width: "100%",
    height: "87px",
    background: "#303b53",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  text: {
    fontSize: "72px",
  },
  number: {
    color: "white",
    height: "300px",
    marginTop: "50px",
    width: "80%",
    background: "#303b53",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: "5px",
  },
  textField: {
    background: "#F9F9F9",
    margin: "0px",
    padding: "0px",
    borderRadius: "5px",
  },
  submit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    background: "#F9F9F9",
    padding: "0px",
    borderRadius: "5px",
    width: "80%",
    marginTop: "35px",
  },
}));

export default function Authentication() {
  const classes = useStyles();
  const history = useHistory();
  const { changeUser } = useUserInfo();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const {
    data: user = { email: "" },
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useQuery(
    "FetchAuthUser",
    async () => {
      const userId = localStorage.getItem("id");
      const { data } = await axios.get("/api/user/users", {
        params: { userId },
      });

      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        history.push("/home");
      },
      onError: (err) => {
        setMessage(err.response.data);
        setModal(true);
      },
    }
  );

  const { mutate: authenticate, isLoading } = useMutation(
    async () => {
      const { data } = await axios.post("/api/user/auth", {
        email: user.email,
        verifyCode: code,
      });
      return data;
    },
    {
      retry: false,
      onError: (err) => {
        setMessage(err.response.data);
        setModal(true);
      },
    }
  );

  const handleClick = () => {
    authenticate();
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") handleClick();
  };

  const handleCancel = () => {
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("id", "");
    localStorage.setItem("auth", "");
    changeUser("", "", "");
    history.push("/");
  };

  const handleModalClose = () => {
    setModal(false);
    handleCancel();
  };

  if (isLoading || isUserLoading || isUserFetching) return <Loading />;

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.outerPaper}>
        <div className={classes.title}>
          <PermIdentity className={classes.text} />
          <Typography variant="h4" component="h2">
            Authentifacation
          </Typography>
        </div>
        <div className={classes.number}>
          <div>
            <Typography variant="h4" component="h2" align="center">
              Code
            </Typography>
            <Typography variant="body2" component="h2" align="center">
              Please check your email
            </Typography>
          </div>
          <div className={classes.textField}>
            <TextField
              value={code}
              id="outlined-multiline-static"
              margin="normal"
              required
              fullWidth
              variant="outlined"
              type="text"
              onChange={(e) => setCode(e.target.value)}
              style={{ margin: "0px", padding: "0px" }}
            />
          </div>
        </div>
        <div className={classes.submit}>
          <ThemeProvider theme={blueTheme}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ background: "#303b53" }}
              onClick={handleClick}
              onKeyUp={handleKeyUp}
            >
              Submit
            </Button>
          </ThemeProvider>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px", background: "#eaeaea" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Paper>
      <HintModal open={modal} message={message} onClose={handleModalClose} />
    </div>
  );
}
