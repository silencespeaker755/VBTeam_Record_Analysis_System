import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "react-query";
import { useImmer } from "../../hooks/useImmer";
import { useUserInfo } from "../../hooks/useInfo";
import axios from "../../setting";
import AlertModel from "../../components/AlertModel";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  frame: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    minWidth: "400px",
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

export default function AddMatchModal(props) {
  const { open, handleClose, refetch } = props;
  const classes = useStyles();

  const initForm = {
    type: "",
    team: "",
    opponent: "",
    date: "",
  };
  const [info, setInfo] = useImmer(initForm);
  const { userInfo } = useUserInfo();
  const [errMessage, setErrMessage] = useState("");
  const [errModal, setErrModal] = useState(false);

  const { mutate: createNewMatch, isLoading } = useMutation(
    "createNewMatch",
    async () => {
      const { data } = await axios.post("/api/match/records/create", {
        record: info,
        userId: userInfo.id,
      });
      return data;
    },
    {
      retry: false,
      onSuccess: (data) => {
        console.log(data);
        handleClose();
        refetch();
      },
      onError: (err) => {
        setErrMessage(err.response.data);
        handleClose();
        setErrModal(true);
      },
    }
  );

  const handleErrorClose = () => {
    setErrModal(false);
    setErrMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      info.date !== "" &&
      info.type !== "" &&
      info.team !== "" &&
      info.opponent !== ""
    ) {
      createNewMatch();
      setInfo(() => initForm);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.content}>
          <Container component="main" maxWidth="xs">
            <div className={classes.frame}>
              <Typography component="h1" variant="h4">
                New Match
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  className={classes.textField}
                  id="type"
                  label="Type"
                  name="type"
                  value={info.type}
                  onChange={(e) =>
                    setInfo((t) => {
                      t.type = e.target.value;
                    })
                  }
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  className={classes.textField}
                  id="team"
                  label="Team"
                  name="team"
                  value={info.team}
                  onChange={(e) =>
                    setInfo((t) => {
                      t.team = e.target.value;
                    })
                  }
                  autoComplete="team"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  className={classes.textField}
                  id="opponent"
                  label="Opponent"
                  name="opponent"
                  value={info.opponent}
                  onChange={(e) =>
                    setInfo((t) => {
                      t.opponent = e.target.value;
                    })
                  }
                  autoComplete="opponent"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  onSubmit={handleSubmit}
                  disabled={
                    info.date === "" ||
                    info.type === "" ||
                    info.team === "" ||
                    info.opponent === ""
                  }
                >
                  Create
                </Button>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <AlertModel
        open={errModal}
        alertTitle="Error !"
        alertDesciption={errMessage}
        alertButton={<Button onClick={handleErrorClose}>Got it!</Button>}
        onClose={handleErrorClose}
      />
    </>
  );
}
