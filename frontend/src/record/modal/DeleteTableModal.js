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

  const { mutate: deleteSet, isLoading } = useMutation(
    async () => {
      const msg = await axios.post("/api/match/records/sets/delete", {
        recordId,
        setId,
        userId: userInfo.id,
      });
      return msg;
    },
    {
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
    deleteSet();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="刪除"
        alertDesciption="確定要刪除這局的紀錄嗎？"
        alertButton={
          <div>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={handleOk}>確認</Button>
          </div>
        }
        onClose={onClose}
      />
      <HintModal open={hintModal} message={message} onClose={handleHintClose} />
    </>
  );
}
