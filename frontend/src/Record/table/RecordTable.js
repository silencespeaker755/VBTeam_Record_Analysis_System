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
import { useImmer } from "../../hooks/useImmer";
import EditableCell from "./EditableCell";
import EditableTextCeil from "./EditableTextCeil";
import { recordData, sample } from "../../Test_data/recordData";
import "../../css/RecordTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderCollapse: "separate",
  },
});

const columnDir = {
  name: "背號",
  handle: "接/舉球",
  receive: "接發球",
  attack: "攻擊",
  fake: "吊球",
  serve: "發球",
  block: "欄網",
  invalid: "犯規",
  note: "",
};

export default function RecordTable() {
  const classes = useStyles();
  const [data, setData] = useImmer(recordData);
  const [current, setCurrent] = useState("");
  const [update, setUpdate] = useState(false);

  const AddNewMember = () => {
    setData((pre) => {
      pre.push(sample);
      return pre;
    });
  };

  const mappingHeaderWithSubHeader = (header, subHeader) => {
    return (
      <div key={`header-${header}`}>
        <div className="header">{header}</div>
        <div className="flex-center subheader-border-top">
          {subHeader.map((item, i) => (
            <span key={`${header}-${item}`} className="subheader-postion">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const mappingColumnWithContents = (index, key, item) => {
    if (key === "name")
      return (
        <TableCell
          key={`name-${item}`}
          className="column-content-name column-content-frame width-100"
          align="center"
        >
          <div className="column-content-postion height-52">
            <EditableCell
              initialValue={item}
              label={`${key}-${index}`}
              current={current}
              handleClick={() => setCurrent(`${key}-${index}`)}
              handleBlur={() => setCurrent("")}
              handleNext={() => setCurrent(() => `${key}-${index + 1}`)}
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
    if (key === "note") {
      return Object.keys(item).map((value) => (
        <TableCell
          key={`${value}-${item[value]}`}
          className="column-content-frame"
          align="left"
        >
          <div
            key={`${key}-${item[value]}`}
            className="column-content-postion height-52"
          >
            <EditableTextCeil
              initialValue={item[value]}
              label={`${key}-${value}-${index}`}
              current={current}
              handleClick={() => setCurrent(`${key}-${value}-${index}`)}
              handleBlur={() => setCurrent("")}
              handleNext={() =>
                setCurrent(() => `${key}-${value}-${index + 1}`)
              }
              updateMyData={(newValue) => {
                setData((pre) => {
                  pre[index][key][value] = newValue;
                });
              }}
            />
          </div>
        </TableCell>
      ));
    }

    return (
      <TableCell className="column-content-frame" align="center">
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
                handleClick={() => setCurrent(`${key}-${value}-${index}`)}
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
      style={{ marginTop: "10px", marginBottom: "80px" }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              {data.length !== 0 &&
                Object.keys(data[0]).map((value) => {
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
                      {mappingHeaderWithSubHeader(
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
              <TableRow key={row.name} hover>
                {Object.keys(row).map((value) =>
                  mappingColumnWithContents(i, value, row[value])
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="add-member-section">
        <Button className="add-member-button" onClick={AddNewMember}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}
