import { Router } from "express";
import CalendarService from "../../../services/CalendarService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar'
    #swagger.tags = ['Home/Calendar']
  */

  CalendarService.getEvents()
    .then((events) => {
      console.log("Get all events:", events);
      /*
        #swagger.responses[200] = { 
          schema: { $ref: '#/definitions/Event' }
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
    #swagger.tags = ['Home/Calendar']
    #swagger.parameters['event'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/CreateEvent' }
    }
    #swagger.parameters['userId'] = {
      in: 'body',
      required: true,
      type: 'string',
    }
  */

  console.log(req.body);
  const { event, userId } = req.body;

  CalendarService.createEvent({ event, userId })
    .then((eventId) => {
      console.log("Created eventId:", eventId);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: 'string'
          }
        }
      */
      res.status(200).json({ id: eventId });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/delete", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/delete'
    #swagger.tags = ['Home/Calendar']
    #swagger.parameters['eventId'] = {
      in: 'body',
      required: true,
      type: 'string'
    }
    #swagger.parameters['userId'] = {
      in: 'body',
      required: true,
      type: 'string',
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
      res.status(404).send(err);
    });
});

router.post("/update", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/update'
    #swagger.tags = ['Home/Calendar']
    #swagger.parameters['event'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Event' }
    }
    #swagger.parameters['userId'] = {
      in: 'body',
      required: true,
      type: 'string',
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
      res.status(404).send(err);
    });
});

router.post("/attend", (req, res) => {
  /*
    #swagger.path = '/api/home/calendar/attend'
    #swagger.tags = ['Home/Calendar']
    #swagger.parameters['eventId'] = {
      in: 'body',
      required: true,
      type: 'string'
    }
    #swagger.parameters['userId'] = {
      in: 'body',
      required: true,
      type: 'string',
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
