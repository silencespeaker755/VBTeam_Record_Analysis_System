import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import axios from "../../setting";
import AlertModel from "../../components/AlertModel";
import Loading from "../../components/Loading";

export default function UpdateTableModal(props) {
  const { open, onClose, data, refetchMatch } = props;
  const { userInfo } = useUserInfo();
  const [errMessage, setErrMessage] = useState("");
  const [errModal, setErrModal] = useState(false);

  const { mutate: updateSet, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/sets/data/update", {
        data,
        userId: userInfo.id,
      });
      return msg;
    },
    {
      retry: false,
      onSuccess: (msg) => {
        console.log(msg);
        refetchMatch();
      },
      onError: (err) => {
        setErrMessage(err.response.data);
        setErrModal(true);
      },
    }
  );

  const handleErrClose = () => {
    setErrModal(false);
  };

  const handleOk = () => {
    updateSet();
    onClose();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="Update"
        alertDesciption={`Are you sure to update changes. Before Update this set, please make sure you aren't editing another set`}
        alertButton={
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleOk}>Update</Button>
          </div>
        }
        onClose={onClose}
      />
      <AlertModel
        open={errModal}
        alertTitle="Error"
        alertDesciption={errMessage}
        alertButton={
          <div>
            <Button onClick={handleErrClose}>Got it</Button>
          </div>
        }
        onClose={handleErrClose}
      />
    </>
  );
}
