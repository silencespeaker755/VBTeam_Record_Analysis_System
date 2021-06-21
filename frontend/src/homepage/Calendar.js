import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar(props) {
  const { showErrorModel } = props;

  const handleDateClick = (arg) => {
    showErrorModel();
  };

  return (
    <div
      style={{
        margin: "40px",
        border: "20px solid #a78758",
        borderRadius: "23px",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridWeek,dayGridMonth",
        }}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2021-06-01" },
          { title: "event 2", date: "2021-06-02" },
          { title: "練球", start: "2021-06-23T12:30:00", end: "2021-06-25" },
        ]}
        dateClick={handleDateClick}
        initialDate="2021-06-01"
        eventClick={() => {}}
        eventRender={() => {}}
        editable
      />
    </div>
  );
}
