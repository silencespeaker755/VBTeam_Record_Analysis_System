import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import instance from "../../setting";
import AlertModel from "../../components/AlertModel";

export default function AttendModal(props) {
  const { open, event, onClose, handleError, refetchEvents, setLoading } =
    props;
  const { userInfo } = useUserInfo();
  const { title = "", extendedProps = {} } = event;
  const { place = "", _id = "" } = extendedProps;
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState(false);

  const { mutate: checkAttendance, isLoading: isAttendLoading } = useMutation(
    async () => {
      const { data } = await instance.get(
        "/api/home/calendar/checkAttendance",
        {
          params: {
            eventId: _id,
            userId: userInfo.id,
          },
        }
      );
      console.log(data);
      return data;
    },
    {
      retry: false,
      onSuccess: (data) => {
        setAttendance(data.attendance);
      },
    }
  );

  const { mutate: updateAttender, isLoading } = useMutation(
    async () => {
      await instance.post("/api/home/calendar/attend", {
        eventId: _id,
        userId: userInfo.id,
        attend: !attendance,
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
    if (attendance) setMessage(`你要取消參加${place}的${title}`);
    else setMessage(`你將會參加${place}的${title}`);
  }, [attendance]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (open) checkAttendance();
  }, [open]);

  const handleOk = () => {
    updateAttender();
    onClose();
  };

  if (isLoading || isAttendLoading) return "loading";

  return (
    <AlertModel
      open={open}
      alertTitle={`${title}`}
      alertDesciption={message}
      alertButton={
        <div>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={handleOk}>{attendance ? "請假" : "到"}</Button>
        </div>
      }
      onClose={onClose}
    />
  );
}
