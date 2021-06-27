import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Typography,
  Button,
  Card,
  CardActionArea,
  Divider,
  InputBase,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "../setting";
import AddButton from "../components/AddButton";
import AddMatchModal from "./modal/AddMatchModal";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaeaea",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  outFrame: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    minHeight: "600px",
    maxWidth: "900px",
    margin: "50px 50px 10px 50px",
    border: "8px solid #a9794b",
    borderRadius: "25px",
    height: "100%",
    background: "#ecd3b1",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  outPaperFrame: {
    margin: "20px 30px 10px 30px",
    width: "80%",
    maxHeight: "800px",
    overflow: "auto",
  },
  outCardFrame: {
    width: "70%",
    minHeight: "80px",
    borderRadius: "20px",
    margin: "8.5px auto",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  actionArea: {
    width: "100%",
    height: "100%",
    minHeight: "80px",
    background: "antiquewhite",
    "&:hover": {
      background: "#bb9b78",
    },
  },
  outTitle: {
    marginTop: "40px",
    fontSize: "4em",
    fontWeight: 700,
    color: "white",
  },
  subtitle: {
    fontWeight: 500,
  },
  divider: {
    width: "70%",
    height: "2px",
    background: "white",
  },
  type: {
    marginTop: "10px",
    marginBottom: "-5px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginTop: "30px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
    [`@media screen and (min-width: 600px) and (max-width: 960px)`]: {
      width: "18ch",
      "&:focus": {
        width: "36ch",
      },
    },
  },
}));

export default function RecordList() {
  const classes = useStyles();
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [matchModal, setMatchModal] = useState(false);

  const {
    data: recordList = [],
    isLoading: isListLoading,
    refetch: refetchRecordList,
    isFetching: isRecordListFetching,
  } = useQuery(
    "RecordList",
    async () => {
      const { data } = await axios.get("/api/match/records");
      return data;
    },
    {
      onSuccess: () => {},
    }
  );

  const handleClick = (id) => () => {
    history.push(`/home/record/${id}`);
  };

  const handleSearch = () => {};

  if (isRecordListFetching || isListLoading) return <Loading />;

  return (
    <>
      <div className={classes.flexCenter}>
        <div className={classes.outFrame}>
          <Typography className={classes.outTitle}>Analysis</Typography>
          <Divider className={classes.divider} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyUp={handleSearch}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
          <div className={classes.outPaperFrame}>
            {recordList.map((element) => (
              <Card className={classes.outCardFrame}>
                <CardActionArea
                  className={classes.actionArea}
                  onClick={handleClick(element._id)}
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    className={classes.type}
                  >
                    {element.type}
                  </Typography>
                  <Typography
                    variant="h5"
                    className={classes.subtitle}
                    align="center"
                  >
                    {element.team} v.s. {element.opponent}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    align="center"
                  >
                    {element.date}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AddButton
        inView
        openModal={() => setMatchModal(true)}
        height={60}
        width={60}
        bottom={48}
        right={20}
      />
      <AddMatchModal
        open={matchModal}
        handleClose={() => setMatchModal(false)}
        refetch={refetchRecordList}
      />
    </>
  );
}
