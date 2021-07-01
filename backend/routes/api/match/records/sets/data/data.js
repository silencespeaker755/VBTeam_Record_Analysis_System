import { Router } from "express";
import RecordService from "../../../../../../services/RecordService";

const router = Router();

router.post("/create", (req, res) => {
  /*
    #swagger.path = '/api/match/records/sets/data/create'
    #swagger.tags = ['Match']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { 
        "setId": "60d619a88da34eda2a6ebc41",
        userId: "60d08f760211c9a4925218a0"
      } 
    }
  */

  console.log(req.body);
  const { setId, data, userId } = req.body;

  RecordService.updateData({ data, userId })
    .then(() =>
      RecordService.createData({ setId, data, userId })
        .then((dataId) => {
          console.log("Created data:", dataId);
          /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d619a88da34eda2a6ebc41"
          }
        }
      */
          res.status(200).json({ id: dataId });
        })
        .catch((err) => {
          console.log(err);
          if (err === "Admin required") {
            res.status(403).send(err);
          } else {
            res.status(404).send(err);
          }
        })
    )
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
      #swagger.path = '/api/match/records/sets/data/delete'
      #swagger.tags = ['Match']
      #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: {
          "setId": "60d619a88da34eda2a6ebc41",
          "dataId": "60d619a88da34eda2a6ebc41",
          "userId": "60d08f760211c9a4925218a0",
        }
      }
    */

  console.log(req.body);
  const { setId, dataId, userId } = req.body;

  RecordService.deleteData({ setId, dataId, userId })
    .then((data) => {
      console.log("Deleted data:", data);
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
      #swagger.path = '/api/match/records/sets/data/update'
      #swagger.tags = ['Match']
      #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { 
          "data": {
            
          }
        }
      }
    */

  console.log(req.body);
  const { data, userId } = req.body;

  RecordService.updateData({ data, userId })
    .then((Data) => {
      console.log("Updated data:", Data);
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

export default router;
