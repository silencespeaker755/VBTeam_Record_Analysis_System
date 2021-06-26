import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useInView } from "react-intersection-observer";
import Fab from "@material-ui/core/Fab";
import RecordTable from "./table/RecordTable";
import ScrollTopButton from "../components/ScrollTopButton";
import AddButton from "../components/AddButton";
import AddModal from "./modal/Addmodal";
import { gameTemplate } from "../Test_data/recordData";
import { useImmer } from "../hooks/useImmer";

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
  const [game, setGame] = useImmer(gameTemplate);
  const [addModal, setAddModel] = useState(false);

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
      <AddButton inView={inView} openModal={() => setAddModel(true)} />
      <ScrollTopButton inView={inView}>
        <Fab
          aria-label="scroll back to top"
          size="small"
          style={{ backgroundColor: "#ffc800" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
      <AddModal
        open={addModal}
        title={`${game.team} v.s. ${game.enemy}`}
        addTable={(info) =>
          setGame((pre) => {
            pre.info.push(info);
            return pre;
          })
        }
        handleClose={() => setAddModel(false)}
      />
    </div>
  );
}
