import React, { useState } from "react";
import {
  Paper,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#303b53",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  outerPaper: {
    height: "600px",
    width: "400px",
    marginTop: "100px",
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
    background: "#F9F9F9",
    margin: "0px",
    padding: "0px",
    borderRadius: "5px",
    width: "80%",
    marginTop: "70px",
  },
}));

export default function Authentifacation() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Paper elevation={3} className={classes.outerPaper}>
            <div className={classes.title}>
              <PermIdentity className={classes.text} />
              <Typography variant="h4" component="h2">
                Authentifacation
              </Typography>
            </div>
            <div className={classes.number}>
              <Typography variant="h4" component="h2">
                94879487
              </Typography>
              <div className={classes.textField}>
                <TextField
                  value=""
                  id="outlined-multiline-static"
                  label=""
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  type="text"
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
                >
                  Submit
                </Button>
              </ThemeProvider>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
