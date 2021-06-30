import { React, useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import "../css/Profile.css";
import { useQuery } from "react-query";
import EditProfile from "./EditProfile";
import instance from "../setting";
import { useUserInfo } from "../hooks/useInfo";
import useMapArr from "../utils/functions/useMapArr";

export default function Profile(props) {
  const [open, setOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const {
    match: {
      params: { userId },
    },
  } = props;

  const {
    data: user = {
      username: "",
      city: "",
      position: "",
      isAdmin: true,
      about: "",
    },
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "UserFetching",
    async () => {
      const data = await instance.get("/api/user/users", {
        params: { userId },
      });
      return data.data;
    },
    {
      retry: false,
      onSuccess: () => {},
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="row py-5 ">
      <div className="margin-sm col-md-5 mx-auto">
        <Paper
          elevation={3}
          style={{
            minHeight: "650px",
            minWidth: "450px",
            overflow: "hidden",
          }}
        >
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3 d-flex flex-column">
                <img
                  src={`${process.env.PUBLIC_URL}/profile.png`}
                  alt=""
                  width="170"
                  style={{ background: "#f9f9f9" }}
                  className="rounded mb-2 img-thumbnail"
                />

                {user._id === userInfo.id ? (
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Edit profile
                  </Button>
                ) : null}
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0 profileUser">{user.name}</h4>
                <p className="mt-0 mb-3">{user.birthday || "YYYY-MM-DD"}</p>
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item px-3">
                <h2 className="font-weight-bold mb-0 d-block">
                  {user.position || "-"}
                </h2>
                <small className="text-muted">Position</small>
              </li>
              <li className="list-inline-item px-3">
                <h2 className="font-weight-bold mb-0 d-block">
                  {user.number || "-"}
                </h2>
                <small className="text-muted">number</small>
              </li>
              <li className="list-inline-item px-3">
                <h2 className="font-weight-bold mb-0 d-block">
                  {user.isAdmin ? "Admin" : "User"}
                </h2>
                <small className="text-muted">identity</small>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0 profileTitle">About</h5>
            <div
              className="p-4 rounded shadow-sm bg-light"
              style={{
                minHeight: "350px",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {user.about === ""
                ? "No description"
                : useMapArr(
                    user.about.split("\n"),
                    "font-italic mb-0 profileText"
                  )}
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
            profileData={user}
            refetchEvents={refetchEvents}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
