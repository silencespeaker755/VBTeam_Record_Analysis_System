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
        alertTitle="修改"
        alertDesciption="確定要儲存已修改的變更嗎？ 再按下確認之前，請確保只有一局的資料被更動。"
        alertButton={
          <div>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={handleOk}>確認</Button>
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
