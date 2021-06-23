import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useUserInfo } from "../hooks/useInfo";
import PostModal from "./modals/PostModal";
import instance from "../setting";
import "../css/Calendar.css";

export default function Calendar(props) {
  const { showErrorModel } = props;
  const { userInfo, changeUser } = useUserInfo();
  const [edit, setEdit] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const {
    data: events,
    isError: isEventsError,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useQuery(
    "calendarFetching",
    async () => {
      const { data = { events: [] } } = await instance.get(
        "/api/home/calendar"
      );
      return data.events;
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
        if (!$(`#${dateAttr}`).length || $(`#${dateAttr}`).has("no-detected")) {
          $(`#${dateAttr}`).remove();
          $(`[data-date='${dateAttr}']`).append(
            `
            <span id='${dateAttr}'>
              <img src='create_pen.svg' class='custom_edit_pen' alt='modify calendar' />
              <span class='custom_attend_number'>5</span>
            </span>
            `
          );
        }
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

  const handleDateClick = (event) => {
    console.log(event, event.dateStr);
    if (!edit) {
      // showErrorModel();
      setCurrentDate(event.dateStr);
      setPostModal(true);
    }
  };

  const handleEventClick = ({ event }) => {
    console.log(event);
  };

  useEffect(() => {
    changeUser("60d2db2baabdc948653ff20e", true);
  }, []);

  if (isEventsError) return "error";
  if (isEventsLoading) return "loading";

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
        events={events}
        dateClick={handleDateClick}
        droppable={false}
        initialDate="2021-06-01"
        eventClick={handleEventClick}
        // editable
      />
      <PostModal
        open={postModal}
        date={currentDate}
        handleClose={() => setPostModal(false)}
        refetchEvents={refetchEvents}
      />
    </div>
  );
}
