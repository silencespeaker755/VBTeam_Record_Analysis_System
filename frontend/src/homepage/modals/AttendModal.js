import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import instance from "../../setting";
import AlertModel from "../../components/AlertModel";

export default function AttendModal(props) {
  const { open, event, onClose, handleError, refetchEvents, setLoading } =
    props;
  const { userInfo } = useUserInfo();
  const { title, extendedProps = {} } = event;
  const { place = "", _id = "" } = extendedProps;

  const { mutate: updateAttender, isLoading } = useMutation(
    async () => {
      await instance.post("/api/home/calendar/attend", {
        eventId: _id,
        userId: userInfo.id,
        attend: true,
      });
    },
    {
      onSuccess: () => {
        refetchEvents();
      },
      onError: () => {
        handleError();
      },
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handleOk = () => {
    updateAttender();
    onClose();
  };

  if (isLoading) return "loading";

  return (
    <AlertModel
      open={open}
      alertTitle={`${title}`}
      alertDesciption={`You will attend to ${title} in ${place}.`}
      alertButton={
        <div>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleOk}>Join</Button>
        </div>
      }
      onClose={onClose}
    />
  );
}
