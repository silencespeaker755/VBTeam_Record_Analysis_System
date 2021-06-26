import React, { useState } from "react";
import {
  Typography,
  Paper,
  Card,
  CardActionArea,
  Divider,
  InputBase,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(/recordListBackground.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // filter: "grayscale(100%)",
  },
  outFrame: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    maxWidth: "900px",
    margin: "50px 50px 10px 50px",
    border: "8px solid #a9794b",
    borderRadius: "25px",
    height: "100%",
    background: `linear-gradient(rgba(50, 50, 50, 0.1), rgba(50, 50, 50, 0.3)),url(/recordBackground.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  outPaperFrame: {
    margin: "20px 30px 10px 30px",
    width: "60%",
    maxHeight: "800px",
    overflow: "auto",
  },
  outCardFrame: {
    height: "80px",
    width: "100%",
    borderRadius: "20px",
    marginBottom: "5px",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  actionArea: {
    width: "100%",
    height: "100%",
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
    color: "white",
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

  const handleClick = () => {
    history.push("/home/record");
  };

  const handleSearch = () => {};

  return (
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
          {Array(10)
            .fill(10)
            .map(() => (
              <Card className={classes.outCardFrame}>
                <CardActionArea
                  className={classes.actionArea}
                  onClick={handleClick}
                >
                  <Typography
                    variant="h5"
                    className={classes.subtitle}
                    align="center"
                  >
                    台大資訊 v.s. 海洋工程
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    align="center"
                  >
                    2019-04-17
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
