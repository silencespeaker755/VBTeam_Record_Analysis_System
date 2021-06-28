import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import axios from "../../setting";
import AlertModel from "../../components/AlertModel";
import HintModal from "../../components/HintModal";
import Loading from "../../components/Loading";

export default function RoleModal({
  open,
  onClose,
  userId,
  username,
  refetch,
}) {
  const { userInfo } = useUserInfo();
  const [message, setMessage] = useState("");
  const [hintModal, setHintModal] = useState(false);

  const { mutate: updateRole, isLoading } = useMutation(
    async () => {
      const data = await axios.post("/api/user/admin", {
        userId,
        adminId: userInfo.id,
      });
      return data;
    },
    {
      onSuccess: ({ data }) => {
        setMessage(data);
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
    updateRole();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModel
        open={open}
        alertTitle="Update"
        alertDesciption={`Are you sure to make ${username} become Admin ?`}
        alertButton={
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleOk}>Confirm</Button>
          </div>
        }
        onClose={onClose}
      />
      <HintModal open={hintModal} message={message} onClose={handleHintClose} />
    </>
  );
}
