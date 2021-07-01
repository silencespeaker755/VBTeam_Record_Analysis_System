import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useUserInfo } from "../../hooks/useInfo";
import EditableCell from "./EditableCell";
import EditableTextCeil from "./EditableTextCeil";
import "../../css/RecordTable.css";

import { Unit, columnDir, detailDir } from "../../utils/record/constant";

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderCollapse: "separate",
  },
});

export default function MemberTable({
  viewOnly = false,
  data,
  setData = () => {},
  current,
  setCurrent = () => {},
  setDeleteIndex = () => {},
}) {
  const classes = useStyles();

  const { userInfo } = useUserInfo();

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
              editable={!viewOnly && userInfo.isAdmin}
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
              editable={!viewOnly && userInfo.isAdmin}
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
                editable={!viewOnly && userInfo.isAdmin}
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            {Object.keys(Unit).map((value) => {
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
                        Object.keys(Unit[value])
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
  );
}
