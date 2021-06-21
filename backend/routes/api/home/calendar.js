import { Router } from "express";
import CalendarService from "../../../services/CalendarService";

const router = Router();

router.get("/", (req, res) => {
  CalendarService.getEvents()
    .then((events) => {
      console.log("events:", events);
      res.status(200).json({ events });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  const { event, userId } = req.body;

  CalendarService.createEvent({ event, userId })
    .then((event) => {
      console.log("Created event:", event);
      res.status(200).send("Create success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/delete", (req, res) => {
  console.log(req.body);
  const { eventId, userId } = req.body;

  CalendarService.deleteEvent({ eventId, userId })
    .then((event) => {
      console.log("Deleted event:", event);
      res.status(200).send("Delete success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/update", (req, res) => {
  console.log(req.body);
  const { event, userId } = req.body;

  CalendarService.updateEvent({ event, userId })
    .then((event) => {
      console.log("Updated event:", event);
      res.status(200).send("Update success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/attend", (req, res) => {
  console.log(req.body);
  const { eventId, userId } = req.body;

  CalendarService.attendEvent({ eventId, userId })
    .then((event) => {
      console.log("Attended event:", event);
      res.status(200).send("Attend success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
