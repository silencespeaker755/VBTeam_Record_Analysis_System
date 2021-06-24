import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import instance from "../../setting";
import AlertModel from "../../components/AlertModel";

export default function DeleteModal(props) {
  const {
    open,
    date,
    eventId,
    handleOk,
    onClose,
    showErrorModel,
    setLoading,
    refetchEvents,
  } = props;

  const { userInfo } = useUserInfo();

  const { mutate: updateEvents, isLoading } = useMutation(
    async () => {
      await instance.post("/api/home/calendar/delete", {
        eventId,
        userId: userInfo.id,
      });
    },
    {
      onSuccess: () => {
        handleOk();
        refetchEvents();
      },
      onError: () => {
        onClose();
        showErrorModel();
      },
    }
  );

  useEffect(() => setLoading(isLoading), [isLoading]);

  return (
    <AlertModel
      open={open}
      alertTitle={date}
      alertDesciption="You will attend to in."
      alertButton={
        <div>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={updateEvents}>Delete</Button>
        </div>
      }
      onClose={onClose}
    />
  );
}
