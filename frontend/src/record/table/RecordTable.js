import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useImmer } from "../../hooks/useImmer";
import { useUserInfo } from "../../hooks/useInfo";
import MemberTable from "./MemberTable";
import EditableCell from "./EditableCell";
import EditableTextCeil from "./EditableTextCeil";
import UpdateTableModal from "../modal/UpdateTableModal";
import DeleteTableModal from "../modal/DeleteTableModal";
import AddMemberModal from "./modal/AddMemberModal";
import RemoveMemberModal from "./modal/RemoveMemberModal";
import { Unit, columnDir, detailDir } from "../../utils/record/constant";
import "../../css/RecordTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderCollapse: "separate",
  },
});

export default function RecordTable({
  initialData = [],
  setsIndex,
  match,
  refetchMatch,
}) {
  const classes = useStyles();
  const { userInfo } = useUserInfo();
  const [data, setData] = useImmer(initialData);
  const [current, setCurrent] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateModal, setUpdatemodal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createDataModal, setCreateDataModal] = useState(false);
  const [deleteDataModal, setDeleteDataModal] = useState(false);
  const [removeId, setRemoveId] = useState(null);

  const AddNewMember = () => {
    setCreateDataModal(true);
  };

  const RemoveNewMember = () => {
    setRemoveId(match.sets[setsIndex].data[deleteIndex]._id);
    setDeleteDataModal(true);
    setDeleteIndex(null);
  };

  useEffect(() => {
    setData(() => initialData.filter((el) => el !== "__v" || el !== "_id"));
  }, [initialData]);

  const mappingHeaderWithSubHeader = (header, subHeader) => {
    return (
      <div key={`header-${header}`}>
        <div className="header">{header}</div>
        <div className="flex-center subheader-border-top">
          {subHeader.map((item, i) => (
            <span key={`${header}-${item}`} className="subheader-postion">
              {detailDir[item]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const mappingColumnWithContents = (index, key, item) => {
    if (key === "_id" || key === "__v") return null;
    if (key === "name")
      return (
        <TableCell
          key={`name-${index}-${item}`}
          className="column-content-name column-content-frame width-100"
          align="center"
        >
          <div className="column-content-postion height-52">
            <EditableCell
              editable={userInfo.isAdmin}
              initialValue={item}
              label={`${key}-${index}`}
              current={current}
              handleClick={() => {
                setCurrent(`${key}-${index}`);
                setDeleteIndex(null);
              }}
              handleDoubleClick={() => setDeleteIndex(index)}
              handleBlur={() => {
                setCurrent("");
                setDeleteIndex(null);
              }}
              handleNext={() => {
                setCurrent(() => `${key}-${index + 1}`);
                setDeleteIndex(null);
              }}
              last={index === data.length - 1}
              Classes="width-100"
              updateMyData={(newValue) => {
                setData((pre) => {
                  pre[index][key] = newValue;
                });
              }}
            />
          </div>
        </TableCell>
      );
    if (key === "notes") {
      return (
        <TableCell
          key={`${key}}-${index}-${item}`}
          className="column-content-frame"
          align="left"
        >
          <div className="column-content-postion height-52">
            <EditableTextCeil
              editable={userInfo.isAdmin}
              initialValue={item}
              label={`${key}-${item}-${index}`}
              current={current}
              handleClick={() => {
                setCurrent(`${key}-${item}-${index}`);
                setDeleteIndex(null);
              }}
              handleBlur={() => setCurrent("")}
              handleNext={() => setCurrent(() => `${key}-${item}-${index + 1}`)}
              updateMyData={(newValue) => {
                setData((pre) => {
                  pre[index][key] = newValue;
                });
              }}
            />
          </div>
        </TableCell>
      );
    }

    return (
      <TableCell
        key={`${key}}-${index}`}
        className="column-content-frame"
        align="center"
      >
        <div className="flex-center height-52">
          {Object.keys(item).map((value, i) => (
            <span
              key={`${key}-${i}-${item[value]}`}
              className="column-content-postion"
            >
              <EditableCell
                editable={userInfo.isAdmin}
                initialValue={item[value]}
                label={`${key}-${value}-${index}`}
                current={current}
                handleClick={() => {
                  setCurrent(`${key}-${value}-${index}`);
                  setDeleteIndex(null);
                }}
                handleBlur={() => setCurrent("")}
                handleNext={() =>
                  setCurrent(() => `${key}-${value}-${index + 1}`)
                }
                last={index === data.length - 1}
                updateMyData={(newValue) => {
                  setData((pre) => {
                    pre[index][key][value] = newValue;
                  });
                }}
              />
            </span>
          ))}
        </div>
      </TableCell>
    );
  };

  return (
    <div
      className="margin-50"
      style={{ position: "relative", marginTop: "10px", marginBottom: "80px" }}
    >
      {userInfo.isAdmin ? (
        <div>
          <Button
            className="delete-button"
            size="medium"
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon className="delete-icon" />
            Delete
          </Button>
          <Button
            className="update-button"
            size="medium"
            onClick={() => setUpdatemodal(true)}
          >
            <CloudUploadIcon className="edit-icon" />
            Update
          </Button>
        </div>
      ) : null}
      <MemberTable
        data={data}
        setData={setData}
        current={current}
        setCurrent={setCurrent}
        setDeleteIndex={setDeleteIndex}
      />
      {userInfo.isAdmin ? (
        <div className="add-member-section">
          {deleteIndex !== null && deleteIndex < data.length ? (
            <Button className="add-member-button" onClick={RemoveNewMember}>
              <RemoveIcon />
            </Button>
          ) : (
            <Button className="add-member-button" onClick={AddNewMember}>
              <AddIcon />
            </Button>
          )}
        </div>
      ) : null}
      <UpdateTableModal
        open={updateModal}
        onClose={() => {
          setUpdatemodal(false);
        }}
        data={data}
        refetchMatch={refetchMatch}
      />
      <DeleteTableModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        recordId={match._id}
        setId={match.sets[setsIndex]._id}
        refetchMatch={refetchMatch}
      />
      <AddMemberModal
        open={createDataModal}
        setId={match.sets[setsIndex]._id}
        data={data}
        onClose={() => setCreateDataModal(false)}
        refetchMatch={refetchMatch}
      />
      <RemoveMemberModal
        open={deleteDataModal}
        setId={match.sets[setsIndex]._id}
        dataId={removeId}
        onClose={() => {
          setDeleteDataModal(false);
          setRemoveId(null);
        }}
        refetchMatch={refetchMatch}
      />
    </div>
  );
}
