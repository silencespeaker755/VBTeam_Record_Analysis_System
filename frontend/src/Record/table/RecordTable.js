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
import EditableCell from "./EditableCell";
import EditableTextCeil from "./EditableTextCeil";
import UpdateTableModal from "../modal/UpdateTableModal";
import DeleteTableModal from "../modal/DeleteTableModal";
import { sample } from "../../Test_data/recordData";
import "../../css/RecordTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderCollapse: "separate",
  },
});

const columnDir = {
  name: "背號",
  passesOrSets: "接/舉球",
  serveReceptions: "接發球",
  attacks: "攻擊",
  drops: "吊球",
  serves: "發球",
  blocks: "欄網",
  faults: "犯規",
  notes: "備註",
};

const detailDir = {
  good: "好",
  ok: "OK",
  OK: "OK",
  bad: "噴",
  times: "次",
  success: "得",
  effective: "效",
  fail: "失",
  ace: "A",
  types: "原因",
  notes: "備註",
};

export default function RecordTable({
  initialData = [],
  setsIndex,
  match,
  refetchMatch,
}) {
  const classes = useStyles();
  const [data, setData] = useImmer(initialData);
  const [current, setCurrent] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateModal, setUpdatemodal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const AddNewMember = () => {
    setData((pre) => {
      pre.push(sample);
      return pre;
    });
  };

  const RemoveNewMember = () => {
    setData((pre) => {
      pre.splice(deleteIndex, 1);
      return pre;
    });
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              {data.length !== 0 &&
                Object.keys(data[0]).map((value) => {
                  if (value === "_id" || value === "__v") return null;
                  if (value === "name")
                    return (
                      <TableCell
                        key={`${value}`}
                        className="header-frame column-content-name width-60"
                        align="center"
                      >
                        {columnDir[value]}
                      </TableCell>
                    );
                  return (
                    <TableCell
                      key={`${value}`}
                      className="header-frame width-120"
                      align="center"
                    >
                      {value === "notes"
                        ? mappingHeaderWithSubHeader("", [value])
                        : mappingHeaderWithSubHeader(
                            columnDir[value],
                            Object.keys(data[0][value])
                          )}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={`row-${row.name}-${i}`} hover>
                {Object.keys(row).map((value) =>
                  mappingColumnWithContents(i, value, row[value])
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <UpdateTableModal
        open={updateModal}
        onClose={() => {
          setUpdatemodal(false);
        }}
        setsIndex={setsIndex}
        match={match}
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
    </div>
  );
}
