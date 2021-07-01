import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Dialog, Slide } from "@material-ui/core";
import { useQuery } from "react-query";
import MemberTable from "../../record/table/MemberTable";
import Loading from "../../components/Loading";
import axios from "../../setting";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 350,
    width: "100%",
    padding: 0,
    overflow: "auto",
  },
  dialog: {
    margin: "auto",
    maxHeight: "70vh",
  },
}));

export default function MemberList({ open, onClose }) {
  const classes = useStyles();

  const {
    data: members = [],
    isLoading,
    isFetching,
  } = useQuery(
    "getMemberDetails",
    async () => {
      const { data } = await axios.get("/api/match/analysis/players");
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  if (isLoading || isFetching) return <Loading />;

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      className={classes.dialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="md"
    >
      <Card className={classes.root}>
        <CardContent>
          <MemberTable
            viewOnly
            data={members.map((el) => {
              const newEl = el;
              delete newEl.notes;
              delete newEl.faults;
              return newEl;
            })}
            noteVisible={false}
            faultVisible={false}
          />
        </CardContent>
      </Card>
    </Dialog>
  );
}
