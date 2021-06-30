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

const useStyle = makeStyles({
  root: {
    position: "absolute",
    top: "10%",
    left: "10%",
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
    borderBottom: "gray solid 7px",
    textShadow: "0.1em 0.1em 0.15em black",
  },
  formControl: {
    position: "relative",
    left: "-50%",
    margin: 20,
    minWidth: 120,
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
        球隊數據分析
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
            <em>None</em>
          </MenuItem>
          {teamList.map((t) => (
            <MenuItem value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container className={classes.gridContainer} spacing={6}>
        <Grid item xs={4}>
          <Typography variant="h3">
            {analysisData?.matches?.all || "X"}
          </Typography>
          <Typography variant="h3">總場數</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3" color="primary">
            {analysisData?.matches?.win || "X"}
          </Typography>
          <Typography variant="h3">勝場數</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3" color="secondary">
            {analysisData?.matches?.lose || "X"}
          </Typography>
          <Typography variant="h3">敗場數</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">{analysisData?.sets?.all || "X"}</Typography>
          <Typography variant="h3">總局數</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3" color="primary">
            {analysisData?.sets?.win || "X"}
          </Typography>
          <Typography variant="h3">勝局數</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3" color="secondary">
            {analysisData?.sets?.lose || "X"}
          </Typography>
          <Typography variant="h3">敗局數</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
