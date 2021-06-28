import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../../hooks/useInfo";
import axios from "../../../setting";
import { Unit } from "../../../utils/record/constant";
import AlertModel from "../../../components/AlertModel";
import HintModal from "../../../components/HintModal";
import Loading from "../../../components/Loading";

export default function AddMemberModal(props) {
  const { open, onClose, setId, refetchMatch } = props;
  const { userInfo } = useUserInfo();
  const [message, setMessage] = useState("");
  const [hintModal, setHintModal] = useState(false);

  const { mutate: addNewMember, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/sets/data/create", {
        setId,
        userId: userInfo.id,
      });
      return msg;
    },
    {
      retry: false,
      onSuccess: (msg) => {
        console.log(msg);
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
    addNewMember();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="New"
        alertDesciption="Are you sure to Add new member ?"
        alertButton={
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleOk}>Add</Button>
          </div>
        }
        onClose={onClose}
      />
      <HintModal open={hintModal} message={message} onClose={handleHintClose} />
    </>
  );
}
