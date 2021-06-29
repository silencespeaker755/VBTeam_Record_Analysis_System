import { Router } from "express";
import NotificationService from "../../../services/NotificationService";

const router = Router();

router.get("/", (req, res) => {
  console.log("/api/home/notifications: ", req.query);

  const { userId } = req.query;
  NotificationService.getNotifications({ userId })
    .then((notifications) => {
      console.log("Get notifications: ", notifications);
      res.status(200).json(notifications);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
