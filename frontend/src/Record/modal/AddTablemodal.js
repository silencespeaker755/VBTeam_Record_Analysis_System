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
  const { open, title, handleClose, match, refetchMatch } = props;
  const classes = useStyles();

  const initForm = {
    number: "",
    teamScore: "",
    opponentScore: "",
  };
  const [info, setInfo] = useImmer(initForm);
  const { userInfo } = useUserInfo();

  const { mutate: AddNewSet, isLoading } = useMutation(
    "AddNewSet",
    async () => {
      const newData = match;
      newData.sets.push(info);
      await axios.post("/api/match/records/update", {
        record: newData,
        userId: userInfo.id,
      });
    },
    {
      onSuccess: () => {
        handleClose();
        refetchMatch();
      },
      onError: () => {
        handleClose();
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      info.number !== "" &&
      info.teamScore !== "" &&
      info.opponentScore !== ""
    )
      AddNewSet();
  };

  useEffect(() => setInfo((t) => initForm), [title]);

  if (isLoading) return <Loading />;

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
                value={info.number}
                onChange={(e) =>
                  setInfo((t) => {
                    t.number = e.target.value;
                  })
                }
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.textField}
                id="teamScore"
                label="teamScore"
                name="teamScore"
                value={info.teamScore}
                onChange={(e) =>
                  setInfo((t) => {
                    t.teamScore = e.target.value;
                  })
                }
                autoComplete="teamScore"
              />
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.textField}
                id="opponentScore"
                label="opponentScore"
                name="opponentScore"
                value={info.opponentScore}
                onChange={(e) =>
                  setInfo((t) => {
                    t.opponentScore = e.target.value;
                  })
                }
                autoComplete="opponentScore"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                onSubmit={handleSubmit}
                disabled={
                  info.number === "" ||
                  info.teamScore === "" ||
                  info.opponentScore === ""
                }
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
