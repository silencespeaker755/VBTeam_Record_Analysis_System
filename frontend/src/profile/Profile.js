import { React, useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Profile.css";
import EditProfile from "./EditProfile";

const useStyles = makeStyles((theme) => ({}));
export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "洪佳生",
    city: "Taipei",
    position: "Lifter",
    isAdmin: true,
    about: "Web Developer\nLives in New York\nPhotographer",
  });

  const mappingArrayToText = (array) => {
    if (array.length === 0 || (array.length === 1 && array[0] === ""))
      return (
        <Typography variant="body1" component="p" className="font-italic mb-0">
          &nbsp;none
        </Typography>
      );
    return array.map((el, i, all) => {
      return (
        <Typography
          key={el}
          variant="body1"
          component="p"
          className="font-italic mb-0"
        >
          &nbsp;{el}
        </Typography>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
        <Paper
          elevation={3}
          className="bg-white shadow rounded overflow-hidden"
          style={{ minHeight: "600px" }}
        >
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3  d-flex flex-column">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                  alt="..."
                  width="130"
                  className="rounded mb-2 img-thumbnail"
                />
                <Button variant="outlined" onClick={handleClickOpen}>
                  Edit profile
                </Button>
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">{profileData.username}</h4>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt mr-2" />
                  {profileData.city}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {profileData.position}
                </h5>
                <small className="text-muted">
                  <i className="fas fa-image mr-1" />
                  Position
                </small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {profileData.isAdmin ? "Admin" : "User"}
                </h5>
                <small className="text-muted">
                  <i className="fas fa-user mr-1" />
                  identity
                </small>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0">About</h5>
            <div
              className="p-4 rounded shadow-sm bg-light"
              style={{ minHeight: "250px" }}
            >
              {mappingArrayToText(profileData.about.split("\n"))}
            </div>
          </div>
        </Paper>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <EditProfile
            handleClose={handleClose}
            ProfileData={profileData}
            setProfileData={setProfileData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
