import { Router } from "express";
import calendarRouter from "./calendar";
import notificationRouter from "./notification";

const router = Router();

router.use("/calendar", calendarRouter);
router.use("/notifications", notificationRouter);

export default router;
