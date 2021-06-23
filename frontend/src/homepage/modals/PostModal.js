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

const useStyles = makeStyles((theme) => ({
  frame: {
    marginTop: theme.spacing(2),
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

export default function PostModal(props) {
  const { open, date, handleClose, refetchEvents } = props;
  const classes = useStyles();

  const initForm = {
    title: "",
    place: "",
    start: date,
    end: "",
    notes: "",
  };
  const [info, setInfo] = useImmer(initForm);
  const { userInfo, changeUser } = useUserInfo();

  const { mutate: updateForm, isLoading } = useMutation(
    async () => {
      await axios.post("/api/home/calendar/create", {
        userId: userInfo.id,
        event: info,
      });
    },
    {
      onSuccess: () => {
        refetchEvents();
        handleClose();
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm();
  };

  useEffect(() => setInfo((t) => initForm), [date]);

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
              {date}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="title"
                name="Title"
                value={info.title}
                onChange={(e) =>
                  setInfo((t) => {
                    t.title = e.target.value;
                  })
                }
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="place"
                label="place"
                name="Adress"
                value={info.place}
                onChange={(e) =>
                  setInfo((t) => {
                    t.place = e.target.value;
                  })
                }
                autoComplete="place"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="start"
                label="start"
                name="Start Date"
                value={info.start}
                onChange={(e) =>
                  setInfo((t) => {
                    t.start = e.target.value;
                  })
                }
                autoComplete="current-start"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="end"
                label="end"
                name="End Date"
                value={info.end}
                onChange={(e) =>
                  setInfo((t) => {
                    t.end = e.target.value;
                  })
                }
                autoComplete="current-end"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="notes"
                label="notes"
                name="Notes"
                multiline
                value={info.notes}
                onChange={(e) =>
                  setInfo((t) => {
                    t.notes = e.target.value;
                  })
                }
                autoComplete="current-notes"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              >
                Announce
              </Button>
            </form>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
