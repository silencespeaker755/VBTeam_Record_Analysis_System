import { Router } from "express";
import RecordService from "../../../services/RecordService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/match/records'
    #swagger.tags = ['Match']
  */

  RecordService.getRecords()
    .then((records) => {
      console.log("Get all records:", records);
      /*
        #swagger.responses[200] = { 
          type: 'array',
          schema: { $ref: '#/definitions/Records' }
        }
      */
      res.status(200).send(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.get("/:recordId", (req, res) => {
  /*
    #swagger.path = '/api/match/records/:recordId'
    #swagger.tags = ['Match']
  */

  const { userId } = req.body;
  RecordService.getRecord({ recordId: req.params.recordId, userId })
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
});

router.post("/create", (req, res) => {
  /*
    #swagger.path = '/api/match/records/create'
    #swagger.tags = ['Match']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/createRecord'} 
    }
  */

  console.log(req.body);
  const { record, userId } = req.body;

  RecordService.createRecord({ record, userId })
    .then((recordId) => {
      console.log("Created record:", recordId);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: 'string'
          }
        }
      */
      res.status(200).json({ id: recordId });
    })
    .catch((err) => {
      console.log(err);
      if (err === "User not found!" || err === "Admin required") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

// router.post("/delete", (req, res) => {
//   /*
//     #swagger.path = '/api/match/records/delete'
//     #swagger.tags = ['Match']
//     #swagger.parameters['obj'] = {
//       "recordId": {
//         in: 'body',
//         required: true,
//         type: 'string'
//       },
//       "userId": {
//         in: 'body',
//         required: true,
//         type: 'string',
//       }
//     }
//   */

//   console.log(req.body);
//   const { postId, userId } = req.body;

//   RecordService.deleteRecord({ postId, userId })
//     .then((post) => {
//       console.log("Deleted record:", post);
//       res.status(200).send("Delete success!");
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err === "User not found!" || err === "") {
//         res.status(403).send(err);
//       } else {
//         res.status(404).send(err);
//       }
//     });
// });

// router.post("/update", (req, res) => {
//   /*
//     #swagger.path = '/api/practice/posts/update'
//     #swagger.tags = ['Practice']
//     #swagger.parameters['obj'] = {
//       in: 'body',
//       required: true,
//       type: 'object',
//       schema: { $ref: '#/definitions/UpdatePost'}
//     }
//   */

//   console.log(req.body);
//   const { post, userId } = req.body;

//   RecordService.updateRecord({ post, userId })
//     .then((Post) => {
//       console.log("Updated event:", Post);
//       res.status(200).send("Update success!");
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err === "You are not the uploader!") {
//         res.status(403).send(err);
//       } else {
//         res.status(404).send(err);
//       }
//     });
// });

export default router;
