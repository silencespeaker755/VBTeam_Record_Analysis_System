import { Router } from "express";
import RecordService from "../../../../../services/RecordService";

const router = Router();

router.post("/create", (req, res) => {
  console.log("/api/match/records/sets/create: ", req.body);

  const { recordId, set, userId } = req.body;

  RecordService.createSet({ recordId, set, userId })
    .then((setId) => {
      console.log("Created set:", setId);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d619a88da34eda2a6ebc41"
          }
        }
      */
      res.status(200).json({ id: setId });
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
  console.log("/api/match/records/sets/delete: ", req.body);

  const { recordId, setId, userId } = req.body;
  RecordService.deleteSet({ recordId, setId, userId })
    .then((set) => {
      console.log("Deleted set:", set);
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
