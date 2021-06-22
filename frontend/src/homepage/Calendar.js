import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import $, { data } from "jquery";
import moment from "moment";
import "../css/Calendar.css";

export default function Calendar(props) {
  const { showErrorModel } = props;
  const [edit, setEdit] = useState(false);

  const handleEdit = (event) => (e) => {
    setEdit(true);
  };

  const handleEventRender = ({ event, el, view, timeText }) => {
    const dateAttr = moment(event.start).format("YYYY-MM-DD");
    if (!$(`[data-date='${dateAttr}']`).hasClass("detected")) {
      $(`[data-date='${dateAttr}']`).append(
        `
        <span id='${dateAttr}'>
          <img src='create_pen.svg' class='custom_edit_pen' alt='modify calendar' />
        </span>
        <span class='custom_attend_number'>5</span>
        `
      );
      $(`#${dateAttr}`).on("click", handleEdit(event));
      $(`[data-date='${dateAttr}']`).addClass("detected");
    }
    return el;
  };

  const handleDateClick = (e) => {
    if (!edit) showErrorModel();
  };

  return (
    <div
      style={{
        margin: "40px",
        border: "20px solid #a78758",
        borderRadius: "25px",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        viewClassNames="control-modify-entry"
        dayCellClassNames="test-day-class"
        eventContent={handleEventRender}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridWeek,dayGridMonth",
        }}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2021-06-01" },
          { title: "event 2", date: "2021-06-02" },
          {
            title: "練球",
            start: "2021-06-23T12:30:00",
            end: "2021-06-25",
          },
          { title: "練球", start: "2021-06-23T14:30:00", end: "2021-06-25" },
        ]}
        dateClick={handleDateClick}
        initialDate="2021-06-01"
        eventClick={() => {}}
        editable
      />
    </div>
  );
}
