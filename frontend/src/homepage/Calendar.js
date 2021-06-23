import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import instance from "../setting";
import "../css/Calendar.css";

export default function Calendar(props) {
  const { showErrorModel } = props;
  const [edit, setEdit] = useState(false);

  const {
    data: events = [],
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch,
  } = useQuery(
    "calendarFetching",
    async () => {
      const { data } = await instance.get("/api/home/calendar");
    },
    {
      retry: false,
      onSuccess: () => {},
    }
  );

  const handleEdit = (event) => (e) => {
    setEdit(true);
  };

  const handleEventRender = ({ event, el, view, timeText }) => {
    const dateAttr = moment(event.start).format("YYYY-MM-DD");
    if (view.type !== "dayGridWeek") {
      if (!$(`#${dateAttr}`).hasClass("detected")) {
        $(`[data-date='${dateAttr}']`).append(
          `
        <span id='${dateAttr}'>
          <img src='create_pen.svg' class='custom_edit_pen' alt='modify calendar' />
          <span class='custom_attend_number'>5</span>
        </span>
        `
        );
        $(`#${dateAttr}`).on("click", handleEdit(event));
        $(`#${dateAttr}`).removeClass("no-detected");
        $(`#${dateAttr}`).addClass("detected");
      }
    } else {
      $(`#${dateAttr}`).removeClass("detected");
      $(`#${dateAttr}`).addClass("no-detected");
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
