import { Router } from "express";
import User from "../../../models/User";
import CalendarService from "../../../services/CalendarService";
import NotificationService from "../../../services/NotificationService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar'
    #swagger.tags = ['Home']
  */

  CalendarService.getEvents()
    .then((events) => {
      console.log("Get all events:", events);
      /*
        #swagger.responses[200] = { 
          schema: { $ref: '#/definitions/Events' }
        }
      */
      res.status(200).json({ events });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/create", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/create'
    #swagger.tags = ['Home']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/CreateEvent' }
    }
  */

  console.log(req.body);
  const { event, userId } = req.body;

  CalendarService.createEvent({ event, userId })
    .then(async (Event) => {
      console.log("Created eventId:", Event);

      await NotificationService.addNotifications({
        notification: {
          type: "event",
          id: Event._id,
          uploader: Event.creator.name,
          uploadTime: Event.createTime,
        },
        uploaderId: userId,
      });
      /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d0b2011e44bec4e4be3a52"
          }
        }
      */
      res.status(200).json({ id: Event._id });
    })
    .catch((err) => {
      console.log(err);
      if (err === "Admin required!") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

router.post("/delete", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/delete'
    #swagger.tags = ['Home']
    #swagger.parameters['obj'] = {
      "eventId": {
        in: 'body',
        required: true,
        type: 'string'
      },
      "userId": {
        in: 'body',
        required: true,
        type: 'string',
      }
    }
  */

  console.log(req.body);
  const { eventId, userId } = req.body;

  CalendarService.deleteEvent({ eventId, userId })
    .then((event) => {
      console.log("Deleted event:", event);
      res.status(200).send("Delete success!");
    })
    .catch((err) => {
      console.log(err);
      if (err === "Admin required!") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

router.post("/update", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/update'
    #swagger.tags = ['Home']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/UpdateEvent'}
    }
  */

  console.log(req.body);
  const { event, userId } = req.body;

  CalendarService.updateEvent({ event, userId })
    .then((Event) => {
      console.log("Updated event:", Event);
      res.status(200).send("Update success!");
    })
    .catch((err) => {
      console.log(err);
      if (err === "Admin required!") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

router.post("/attend", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/attend'
    #swagger.tags = ['Home']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: {
        "eventId": "60d0b2011e44bec4e4be3a52",
        "userId": "60d2cbeb9a8b913f2ef10193",
        "attend": true
      }
    }
  */

  console.log(req.body);
  const { eventId, userId, attend } = req.body;

  CalendarService.attendEvent({ eventId, userId, attend })
    .then((event) => {
      console.log("Attended event:", event);
      res
        .status(200)
        .send(attend ? "Attending success!" : "Not attending success!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
