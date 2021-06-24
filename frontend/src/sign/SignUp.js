import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "react-query";
import axios from "../setting";

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

export default function SignUp({ handleClose }) {
  const classes = useStyles();
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    setAccount({ ...account, [type]: e.target.value });
  };

  const signup = useMutation(
    async (err) => {
      const data = await axios.post("/api/user/signup", account);
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    signup.mutate();
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.signUp}>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange={(e) => handleChange(e, "name")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            onClick={onSubmit}
            disabled={
              account.name === "" ||
              account.email === "" ||
              account.password === ""
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
