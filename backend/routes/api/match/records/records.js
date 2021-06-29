import { Router } from "express";
import User from "../../../../models/User";
import NotificationService from "../../../../services/NotificationService";
import RecordService from "../../../../services/RecordService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/match/records'
    #swagger.tags = ['Match']
  */

  console.log(req.query);
  const { recordId, userId } = req.query;
  if (recordId) {
    RecordService.getRecord({ recordId })
      .then((record) => {
        console.log("Get record:", record);
        /*
          #swagger.responses[200] = { 
            type: 'array',
            schema: { $ref: '#/definitions/Records' }
          }
        */
        res.status(200).send(record);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else {
    RecordService.getRecords({ userId })
      .then((records) => {
        console.log("Get all records:", records);
        /*
          #swagger.responses[200] = { 
            type: 'array',
            schema: { $ref: '#/definitions/Record' }
          }
        */
        res.status(200).send(records);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  }
});

router.post("/create", (req, res) => {
  /*
    #swagger.path = '/api/match/records/create'
    #swagger.tags = ['Match']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/CreateRecord'} 
    }
  */

  console.log("/api/match/records/create: ", req.body);

  const { record, userId } = req.body;

  RecordService.createRecord({ record, userId })
    .then(async (Record) => {
      console.log("Created record:", Record);

      const creator = await User.findById(Record.creator._id);
      await NotificationService.addNotifications({
        notification: {
          type: "record",
          id: Record._id,
          uploader: creator.name,
          uploadTime: Record.createTime,
        },
        uploaderId: userId,
      });
      /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d619a88da34eda2a6ebc41"
          }
        }
      */
      res.status(200).json({ id: Record._id });
    })
    .catch((err) => {
      console.log(err);
      if (err === "Admin required") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

router.post("/delete", (req, res) => {
  /*
    #swagger.path = '/api/match/records/delete'
    #swagger.tags = ['Match']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: {
        "recordId": "60d619a88da34eda2a6ebc41",
        "userId": "60d08f760211c9a4925218a0",
      }
    }
  */

  console.log("/api/match/records/delete: ", req.body);

  const { recordId, userId } = req.body;

  RecordService.deleteRecord({ recordId, userId })
    .then((record) => {
      console.log("Deleted record:", record);
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

export default router;
