import React, { useEffect, useState } from "react";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import axios from "../setting";
import Loading from "../components/Loading";
import "../css/Analysis.css";

const useStyle = makeStyles({
  root: {
    position: "absolute",
    top: "10%",
    left: "8%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    // position: ""
    padding: 20,
    maxWidth: 600,
    color: "#303b53",
  },
  formControl: {
    position: "relative",
    left: "-50%",
    margin: 20,
    minWidth: 80,
  },
  tyophy: {
    height: "50px",
    width: "50px",
  },
});

export default function Analysis() {
  const classes = useStyle();
  const history = useHistory();

  const [team, setTeam] = useState("");

  const {
    data: teamList = [],
    isLoading: isTeamListLoading,
    refetch: refetchTeamList,
    isFetching: isTeamListFetching,
  } = useQuery(
    "TeamList",
    async () => {
      const { data } = await axios.get("/api/match/analysis/teamList");
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  const {
    data: analysisData = {},
    isLoading: isAnalysisDataLoading,
    refetch: refetchAnalysisData,
    isFetching: isAnalysisDataFetching,
  } = useQuery(
    "AnalysisData",
    async () => {
      const { data } = await axios.get("/api/match/analysis", {
        params: { team },
      });
      return data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  const handleChange = async (event) => {
    setTeam(event.target.value);
  };

  useEffect(() => {
    refetchAnalysisData();
  }, [team]);

  if (isAnalysisDataFetching || isAnalysisDataLoading) return <Loading />;

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Analysis
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Team</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={team}
          onChange={handleChange}
          label="球隊名稱"
        >
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {teamList.map((t) => (
            <MenuItem value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="Ascoreboard">
        <div className="Ateam Ateam1 Atop">
          <div className="Aboard">
            {analysisData?.matches?.all || "-"}
            <small>總場數</small>
          </div>
          <div className="Aname">
            {analysisData?.matches?.win || "-"}
            <small>勝場數</small>
          </div>
          <div className="Ascore">
            {analysisData?.matches?.lose || "-"}
            <small>敗場數</small>
          </div>
        </div>
        <div className="Ateam Ateam2 Abot">
          <div className="Aboard">
            {analysisData?.sets?.all || "-"}
            <small>總局數</small>
          </div>
          <div className="Aname">
            {analysisData?.sets?.win || "X"}
            <small>勝局數</small>
          </div>
          <div className="Ascore">
            {analysisData?.sets?.lose || "X"}
            <small>敗局數</small>
          </div>
        </div>
      </div>
    </div>
  );
}
