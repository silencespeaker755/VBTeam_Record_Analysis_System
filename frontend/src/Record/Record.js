import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useInView } from "react-intersection-observer";
import Fab from "@material-ui/core/Fab";
import ScrollTopButton from "../components/ScrollTopButton";
import RecordTable from "./table/RecordTable";
import { game } from "../Test_data/recordData";

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

export default function Record() {
  const classes = useStyles();
  const [ref, inView] = useInView();

  return (
    <div className={classes.root}>
      <div ref={ref} id="back-to-top-anchor">
        <Typography className={classes.title} variant="h4" align="center">
          {`${game.team} v.s. ${game.enemy}`}
        </Typography>
      </div>
      {game.info.map((item, index) => (
        <div key={`${item.name}-${index}`}>
          {index !== 0 ? <Divider className={classes.divider} /> : null}
          <div className={classes.subtitle}>
            <Typography className={classes.time} variant="h6" align="center">
              {item.round}
            </Typography>
            <Typography className={classes.time} variant="h6" align="center">
              {item.date}&nbsp; {item.time}
            </Typography>
            <Typography className={classes.count} variant="h6" align="left">
              比數： {item.result}
            </Typography>
          </div>
          <RecordTable />
        </div>
      ))}
      <ScrollTopButton inView={inView}>
        <Fab
          aria-label="scroll back to top"
          size="small"
          style={{ backgroundColor: "#ffc800" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
    </div>
  );
}
