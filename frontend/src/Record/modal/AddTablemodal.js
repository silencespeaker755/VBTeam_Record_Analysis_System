import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "react-query";
import { useImmer } from "../../hooks/useImmer";
import axios from "../../setting";
import { useUserInfo } from "../../hooks/useInfo";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  frame: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 6),
    width: "80%",
  },
  textField: {
    width: "70%",
  },
}));

export default function Addmodal(props) {
  const { open, title, handleClose, addTable } = props;
  const classes = useStyles();

  const initForm = {
    date: "",
    time: "",
    result: "",
    round: "",
    data: [],
  };
  const [info, setInfo] = useImmer(initForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTable(info);
    handleClose();
  };

  useEffect(() => setInfo((t) => initForm), [title]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <div className={classes.frame}>
            <Typography component="h1" variant="h4">
              {title}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                id="round"
                label="Round"
                name="round"
                value={info.round}
                onChange={(e) =>
                  setInfo((t) => {
                    t.round = e.target.value;
                  })
                }
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                id="date"
                label="Date"
                name="date"
                value={info.date}
                onChange={(e) =>
                  setInfo((t) => {
                    t.date = e.target.value;
                  })
                }
                autoComplete="date"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                id="time"
                label="Time"
                name="time"
                value={info.time}
                onChange={(e) =>
                  setInfo((t) => {
                    t.time = e.target.value;
                  })
                }
                autoComplete="time"
              />
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.textField}
                id="result"
                label="Result"
                name="result"
                value={info.result}
                onChange={(e) =>
                  setInfo((t) => {
                    t.result = e.target.value;
                  })
                }
                autoComplete="result"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              >
                Create
              </Button>
            </form>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
