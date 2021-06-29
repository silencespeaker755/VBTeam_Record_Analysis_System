import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import { useQuery } from "react-query";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useInView } from "react-intersection-observer";
import Fab from "@material-ui/core/Fab";
import RecordTable from "./table/RecordTable";
import ScrollTopButton from "../components/ScrollTopButton";
import AddButton from "../components/AddButton";
import AddTableModal from "./modal/AddTablemodal";
import { useUserInfo } from "../hooks/useInfo";
// import { useImmer } from "../hooks/useImmer";
import axios from "../setting";
import Loading from "../components/Loading";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "20px",
  },
  subtitle: { marginTop: "30px" },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontWeight: 450,
    marginBottom: "10px",
  },
  count: {
    marginLeft: "50px",
  },
  divider: {
    marginBottom: "67px",
  },
}));

const dirNumber = {
  1: "第一局",
  2: "第二局",
  3: "第三局",
  4: "第四局",
  5: "第五局",
};

export default function Record(props) {
  const {
    match: {
      params: { recordId },
    },
  } = props;
  const classes = useStyles();
  const [ref, inView] = useInView();
  const { userInfo } = useUserInfo();
  const [addModal, setAddModel] = useState(false);

  const {
    data: match = { sets: [] },
    isLoading: isMatchLoading,
    refetch: refetchMatch,
    isFetching: isMatchFeting,
  } = useQuery(
    "Record",
    async () => {
      const { data } = await axios.get("/api/match/records", {
        params: { recordId },
      });
      return data;
    },
    { retry: false, refetchOnWindowFocus: false, onSuccess: () => {} }
  );

  if (isMatchLoading || isMatchFeting) return <Loading />;

  return (
    <div className={classes.root}>
      <div ref={ref} id="back-to-top-anchor">
        <Typography className={classes.title} variant="h4" align="center">
          {`${match.team} v.s. ${match.opponent}`}
        </Typography>
        <Typography variant="h5" align="center">
          {match.type}
        </Typography>
      </div>
      {match.sets.map((item, index) => (
        <div key={`${item.number}-${index}`}>
          {index !== 0 ? <Divider className={classes.divider} /> : null}
          <div className={classes.subtitle}>
            <Typography variant="h6" align="center">
              {dirNumber[item.number]}
            </Typography>
            <Typography variant="h6" align="center">
              {match.date}
            </Typography>
            <Typography className={classes.count} variant="h6" align="left">
              比數： {`${item.teamScore} : ${item.opponentScore}`}
            </Typography>
          </div>
          <RecordTable
            initialData={item.data}
            setsIndex={index}
            match={match}
            refetchMatch={refetchMatch}
          />
        </div>
      ))}
      {userInfo.isAdmin ? (
        <AddButton inView={inView} openModal={() => setAddModel(true)} />
      ) : null}
      <ScrollTopButton inView={inView}>
        <Fab
          aria-label="scroll back to top"
          size="small"
          style={{ backgroundColor: "#ffc800" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
      <AddTableModal
        open={addModal}
        title={`${match.team} v.s. ${match.opponent}`}
        handleClose={() => setAddModel(false)}
        recordId={recordId}
        refetchMatch={refetchMatch}
      />
    </div>
  );
}
