import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import axios from "../../setting";
import AlertModel from "../../components/AlertModel";
import HintModal from "../../components/HintModal";
import Loading from "../../components/Loading";

export default function DeleteModal(props) {
  const { open, onClose, recordId, refetch } = props;
  const { userInfo } = useUserInfo();
  const [message, setMessage] = useState("");
  const [hintModal, setHintModal] = useState(false);

  const { mutate: deleteMatch, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/delete", {
        recordId,
        userId: userInfo.id,
      });
      return msg;
    },
    {
      onSuccess: (msg) => {
        setMessage(msg.data);
        setHintModal(true);
        refetch();
      },
      onError: (err) => {
        setMessage(err.response.data);
        setHintModal(true);
      },
    }
  );

  const handleHintClose = (e) => {
    e.stopPropagation();
    setHintModal(false);
    onClose();
  };

  const handleOk = (e) => {
    e.stopPropagation();
    deleteMatch();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="Delete"
        alertDesciption="Are you sure to delte this match ?"
        alertButton={
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleOk}>Delete</Button>
          </div>
        }
        onClose={onClose}
      />
      <HintModal open={hintModal} message={message} onClose={handleHintClose} />
    </>
  );
}
