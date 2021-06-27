import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import axios from "../../setting";
import AlertModel from "../../components/AlertModel";
import HintModal from "../../components/HintModal";
import Loading from "../../components/Loading";

export default function DeleteTableModal(props) {
  const { open, onClose, recordId, setId, refetchMatch } = props;
  const { userInfo } = useUserInfo();
  const [message, setMessage] = useState("");
  const [hintModal, setHintModal] = useState(false);
  console.log(recordId, setId);

  const { mutate: deleteSet, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/delete", {
        recordId,
        setId,
        userId: userInfo.id,
      });
      return msg;
    },
    {
      onSuccess: (msg) => {
        setMessage(msg.data);
        setHintModal(true);
        refetchMatch();
      },
      onError: (err) => {
        setMessage(err.response.data);
        setHintModal(true);
      },
    }
  );

  const handleHintClose = () => {
    setHintModal(false);
    onClose();
  };

  const handleOk = () => {
    deleteSet();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="Delete"
        alertDesciption="Are you sure to delte this set ?"
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
