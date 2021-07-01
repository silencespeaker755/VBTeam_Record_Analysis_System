import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../../hooks/useInfo";
import axios from "../../../setting";
import AlertModel from "../../../components/AlertModel";
import HintModal from "../../../components/HintModal";
import Loading from "../../../components/Loading";

export default function RemoveMemberModal(props) {
  const { open, onClose, setId, dataId, refetchMatch } = props;
  const { userInfo } = useUserInfo();
  const [message, setMessage] = useState("");
  const [hintModal, setHintModal] = useState(false);

  const { mutate: deleteMember, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/sets/data/delete", {
        setId,
        dataId,
        userId: userInfo.id,
      });
      return msg;
    },
    {
      retry: false,
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
    deleteMember();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="Delete"
        alertDesciption="Are you sure to delete this member ?"
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
